// Home page copy. Grounded in the Qamira Master Knowledge Base & Business
// Operating System v1.7 -- QBPES (Qamira Business Performance Excellence
// System): eight performance domains, an eight-step delivery process,
// three client tiers, and the Strategy Foundation -> AI Accelerant execution
// hierarchy. Kept in one file so future pages (and the AI Assessment tool)
// can reuse the same source of truth. The delivery process steps
// themselves live in content/process.ts, shared with the Methodology page.

export const hero = {
  kicker: "Business Performance Excellence, AI-Native Execution",
  heading: "We recalibrate how your business performs — then let AI execute it.",
  lede: "Qamira diagnoses what's actually constraining growth, redesigns the process and operating model beneath it, and deploys AI-native execution to make the fix permanent — governed by QBPES™, our proprietary performance system.",
  primaryCta: { label: "Start a conversation", to: "/contact" },
  secondaryCta: { label: "See our methodology", to: "/methodology" },
};

export const stats = [
  { value: "8", label: "Performance domains diagnosed under QBPES™" },
  { value: "8", label: "Step delivery process, built to re-enter itself" },
  { value: "3", label: "Client tiers served, SMB to enterprise evolution" },
  { value: "AI", label: "As our primary execution capability, not an add-on" },
];

export const pillars = [
  {
    index: "01",
    title: "Business Performance Excellence",
    body: "What we deliver. QBPES™ diagnoses and improves performance across eight interdependent domains — strategy, financial performance, process, people, data, technology, customer, and governance.",
  },
  {
    index: "02",
    title: "AI-Native Execution",
    body: "How we deliver it. Agentic AI and intelligent automation carry out the redesigned process at a speed and scale no team can match alone — always governed, always checked by a human.",
  },
  {
    index: "03",
    title: "Reusable Intellectual Property",
    body: "How we scale. Every engagement strengthens our QBPES™ playbooks, scorecards, and AI agent library — a compounding advantage that gets faster and sharper with every client.",
  },
];

export const executionHierarchy = [
  {
    step: "01",
    title: "Strategy Foundation",
    body: "Every recommendation starts with profitability, revenue growth, and cost — never a tool.",
  },
  {
    step: "02",
    title: "Process Structure",
    body: "Workflows are redesigned to remove waste and friction before anything is automated.",
  },
  {
    step: "03",
    title: "People Capability",
    body: "Skills, culture, and capacity are matched to the new process before new tools arrive.",
  },
  {
    step: "04",
    title: "AI Accelerant",
    body: "AI executes the redesigned process at a speed and scale no team can match alone — governed, not improvised.",
  },
];

export const clientTiers = [
  {
    title: "Small-to-Medium Business",
    range: "$2M – $50M revenue",
    body: "Enterprise-grade performance management without enterprise cost or timeline — fast Business Discovery and a lean KPI architecture that exposes revenue leakage within weeks.",
  },
  {
    title: "Growing Startups",
    range: "$5M – $100M, post-Series A/B",
    body: "Structure and governance that scale with your next funding round instead of breaking under it — a Target Operating Model built to survive hypergrowth.",
  },
  {
    title: "Enterprise Evolution",
    range: "Divisions & business units",
    body: "Boutique speed and AI-native delivery inside a division that a full enterprise engagement would take quarters to mobilize.",
  },
];

export const ctaBand = {
  eyebrow: "Let's talk",
  heading: "Ready to find out where performance is actually leaking?",
  body: "A first conversation is a diagnostic, not a pitch. We'll tell you plainly where the highest-leverage transformation lies.",
  primaryCta: { label: "Start a conversation", to: "/contact" },
  secondaryCta: { label: "Explore our services", to: "/services" },
};
