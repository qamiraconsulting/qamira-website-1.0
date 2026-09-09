import type { VercelRequest, VercelResponse } from "@vercel/node";
import { waitUntil } from "@vercel/functions";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import type { AssessmentRequest, AssessmentReport } from "../src/lib/assessmentTypes";

// Server-side only -- never exposed to the browser. Set in the Vercel
// dashboard under Project Settings -> Environment Variables.
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Reuses the same Resend project as api/contact.ts (RESEND_API_KEY,
// CONTACT_FROM_EMAIL) to notify the team of a completed assessment --
// duplicated rather than imported since these are two independent
// Vercel functions. See api/contact.ts for the domain/SPF-DKIM rationale.
const LEAD_NOTIFICATION_EMAIL = "enquiries@qamiraconsulting.com";
const SITE_URL = "https://www.qamiraconsulting.com";

// Replies to anything the prospect receives should reach a human, not the
// no-reply sending identity.
const REPLY_TO = LEAD_NOTIFICATION_EMAIL;

// There is no subscription store, so unsubscribe is a mailto rather than a
// one-click endpoint. It is honest and it works -- but it means an opt-out
// has to be actioned by hand: cancel that lead's scheduled sends with the
// email ids in the internal notification. Worth replacing with a real
// preference store once there is a CRM to hold one.
const UNSUBSCRIBE_MAILTO = `mailto:${LEAD_NOTIFICATION_EMAIL}?subject=Unsubscribe`;

// --- Brand tokens, mirroring tailwind.config.ts -------------------------
// Email clients strip <style> blocks and never load webfonts, so these are
// applied inline and the type falls back down the site's own display stack
// (Fraunces -> Iowan Old Style -> Georgia).
const INK = "#14182a";
const DIM = "#4b4f60";
const BRASS = "#b8863a";
const PARCHMENT = "#fbfaf7";
const PARCHMENT_2 = "#f3f0e8";
const RULE = "#ded8c8";
const SERIF = "'Iowan Old Style', Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

// Vercel's function bundler only traces TYPE-ONLY imports out of src/ from
// api/*.ts -- a runtime value import 404s in production
// (ERR_MODULE_NOT_FOUND). These mirror src/lib/assessmentTypes.ts and
// src/data/content/methodology.ts and must be hand-synced if those change.
const KNOWN_DOMAINS = [
  "Strategy",
  "Financial Performance",
  "Process",
  "People",
  "Data",
  "Technology",
  "Customer",
  "Governance",
] as const;

const MATURITY_TITLES: Record<number, string> = { 1: "Ad Hoc", 2: "Emerging", 3: "Defined", 4: "Managed", 5: "Optimized" };

const REPORT_TOOL = {
  name: "submit_opportunity_report",
  description: "Submit the completed AI Opportunity Report for this client's business assessment.",
  input_schema: {
    type: "object" as const,
    properties: {
      summary: { type: "string", description: "2-3 sentence executive summary of the opportunity." },
      maturitySnapshot: { type: "string", description: "A brief, evidence-based read on where this business stands today, grounded only in what was submitted." },
      domainSnapshot: {
        type: "array",
        minItems: 8,
        maxItems: 8,
        items: {
          type: "object",
          properties: {
            domain: { type: "string", enum: KNOWN_DOMAINS as unknown as string[] },
            selfRating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string", description: "1-2 sentence grounded read on this domain, referencing the submitted rating and note -- never invented or generic." },
          },
          required: ["domain", "selfRating", "comment"],
        },
      },
      recommendations: {
        type: "array",
        minItems: 3,
        maxItems: 5,
        items: {
          type: "object",
          properties: {
            category: { type: "string", enum: ["GTM Optimization", "Customer Churn Prediction", "Process Automation", "Analytics & Reporting", "Other"] },
            title: { type: "string" },
            description: { type: "string" },
            estimatedImpact: { type: "string", description: "A directional, caveated estimate, e.g. '10-15% cycle-time reduction' -- never a guaranteed figure." },
          },
          required: ["category", "title", "description", "estimatedImpact"],
        },
      },
      roadmap: {
        type: "array",
        minItems: 3,
        maxItems: 4,
        items: {
          type: "object",
          properties: {
            phase: { type: "string" },
            timeframe: { type: "string" },
            focus: { type: "string" },
          },
          required: ["phase", "timeframe", "focus"],
        },
      },
      roiEstimate: { type: "string", description: "A short, explicitly directional paragraph -- not a guarantee -- framing the rough ROI logic." },
    },
    required: ["summary", "maturitySnapshot", "domainSnapshot", "recommendations", "roadmap", "roiEstimate"],
  },
};

const SYSTEM_PROMPT = `You are the Qamira Business Discovery Expert agent, generating a preliminary AI Opportunity Report from a self-submitted business assessment intake.

The intake includes a self-rated maturity score (1-5) for each of Qamira's eight performance domains -- Strategy, Financial Performance, Process, People, Data, Technology, Customer, Governance. Scale: 1 Ad Hoc (undocumented, dependent on individuals), 2 Emerging (some structure, inconsistently applied), 3 Defined (documented and standardized, not yet measured), 4 Managed (measured against KPIs with regular review), 5 Optimized (actively improved using data and AI).

Ground rules, non-negotiable:
- Follow the Strategy Foundation / Process Structure / People Capability / AI Accelerant hierarchy: every recommendation must serve a business outcome first. Never recommend a technology or automation fix as an end in itself.
- Base every claim only on what the client actually submitted. Do not invent specifics about their business (customer names, exact financials, systems) that were not provided.
- The eight domains are assessed independently but must be reasoned about jointly: a low score in one domain constrains what's credible in another (e.g. a low Data score limits what a Technology fix can honestly promise; a low Process score means new KPIs would measure a workflow that shouldn't exist in its current form). Recommendations should cite the specific domain(s) and rating driving them, not stay generic.
- For domainSnapshot, write one grounded, specific comment per domain referencing the submitted rating and note (if provided) -- never a generic restatement of the maturity-level definition.
- Every "estimatedImpact" and "roiEstimate" must read as directional and caveated (e.g. "typically", "often", "in comparable engagements") -- never a guaranteed number, since this is a preliminary self-assessment, not a completed diagnostic engagement.
- This report is a starting point for a real conversation with a consultant, not a substitute for one. Do not overclaim certainty.
- Cover a mix of the requested categories (GTM Optimization, Customer Churn Prediction, Process Automation, Analytics & Reporting) where genuinely relevant to what was submitted -- do not force a category that doesn't fit the input.
- Write in Qamira's voice: executive, structured, evidence-based, free of unearned jargon.
- Stay at the level of WHAT the opportunity is and WHY it matters for this business -- never HOW to build it. Do not name specific vendors, tools, platforms, system architectures, data models, integration steps, or implementation sequences detailed enough to hand to an engineer. Roadmap phases describe business focus areas and timeframes, not technical build plans. This report is a diagnostic that motivates a consultation, not a blueprint that substitutes for one.`;

function truncate(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

// --- Google Sheets lead log ---------------------------------------------
// Appends one row per completed assessment to a Google Sheet -- this is the
// actual structured record of submissions (the Resend email further below
// is just a human-facing heads-up, easy to lose track of in an inbox and
// with no export path). Posts to a Google Apps Script Web App bound to the
// sheet (Extensions -> Apps Script in the Sheet itself) rather than calling
// the Sheets API directly -- avoids a GCP project/service account/key file
// entirely; the script checks SHEETS_WEBHOOK_SECRET as a shared secret
// since Apps Script web apps set to "Anyone" access are otherwise
// unauthenticated. The "type" field routes to the right tab -- this same
// webhook is also used by api/contact.ts for the "Contact Form Leads" tab.
async function appendAssessmentRow(input: AssessmentRequest, domainLines: string, report: AssessmentReport): Promise<void> {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) return;

  const row = [
    new Date().toISOString(),
    input.companyName,
    input.industry,
    input.website,
    input.revenueRange ? `${input.revenueRange}${input.revenueCurrency ? ` ${input.revenueCurrency}` : ""}` : "",
    input.employeeCount,
    input.yearsInOperation,
    input.ownershipStructure,
    input.contactName,
    input.contactRole,
    input.contactEmail,
    input.contactPhone,
    domainLines,
    input.systemCount,
    input.duplicateDataEntry,
    input.priorities.join(", "),
    input.context,
    report.summary,
  ];

  const webhookRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: webhookSecret, type: "assessment", row }),
  });
  if (!webhookRes.ok) {
    throw new Error(`Sheets webhook append failed: ${webhookRes.status} ${await webhookRes.text()}`);
  }
  const webhookData = (await webhookRes.json()) as { ok?: boolean; error?: string };
  if (!webhookData.ok) {
    throw new Error(`Sheets webhook rejected the row: ${webhookData.error ?? "unknown error"}`);
  }
}

