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

    // Lead notification email -- the client's report has already been sent
    // above, so a failure here must never affect their response.
    if (process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      waitUntil(
        resend.emails
          .send({
            from: `Qamira Assessment <${process.env.CONTACT_FROM_EMAIL}>`,
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

Report summary: ${report.summary}`,
          })
          .catch((notifyErr) => {
            console.error("Assessment lead notification failed:", notifyErr);
          })
      );
    }
  } catch (err) {
    console.error("Assessment generation failed:", err);
    res.status(502).json({ error: "We couldn't generate your report just now. Please try again shortly." });
  }
}
