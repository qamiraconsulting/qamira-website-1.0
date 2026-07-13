import type { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";
import type { AssessmentRequest, AssessmentReport } from "../src/lib/assessmentTypes";

// Server-side only -- never exposed to the browser. Set in the Vercel
// dashboard under Project Settings -> Environment Variables.
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const REPORT_TOOL = {
  name: "submit_opportunity_report",
  description: "Submit the completed AI Opportunity Report for this client's business assessment.",
  input_schema: {
    type: "object" as const,
    properties: {
      summary: { type: "string", description: "2-3 sentence executive summary of the opportunity." },
      maturitySnapshot: { type: "string", description: "A brief, evidence-based read on where this business stands today, grounded only in what was submitted." },
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
    required: ["summary", "maturitySnapshot", "recommendations", "roadmap", "roiEstimate"],
  },
};

const SYSTEM_PROMPT = `You are the Qamira Business Discovery Expert agent, generating a preliminary AI Opportunity Report from a self-submitted business assessment intake.

Ground rules, non-negotiable:
- Follow the Strategy Foundation / Process Structure / People Capability / AI Accelerant hierarchy: every recommendation must serve a business outcome first. Never recommend a technology or automation fix as an end in itself.
- Base every claim only on what the client actually submitted. Do not invent specifics about their business (customer names, exact financials, systems) that were not provided.
- Every "estimatedImpact" and "roiEstimate" must read as directional and caveated (e.g. "typically", "often", "in comparable engagements") -- never a guaranteed number, since this is a preliminary self-assessment, not a completed diagnostic engagement.
- This report is a starting point for a real conversation with a consultant, not a substitute for one. Do not overclaim certainty.
- Cover a mix of the requested categories (GTM Optimization, Customer Churn Prediction, Process Automation, Analytics & Reporting) where genuinely relevant to what was submitted -- do not force a category that doesn't fit the input.
- Write in Qamira's voice: executive, structured, evidence-based, free of unearned jargon.`;

function truncate(value: string, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
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

  if (!body?.companyName || !body?.contactEmail) {
    res.status(400).json({ error: "Company name and email are required." });
    return;
  }

  const input: AssessmentRequest = {
    companyName: truncate(body.companyName, 200),
    industry: truncate(body.industry ?? "", 200),
    revenueRange: (body.revenueRange as AssessmentRequest["revenueRange"]) ?? "",
    frictionDomains: Array.isArray(body.frictionDomains) ? body.frictionDomains.slice(0, 8).map((d) => truncate(d, 60)) : [],
    priorities: Array.isArray(body.priorities) ? body.priorities.slice(0, 4).map((p) => truncate(p, 60)) : [],
    context: truncate(body.context ?? "", 2000),
    contactName: truncate(body.contactName ?? "", 200),
    contactEmail: truncate(body.contactEmail, 320),
  };

  const userMessage = `Business assessment intake submission:

Company: ${input.companyName}
Industry: ${input.industry || "not specified"}
Revenue range: ${input.revenueRange || "not specified"}
Domains where friction is felt: ${input.frictionDomains.join(", ") || "none specified"}
Priority outcomes: ${input.priorities.join(", ") || "none specified"}
Additional context from the submitter:
${input.context || "(none provided)"}

Generate the AI Opportunity Report now via the submit_opportunity_report tool.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 2048,
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
  } catch (err) {
    console.error("Assessment generation failed:", err);
    res.status(502).json({ error: "We couldn't generate your report just now. Please try again shortly." });
  }
}