// Checks whether this email already has a completed assessment on record,
// via the same Apps Script webhook (type: "check-email" scans the Contact
// Email column of the assessment tab). Fails OPEN -- if the webhook isn't
// configured or errors, this returns false (allows the submission through)
// rather than locking every user out of the assessment over a Sheets
// hiccup; the duplicate check is a courtesy, not the system of record.
async function hasCompletedAssessment(email: string): Promise<boolean> {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) return false;

  const webhookRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: webhookSecret, type: "check-email", email }),
  });
  if (!webhookRes.ok) return false;
  const data = (await webhookRes.json()) as { exists?: boolean };
  return data.exists === true;
}

function sanitizeDomainRatings(value: unknown): AssessmentRequest["domainRatings"] | null {
  if (!Array.isArray(value) || value.length !== 8) return null;
  const byDomain = new Map<string, AssessmentRequest["domainRatings"][number]>();
  for (const entry of value) {
    if (!entry || typeof entry !== "object") return null;
    const domain = (entry as Record<string, unknown>).domain;
    const maturityLevel = (entry as Record<string, unknown>).maturityLevel;
    const note = (entry as Record<string, unknown>).note;
    if (typeof domain !== "string" || !(KNOWN_DOMAINS as readonly string[]).includes(domain)) return null;
    if (typeof maturityLevel !== "number" || !Number.isInteger(maturityLevel) || maturityLevel < 1 || maturityLevel > 5) return null;
    byDomain.set(domain, {
      domain: domain as AssessmentRequest["domainRatings"][number]["domain"],
      maturityLevel: maturityLevel as 1 | 2 | 3 | 4 | 5,
      note: truncate(note, 500),
    });
  }
  if (byDomain.size !== 8) return null; // duplicate or missing domain entries
  return KNOWN_DOMAINS.map((d) => byDomain.get(d)!);
}

