// The full Qamira service catalogue (45 services, QC-codes), mirrored from
// Sales Enablement Kit/Qamira - Pricing Catalogue (INR) 1.1.xlsx, "Client
// Rate Card" tab. Descriptions are the client-safe copy from that tab.
// Prices are deliberately NOT here: they vary by scope and market, so the
// site only ever says "on request". Keep codes in sync with the workbook.

export type StageId = "free" | "diagnose" | "build" | "run";

export type Stage = {
  id: StageId;
  step: string;
  name: string;
  blurb: string;
};

export const stages: Stage[] = [
  { id: "free", step: "Step 1", name: "Start free", blurb: "A free assessment or audit, with no commitment." },
  { id: "diagnose", step: "Step 2", name: "Diagnose", blurb: "Workshops that find where time and money leak." },
  { id: "build", step: "Step 3", name: "Build", blurb: "Engagements and builds that fix what we found." },
  { id: "run", step: "Step 4", name: "Run & grow", blurb: "We run, maintain and improve it with your team." },
];

// Keyed by the first digit of the code: QC-3xx is an AI & automation build.
export const families = {
  "0": { name: "Free starting points", short: "Free" },
  "1": { name: "Diagnostics & workshops", short: "Diagnostic" },
  "2": { name: "Consulting & transformation", short: "Consulting" },
  "3": { name: "AI & automation builds", short: "AI build" },
  "4": { name: "Websites & growth marketing", short: "Growth" },
  "5": { name: "Managed services & retainers", short: "Managed" },
  "6": { name: "Training & capability building", short: "Training" },
} as const;

export type FamilyKey = keyof typeof families;

export type CatalogueService = {
  code: string;
  stage: StageId;
  name: string;
  description: string;
  unit: string;
  duration: string;
};

