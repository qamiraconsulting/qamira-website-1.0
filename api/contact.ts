import type { VercelRequest, VercelResponse } from "@vercel/node";
import { waitUntil } from "@vercel/functions";
import { Resend } from "resend";

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

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and a message are required." });
    return;
  }

  if (!EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: "Enter a valid email address." });
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
      console.error("Contact form send failed:", error);
      res.status(502).json({ error: "We couldn't send that just now. Please try again shortly." });
      return;
    }

    res.status(200).json({ ok: true });

    // Runs after the response above is sent, so it's wrapped in waitUntil
    // -- Fluid Compute can otherwise freeze the function before this fetch
    // completes. See api/assessment.ts for the full story on why this
    // matters.
    waitUntil(
      appendContactRow({ name, email, company, message }).catch((sheetErr) => {
        console.error("Contact sheet log failed:", sheetErr);
      })
    );
  } catch (err) {
    console.error("Contact form send failed:", err);
    res.status(502).json({ error: "We couldn't send that just now. Please try again shortly." });
  }
}
