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
    { title: "Do-not-automate", body: "Low suitability, high judgment dependency -- explicitly recommended against." },
  ],
};

export const pipeline = [
  { title: "Discovery Agent", body: "Structures the raw request against our discovery framework, tags stated pain points to the eight QBPES™ domains, and flags missing information." },
  { title: "Analysis Agents", body: "Score current-state maturity per domain, then run root cause analysis against every domain below target maturity, producing a ranked list of gaps with quantified impact." },
  { title: "Solution Architect Agent", body: "Produces the recommendation set -- process, KPI, and AI-automation opportunities -- each labeled with its Cognitive Transformation Matrix quadrant." },
  { title: "Quality Review Agent", body: "A mandatory gate: checks every recommendation traces to evidence and respects the strategy-first hierarchy before anything reaches a client." },
  { title: "Reporting Agent", body: "Structures and narrates the final, human-reviewed recommendation set into a client-facing report -- never permitted to introduce new findings of its own." },
];

export const stack = {
  eyebrow: "Infrastructure",
  heading: "Built on the Microsoft AI stack, chosen deliberately.",
  body: "When a future-state design calls for new infrastructure, we default to Microsoft Fabric, Azure OpenAI, Power Platform, and Copilot as our supported and validated deployment environment. A different stack is proposed only when a client's existing environment makes the default materially more expensive or infeasible -- and any such deviation is explicitly flagged and justified, never presented as equivalent by default.",
};