export const catalogue: CatalogueService[] = [
  { code: "QC-001", stage: "free", name: "AI Business Assessment", description: "Online self-assessment that scores AI and automation readiness and returns an opportunity report.", unit: "Per assessment", duration: "15 minutes" },
  { code: "QC-002", stage: "free", name: "Digital Presence & AI Opportunity Audit", description: "Desk review of your website, Google profile, reviews and enquiry handling, plus a one-page findings note.", unit: "Per audit", duration: "2–3 days" },

  { code: "QC-101", stage: "diagnose", name: "Operations Diagnostic Workshop (1 day)", description: "Facilitated session that maps one operation, finds the highest-cost manual work, and produces a findings pack.", unit: "Per workshop", duration: "1 day + pack" },
  { code: "QC-102", stage: "diagnose", name: "Operations Diagnostic Workshop (2 days)", description: "For multi-site operations, teams over ~100 people, or three or more functions in scope.", unit: "Per workshop", duration: "2 days + pack" },
  { code: "QC-103", stage: "diagnose", name: "Business Discovery & Executive Visioning Workshop", description: "Leadership session that aligns priorities, pain points and success measures before any programme starts.", unit: "Per workshop", duration: "1–2 days" },
  { code: "QC-104", stage: "diagnose", name: "GrowthOS™ Growth Diagnostic", description: "Review of how the business wins, converts and keeps customers, with a prioritised growth plan.", unit: "Per diagnostic", duration: "2–3 weeks" },

  { code: "QC-201", stage: "build", name: "Operational Excellence & Process Optimisation", description: "Focused engagement on one problem area: bottlenecks, manual handoffs, unclear ownership. Root-cause analysis and a working fix plan.", unit: "Per engagement", duration: "4–6 weeks" },
  { code: "QC-202", stage: "build", name: "Business Performance Transformation", description: "Full assessment across all eight performance domains, a target operating model and a sequenced roadmap.", unit: "Per engagement", duration: "6–12 weeks" },
  { code: "QC-203", stage: "build", name: "Analytics Strategy & BI Engineering", description: "Single source of truth for core KPIs, a simplified data stack and executive dashboards.", unit: "Per engagement", duration: "4–8 weeks" },
  { code: "QC-204", stage: "build", name: "AI Strategy & Custom Agent Implementation", description: "Milestone sprints that deliver working AI agents or workflows, with human sign-off built in.", unit: "Per sprint", duration: "3–6 weeks" },
  { code: "QC-205", stage: "build", name: "Workload & Migration Simulation", description: "Models how work volume and headcount shift when work moves between teams, sites or providers.", unit: "Per engagement", duration: "3–5 weeks" },
  { code: "QC-206", stage: "build", name: "Sales Team Setup: Roles, Hiring & Incentives", description: "Job descriptions, incentive and commission plans, and a 90-day plan for new sales or marketing hires.", unit: "Per engagement", duration: "2–4 weeks" },
  { code: "QC-207", stage: "build", name: "Pricing & Rate Card Design", description: "A pricing structure, a customer-facing rate card and a margin check by job type.", unit: "Per engagement", duration: "2–3 weeks" },

  { code: "QC-301", stage: "build", name: "Automation Quick-Win", description: "One tightly scoped automation, such as quote intake, invoice capture or a booking flow.", unit: "One-time", duration: "2–3 weeks" },
  { code: "QC-302", stage: "build", name: "Custom AI Chatbot (website / WhatsApp)", description: "Trained on your business. Answers customer questions, captures leads and hands over to staff.", unit: "One-time build", duration: "2–4 weeks" },
  { code: "QC-303", stage: "build", name: "AI Voice & Call Automation", description: "An AI voice agent for inbound calls, bookings, reminders and call-backs.", unit: "One-time build", duration: "3–5 weeks" },
  { code: "QC-304", stage: "build", name: "Document & Data Extraction Automation", description: "Reads invoices, PODs, forms and contracts, and pushes clean data into your systems.", unit: "One-time build", duration: "3–5 weeks" },
  { code: "QC-305", stage: "build", name: "Internal Knowledge & Document Q&A Agent", description: "A private assistant that answers staff questions from your own SOPs, policies and documents.", unit: "One-time build", duration: "3–6 weeks" },
  { code: "QC-306", stage: "build", name: "Workflow & Systems Integration", description: "Connects the tools you already use (CRM, accounts, ops systems) so data moves without re-keying.", unit: "One-time build", duration: "3–6 weeks" },
  { code: "QC-307", stage: "build", name: "CRM Build & Configuration", description: "A CRM set up around your sales process: pipeline, automations, reporting and team training.", unit: "One-time build", duration: "3–5 weeks" },
  { code: "QC-308", stage: "build", name: "Executive KPI Dashboard", description: "One live dashboard built on agreed KPIs, with clear definitions and an owner for each number.", unit: "One-time build", duration: "2–4 weeks" },
  { code: "QC-309", stage: "build", name: "Custom Software / SaaS Application", description: "A bespoke application for a need off-the-shelf tools can't meet, such as a client portal.", unit: "Scoped project", duration: "Scoped" },
  { code: "QC-310", stage: "build", name: "Booking & Scheduling System", description: "Chatbot quote, a slot matched to vehicle and staff availability, online deposit and confirmed booking, plus a team dashboard.", unit: "One-time build", duration: "6–10 weeks" },
  { code: "QC-311", stage: "build", name: "Churn & Attrition Early-Warning Model", description: "Flags customers, drivers or staff likely to leave, and the main reason, so the team can act early.", unit: "One-time build", duration: "4–6 weeks" },

  { code: "QC-401", stage: "build", name: "Website Starter", description: "Up to ~6 pages, mobile-first, enquiry form, basic SEO, analytics and a Google Business Profile link.", unit: "One-time", duration: "2–3 weeks" },
  { code: "QC-402", stage: "build", name: "Website Growth", description: "A conversion-focused site with quote and booking flows, integrations, SEO structure and content.", unit: "One-time", duration: "4–6 weeks" },
  { code: "QC-403", stage: "build", name: "Google Business Profile & Local SEO Setup", description: "Profile build or clean-up, categories, service areas, a review process and citation listings.", unit: "One-time", duration: "1–2 weeks" },
  { code: "QC-404", stage: "run", name: "Lead-Gen Growth Retainer", description: "Google Business Profile, marketplaces, short-form social video and paid-ads management.", unit: "Monthly", duration: "Min. 3 months" },
  { code: "QC-405", stage: "run", name: "Content Creation & Scheduled Publishing", description: "A monthly content calendar, AI-assisted posts and auto-publishing across your channels.", unit: "Monthly", duration: "Min. 3 months" },
  { code: "QC-406", stage: "build", name: "Marketing Automation & Lead Scoring", description: "Nurture sequences, lead scoring and hand-off rules so sales talks to the right leads first.", unit: "One-time build", duration: "3–5 weeks" },
  { code: "QC-407", stage: "build", name: "AI Short-Form Video", description: "A 15–30 second branded video for social or ads, from script to final cut.", unit: "Per video", duration: "3–5 days" },
  { code: "QC-408", stage: "build", name: "AI Brand Film", description: "A 30–60 second brand or product film with voice-over, music and multiple scenes.", unit: "Per film", duration: "1–2 weeks" },
  { code: "QC-409", stage: "run", name: "B2B Outbound Prospecting Programme", description: "A researched target list, decision-makers found, a personalised opener for each, and a monitored email sequence.", unit: "Monthly", duration: "Min. 3 months" },
  { code: "QC-410", stage: "build", name: "AI Search Visibility (GEO)", description: "An audit of how you appear in ChatGPT and Google AI answers, plus a plan to get cited.", unit: "One-time", duration: "1–2 weeks" },
  { code: "QC-411", stage: "build", name: "Tracking & Analytics Setup", description: "GA4, Search Console, Bing, Meta pixel and conversion tracking, set up and tested.", unit: "One-time", duration: "3–5 days" },

  { code: "QC-501", stage: "run", name: "AI Ops Managed Retainer", description: "Runs and grows your automations: monitoring, fixes, and new automations added each month.", unit: "Monthly", duration: "Min. 6 months" },
  { code: "QC-502", stage: "run", name: "GrowthOS™ Managed Retainer", description: "A full growth operating system run with your team: acquisition, conversion, reporting and optimisation.", unit: "Monthly", duration: "6–12 months" },
  { code: "QC-503", stage: "run", name: "AI-Agent-as-a-Service (per agent)", description: "Hosting, monitoring, prompt and guardrail updates for one live chatbot or agent.", unit: "Monthly", duration: "Ongoing" },
  { code: "QC-504", stage: "run", name: "Performance Management as a Service", description: "Monthly performance reviews, threshold alerts and quarterly maturity re-scoring.", unit: "Monthly", duration: "Min. 6 months" },
  { code: "QC-505", stage: "run", name: "Outsourced BI & Dashboard Governance", description: "We maintain your dashboards and data models and handle new reporting requests.", unit: "Monthly", duration: "Min. 6 months" },
  { code: "QC-506", stage: "run", name: "Continuous Improvement Advisory", description: "Quarterly strategy check-ins, light process reviews and priority access to senior advice.", unit: "Monthly", duration: "Min. 6 months" },
  { code: "QC-507", stage: "run", name: "Website Care & Hosting", description: "Hosting, security updates, backups and small content changes.", unit: "Monthly", duration: "Ongoing" },

  { code: "QC-601", stage: "run", name: "KPI Architecture & Performance Review Masterclass", description: "Teaches your leaders to design, own and run their KPI and review cadence.", unit: "Per programme", duration: "2–4 sessions" },
  { code: "QC-602", stage: "run", name: "AI Readiness & Intelligent Automation Bootcamp", description: "A hands-on bootcamp so your team can spot and assess automation opportunities themselves.", unit: "Per cohort", duration: "1–2 days" },
  { code: "QC-603", stage: "run", name: "Data-Driven Decision Making Seminar", description: "How to read dashboards critically and run review meetings that change decisions.", unit: "Per session", duration: "Half day" },
];

