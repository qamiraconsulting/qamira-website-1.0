import type { VercelRequest, VercelResponse } from "@vercel/node";
import { waitUntil } from "@vercel/functions";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { checkRateLimit, clientIp, fingerprint } from "./_rate-limit.js";
import { alertOps } from "./_alert.js";

// Job applications from /careers/<slug> (src/pages/JobDetail.tsx).
//
// Two records per application, and either one is enough to keep it:
//   1. A row in Neon (DATABASE_URL) -- the structured, filterable record,
//      with the résumé stored alongside. Schema: db/applicants.sql.
//   2. An email to the careers inbox with the résumé attached -- what the
//      team actually screens from day to day.
// The candidate only sees a failure if BOTH fail. If one fails, the other
// still holds the application, and alertOps says which one broke.
//
// Server-side env, set in the Vercel dashboard:
//   DATABASE_URL         Neon pooled connection string (SECRET)
//   RESEND_API_KEY       already set for api/contact.ts
//   CAREERS_FROM_EMAIL   optional; e.g. careers@mail.qamiraconsulting.com.
//                        Falls back to CONTACT_FROM_EMAIL.

// Duplicated from src/data/content/jobs.ts rather than imported -- see the
// note in api/contact.ts on why runtime imports from src/ 404 on Vercel.
// Keep in sync with the open roles there.
const OPEN_ROLES: Record<string, string> = {
  "sales-executive-australia": "Sales Executive (Australian Market)",
};

const CAREERS_TO_EMAIL = "careers@qamiraconsulting.com";
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Vercel rejects request bodies over 4.5 MB, and base64 inflates a file by
// a third, so 3 MB of résumé is the most that reliably fits alongside the
// form fields. Mirrored in MAX_RESUME_BYTES on the page.
const MAX_RESUME_BYTES = 3 * 1024 * 1024;

const RESUME_TYPES = {
  pdf: { contentType: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  docx: {
    contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    magic: [0x50, 0x4b, 0x03, 0x04], // zip
  },
  doc: { contentType: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] }, // OLE2
} as const;

type ResumeKind = keyof typeof RESUME_TYPES;

function truncate(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Salary arrives as a plain number of lakh per year (the form uses a number
// input). Anything else, or a value outside 0-99.99, is rejected rather than
// guessed at, so the column stays sortable.
function parseLpa(value: unknown): number | null {
  const text = typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
  if (!/^\d{1,2}(\.\d{1,2})?$/.test(text)) return null;
  const n = Number(text);
  return n > 0 ? n : null;
}

// The extension picks the expected type and the file's own first bytes
// have to agree -- a renamed .exe doesn't get through as a "PDF".
function detectResume(filename: string, bytes: Buffer): ResumeKind | null {
  const ext = filename.toLowerCase().split(".").pop() as string;
  if (!(ext in RESUME_TYPES)) return null;
  const kind = ext as ResumeKind;
  const { magic } = RESUME_TYPES[kind];
  return magic.every((byte, i) => bytes[i] === byte) ? kind : null;
}

// Filenames end up in an email attachment header and a database row --
// keep them to a safe, readable subset.
function safeFilename(name: string, kind: ResumeKind): string {
  const stem = name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9 _.-]+/g, "").trim().slice(0, 80) || "resume";
  return `${stem}.${kind}`;
}

type Application = {
  roleSlug: string;
  roleTitle: string;
  fullName: string;
  email: string;
  phone: string;
  puneArea: string;
  totalExperience: string;
  voiceExperience: string;
  currentRole: string;
  currentCtcLpa: number | null;
  expectedCtcLpa: number;
  noticePeriod: string;
  shiftOk: boolean;
  setupOk: boolean;
  linkedinUrl: string;
  note: string;
  source: string;
  srcParam: string;
  utmMedium: string;
  utmCampaign: string;
};

type Resume = { filename: string; contentType: string; bytes: Buffer };

async function insertApplicant(app: Application, resume: Resume): Promise<number> {
  const sql = neon(process.env.DATABASE_URL as string);
  // One statement, so the applicant row and its résumé land together or
  // not at all -- no orphaned rows if the connection drops halfway.
  const rows = await sql`
    WITH a AS (
      INSERT INTO applicants (
        role_slug, full_name, email, phone, pune_area, total_experience, voice_experience,
        current_job, current_ctc_lpa, expected_ctc_lpa, notice_period, shift_ok, setup_ok,
        linkedin_url, note, source, src_param, utm_medium, utm_campaign
      ) VALUES (
        ${app.roleSlug}, ${app.fullName}, ${app.email}, ${app.phone}, ${app.puneArea},
        ${app.totalExperience}, ${app.voiceExperience}, ${app.currentRole}, ${app.currentCtcLpa},
        ${app.expectedCtcLpa}, ${app.noticePeriod}, ${app.shiftOk}, ${app.setupOk},
        ${app.linkedinUrl || null}, ${app.note || null}, ${app.source}, ${app.srcParam || null},
        ${app.utmMedium || null}, ${app.utmCampaign || null}
      )
      RETURNING id
    )
    INSERT INTO applicant_resumes (applicant_id, filename, content_type, size_bytes, data)
    SELECT id, ${resume.filename}, ${resume.contentType}, ${resume.bytes.length}, ${`\\x${resume.bytes.toString("hex")}`}::bytea
    FROM a
    RETURNING applicant_id
  `;
  return Number(rows[0].applicant_id);
}

