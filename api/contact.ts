import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { site } from "../src/data/site";

// Server-side only -- RESEND_API_KEY and CONTACT_FROM_EMAIL are set in the
// Vercel dashboard under Project Settings -> Environment Variables.
// CONTACT_FROM_EMAIL must be an address on a domain verified in Resend
// (e.g. a subdomain like contact@mail.qamiraconsulting.com, kept separate
// from the root domain so it doesn't collide with Google Workspace's own
// SPF/DKIM records).
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function truncate(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
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
      to: [site.email],
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
  } catch (err) {
    console.error("Contact form send failed:", err);
    res.status(502).json({ error: "We couldn't send that just now. Please try again shortly." });
  }
}
