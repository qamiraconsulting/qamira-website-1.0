import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./prompt.js";
import type { LeadInput, StoredMessage } from "./store.js";

// One visitor turn: send the chat to Claude, run save_lead if it asks to,
// loop until it answers in text, then check the reply against the site's
// rules (no prices, no outside links) before it is shown.

// Claude Opus 5.5 at low effort: short, conversational turns. Override with
// ANTHROPIC_CHAT_MODEL / ANTHROPIC_CHAT_EFFORT in Vercel without a deploy.
const DEFAULT_MODEL = "claude-opus-5-5";
const DEFAULT_EFFORT = "low";
const MAX_TOOL_ROUNDS = 3;
// Thinking counts towards max_tokens; only tokens actually generated are billed.
const MAX_TOKENS = 8000;

export const FALLBACK_REPLY =
  "Sorry, I didn't catch that properly. Could you try again? You can also reach our team at enquiries@qamiraconsulting.com.";
export const DECLINED_REPLY =
  "Sorry, I can't help with that one here. For anything else about our services, I'm happy to help, or you can email enquiries@qamiraconsulting.com.";
const PRICE_REPLY =
  "Every project we take on is fixed price, agreed in writing after a free 20-minute call, because the price depends on what's in scope. Would you like me to pass your details to our team so they can set that up?";

type Effort = "low" | "medium" | "high" | "xhigh" | "max";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const tools: Anthropic.Beta.Messages.BetaTool[] = [
  {
    name: "save_lead",
    description:
      "Pass the visitor's contact details and what they need to the Qamira team, who reply within one business day. Call it only when the visitor has asked to be contacted, wants a call, proposal or quote, and has given at least their name and email in this chat. Use null for anything they didn't give.",
    strict: true,
    input_schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "The visitor's name, as they gave it." },
        email: { type: "string", description: "The visitor's email address." },
        phone: { type: ["string", "null"], description: "Phone or WhatsApp number, if given." },
        company: { type: ["string", "null"], description: "Business name, if given." },
        country: { type: ["string", "null"], description: "Country the business is in, if known." },
        summary: {
          type: "string",
          description: "Two or three sentences for the team: what the business does, what they need, and any timing.",
        },
        services: {
          type: "array",
          items: { type: "string" },
          description: "Codes of the services that fit (for example QC-302), possibly empty.",
        },
      },
      required: ["name", "email", "phone", "company", "country", "summary", "services"],
    },
  },
];

export type ToolRecord = { name: string; outcome: string };

export type TurnUsage = {
  model: string;
  rounds: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
};

export type TurnResult = {
  reply: string;
  toolRecords: ToolRecord[];
  leadSaved: boolean;
  blocked: string | null;
  usage: TurnUsage;
};

/** The time in India and whether the team is working: Monday to Saturday, 9 am to 7 pm IST. */
export function indiaNow(date = new Date()): { label: string; online: boolean } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = get("weekday");
  const hour = Number(get("hour"));
  const online = weekday !== "Sunday" && hour >= 9 && hour < 19;
  return { label: `${weekday} ${get("hour")}:${get("minute")} IST`, online };
}

/** Stored transcript -> model messages: must start with the visitor, roles alternating. */
function toModelMessages(history: StoredMessage[]): Anthropic.Beta.Messages.BetaMessageParam[] {
  const out: Anthropic.Beta.Messages.BetaMessageParam[] = [];
  for (const turn of history) {
    if (out.length === 0 && turn.role === "assistant") continue; // the greeting is in the system prompt's voice
    const last = out[out.length - 1];
    if (last && last.role === turn.role) last.content = `${last.content as string}\n\n${turn.content}`;
    else out.push({ role: turn.role, content: turn.content });
  }
  return out;
}

// Any amount of money, in any of the currencies our visitors use. Matched
// replies are replaced, never shown: prices stay off the site entirely.
const PRICE_PATTERN =
  /(₹|\$|£|€|\b(?:rs|inr|aud|usd|gbp|eur|aed)\.?\s?\d|\d[\d,.]*\s?(?:k|lakh|lakhs|lac|crore|rupees|dollars|pounds)\b)/i;
// Links: our own site and WhatsApp only.
const URL_PATTERN = /https?:\/\/[^\s)]+/gi;
const ALLOWED_LINK = /^https?:\/\/(www\.)?(qamiraconsulting\.com|wa\.me)(\/|$)/i;

export function guardReply(text: string): { text: string; blocked: string | null } {
  if (PRICE_PATTERN.test(text)) return { text: PRICE_REPLY, blocked: "price" };
  const links = text.match(URL_PATTERN) ?? [];
  const outside = links.filter((link) => !ALLOWED_LINK.test(link));
  if (outside.length) {
    let cleaned = text;
    for (const link of outside) cleaned = cleaned.split(link).join("");
    return { text: cleaned.replace(/[ \t]{2,}/g, " ").trim(), blocked: "link" };
  }
  return { text, blocked: null };
}

