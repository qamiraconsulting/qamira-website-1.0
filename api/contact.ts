import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { site } from "../src/data/site";

// Server-side only -- SMTP_USER and SMTP_APP_PASSWORD are the Google
// Workspace mailbox and app password this form sends through. Set in the
// Vercel dashboard under Project Settings -> Environment Variables.
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function truncate(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_APP_PASSWORD) {
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

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Qamira Consulting Website" <${process.env.SMTP_USER}>`,
      to: site.email,
      replyTo: `"${name}" <${email}>`,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\n\n${message}`,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    res.status(502).json({ error: "We couldn't send that just now. Please try again shortly." });
  }
}
