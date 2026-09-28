// Meta Conversions API -- server-side conversion events.
//
// Sent ALONGSIDE the browser pixel (src/lib/metaPixel.ts), not instead of
// it. Browser pixels lose a meaningful share of events to ad blockers,
// ITP/ETP and iOS; the server copy always lands. The two are reconciled by
// `event_id`: when the pixel and this both report the same conversion with
// the same id, Meta keeps one. Get that wrong and every conversion counts
// twice, which silently halves your reported cost-per-lead -- worse than
// having no Conversions API at all, because the number looks better.
//
// Underscore-prefixed so Vercel does not expose this as a route. It lives
// under api/ rather than src/ because the function bundler only traces
// TYPE-ONLY imports out of src/ -- a runtime value import from there 404s
// in production with ERR_MODULE_NOT_FOUND (see api/contact.ts).

import { createHash } from "node:crypto";
import type { VercelRequest } from "@vercel/node";

/**
 * Mirrors PIXEL_ID in src/lib/metaPixel.ts. Duplicated for the bundler
 * reason above -- keep the two in sync.
 */
const PIXEL_ID = "2006622356723246";

/**
 * Graph API version. Verified live at the time of writing: v26.0 resolved,
 * v27.0 did not exist yet. Meta retires a version roughly two years after
 * release, so this needs bumping periodically -- a stale version fails
 * closed (events rejected), and the only symptom is conversions quietly
 * going missing, so check it if reported numbers ever fall off a cliff.
 */
const GRAPH_API_VERSION = "v26.0";

const ENDPOINT = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events`;

/** Meta requires SHA-256 hex of the normalised value. Never send raw PII. */
function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashEmail(email: string): string | undefined {
  const normalised = email.trim().toLowerCase();
  return normalised ? hash(normalised) : undefined;
}

/**
 * Digits only. Meta matches best with a country code included, but the
 * assessment form takes a free-text phone field, so a number typed as a
 * bare local one ("0412 345 678") simply matches less well. That is a
 * degraded match, not an error -- worth revisiting if phone match rate
 * turns out to matter, by collecting the country code explicitly.
 */
function hashPhone(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  return digits ? hash(digits) : undefined;
}

function hashName(name: string): string | undefined {
  const normalised = name.trim().toLowerCase().replace(/[^a-z\u00C0-\u024F\s-]/g, "");
  return normalised ? hash(normalised) : undefined;
}

/** Splits a single free-text name field into Meta's fn / ln. */
function splitName(fullName: string): { fn?: string; ln?: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { fn: hashName(parts[0]) };
  return { fn: hashName(parts[0]), ln: hashName(parts.slice(1).join(" ")) };
}

function readCookie(req: VercelRequest, name: string): string | undefined {
  const header = req.headers.cookie;
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

/**
 * The visitor's IP as Vercel saw it. x-forwarded-for is a comma-separated
 * chain; the client is the first entry.
 */
function clientIp(req: VercelRequest): string | undefined {
  const forwarded = req.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return raw?.split(",")[0]?.trim() || undefined;
}

export type MetaEventInput = {
  /** Must match the event name the browser pixel fired. */
  eventName: "Lead" | "Contact";
  /** Must match the `eventID` passed to fbq for the same conversion. */
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  phone?: string;
  name?: string;
  customData?: Record<string, unknown>;
};

/**
 * Fire one server-side conversion event.
 *
 * Fails soft on purpose: a Conversions API outage must never turn a
 * successful lead into a failed form submission. Callers wrap this in
 * waitUntil() so it runs after the response is already sent.
 */
export async function sendMetaEvent(req: VercelRequest, input: MetaEventInput): Promise<void> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) return;

  const { fn, ln } = input.name ? splitName(input.name) : {};

  // Meta expects each user_data identifier as an array of hashes. `fbp`
  // and `fbc` come straight off the first-party cookies the pixel set --
  // available here because /api/* is same-origin with the site, so the
  // browser sends them with the form POST. They are the strongest match
  // signal available, better than any hashed PII.
  const userData: Record<string, unknown> = {
    client_ip_address: clientIp(req),
    client_user_agent: req.headers["user-agent"],
    fbp: readCookie(req, "_fbp"),
    fbc: readCookie(req, "_fbc"),
  };

  const em = input.email ? hashEmail(input.email) : undefined;
  const ph = input.phone ? hashPhone(input.phone) : undefined;
  if (em) userData.em = [em];
  if (ph) userData.ph = [ph];
  if (fn) userData.fn = [fn];
  if (ln) userData.ln = [ln];

  for (const key of Object.keys(userData)) {
    if (userData[key] === undefined) delete userData[key];
  }

  const payload = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        ...(input.customData ? { custom_data: input.customData } : {}),
      },
    ],
    // In the body rather than the query string, so the token never lands
    // in a URL that could be logged by an intermediary.
    access_token: accessToken,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Meta CAPI ${input.eventName} failed: ${res.status} ${await res.text()}`);
  }
}