// Services that already have their own page on the site.
export const detailPaths: Record<string, string> = {
  "QC-104": "/growth-os",
  "QC-302": "/technology/custom-saas-chatbots",
  "QC-303": "/technology/ai-voice-call-automation",
  "QC-304": "/technology/document-data-extraction",
  "QC-305": "/technology/internal-knowledge-agents",
  "QC-306": "/technology/workflow-systems-integration",
  "QC-307": "/technology/crm-build-configuration",
  "QC-309": "/technology/custom-saas-chatbots",
  "QC-405": "/technology/content-scheduling-automation",
  "QC-406": "/technology/marketing-automation-lead-scoring",
  "QC-407": "/technology/ai-video-creation",
  "QC-408": "/technology/ai-video-creation",
  "QC-502": "/growth-os",
};

export type Problem = {
  id: string;
  label: string;
  // Listed in the order we'd usually run them, start to finish.
  codes: string[];
};

export const problems: Problem[] = [
  { id: "rekey", label: "We key the same data into three different systems", codes: ["QC-001", "QC-101", "QC-306", "QC-301", "QC-501"] },
  { id: "cold", label: "Enquiries go cold before anyone replies", codes: ["QC-002", "QC-302", "QC-303", "QC-307", "QC-503"] },
  { id: "numbers", label: "We don't trust our own numbers", codes: ["QC-001", "QC-101", "QC-203", "QC-308", "QC-505"] },
  { id: "paper", label: "Paperwork eats most of our team's day", codes: ["QC-001", "QC-101", "QC-304", "QC-305", "QC-501"] },
  { id: "leads", label: "We're not getting enough of the right leads", codes: ["QC-002", "QC-104", "QC-410", "QC-409", "QC-404"] },
  { id: "stalled", label: "Growth has stalled and we can't see why", codes: ["QC-001", "QC-104", "QC-202", "QC-502"] },
  { id: "website", label: "Our website doesn't bring in work", codes: ["QC-002", "QC-402", "QC-403", "QC-411", "QC-507"] },
  { id: "ai", label: "We know AI matters, but not where to start", codes: ["QC-001", "QC-103", "QC-204", "QC-602"] },
  { id: "churn", label: "Customers or staff leave without warning", codes: ["QC-001", "QC-203", "QC-311", "QC-504"] },
];

export const catalogueByCode: Record<string, CatalogueService> = Object.fromEntries(
  catalogue.map((s) => [s.code, s]),
);

export function familyOf(code: string): FamilyKey {
  return code.charAt(3) as FamilyKey;
}
