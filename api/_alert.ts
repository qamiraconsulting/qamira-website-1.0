import { Resend } from "resend";

// Failure alerts for the lead-capture path.
//
// The background work in these handlers -- the Sheets append, the Meta
// Conversions API call, the prospect's own report emails -- all runs after
// the response has gone out and all of it fails soft by design, so that a
// broken side effect never costs the visitor their submission. The cost of
// that choice is silence: a rotated secret or a dead webhook leaves the
// form looking perfectly healthy while leads quietly stop being recorded.
// This turns that silence into an email.
//
// Deliberately best-effort. It never throws, because every call site is
// already inside a catch block, and it never retries.
const ALERT_TO = "enquiries@qamiraconsulting.com";

// One alert per key per window. A broken dependency fails on every single
// submission, and an inbox full of identical alerts is an inbox nobody
// reads. Suppressed repeats still reach the function logs. Same in-memory
// caveat as api/_rate-limit.ts: this lives in one warm instance, so the
// worst case is a few duplicate alerts rather than none.
const REPEAT_WINDOW_MS = 30 * 60 * 1000;

const lastAlertAt = new Map<string, number>();

function describe(error: unknown): string {
  try {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}${error.stack ? `\n\n${error.stack}` : ""}`;
    }
    return typeof error === "string" ? error : JSON.stringify(error, null, 2);
  } catch {
    // A circular or otherwise unserialisable value is not worth losing the
    // whole alert over.
    return String(error);
  }
}

export async function alertOps(input: {
  // Dedupe bucket -- one per failure site, e.g. "contact:sheets".
  key: string;
  subject: string;
  error: unknown;
  // Whatever is needed to recover the lead by hand. When the Sheets append
  // is what failed, this alert is the only remaining record of the row, so
  // it carries the submission rather than just the stack trace.
  context?: Record<string, string>;
}): Promise<void> {
  console.error(`[alert:${input.key}] ${input.subject}:`, input.error);

  const now = Date.now();
  const last = lastAlertAt.get(input.key);
  if (last !== undefined && now - last < REPEAT_WINDOW_MS) return;

  const from = process.env.CONTACT_FROM_EMAIL;
  if (!process.env.RESEND_API_KEY || !from) return;

  // Stamped before the send, not after: if the alert itself fails, that
  // must not leave the window open for every subsequent request to retry.
  lastAlertAt.set(input.key, now);

  const contextLines = Object.entries(input.context ?? {})
    .map(([label, value]) => `${label}: ${value || "-"}`)
    .join("\n");

  try {
    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: `Qamira Site Alerts <${from}>`,
      to: [ALERT_TO],
      subject: `[site alert] ${input.subject}`,
      text: [
        input.subject,
        `Time: ${new Date(now).toISOString()}`,
        contextLines ? `\n--- Submission ---\n${contextLines}` : "",
        `\n--- Error ---\n${describe(input.error)}`,
        `\nFurther "${input.key}" alerts are suppressed for ${REPEAT_WINDOW_MS / 60000} minutes.`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (alertErr) {
    // There is nothing left to escalate to -- the alert channel is the
    // thing that just failed. The log is the last stop.
    console.error(`[alert:${input.key}] alert send failed:`, alertErr);
  }
}
