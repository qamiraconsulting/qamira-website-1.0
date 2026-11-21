import { Resend } from "resend";
import type { LeadInput, StoredMessage } from "./store.js";

// When a visitor leaves their details with Qami: the same two places a
// contact-form enquiry goes -- an email to the enquiries inbox (with the
// whole chat, so the team has the context) and a row in the "Contact Form
// Leads" tab of the lead sheet.

// Duplicated from src/data/site.ts for the reason given in api/contact.ts.
const TO_EMAIL = "enquiries@qamiraconsulting.com";

export async function emailLead(lead: LeadInput, transcript: StoredMessage[]): Promise<void> {
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    throw new Error("RESEND_API_KEY or CONTACT_FROM_EMAIL is not set");
  }
  const chat = transcript.map((m) => `${m.role === "user" ? "Visitor" : "Qami"}: ${m.content}`).join("\n\n");
  const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: `Qami (website chat) <${process.env.CONTACT_FROM_EMAIL}>`,
    to: [TO_EMAIL],
    replyTo: `${lead.name} <${lead.email}>`,
    subject: `New chat lead from ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone || "-"}`,
      `Company: ${lead.company || "-"}`,
      `Country: ${lead.country || "-"}`,
      `Services of interest: ${lead.services.length ? lead.services.join(", ") : "-"}`,
      "",
      `What they need: ${lead.summary}`,
      "",
      "---- Full chat ----",
      "",
      chat,
    ].join("\n"),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

export async function appendLeadRow(lead: LeadInput): Promise<void> {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) return;

  const message = [
    `[Qami chat] ${lead.summary}`,
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.country ? `Country: ${lead.country}` : "",
    lead.services.length ? `Services: ${lead.services.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join(" | ");

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: webhookSecret,
      type: "contact",
      row: [new Date().toISOString(), lead.name, lead.email, lead.company ?? "", message],
    }),
  });
  if (!res.ok) throw new Error(`Sheets webhook append failed: ${res.status}`);
  const data = (await res.json()) as { ok?: boolean; error?: string };
  if (!data.ok) throw new Error(`Sheets webhook rejected the row: ${data.error ?? "unknown error"}`);
}
