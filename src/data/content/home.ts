// Home page copy. Grounded in the Qamira Master Knowledge Base & Business
// Operating System v1.7 -- QBPES (Qamira Business Performance Excellence
// System): eight performance domains, an eight-step delivery process,
// three client tiers, and the two practices (advisory and technology).
// Kept in one file so future pages (and the AI Assessment tool)
// can reuse the same source of truth. The delivery process steps
// themselves live in content/process.ts, shared with the Methodology page.

export const hero = {
  kicker: "Business advisory and technology",
  heading: "We advise on what to change, and build the systems that change it.",
  lede: "For owner-led and mid-sized businesses. Our team is based in India and works remotely across Indian, Australian, UK and European business hours.",
  primaryCta: { label: "Free AI Business Assessment", to: "/assessment" },
  secondaryCta: { label: "Start a conversation", to: "/contact" },
};

// The two practices, shown side by side with equal weight. Neither is a
// step towards the other: clients use one, the other, or both. The six
// detailed service areas live on /services.
export type Practice = {
  name: string;
  summary: string;
  areas: string[];
  cta: { label: string; to: string };
};

export const practices: {
  eyebrow: string;
  heading: string;
  items: Practice[];
  footnote: string;
} = {
  eyebrow: "What we do",
  heading: "Two practices, one team.",
  items: [
    {
      name: "Advisory",
      summary: "We work out what to change in how the business runs, and what the change is worth.",
      areas: ["QBPES™ assessment", "Operating model", "Process", "Pricing", "Growth planning"],
      cta: { label: "See advisory services", to: "/services" },
    },
    {
      name: "Technology",
      summary: "We build the websites, assistants and systems a business runs on, and connect them to the tools you already use.",
      areas: [
        "Websites and online stores",
        "SEO and GEO",
        "AI assistants",
        "AI voice reception",
        "CRM",
        "HRM",
        "Reporting",
      ],
      cta: { label: "See technology services", to: "/technology" },
    },
  ],
  footnote: "Clients use one practice, the other, or both. Every engagement is fixed price and delivered in weeks.",
};

export const stats = [
  { value: "2", label: "Practices: advisory and technology" },
  { value: "8", label: "Performance domains diagnosed under QBPES™" },
  { value: "8", label: "Step delivery process, built to re-enter itself" },
  { value: "3", label: "Client tiers served, SMB to enterprise evolution" },
];

export const pillars = [
  {
    index: "01",
    title: "Advice you can act on",
    body: "QBPES™, our assessment method, looks at eight areas of a business, from strategy and finance to customers and governance, and turns what it finds into a short list of changes worth making.",
  },
  {
    index: "02",
    title: "Systems built to fit",
    body: "We build the websites, assistants and systems a business needs, around the way it works and the tools it already uses.",
  },
  {
    index: "03",
    title: "Fixed price, in weeks",
    body: "We use AI in our own delivery. That is how we can agree a fixed price up front and finish in weeks rather than months.",
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
    body: "A small team that can start work inside a division in weeks, where a full enterprise engagement would take quarters to mobilise.",
  },
];

export const ctaBand = {
  eyebrow: "Let's talk",
  heading: "Ready to find out where your business is losing time and money?",
  body: "Two ways to start. Pick whichever fits where you are right now.",
  paths: [
    {
      title: "Start with a data point",
      body: "Prefer a data point first? Answer a few questions about your business and get a personalised report you can read before deciding whether to talk to us.",
      cta: { label: "Free AI Business Assessment", to: "/assessment" },
    },
    {
      title: "Talk to us",
      body: "Best if you already know you want expert input. A first conversation is a diagnosis, not a pitch. We'll tell you plainly where we think the biggest gains are.",
      cta: { label: "Start a conversation", to: "/contact" },
    },
  ],
};