function summaryLines(app: Application, applicantId: number | null): string {
  return [
    `Role: ${app.roleTitle}`,
    `Name: ${app.fullName}`,
    `Email: ${app.email}`,
    `Phone / WhatsApp: ${app.phone}`,
    `Lives in: ${app.puneArea}`,
    `Total experience: ${app.totalExperience}`,
    `Voice / telesales experience: ${app.voiceExperience}`,
    `Current or last role: ${app.currentRole}`,
    `Current CTC: ${app.currentCtcLpa === null ? "-" : `${app.currentCtcLpa} LPA`}`,
    `Expected CTC: ${app.expectedCtcLpa} LPA`,
    `Notice period: ${app.noticePeriod}`,
    `Can work the shift: ${app.shiftOk ? "Yes" : "NO"}`,
    `Broadband + quiet workspace: ${app.setupOk ? "Yes" : "NO"}`,
    `LinkedIn: ${app.linkedinUrl || "-"}`,
    `Saw the role on: ${app.source}`,
    `Tracking link: ${[app.srcParam, app.utmMedium, app.utmCampaign].filter(Boolean).join(" / ") || "-"}`,
    `Database record: ${applicantId === null ? "NOT SAVED (see the alert email)" : `applicants.id = ${applicantId}`}`,
    "",
    app.note ? `Note from the candidate:\n${app.note}` : "No note from the candidate.",
  ].join("\n");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const hasDb = Boolean(process.env.DATABASE_URL);
  const hasEmail = Boolean(process.env.RESEND_API_KEY && (process.env.CAREERS_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL));
  if (!hasDb && !hasEmail) {
    res.status(500).json({ error: "Applications aren't open on the website yet." });
    return;
  }

  const body = req.body as Record<string, unknown>;

  // Honeypot: a field real visitors never see. Bots that fill every input
  // get a normal-looking success and nothing is stored or sent.
  if (truncate(body?.website, 200)) {
    res.status(200).json({ ok: true });
    return;
  }

  const roleSlug = truncate(body?.roleSlug, 100);
  const roleTitle = OPEN_ROLES[roleSlug];
  if (!roleTitle) {
    res.status(400).json({ error: "This role is no longer open." });
    return;
  }

  const app: Application = {
    roleSlug,
    roleTitle,
    fullName: truncate(body?.fullName, 200),
    email: truncate(body?.email, 320),
    phone: truncate(body?.phone, 40),
    puneArea: truncate(body?.puneArea, 120),
    totalExperience: truncate(body?.totalExperience, 40),
    voiceExperience: truncate(body?.voiceExperience, 40),
    currentRole: truncate(body?.currentRole, 300),
    currentCtcLpa: parseLpa(body?.currentCtc),
    expectedCtcLpa: parseLpa(body?.expectedCtc) ?? NaN,
    noticePeriod: truncate(body?.noticePeriod, 40),
    shiftOk: body?.shiftOk === "yes",
    setupOk: body?.setupOk === "yes",
    linkedinUrl: truncate(body?.linkedinUrl, 300),
    note: truncate(body?.note, 2000),
    source: truncate(body?.source, 60),
    srcParam: truncate(body?.srcParam, 60),
    utmMedium: truncate(body?.utmMedium, 60),
    utmCampaign: truncate(body?.utmCampaign, 100),
  };

  const required = [
    app.fullName,
    app.email,
    app.phone,
    app.puneArea,
    app.totalExperience,
    app.voiceExperience,
    app.currentRole,
    app.noticePeriod,
    app.source,
  ];
  if (required.some((value) => !value) || (body?.shiftOk !== "yes" && body?.shiftOk !== "no")) {
    res.status(400).json({ error: "Please fill in every required field." });
    return;
  }
  if (!Number.isFinite(app.expectedCtcLpa) || app.expectedCtcLpa <= 0) {
    res.status(400).json({ error: "Enter your expected salary as a number of lakh per year, e.g. 4.5." });
    return;
  }
  if (body?.currentCtc && app.currentCtcLpa === null) {
    res.status(400).json({ error: "Enter your current salary as a number of lakh per year, e.g. 3.2, or leave it blank." });
    return;
  }
  if (!EMAIL_PATTERN.test(app.email)) {
    res.status(400).json({ error: "Enter a valid email address." });
    return;
  }
  if (app.phone.replace(/\D/g, "").length < 10) {
    res.status(400).json({ error: "Enter a phone number we can reach you on, with at least 10 digits." });
    return;
  }
  if (body?.consent !== "yes") {
    res.status(400).json({ error: "Please confirm we can keep your application on file." });
    return;
  }
  if (app.linkedinUrl && !/^https?:\/\//i.test(app.linkedinUrl)) {
    app.linkedinUrl = `https://${app.linkedinUrl}`;
  }

  const rawResume = body?.resume as { name?: unknown; data?: unknown } | undefined;
  const resumeName = truncate(rawResume?.name, 200);
  const resumeData = typeof rawResume?.data === "string" ? rawResume.data : "";
  if (!resumeName || !resumeData) {
    res.status(400).json({ error: "Please attach your résumé." });
    return;
  }
  const bytes = Buffer.from(resumeData, "base64");
  if (bytes.length > MAX_RESUME_BYTES) {
    res.status(413).json({ error: "That résumé is over 3 MB. Please attach a smaller PDF or Word file." });
    return;
  }
  const kind = detectResume(resumeName, bytes);
  if (!kind) {
    res.status(400).json({ error: "Please attach your résumé as a PDF or Word file (.pdf, .doc or .docx)." });
    return;
  }
  const resume: Resume = { filename: safeFilename(resumeName, kind), contentType: RESUME_TYPES[kind].contentType, bytes };

  const verdict = checkRateLimit(
    [`apply:ip:${clientIp(req)}`, `apply:email:${app.email.toLowerCase()}`],
    fingerprint(app.email, roleSlug)
  );
  if (!verdict.ok) {
    res.setHeader("Retry-After", String(verdict.retryAfterSeconds));
    res.status(429).json({
      error:
        verdict.reason === "duplicate"
          ? "We already have your application for this role -- no need to send it again."
          : "That's several applications in a short space of time. We have them, and we'll be in touch.",
    });
    return;
  }

  const alertContext = { Role: roleTitle, Name: app.fullName, Email: app.email, Phone: app.phone, Source: app.source };

  let applicantId: number | null = null;
  let dbError: unknown = hasDb ? null : new Error("DATABASE_URL is not set");
  if (hasDb) {
    try {
      applicantId = await insertApplicant(app, resume);
    } catch (err) {
      dbError = err;
    }
  }

  const resend = hasEmail ? new Resend(process.env.RESEND_API_KEY) : null;
  const fromAddress = process.env.CAREERS_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL;
  let emailError: unknown = hasEmail ? null : new Error("RESEND_API_KEY or a from address is not set");
  if (resend) {
    try {
      const { error } = await resend.emails.send({
        from: `Qamira Careers <${fromAddress}>`,
        to: [CAREERS_TO_EMAIL],
        replyTo: `${app.fullName} <${app.email}>`,
        subject: `[Applicant] ${app.fullName} | voice exp: ${app.voiceExperience} | via ${app.source}${app.shiftOk ? "" : " | CAN'T DO SHIFT"}`,
        text: summaryLines(app, applicantId),
        attachments: [{ filename: resume.filename, content: resume.bytes }],
      });
      if (error) emailError = error;
    } catch (err) {
      emailError = err;
    }
  }

  if (dbError && emailError) {
    waitUntil(
      alertOps({
        key: "apply:both",
        subject: "A job application could not be saved OR emailed",
        error: { database: String(dbError), email: String(emailError) },
        context: alertContext,
      })
    );
    res.status(502).json({ error: "We couldn't submit your application just now. Please try again shortly." });
    return;
  }

  res.status(200).json({ ok: true });

  // Everything below runs after the candidate has their answer, inside
  // waitUntil so Fluid Compute doesn't freeze it mid-flight (see
  // api/contact.ts).
  if (dbError && hasDb) {
    waitUntil(
      alertOps({ key: "apply:db", subject: "A job application was emailed but not saved to Neon", error: dbError, context: alertContext })
    );
  }
  if (emailError && hasEmail) {
    waitUntil(
      alertOps({
        key: "apply:email",
        subject: "A job application was saved to Neon but not emailed to careers",
        error: emailError,
        context: { ...alertContext, "Neon id": String(applicantId) },
      })
    );
  }

  if (resend) {
    waitUntil(
      resend.emails
        .send({
          from: `Qamira Careers <${fromAddress}>`,
          to: [app.email],
          replyTo: CAREERS_TO_EMAIL,
          subject: `We've received your application: ${roleTitle}`,
          text: [
            `Hi ${app.fullName.split(" ")[0]},`,
            "",
            `Thanks for applying for the ${roleTitle} role at Qamira Consulting. Your application and résumé have reached us.`,
            "",
            "We read every application. If your profile is a match, we'll contact you on WhatsApp or by phone to set up a short screening call, usually within a week.",
            "",
            `If anything changes in the meantime, reply to this email or write to ${CAREERS_TO_EMAIL}.`,
            "",
            "Team Qamira",
            "www.qamiraconsulting.com",
          ].join("\n"),
        })
        .then(({ error }) => {
          if (error) throw error;
        })
        .catch((ackErr) =>
          alertOps({ key: "apply:ack", subject: "Applicant confirmation email failed", error: ackErr, context: alertContext })
        )
    );
  }
}
