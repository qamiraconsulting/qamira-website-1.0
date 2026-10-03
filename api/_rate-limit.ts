import type { VercelRequest } from "@vercel/node";

// Best-effort throttling for the public form endpoints.
//
// Deliberately NOT backed by Redis/KV: there is no shared store in this
// project yet, and standing one up for this is more operational surface
// than the problem justifies. State lives in the memory of a single warm
// Vercel function instance, which is enough for what this actually
// defends against -- one person hammering submit over seconds or minutes,
// whose requests land on the same warm instance. It will not stop a
// distributed flood, and is not meant to. Treat it as a civility filter,
// not a security control, and swap the Map for a shared store if real
// abuse ever turns up.
//
// Note that each api/*.ts route is its own function with its own memory,
// so this module shares code between them, never counts.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

type Hit = { at: number; fingerprint: string };

const hits = new Map<string, Hit[]>();

function prune(now: number): void {
  for (const [key, entries] of hits) {
    const kept = entries.filter((hit) => now - hit.at < WINDOW_MS);
    if (kept.length) hits.set(key, kept);
    else hits.delete(key);
  }
}

function retryIn(since: number, now: number): number {
  return Math.max(1, Math.ceil((WINDOW_MS - (now - since)) / 1000));
}

export function clientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = raw?.split(",")[0]?.trim();
  return first || (req.headers["x-real-ip"] as string | undefined) || "unknown";
}

// Cheap, stable, non-cryptographic. This only has to tell "the same text
// again" from "different text" -- it never guards anything, so djb2 is
// plenty and collisions are harmless.
export function fingerprint(...parts: string[]): string {
  const input = parts.join("\u0000").toLowerCase().replace(/\s+/g, " ").trim();
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash * 33) ^ input.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

export type RateLimitVerdict =
  | { ok: true }
  | { ok: false; reason: "duplicate" | "too_many"; retryAfterSeconds: number };

// `keys` are the independent buckets a submission counts against (IP and
// email, say) -- tripping any one of them rejects it.
export function checkRateLimit(keys: string[], submissionFingerprint: string): RateLimitVerdict {
  const now = Date.now();
  prune(now);

  const buckets = keys.filter(Boolean).map((key) => [key, hits.get(key) ?? []] as const);

  // Resending identical text is almost always someone who thinks the first
  // one did not go through, so it is worth a clearer answer than a generic
  // throttle -- and worth catching before the count check.
  for (const [, entries] of buckets) {
    const repeat = entries.find((hit) => hit.fingerprint === submissionFingerprint);
    if (repeat) return { ok: false, reason: "duplicate", retryAfterSeconds: retryIn(repeat.at, now) };
  }

  for (const [, entries] of buckets) {
    if (entries.length >= MAX_PER_WINDOW) {
      const oldest = entries.reduce((a, b) => (a.at < b.at ? a : b));
      return { ok: false, reason: "too_many", retryAfterSeconds: retryIn(oldest.at, now) };
    }
  }

  for (const [key] of buckets) {
    hits.set(key, [...(hits.get(key) ?? []), { at: now, fingerprint: submissionFingerprint }]);
  }

  return { ok: true };
}
