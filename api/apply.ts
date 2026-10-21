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
// Keep in sync with the open roles there: a role missing here is refused as
// "no longer open", and the `form` flags and question ids must match the
// role's `form` block in jobs.ts.
//
// Only fields a role's form actually asks are required here. Everything a
// role doesn't ask is stored as NULL (those columns are nullable).
type RoleConfig = {
  title: string;
  /** Short label for the email subject, so two open roles can be told apart. */
  shortTitle: string;
  askVoiceExperience: boolean;
  askShift: boolean;
  askSetup: boolean;
  /** Required written answers, stored in applicants.answers with the question text. */
  questions: { id: string; label: string }[];
};

const ROLES: Record<string, RoleConfig> = {
  "sales-executive-australia": {
    title: "Sales Executive (Australian Market)",
    shortTitle: "Sales Exec AU",
    askVoiceExperience: true,
    askShift: true,
    askSetup: true,
    questions: [],
  },
  "business-development-manager": {
    title: "Business Development Manager",
    shortTitle: "BDM",
    askVoiceExperience: false,
    askShift: false,
    askSetup: false,
    questions: [
      {
        id: "best-client-won",
        label: "Tell us about the best client you won yourself. How did you find them, and how did you close them?",
      },
      {
        id: "cold-opener",
        label:
          "Pick any Indian business with a weak website or social media. In five lines, what would you say to its owner to get a twenty-minute call?",
      },
      {
        id: "selling-lesson",
        label: "What is the most useful thing you have learned about selling in the last year?",
      },
    ],
  },
};

// A real answer is more than a word or two. Mirrored in the textarea
// minLength on the page so the browser catches it first.
const MIN_ANSWER_LENGTH = 30;
const MAX_ANSWER_LENGTH = 2000;

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
  /** null when the role's form doesn't ask it. */
  voiceExperience: string | null;
  currentRole: string;
  currentCtcLpa: number | null;
  expectedCtcLpa: number;
  noticePeriod: string;
  /** null when the role's form doesn't ask it. */
  shiftOk: boolean | null;
  /** null when the role's form doesn't ask it. */
  setupOk: boolean | null;
  /** The role's written questions with the candidate's answers; empty if it has none. */
  answers: { id: string; question: string; answer: string }[];
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
        linkedin_url, note, source, src_param, utm_medium, utm_campaign, answers
      ) VALUES (
        ${app.roleSlug}, ${app.fullName}, ${app.email}, ${app.phone}, ${app.puneArea},
        ${app.totalExperience}, ${app.voiceExperience}, ${app.currentRole}, ${app.currentCtcLpa},
        ${app.expectedCtcLpa}, ${app.noticePeriod}, ${app.shiftOk}, ${app.setupOk},
        ${app.linkedinUrl || null}, ${app.note || null}, ${app.source}, ${app.srcParam || null},
        ${app.utmMedium || null}, ${app.utmCampaign || null},
        ${app.answers.length ? JSON.stringify(app.answers) : null}::jsonb
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
  const lines = [
    `Role: ${app.roleTitle}`,
    `Name: ${app.fullName}`,
    `Email: ${app.email}`,
    `Phone / WhatsApp: ${app.phone}`,
    `Lives in: ${app.puneArea}`,
    `Total experience: ${app.totalExperience}`,
  ];
  if (app.voiceExperience !== null) lines.push(`Voice / telesales experience: ${app.voiceExperience}`);
  lines.push(
    `Current or last role: ${app.currentRole}`,
    `Current CTC: ${app.currentCtcLpa === null ? "-" : `${app.currentCtcLpa} LPA`}`,
    `Expected CTC: ${app.expectedCtcLpa} LPA`,
    `Notice period: ${app.noticePeriod}`
  );
  if (app.shiftOk !== null) lines.push(`Can work the shift: ${app.shiftOk ? "Yes" : "NO"}`);
  if (app.setupOk !== null) lines.push(`Broadband + quiet workspace: ${app.setupOk ? "Yes" : "NO"}`);
  lines.push(
    `LinkedIn: ${app.linkedinUrl || "-"}`,
    `Saw the role on: ${app.source}`,
    `Tracking link: ${[app.srcParam, app.utmMedium, app.utmCampaign].filter(Boolean).join(" / ") || "-"}`,
    `Database record: ${applicantId === null ? "NOT SAVED (see the alert email)" : `applicants.id = ${applicantId}`}`
  );
  for (const item of app.answers) {
    lines.push("", `Q: ${item.question}`, `A: ${item.answer}`);
  }
  lines.push("", app.note ? `Note from the candidate:\n${app.note}` : "No note from the candidate.");
  return lines.join("\n");
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
  const role = ROLES[roleSlug];
  if (!role) {
    res.status(400).json({ error: "This role is no longer open." });
    return;
  }
  const roleTitle = role.title;

  // Written answers arrive as { <question id>: text }. Only the role's own
  // questions are kept, with the question text stored beside each answer so
  // the database record stays readable if the wording changes later.
  const rawAnswers = (body?.answers ?? {}) as Record<string, unknown>;
  const answers = role.questions.map((q) => ({
    id: q.id,
    question: q.label,
    answer: truncate(rawAnswers[q.id], MAX_ANSWER_LENGTH),
  }));

  const app: Application = {
    roleSlug,
    roleTitle,
    fullName: truncate(body?.fullName, 200),
    email: truncate(body?.email, 320),
    phone: truncate(body?.phone, 40),
    puneArea: truncate(body?.puneArea, 120),
    totalExperience: truncate(body?.totalExperience, 40),
    voiceExperience: role.askVoiceExperience ? truncate(body?.voiceExperience, 40) : null,
    currentRole: truncate(body?.currentRole, 300),
    currentCtcLpa: parseLpa(body?.currentCtc),
    expectedCtcLpa: parseLpa(body?.expectedCtc) ?? NaN,
    noticePeriod: truncate(body?.noticePeriod, 40),
    shiftOk: role.askShift ? body?.shiftOk === "yes" : null,
    setupOk: role.askSetup ? body?.setupOk === "yes" : null,
    answers,
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
    ...(role.askVoiceExperience ? [app.voiceExperience] : []),
    app.currentRole,
    app.noticePeriod,
    app.source,
  ];
  if (required.some((value) => !value) || (role.askShift && body?.shiftOk !== "yes" && body?.shiftOk !== "no")) {
    res.status(400).json({ error: "Please fill in every required field." });
    return;
  }
  if (answers.some((item) => item.answer.length < MIN_ANSWER_LENGTH)) {
    res.status(400).json({
      error: `Please answer each of the written questions in a sentence or two (at least ${MIN_ANSWER_LENGTH} characters).`,
    });
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
        subject: `[Applicant: ${role.shortTitle}] ${app.fullName} | ${
          app.voiceExperience !== null ? `voice exp: ${app.voiceExperience}` : `exp: ${app.totalExperience}`
        } | via ${app.source}${app.shiftOk === false ? " | CAN'T DO SHIFT" : ""}`,
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
