// AI Solutions page copy, adapted from Master Knowledge Base v1.6 section 5
// (AI-Native Consulting Framework & AI Agent Architecture) for a public
// audience. Internal agent-pipeline schema detail is simplified into
// customer-facing language; the governance principles are kept intact
// since they're the actual trust argument for this page.

export const aiSolutionsHero = {
  eyebrow: "AI, applied",
  title: "AI that augments our judgment -- never a replacement for it.",
  lede: "Every agent we build operationalizes a specific step of our methodology, but final recommendations always remain subject to the Strategy Foundation / Process Structure / People Capability / AI Accelerant hierarchy. An agent never recommends a technology or automation fix before a completed current-state assessment and a stated root cause exist.",
};

export const principles = [
  {
    title: "Evidence over assertion",
    body: "Every AI-generated finding must cite the specific input it was derived from -- a quoted response, a submitted document, a specific metric. Unsupported assertions are flagged low-confidence and routed to human review, never included in a client-facing report as fact.",
  },
  {
    title: "Your data stays yours",
    body: "Client data submitted for an assessment is used only for that assessment, isn't retained beyond the engagement without explicit consent, and is never used to train or fine-tune a shared model across clients. Cross-client learning happens only at the level of anonymized, generalized frameworks and benchmarks -- never raw client data.",
  },
  {
    title: "Quality-gated, not self-certified",
    body: "A mandatory review checks that every recommendation traces to cited evidence and that none skipped the strategy-first principle -- output that fails either check is blocked pending human review before it ever reaches a client.",
  },
];

export const transformationMatrix = {
  eyebrow: "How we decide what to automate",
  heading: "The Cognitive Transformation Matrix",
  body: "Every candidate opportunity is scored on two axes -- how suitable the process is for automation, and how material the business impact would be -- and the resulting quadrant determines what we're allowed to recommend. This is what keeps automation a fit-for-purpose choice, not a default.",
  quadrants: [
    { title: "Quick-win automation", body: "High suitability, high impact -- built now." },
    { title: "Roadmap candidate", body: "High impact, lower suitability -- flagged as future readiness work." },
    { title: "Monitor-only", body: "Low impact regardless of suitability -- not worth automating yet." },
    { title: "Do-not-automate", body: "Low suitability -- explicitly recommended against, with the reasoning documented, never a quiet default." },
  ],
};

export const pipeline = [
  { title: "Discovery", body: "Every request is structured against our discovery framework before any analysis starts, so nothing gets diagnosed against an incomplete picture." },
  { title: "Analysis & Recommendation", body: "Current-state maturity and root causes are assessed, and a recommendation set is produced -- each item labeled with how confidently it should be acted on." },
  { title: "Quality Review", body: "A mandatory gate: every recommendation is checked against cited evidence and the strategy-first hierarchy before anything reaches a client." },
  { title: "Client Reporting", body: "The final, human-reviewed recommendation set is narrated into a client-facing report -- never permitted to introduce a new finding of its own." },
];

export const stack = {
  eyebrow: "Infrastructure",
  heading: "Built on a validated stack, chosen deliberately.",
  body: "When a future-state design calls for new infrastructure, we default to a small set of proven, enterprise-grade platforms as our supported and validated deployment environment -- selected for security, reliability, and fit with how our own methodology operates, not brand preference. A different stack is proposed only when a client's existing environment makes the default materially more expensive or infeasible -- and any such deviation is explicitly flagged and justified, never presented as equivalent by default.",
};
