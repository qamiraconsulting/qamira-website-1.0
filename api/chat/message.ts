import type { VercelRequest, VercelResponse } from "@vercel/node";
import { waitUntil } from "@vercel/functions";
import { alertOps } from "../_alert.js";
import { clientIp } from "../_rate-limit.js";
import { FALLBACK_REPLY, runTurn } from "../_chat/agent.js";
import { appendLeadRow, emailLead } from "../_chat/notify.js";
import { addMessage, conversationExists, countVisitorMessages, loadMessages, saveLead } from "../_chat/store.js";

// POST /api/chat/message { conversationId, message, page } -> { reply, leadSaved }

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_MESSAGE_LENGTH = 2000;
// Cost and abuse ceiling: a real enquiry never needs this many messages.
const MAX_VISITOR_MESSAGES = 40;
const LIMIT_REPLY =
  "We've covered a lot in this chat. To keep going, please email enquiries@qamiraconsulting.com or book a free 20-minute call at https://www.qamiraconsulting.com/contact.";

// Best-effort, per warm instance (same approach and caveats as
// api/_rate-limit.ts): at most 20 messages per IP in 5 minutes.
const WINDOW_MS = 5 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const recent = new Map<string, number[]>();
function allowed(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(ip, hits);
    return false;
  }
  hits.push(now);
  recent.set(ip, hits);
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!process.env.DATABASE_URL || !process.env.ANTHROPIC_API_KEY) {
    res.status(503).json({ error: "Qami isn't available right now.", unavailable: true });
    return;
  }

  const conversationId = typeof req.body?.conversationId === "string" ? req.body.conversationId : "";
  const message = typeof req.body?.message === "string" ? req.body.message.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
  const page = typeof req.body?.page === "string" ? req.body.page.slice(0, 300) : "/";
  if (!UUID.test(conversationId) || !message) {
    res.status(400).json({ error: "Invalid request." });
    return;
  }
  if (!allowed(clientIp(req))) {
    res.status(429).json({ error: "That's a lot of messages in a short time. Please wait a minute and try again." });
    return;
  }

  try {
    if (!(await conversationExists(conversationId))) {
      res.status(404).json({ error: "This chat has expired. Please start a new one.", expired: true });
      return;
    }

    await addMessage(conversationId, "user", message);

    if ((await countVisitorMessages(conversationId)) > MAX_VISITOR_MESSAGES) {
      await addMessage(conversationId, "assistant", LIMIT_REPLY);
      res.status(200).json({ reply: LIMIT_REPLY, leadSaved: false });
      return;
    }

    const history = await loadMessages(conversationId, MAX_VISITOR_MESSAGES * 2 + 2);

    const turn = await runTurn({
      history,
      page,
      saveLead: async (lead) => {
        try {
          await saveLead(conversationId, lead);
        } catch (err) {
          console.error("chat lead save failed:", err instanceof Error ? err.message : "unknown error");
          return "Saving didn't work. Ask the visitor to email enquiries@qamiraconsulting.com instead.";
        }
        // The lead is safely in the database; the email and sheet row follow
        // after the reply so the visitor isn't kept waiting.
        waitUntil(
          Promise.all([
            emailLead(lead, [...history, { role: "user", content: message }]),
            appendLeadRow(lead),
          ]).catch((err) =>
            alertOps({
              key: "chat:lead-notify",
              subject: "A Qami chat lead was saved but not emailed or logged to the sheet",
              error: err,
              context: { Conversation: conversationId, Name: lead.name, Email: lead.email, Summary: lead.summary },
            }),
          ),
        );
        return null;
      },
    });

    if (turn.blocked) console.warn("chat reply replaced", { conversationId, reason: turn.blocked });
    await addMessage(conversationId, "assistant", turn.reply, {
      toolCalls: turn.toolRecords.length ? turn.toolRecords : undefined,
      usage: turn.usage,
    });
    res.status(200).json({ reply: turn.reply, leadSaved: turn.leadSaved });
  } catch (err) {
    console.error("chat message failed:", err instanceof Error ? err.message : "unknown error");
    res.status(502).json({ error: "That message didn't send. Please try again.", reply: FALLBACK_REPLY });
  }
}