// --- Prospect-facing email ----------------------------------------------
// Until now a completed assessment sent one internal notification and
// nothing else: the person who had just handed over their operational pain
// in structured form received no copy of their own report and no next
// step. These build the report email plus a two-touch follow-up, all
// queued at submission time.

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * ISO timestamp N days out at 04:00 UTC (09:30 IST). Leads can be
 * anywhere -- the intake has a currency selector -- so no hour is right
 * for everyone; this at least avoids landing at 3am in the primary market.
 */
function scheduledIso(daysFromNow: number): string {
  const when = new Date();
  when.setUTCDate(when.getUTCDate() + daysFromNow);
  when.setUTCHours(4, 0, 0, 0);
  return when.toISOString();
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${BRASS};color:#ffffff;font-family:${SANS};font-size:14px;font-weight:600;text-decoration:none;padding:13px 26px;border-radius:2px;">${esc(label)}</a>`;
}

/** Shared shell: wordmark, body, footer. `preheader` is the inbox preview line. */
function shell(preheader: string, bodyHtml: string): string {
  // The charset declaration is load-bearing, not boilerplate: the report
  // body is model-generated prose full of em-dashes and curly quotes, and
  // any client that falls back to Windows-1252 renders those as mojibake
  // ("stated â€" the strongest domain"). Caught exactly that in preview.
  return `<!doctype html><html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(preheader)}</title>
</head><body style="margin:0;padding:0;background:${PARCHMENT_2};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PARCHMENT_2};padding:28px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:${PARCHMENT};border:1px solid ${RULE};">
  <tr><td style="padding:28px 32px 0;border-bottom:1px solid ${RULE};">
    <p style="margin:0 0 18px;font-family:${SERIF};font-size:22px;color:${INK};">Qamira Consulting<span style="color:${BRASS};">.</span></p>
  </td></tr>
  <tr><td style="padding:28px 32px 32px;font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};">
${bodyHtml}
  </td></tr>
  <tr><td style="padding:20px 32px 26px;border-top:1px solid ${RULE};font-family:${SANS};font-size:12px;line-height:1.6;color:${DIM};">
    <p style="margin:0 0 6px;">Qamira Consulting &middot; Business Performance Excellence, AI-Native Execution</p>
    <p style="margin:0;"><a href="${SITE_URL}" style="color:${DIM};">qamiraconsulting.com</a> &nbsp;&middot;&nbsp; <a href="${UNSUBSCRIBE_MAILTO}" style="color:${DIM};">Unsubscribe</a></p>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

function reportEmailHtml(input: AssessmentRequest, report: AssessmentReport): string {
  const firstName = (input.contactName || "").trim().split(/\s+/)[0];
  const greeting = firstName ? `Hi ${esc(firstName)},` : "Hello,";

  const domainRows = report.domainSnapshot
    .map(
      (d) => `<tr>
      <td style="padding:9px 10px 9px 0;border-bottom:1px solid ${RULE};font-weight:600;white-space:nowrap;vertical-align:top;">${esc(d.domain)}</td>
      <td style="padding:9px 10px;border-bottom:1px solid ${RULE};color:${BRASS};font-weight:600;white-space:nowrap;vertical-align:top;">${d.selfRating}/5</td>
      <td style="padding:9px 0 9px 10px;border-bottom:1px solid ${RULE};color:${DIM};">${esc(d.comment)}</td>
    </tr>`,
    )
    .join("");

  const recommendations = report.recommendations
    .map(
      (r) => `<div style="margin:0 0 18px;padding:16px 18px;background:#ffffff;border:1px solid ${RULE};">
      <p style="margin:0 0 4px;font-family:${SANS};font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${BRASS};">${esc(r.category)}</p>
      <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:${INK};">${esc(r.title)}</p>
      <p style="margin:0 0 10px;color:${DIM};">${esc(r.description)}</p>
      <p style="margin:0;font-size:14px;color:${INK};"><strong>Likely impact:</strong> ${esc(r.estimatedImpact)}</p>
    </div>`,
    )
    .join("");

  const roadmap = report.roadmap
    .map(
      (p) => `<tr>
      <td style="padding:9px 10px 9px 0;border-bottom:1px solid ${RULE};font-weight:600;white-space:nowrap;vertical-align:top;">${esc(p.phase)}</td>
      <td style="padding:9px 10px;border-bottom:1px solid ${RULE};color:${BRASS};white-space:nowrap;vertical-align:top;">${esc(p.timeframe)}</td>
      <td style="padding:9px 0 9px 10px;border-bottom:1px solid ${RULE};color:${DIM};">${esc(p.focus)}</td>
    </tr>`,
    )
    .join("");

  const heading = (text: string) =>
    `<p style="margin:30px 0 12px;font-family:${SERIF};font-size:19px;color:${INK};">${esc(text)}</p>`;

  return shell(
    `Your AI Opportunity Report for ${input.companyName}`,
    `<p style="margin:0 0 16px;">${greeting}</p>
<p style="margin:0 0 16px;">Here is your AI Opportunity Report for <strong>${esc(input.companyName)}</strong>, generated from the eight-domain assessment you completed. It is yours to keep and share internally.</p>
<p style="margin:0 0 16px;color:${DIM};">One caveat worth stating plainly: this is built entirely from what you told us in a short self-assessment. It is a starting point for a conversation, not a completed diagnostic.</p>

${heading("Summary")}
<p style="margin:0 0 16px;">${esc(report.summary)}</p>

${heading("Where you stand today")}
<p style="margin:0 0 16px;">${esc(report.maturitySnapshot)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:${SANS};font-size:14px;border-collapse:collapse;">${domainRows}</table>

${heading("What we would look at first")}
${recommendations}

${heading("A sequence that would make sense")}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:${SANS};font-size:14px;border-collapse:collapse;">${roadmap}</table>

${heading("On the return")}
<p style="margin:0 0 24px;color:${DIM};">${esc(report.roiEstimate)}</p>

<div style="margin:32px 0 0;padding:22px 24px;background:${PARCHMENT_2};border-left:3px solid ${BRASS};">
  <p style="margin:0 0 10px;font-family:${SERIF};font-size:18px;color:${INK};">Want to know which of these is actually costing you the most?</p>
  <p style="margin:0 0 18px;color:${DIM};">That is the question a self-assessment cannot answer. A short conversation usually can &mdash; and if it is worth going further, our Operations Diagnostic Workshop puts a number against the one or two findings that matter, with a written findings pack you keep either way.</p>
  ${button(`${SITE_URL}/contact`, "Start a conversation")}
</div>`,
  );
}

function followUpOneHtml(input: AssessmentRequest, report: AssessmentReport): string {
  const firstName = (input.contactName || "").trim().split(/\s+/)[0];
  const lowest = [...report.domainSnapshot].sort((a, b) => a.selfRating - b.selfRating)[0];

  return shell(
    `The domain you rated lowest, and what usually sits behind it`,
    `<p style="margin:0 0 16px;">${firstName ? `Hi ${esc(firstName)},` : "Hello,"}</p>
<p style="margin:0 0 16px;">You ran the assessment for <strong>${esc(input.companyName)}</strong> a few days ago. One thing in it is worth pulling out.</p>
${
  lowest
    ? `<p style="margin:0 0 16px;">You rated <strong>${esc(lowest.domain)}</strong> lowest, at ${lowest.selfRating}/5. In our experience that is rarely where the problem starts &mdash; it is usually where an upstream problem finally becomes visible. A weak Data score is often a Process score in disguise; a weak Process score is often an unmade Strategy decision.</p>`
    : `<p style="margin:0 0 16px;">The domains you rated lowest are rarely where a problem starts &mdash; they are usually where an upstream problem finally becomes visible.</p>`
}
<p style="margin:0 0 16px;">That is the reason we do not lead with a tool. Automating a process that should not exist in its current form just makes the wrong thing happen faster.</p>
<p style="margin:0 0 24px;">If you want a second pair of eyes on which of your eight domains is actually carrying the cost, that is a 30-minute conversation, not a project.</p>
${button(`${SITE_URL}/contact`, "Book a conversation")}
<p style="margin:24px 0 0;color:${DIM};font-size:14px;">If the timing is wrong, just ignore this &mdash; you will hear from us once more and then not again.</p>`,
  );
}

function followUpTwoHtml(input: AssessmentRequest): string {
  const firstName = (input.contactName || "").trim().split(/\s+/)[0];

  return shell(
    `Last one from us`,
    `<p style="margin:0 0 16px;">${firstName ? `Hi ${esc(firstName)},` : "Hello,"}</p>
<p style="margin:0 0 16px;">This is the last email we will send about the assessment you ran for <strong>${esc(input.companyName)}</strong>.</p>
<p style="margin:0 0 16px;">Nothing has changed on our side and there is no offer attached. If the report was useful, keep it. If the timing was wrong, that is the most common reason &mdash; these problems tend to get addressed when something forces the issue, not when a report suggests it.</p>
<p style="margin:0 0 24px;">Whenever that moment comes, the method we would use is published in full on our site. You are welcome to read it, borrow from it, or bring us in.</p>
${button(`${SITE_URL}/methodology`, "Read the methodology")}
<p style="margin:24px 0 0;color:${DIM};font-size:14px;">We will not email you again about this.</p>`,
  );
}

type DeliveryOutcome = { label: string; id?: string; error?: string };

/**
 * Sends the report immediately and queues both follow-ups via Resend's
 * scheduled sending, so no cron job or scheduler state is needed. Returns
 * one line per send for the internal notification -- including the ids,
 * which are what you need to cancel a scheduled follow-up if the lead
 * converts or opts out before it fires.
 */
async function deliverToProspect(
  resend: Resend,
  from: string,
  input: AssessmentRequest,
  report: AssessmentReport,
): Promise<DeliveryOutcome[]> {
  const to = [input.contactEmail];
  const headers = { "List-Unsubscribe": `<${UNSUBSCRIBE_MAILTO}>` };

  const sends: Array<{ label: string; subject: string; html: string; scheduledAt?: string }> = [
    {
      label: "Report (immediate)",
      subject: `Your AI Opportunity Report — ${input.companyName}`,
      html: reportEmailHtml(input, report),
    },
    {
      label: "Follow-up 1 (day 4)",
      subject: `One thing worth pulling out of your assessment`,
      html: followUpOneHtml(input, report),
      scheduledAt: scheduledIso(4),
    },
    {
      label: "Follow-up 2 (day 11)",
      subject: `Last one from us, ${input.companyName}`,
      html: followUpTwoHtml(input),
      scheduledAt: scheduledIso(11),
    },
  ];

  const outcomes: DeliveryOutcome[] = [];
  for (const send of sends) {
    try {
      const { data, error } = await resend.emails.send({
        from,
        to,
        replyTo: REPLY_TO,
        subject: send.subject,
        html: send.html,
        headers,
        ...(send.scheduledAt ? { scheduledAt: send.scheduledAt } : {}),
      });
      if (error) {
        outcomes.push({ label: send.label, error: error.message });
      } else {
        outcomes.push({ label: send.label, id: data?.id });
      }
    } catch (err) {
      outcomes.push({ label: send.label, error: err instanceof Error ? err.message : String(err) });
    }
  }
  return outcomes;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: "Assessment service is not configured yet. Please contact us directly instead." });
    return;
  }

  const body = req.body as Partial<AssessmentRequest>;
  const domainRatings = sanitizeDomainRatings(body?.domainRatings);

  if (!body?.companyName || !body?.contactEmail || !domainRatings) {
    res.status(400).json({ error: "Company name, email, and all eight domain ratings are required." });
    return;
  }

  const input: AssessmentRequest = {
    companyName: truncate(body.companyName, 200),
    industry: truncate(body.industry ?? "", 200),
    revenueCurrency: (body.revenueCurrency as AssessmentRequest["revenueCurrency"]) ?? "",
    revenueRange: (body.revenueRange as AssessmentRequest["revenueRange"]) ?? "",
    employeeCount: (body.employeeCount as AssessmentRequest["employeeCount"]) ?? "",
    yearsInOperation: (body.yearsInOperation as AssessmentRequest["yearsInOperation"]) ?? "",
    ownershipStructure: (body.ownershipStructure as AssessmentRequest["ownershipStructure"]) ?? "",
    website: truncate(body.website ?? "", 300),
    domainRatings,
    systemCount: (body.systemCount as AssessmentRequest["systemCount"]) ?? "",
    duplicateDataEntry: (body.duplicateDataEntry as AssessmentRequest["duplicateDataEntry"]) ?? "",
    priorities: Array.isArray(body.priorities) ? body.priorities.slice(0, 4).map((p) => truncate(p, 60)) : [],
    context: truncate(body.context ?? "", 2000),
    contactName: truncate(body.contactName ?? "", 200),
    contactEmail: truncate(body.contactEmail, 320),
    contactRole: truncate(body.contactRole ?? "", 200),
    contactPhone: truncate(body.contactPhone ?? "", 50),
  };

  let alreadySubmitted = false;
  try {
    alreadySubmitted = await hasCompletedAssessment(input.contactEmail);
  } catch (checkErr) {
    console.error("Assessment duplicate-check failed:", checkErr);
  }
  if (alreadySubmitted) {
    res.status(409).json({
      error: "This email has already completed the assessment. Only one attempt is allowed per person -- please contact us for further assistance.",
    });
    return;
  }

  const domainLines = input.domainRatings
    .map((d) => `- ${d.domain}: ${d.maturityLevel}/5 (${MATURITY_TITLES[d.maturityLevel]}) — note: ${d.note || "none provided"}`)
    .join("\n");

  // contactRole and contactPhone are captured for future follow-up/CRM use
  // but deliberately excluded from the prompt -- irrelevant to report
  // generation and unnecessary PII to hand the model.
  const userMessage = `Business assessment intake submission:

Company: ${input.companyName}
Industry: ${input.industry || "not specified"}
Revenue range: ${input.revenueRange ? `${input.revenueRange}${input.revenueCurrency ? ` ${input.revenueCurrency}` : ""}` : "not specified"}
Employee count: ${input.employeeCount || "not specified"}
Years in operation: ${input.yearsInOperation || "not specified"}
Ownership structure: ${input.ownershipStructure || "not specified"}
Website: ${input.website || "not specified"}

Eight-domain maturity self-assessment (1 = Ad Hoc, 5 = Optimized):
${domainLines}

Systems & tools:
- Core systems in use: ${input.systemCount || "not specified"}
- Teams re-enter the same data across systems: ${input.duplicateDataEntry || "not specified"}

Priority outcomes: ${input.priorities.join(", ") || "none specified"}
Additional context from the submitter:
${input.context || "(none provided)"}

Generate the AI Opportunity Report now via the submit_opportunity_report tool.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 3072,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
      tools: [REPORT_TOOL],
      tool_choice: { type: "tool", name: "submit_opportunity_report" },
    });

    const toolUse = message.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      res.status(502).json({ error: "The assessment model did not return a report. Please try again." });
      return;
    }

    const report = toolUse.input as AssessmentReport;
    res.status(200).json({ report });

    // Both of these run after the response above is already sent, so they
    // must be wrapped in waitUntil -- without it, Fluid Compute is free to
    // freeze or recycle the function's execution as soon as the response is
    // flushed, silently killing an unawaited background task mid-flight
    // (this is what was actually happening: the fetch to the Sheets
    // webhook below was starting but never finishing).

    // Structured record -- appends the submission as a row in the
    // lead-tracking Google Sheet. Independent of the email notification
    // below: either can fail without affecting the other or the client's
    // already-sent report.
    waitUntil(
      appendAssessmentRow(input, domainLines, report).catch((sheetErr) => {
        console.error("Assessment sheet log failed:", sheetErr);
      })
    );

    // The prospect's own copy of the report and both follow-ups, then an
    // internal notification saying what was queued. All of it runs after
    // the response has already been sent, so nothing here can affect what
    // the client received.
    const fromAddress = process.env.CONTACT_FROM_EMAIL;
    if (process.env.RESEND_API_KEY && fromAddress) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      waitUntil(
        (async () => {
          const outcomes = await deliverToProspect(resend, `Qamira Consulting <${fromAddress}>`, input, report);
          const deliveryLines = outcomes
            .map((o) => `- ${o.label}: ${o.error ? `FAILED -- ${o.error}` : `queued (id ${o.id ?? "unknown"})`}`)
            .join("\n");

          await resend.emails.send({
            from: `Qamira Assessment <${fromAddress}>`,
            to: [LEAD_NOTIFICATION_EMAIL],
            replyTo: input.contactEmail ? `${input.contactName || input.companyName} <${input.contactEmail}>` : undefined,
            subject: `New AI Assessment completed: ${input.companyName}`,
            text: `${input.companyName} completed the AI Business Assessment.

Contact: ${input.contactName || "not provided"} (${input.contactRole || "role not provided"})
Email: ${input.contactEmail}
Phone: ${input.contactPhone || "not provided"}
Website: ${input.website || "not provided"}
Industry: ${input.industry || "not specified"}
Revenue range: ${input.revenueRange ? `${input.revenueRange}${input.revenueCurrency ? ` ${input.revenueCurrency}` : ""}` : "not specified"}
Employees: ${input.employeeCount || "not specified"}

Domain ratings:
${domainLines}

Systems: ${input.systemCount || "not specified"} core systems, duplicate data entry: ${input.duplicateDataEntry || "not specified"}
Priorities: ${input.priorities.join(", ") || "none specified"}
Additional context: ${input.context || "(none provided)"}

Report summary: ${report.summary}

Emails to the prospect:
${deliveryLines}

To stop a scheduled follow-up -- lead converted, replied, or asked to opt out -- cancel it in Resend using the id above.`,
          });
        })().catch((notifyErr) => {
          console.error("Assessment prospect delivery failed:", notifyErr);
        })
      );
    }
  } catch (err) {
    console.error("Assessment generation failed:", err);
    res.status(502).json({ error: "We couldn't generate your report just now. Please try again shortly." });
  }
}
