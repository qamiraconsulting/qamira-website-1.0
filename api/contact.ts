import type { VercelRequest, VercelResponse } from "@vercel/node";
import { waitUntil } from "@vercel/functions";
import { Resend } from "resend";
import { sendMetaEvent } from "./_meta-capi.js";
import { checkRateLimit, clientIp, fingerprint } from "./_rate-limit.js";
import { alertOps } from "./_alert.js";

// Server-side only -- RESEND_API_KEY and CONTACT_FROM_EMAIL are set in the
// Vercel dashboard under Project Settings -> Environment Variables.
// CONTACT_FROM_EMAIL must be an address on a domain verified in Resend
// (e.g. a subdomain like contact@mail.qamiraconsulting.com, kept separate
// from the root domain so it doesn't collide with Google Workspace's own
// SPF/DKIM records).
//
// CONTACT_TO_EMAIL is duplicated from src/data/site.ts (rather than
// imported) because Vercel's function bundler only traces type-only
// imports out of src/ -- a runtime value import from there 404s in
// production with ERR_MODULE_NOT_FOUND. Keep this in sync with site.email.
const CONTACT_TO_EMAIL = "enquiries@qamiraconsulting.com";
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// A real enquiry does not fit in two words. The floor is low enough that a
// terse but genuine "Our ops team is drowning in manual quoting" clears it,
// and high enough to stop the form being used as a button -- mirrored in
// the minLength on the Contact page so the browser catches it first.
const MIN_MESSAGE_LENGTH = 30;
const MIN_NAME_LENGTH = 2;

function truncate(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Structured record -- appends the submission as a row in the "Contact Form
// Leads" tab of the same lead-tracking Google Sheet used by
// api/assessment.ts, via the same Apps Script webhook (routed by the
// "type" field). See api/assessment.ts for why this goes through Apps
// Script rather than the Sheets API directly.
async function appendContactRow(input: { name: string; email: string; company: string; message: string }): Promise<void> {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) return;

  const row = [new Date().toISOString(), input.name, input.email, input.company, input.message];

  const webhookRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: webhookSecret, type: "contact", row }),
  });
  if (!webhookRes.ok) {
    throw new Error(`Sheets webhook append failed: ${webhookRes.status} ${await webhookRes.text()}`);
  }
  const webhookData = (await webhookRes.json()) as { ok?: boolean; error?: string };
  if (!webhookData.ok) {
    throw new Error(`Sheets webhook rejected the row: ${webhookData.error ?? "unknown error"}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    res.status(500).json({ error: "Contact form is not configured yet. Please email us directly instead." });
    return;
  }

  const body = req.body as Record<string, unknown>;
  const name = truncate(body?.name, 200);
  const email = truncate(body?.email, 320);
  const company = truncate(body?.company, 200);
  const message = truncate(body?.message, 5000);
  const eventId = truncate(body?.eventId, 100);

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and a message are required." });
    return;
  }

  if (!EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: "Enter a valid email address." });
    return;
  }

  if (name.length < MIN_NAME_LENGTH) {
    res.status(400).json({ error: "Enter your full name." });
    return;
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    res.status(400).json({
      error: "Tell us a little more -- a sentence or two about your business and what you're trying to fix.",
    });
    return;
  }

  const verdict = checkRateLimit(
    [`contact:ip:${clientIp(req)}`, `contact:email:${email.toLowerCase()}`],
    fingerprint(email, message)
  );

  if (!verdict.ok) {
    res.setHeader("Retry-After", String(verdict.retryAfterSeconds));
    res.status(429).json({
      error:
        verdict.reason === "duplicate"
          ? "We've already got that one -- no need to send it twice. We'll reply shortly."
          : "That's several enquiries in a short space of time. We have them, and we'll be in touch.",
    });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: `Qamira Consulting Website <${process.env.CONTACT_FROM_EMAIL}>`,
      to: [CONTACT_TO_EMAIL],
      replyTo: `${name} <${email}>`,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\n\n${message}`,
    });

    if (error) {
      // The visitor is told to email us directly, so the lead has a path --
      // but only this alert says the form itself is broken.
      waitUntil(
        alertOps({
          key: "contact:send",
          subject: "Contact form could not send an enquiry",
          error,
          context: { Name: name, Email: email, Company: company, Message: message },
        })
      );
      res.status(502).json({ error: "We couldn't send that just now. Please try again shortly." });
      return;
    }

    res.status(200).json({ ok: true });

    // Runs after the response above is sent, so it's wrapped in waitUntil
    // -- Fluid Compute can otherwise freeze the function before this fetch
    // completes. See api/assessment.ts for the full story on why this
    // matters.
    // The alert promise is returned, not fired and forgotten, so it stays
    // inside the chain waitUntil is holding -- otherwise Fluid Compute can
    // freeze the function mid-alert, which is the very failure described
    // above.
    waitUntil(
      appendContactRow({ name, email, company, message }).catch((sheetErr) =>
        alertOps({
          key: "contact:sheets",
          subject: "Contact enquiry was emailed but not logged to the sheet",
          error: sheetErr,
          context: { Name: name, Email: email, Company: company, Message: message },
        })
      )
    );

    // Server-side copy of the conversion the browser pixel also reports.
    // Shares eventId with it so Meta counts one conversion, not two. Fails
    // soft -- the enquiry has already been emailed and answered by now.
    if (eventId) {
      waitUntil(
        sendMetaEvent(req, {
          eventName: "Contact",
          eventId,
          eventSourceUrl: (req.headers.referer as string | undefined) ?? "https://www.qamiraconsulting.com/contact",
          email,
          name,
          customData: { content_name: "Contact form" },
        }).catch((capiErr) =>
          alertOps({
            key: "contact:capi",
            subject: "Meta Conversions API rejected a Contact event",
            error: capiErr,
            context: { Email: email },
          })
        )
      );
    }
  } catch (err) {
    waitUntil(
      alertOps({
        key: "contact:send",
        subject: "Contact form threw while sending an enquiry",
        error: err,
        context: { Name: name, Email: email, Company: company, Message: message },
      })
    );
    res.status(502).json({ error: "We couldn't send that just now. Please try again shortly." });
  }
}
