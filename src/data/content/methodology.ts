// Methodology page copy, adapted from Master Knowledge Base v1.7 sections
// 2 (QBPES framework) and 3 (delivery methodology detail). The eight-step
// delivery process itself lives in content/process.ts, shared with the
// Home page preview.

export const methodologyHero = {
  eyebrow: "How we work",
  title: "QBPES™: the Qamira Business Performance Excellence System.",
  lede: "Our flagship proprietary methodology -- the codified answer to how we deliver on the promise to solve business problems rather than sell technology. Every engagement, AI agent, and deliverable exists to support one of its domains or lifecycle stages.",
};

export const domains = [
  { title: "Strategy", question: "Are objectives and priorities clear and shared?" },
  { title: "Financial Performance", question: "Is profitability and cost visible and explainable?" },
  { title: "Process", question: "Are workflows designed deliberately, or accumulated by accident?" },
  { title: "People", question: "Does the organization have the skills, culture, and capacity the strategy requires?" },
  { title: "Data", question: "Is information trustworthy, timely, and unified?" },
  { title: "Technology", question: "Do systems serve the business, or fragment it?" },
  { title: "Customer", question: "Is the client experience understood end-to-end?" },
  { title: "Governance", question: "Are decisions, metrics, and reviews owned and enforced?" },
];

export const maturityLevels = [
  { level: "01", title: "Ad Hoc", body: "Undocumented, dependent on individuals." },
  { level: "02", title: "Emerging", body: "Some structure exists but is inconsistently applied." },
  { level: "03", title: "Defined", body: "Documented and standardized, not yet measured." },
  { level: "04", title: "Managed", body: "Measured against KPIs with regular review." },
  { level: "05", title: "Optimized", body: "Actively improved using data and, increasingly, AI." },
];

export const interoperabilityNote = {
  eyebrow: "Why it holds together",
  heading: "Assessed independently. Designed jointly.",
  body: "The eight domains are assessed independently but designed jointly -- a low Data score constrains what Technology recommendations are credible; a low Process score means new KPIs would measure a workflow that shouldn't exist in its current form. Findings are synthesized into a single end-state blueprint before any solution is designed, so a recommendation in one domain is checked against its consequences in the other seven. No domain's fix is finalized until its interoperability with the others has been reasoned through.",
};