export function parseLead(input: unknown): LeadInput | string {
  const raw = (input ?? {}) as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const opt = (v: unknown, max: number) => str(v, max) || null;
  const name = str(raw.name, 120);
  const email = str(raw.email, 200);
  const summary = str(raw.summary, 1500);
  if (name.length < 2) return "Ask the visitor for their name before saving.";
  if (!EMAIL_PATTERN.test(email)) return "That email address doesn't look valid. Ask the visitor to check it.";
  if (summary.length < 10) return "Add a short summary of what the visitor needs.";
  const services = Array.isArray(raw.services)
    ? raw.services.filter((s): s is string => typeof s === "string" && /^QC-\d{3}$/.test(s)).slice(0, 10)
    : [];
  return {
    name,
    email,
    phone: opt(raw.phone, 40),
    company: opt(raw.company, 160),
    country: opt(raw.country, 80),
    summary,
    services,
  };
}

let client: Anthropic | null = null;
function anthropic(): Anthropic {
  // 25 s per request and one retry, so a stalled call fails inside the
  // function's time limit rather than hanging the visitor.
  client ??= new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, timeout: 25_000, maxRetries: 1 });
  return client;
}

export async function runTurn(params: {
  history: StoredMessage[];
  page: string;
  /** Saves the lead and notifies the team; returns an error message for the model, or null. */
  saveLead: (lead: LeadInput) => Promise<string | null>;
}): Promise<TurnResult> {
  const model = process.env.ANTHROPIC_CHAT_MODEL || DEFAULT_MODEL;
  const effort = (process.env.ANTHROPIC_CHAT_EFFORT as Effort | undefined) || DEFAULT_EFFORT;
  const usage: TurnUsage = { model, rounds: 0, inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 };
  const toolRecords: ToolRecord[] = [];
  let leadSaved = false;

  const now = indiaNow();
  const messages = toModelMessages(params.history);
  // Per-turn facts go in a system message after the visitor's latest
  // message, so the cached system prompt above never changes.
  messages.push({
    role: "system",
    content: `Right now it is ${now.label}; our team is ${now.online ? "working" : "not working (back at 9 am IST on the next working day, Monday to Saturday)"}. The visitor is on ${params.page}.`,
  });

  let text: string | null = null;
  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const response = await anthropic().beta.messages.create({
      model,
      max_tokens: MAX_TOKENS,
      output_config: { effort },
      // If the model declines on safety grounds, the API retries on a
      // suitable fallback model inside the same call.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      tools,
      messages,
    });

    usage.rounds += 1;
    usage.inputTokens += response.usage.input_tokens;
    usage.outputTokens += response.usage.output_tokens;
    usage.cacheReadTokens += response.usage.cache_read_input_tokens ?? 0;
    usage.cacheWriteTokens += response.usage.cache_creation_input_tokens ?? 0;

    if (response.stop_reason === "refusal") {
      return { reply: DECLINED_REPLY, toolRecords, leadSaved, blocked: "refusal", usage };
    }

    const toolUses = response.content.filter((b): b is Anthropic.Beta.Messages.BetaToolUseBlock => b.type === "tool_use");
    const replyText = response.content
      .filter((b): b is Anthropic.Beta.Messages.BetaTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    if (response.stop_reason !== "tool_use" || toolUses.length === 0) {
      text = response.stop_reason === "max_tokens" ? null : replyText || null;
      break;
    }

    messages.push({ role: "assistant", content: response.content });
    const results: Anthropic.Beta.Messages.BetaToolResultBlockParam[] = [];
    for (const use of toolUses) {
      if (use.name !== "save_lead") {
        results.push({ type: "tool_result", tool_use_id: use.id, content: "Unknown tool.", is_error: true });
        continue;
      }
      if (leadSaved) {
        results.push({ type: "tool_result", tool_use_id: use.id, content: "Already saved in this chat." });
        continue;
      }
      const lead = parseLead(use.input);
      if (typeof lead === "string") {
        toolRecords.push({ name: use.name, outcome: "invalid" });
        results.push({ type: "tool_result", tool_use_id: use.id, content: lead, is_error: true });
        continue;
      }
      const failure = await params.saveLead(lead);
      if (failure) {
        toolRecords.push({ name: use.name, outcome: "failed" });
        results.push({ type: "tool_result", tool_use_id: use.id, content: failure, is_error: true });
      } else {
        leadSaved = true;
        toolRecords.push({ name: use.name, outcome: "saved" });
        results.push({
          type: "tool_result",
          tool_use_id: use.id,
          content: "Saved and sent to the team. They reply within one business day.",
        });
      }
    }
    // All results for one assistant message go back in a single user message.
    messages.push({ role: "user", content: results });
  }

  if (!text) return { reply: FALLBACK_REPLY, toolRecords, leadSaved, blocked: null, usage };
  const guarded = guardReply(text);
  return { reply: guarded.text || FALLBACK_REPLY, toolRecords, leadSaved, blocked: guarded.blocked, usage };
}
