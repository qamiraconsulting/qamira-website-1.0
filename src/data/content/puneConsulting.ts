// /in/business-consultant-pune -- the local landing page the Google Business
// Profile's website link points at, written for "business consultant in
// Pune" and the near-variants people search (process improvement,
// operations, AI automation consultant in Pune / PCMC).
//
// Rules this copy keeps:
// - No prices on the website, by decision (2026-10-20). Keep figures out of
//   this file too -- it ships in the public JS bundle.
// - Brand-only voice, no founder name, no named employers.
// - Process and AI are one combined offer, never a first/second sequence.
// - The proof client is described, never named.
// - Areas served match the GBP service areas, so the page and the profile
//   tell Google the same story. No street address: the profile is a
//   service-area business with the address hidden.

export const puneHero = {
  breadcrumbLabel: "Business Consultant in Pune",
  eyebrow: "Business consulting · Pune",
  title: "A business consultant in Pune for firms that have outgrown how they run.",
  lede: "We help growing Pune and Pimpri-Chinchwad businesses find where time and money leak, and fix it with better processes and practical AI, built together. Manufacturers, logistics firms and professional-services companies, on-site or online.",
  promiseLine: "Free 20-minute call. A written scope and fixed quote before any work starts.",
};

export const punePain = {
  eyebrow: "Sound familiar?",
  heading: "Growth has outpaced the way the business is run.",
  lede: "Most of the Pune SMEs we talk to aren't short of work. They're short of time, because the business still runs the way it did when it was half the size.",
  points: [
    "Every decision still goes through the owner, because nobody else has the full picture.",
    "Orders, stock and follow-ups live across Tally, Excel and WhatsApp groups.",
    "Margins are slipping, and nobody can say exactly which jobs or customers are causing it.",
    "New hires take months to get productive because the way work gets done isn't written down.",
  ],
};

export const puneServices = {
  eyebrow: "What we do in Pune",
  heading: "Consulting that ends in a working fix, not a slide deck.",
  lede: "We diagnose the problem with your team, then stay to put the fix in place: the process, the people and the tools together.",
  items: [
    {
      title: "Operations and process consulting",
      body: "We map how work actually moves through your business, find the bottlenecks and manual handoffs, and redesign them with the people who do the work.",
      to: "/services",
    },
    {
      title: "AI and business automation",
      body: "Quotes, order entry, invoice capture, follow-ups and reports, automated on the tools you already use, with anything unusual flagged for a person.",
      to: "/in/business-automation",
    },
    {
      title: "KPIs and dashboards",
      body: "A short list of numbers that matter, clear owners for each, and one live dashboard instead of a Monday-morning spreadsheet.",
      to: "/services",
    },
    {
      title: "Custom software, ERP and CRM",
      body: "When off-the-shelf tools don't fit, we build a system around how your business works and connect it to what you keep.",
      to: "/in/custom-software",
    },
    {
      title: "Growth and lead generation",
      body: "Google Business Profile, search, ads and outbound prospecting, with tracking so you can see which channel brings enquiries that turn into sales.",
      to: "/growth-os",
    },
    {
      title: "Workshops and team training",
      body: "Hands-on sessions that teach your managers to run KPI reviews and spot automation opportunities themselves.",
      to: "/services",
    },
  ],
};

export const puneIndustries = {
  eyebrow: "Who we work with",
  heading: "Built for the businesses that make Pune work.",
  items: [
    {
      title: "Manufacturing and engineering",
      body: "Auto-component, engineering and fabrication units across Chakan, Bhosari, Talegaon and Ranjangaon: production planning, dispatch, quality and costing.",
      to: "/industries/manufacturing",
    },
    {
      title: "Logistics and supply chain",
      body: "Transporters, freight forwarders and warehousing firms: quoting, documentation, tracking updates and billing, with 15 years of experience in shipping and logistics behind the advice.",
      to: "/industries/logistics-supply-chain",
    },
    {
      title: "Professional services",
      body: "CA firms, agencies, consultancies and IT services companies in Hinjewadi, Baner and Kharadi: client onboarding, utilisation, billing and reporting.",
      to: "/industries/professional-services",
    },
  ],
};

export const puneAreas = {
  eyebrow: "Areas we serve",
  heading: "Across Pune and Pimpri-Chinchwad, and further when it's useful.",
  lede: "Workshops and reviews happen at your site or online, whichever suits the work. Builds and support run remotely, so distance doesn't slow anything down.",
  areas: [
    "Pune",
    "Pimpri-Chinchwad",
    "Chakan",
    "Bhosari",
    "Hinjewadi",
    "Talegaon",
    "Hadapsar",
    "Kharadi",
    "Mumbai",
    "Thane",
    "Navi Mumbai",
    "Nashik",
  ],
};

export const puneHowItWorks = {
  eyebrow: "How it works",
  heading: "Evidence first, then a fix you can see working.",
  steps: [
    {
      title: "Free call or assessment",
      body: "A 20-minute call, or our free online AI Business Assessment, to see where the biggest leaks are. No obligation.",
    },
    {
      title: "Diagnostic workshop",
      body: "A focused session with your leadership team that maps one operation and puts a number on the time and cost being lost. The fee is credited against follow-on work.",
    },
    {
      title: "Written scope and quote",
      body: "What we'll change, what we'll build, the milestones and a fixed price. Nothing starts until you agree it.",
    },
    {
      title: "Fix, measure, hand over",
      body: "We put the fix in place with your team, track the numbers we agreed, and hand over everything your people need to run it.",
    },
  ],
};

export const puneProof = {
  eyebrow: "Built and running",
  heading: "Our work runs in real businesses every day.",
  body: [
    "For a Melbourne removals company we redesigned how quotes were handled and built an instant-quote engine around it: a job goes in, and the customer gets a branded quote in about 20 seconds, worked out from the company's own rate card.",
    "We bring the same approach to Pune businesses: start from how the work actually happens, fix what's slowing it down, and only build what pays back.",
  ],
  note: "Client named on request in a private conversation.",
};

export const puneFaq = [
  {
    question: "What does a business consultant in Pune actually do for an SME?",
    answer:
      "We look at how your business runs today, find where time and money are being lost, and fix it with you. That can mean redesigning a process, setting up KPIs, automating repetitive work or building a system, usually a mix. You end up with a working change, not just a report.",
  },
  {
    question: "How much does business consulting cost?",
    answer:
      "It depends on the scope. After a free 20-minute call you get a written scope and a fixed quote before any work starts. The diagnostic workshop fee is credited against any follow-on work.",
  },
  {
    question: "Do you visit our office or factory in Pune?",
    answer:
      "Yes, for workshops and process reviews where seeing the work matters, across Pune and Pimpri-Chinchwad. Everything else, including builds and ongoing support, runs online.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "Mostly manufacturers, logistics and supply-chain firms, and professional-services companies. If your business has repeatable processes, people and customers, the approach applies.",
  },
  {
    question: "We're a small business. Is this too big for us?",
    answer:
      "No. Most of our work is with growing SMEs, and engagements are scoped to the problem. A single process fix or one automation is often the right place to start.",
  },
  {
    question: "Do you only work in Pune?",
    answer:
      "Pune and Pimpri-Chinchwad are home, and we also work with businesses in Mumbai, Thane, Navi Mumbai and Nashik, and across India remotely.",
  },
];

export const puneCta = {
  heading: "Tell us what's slowing the business down.",
  body: "Book a free 20-minute call, or take the free AI Business Assessment first. We'll tell you honestly where the biggest gains are, and whether we're the right people to help.",
};
