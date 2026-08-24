// Qamira GrowthOS™ page copy, adapted from Master Knowledge Base v1.9
// Section 11. GrowthOS™ is QBPES™ productized specifically for the growth
// domain -- the packaged, client-facing operating system a client's own
// team runs day-to-day, built on the same eight-domain diagnostic
// discipline QBPES™ already applies elsewhere. Kept deliberately free of
// named vendors/tools and technical jargon throughout -- see Section
// 11.4.1's non-vendor-lock-in principle; no product or platform name
// (ours or a third party's) should appear anywhere on this page.
//
// growthOSFaq doubles as FAQPage JSON-LD (see GrowthOS.tsx) -- phrased as
// the actual questions a prospect (or an LLM answering on their behalf)
// would ask, answered as clean, self-contained, quotable statements.

export const growthOSHero = {
  eyebrow: "AI-Powered Business Growth & Performance Operating System",
  title: "Qamira GrowthOS™",
  lede: "Most businesses don't have a growth problem -- they have a connection problem. The website, the CRM, the ads, and the team delivering the work were all bought separately, from different vendors, and none of them talk to each other. GrowthOS™ is the operating system that connects them into one loop your business runs on, not another tool added to the pile.",
  breadcrumbLabel: "GrowthOS",
};

export const whatItIs = {
  eyebrow: "What GrowthOS™ is",
  heading: "An operating system for growth, not another piece of software.",
  body: "Qamira GrowthOS™ is an AI-enabled business growth and performance operating system: it connects how you attract customers, convert them, deliver the work, measure the result, and improve -- into one continuous system, governed by the same diagnostic discipline behind QBPES™, Qamira's core methodology. It's built once, around your business, and it keeps running and improving after we've handed it over.",
  notThisIntro: "To be direct about what GrowthOS™ is not, because this is where most vendors overpromise:",
  notThis: [
    "Not an AI marketing tool.",
    "Not a CRM.",
    "Not a chatbot.",
    "Not a dashboard.",
    "Not an automation platform.",
    "Not an AI video-generation service.",
  ],
  notThisOutro: "Each of those is, at most, one small component inside GrowthOS™. Bought alone, any one of them solves a narrow problem and leaves the rest of your growth activity just as disconnected as before.",
};

export const growthLoopIntro = {
  eyebrow: "The Growth Loop",
  heading: "A loop, not a funnel -- it never resets to zero.",
  lede: "A funnel ends the moment a sale closes. The Growth Loop doesn't -- what you measure after delivery feeds straight back into strategy, so every cycle makes the next one sharper instead of starting over from scratch.",
};

export const growthLoopSteps = [
  {
    step: "01",
    title: "Diagnose",
    icon: "Stethoscope",
    body: "We start with your business, not a channel or a tool -- your customers, market, numbers, and what's actually holding growth back.",
  },
  {
    step: "02",
    title: "Strategise",
    icon: "Compass",
    body: "Who you're really selling to, what you're offering them, and how it's priced and positioned -- decided before any marketing spend.",
  },
  {
    step: "03",
    title: "Acquire",
    icon: "Megaphone",
    body: "Content, search visibility, social, and paid campaigns bring the right people to you, matched to the strategy already agreed.",
  },
  {
    step: "04",
    title: "Convert",
    icon: "Handshake",
    body: "Your website, chatbot, and follow-up turn interest into booked business -- quickly, consistently, without leads going cold.",
  },
  {
    step: "05",
    title: "Deliver",
    icon: "PackageCheck",
    body: "The work gets scheduled, communicated, and delivered properly -- because an acquisition engine means nothing if delivery breaks the promise.",
  },
  {
    step: "06",
    title: "Measure",
    icon: "LineChart",
    body: "Revenue, cost per lead, conversion, and margin become visible in one place -- not scattered across five spreadsheets nobody trusts.",
  },
  {
    step: "07",
    title: "Optimise",
    icon: "Sparkles",
    body: "What the numbers show gets acted on -- underperforming channels, pricing, or messaging get adjusted, continuously, not once a year.",
  },
  {
    step: "08",
    title: "Scale",
    icon: "TrendingUp",
    body: "What's proven to work gets standardized and repeated -- a second location, a second channel, a second market -- without starting over.",
  },
] as const;

export const growthLoopClosing =
  "Then it loops -- what Optimise learns feeds straight back into Diagnose and Strategise, so the system keeps compounding instead of resetting for the next campaign.";

export const capabilitiesIntro = {
  eyebrow: "The eight capabilities",
  heading: "Every capability earns its place by feeding the one next to it.",
  lede: "None of these are sold as standalone add-ons. Each is scoped, built, and connected in sequence -- so what you end up with is a system, not a shelf of disconnected tools.",
};

export const capabilities = [
  {
    number: "01",
    title: "Business Intelligence & Diagnosis",
    body: "A clear picture of your business, customers, market, and numbers -- so every decision after this point starts from evidence, not a guess.",
  },
  {
    number: "02",
    title: "Growth Strategy",
    body: "Who you're targeting, what you're offering, and how it's priced and positioned -- the plan every channel and campaign gets built against.",
  },
  {
    number: "03",
    title: "Demand Generation",
    body: "Content, search and social visibility, and campaigns that bring the right people to you -- built around the strategy, not a generic content calendar.",
  },
  {
    number: "04",
    title: "Lead & Customer Conversion",
    body: "Your website, chatbot, and follow-up working together to turn interest into a booked customer without anything falling through the cracks.",
  },
  {
    number: "05",
    title: "Delivery & Operations",
    body: "Scheduling, communication, and service delivery that keep the promise made during the sale -- including how you recover when something goes wrong.",
  },
  {
    number: "06",
    title: "Performance Intelligence",
    body: "Revenue, margin, cost per lead, and conversion in one trustworthy view -- so you know exactly what's working and what isn't.",
  },
  {
    number: "07",
    title: "AI Optimisation",
    body: "Continuous, evidence-based adjustments to targeting, pricing, and operations -- always reviewed, never left to run unsupervised.",
  },
  {
    number: "08",
    title: "Scale",
    body: "What's proven gets standardized into a repeatable playbook, so growing to a new channel, location, or market doesn't mean starting from zero.",
  },
];

export const aiAndAutomation = {
  eyebrow: "How AI and automation work together",
  heading: "The technology is the engine. GrowthOS™ is the car.",
  body: "AI and automation do the heavy lifting inside GrowthOS™ -- but they execute a strategy that's already been decided, they don't invent one. A workflow-automation layer moves information between your website, CRM, and other systems the moment something happens -- what it does and when is designed and approved before it ever runs, and the specific software behind it is one of the few things we'd happily swap out without changing anything else about how GrowthOS™ works.",
  points: [
    {
      title: "AI reasons and creates",
      body: "Drafts content, analyzes performance data, and supports strategy and recommendations -- always reviewed by your team or ours before it reaches a customer.",
    },
    {
      title: "Automation connects and moves",
      body: "Carries information between systems the moment something happens -- a lead is captured, a booking is confirmed, a service is completed -- so nothing depends on someone remembering to do it manually.",
    },
    {
      title: "You're never locked to one vendor",
      body: "Every technology inside GrowthOS™ -- the AI models, the automation layer, the CRM, the dashboards -- is a swappable component. If a better tool comes along, the framework doesn't change; the tool underneath it does.",
    },
  ],
};

export const exampleJourney = {
  eyebrow: "Illustrative, not testimonial",
  heading: "What a GrowthOS™ journey actually looks like.",
  lede: "We're early in bringing GrowthOS™ to market, so this is a composite, illustrative scenario built from the kind of business we work with -- not a specific client's results.",
  disclaimer: "Illustrative scenario -- not an actual client engagement. Figures are representative of the kind of outcome we target, not a verified result.",
  stages: [
    {
      title: "Before",
      body: "A local service business had a website, a Facebook page, and a phone that rang inconsistently. Leads that did come in were followed up whenever someone had time -- some within the hour, some three days later. Nobody could say what a new customer actually cost to win.",
    },
    {
      title: "Diagnose & Strategise",
      body: "The diagnosis found the real issue wasn't a lack of interest -- it was inconsistent follow-up and an offer that hadn't been sharpened in years. Strategy work re-defined the ideal customer and tightened the core offer before any new spend was proposed.",
    },
    {
      title: "Acquire & Convert",
      body: "A rebuilt booking flow and a chatbot handled first-contact response instantly, day and night. Campaigns went out matched to the newly defined offer, not a generic \"more leads\" push.",
    },
    {
      title: "Deliver, Measure & Optimise",
      body: "Every booking now flows into one system automatically. A monthly view shows cost per lead, conversion rate, and margin by service line -- and underperforming channels get adjusted instead of quietly funded forever out of habit.",
    },
  ],
};

export const whyQamira = {
  eyebrow: "Why Qamira",
  heading: "Built on the same discipline as everything else we do.",
  body: "GrowthOS™ isn't a side product bolted onto Qamira's consulting practice -- it's QBPES™, our core business performance methodology, applied specifically to growth. The same diagnose-before-you-build discipline, the same insistence on evidence over opinion, and the same governed use of AI apply here exactly as they do in every other Qamira engagement.",
  points: [
    {
      title: "Diagnosis before technology",
      body: "We don't start with a channel or a tool. We start with what's actually constraining your growth, the same way every Qamira engagement does.",
    },
    {
      title: "One accountable partner",
      body: "Instead of managing five vendors for five point solutions, GrowthOS™ gives you one system and one team accountable for how it performs together.",
    },
    {
      title: "It compounds",
      body: "Every GrowthOS™ engagement sharpens our playbooks and scoring models -- so the system we build for you keeps getting more capable, not just more complex.",
    },
  ],
};

export const suitableFor = {
  eyebrow: "Is this you",
  heading: "GrowthOS™ tends to fit a specific kind of business.",
  lede: "It's not for everyone, and we'll tell you plainly if it isn't a fit yet.",
  signals: [
    "You're running growth through a mix of tools and vendors that don't talk to each other.",
    "You can't confidently say what a new customer actually costs to win.",
    "Leads or enquiries go cold because follow-up depends on someone remembering.",
    "You've bought a chatbot, a CRM, or an ad campaign before and it didn't move the number you actually cared about.",
    "You're ready to have one system, and one accountable partner, instead of five separate relationships.",
  ],
};

export const implementationApproach = {
  eyebrow: "How it gets built",
  heading: "Phased, and scoped against a real diagnosis -- never a fixed package.",
  lede: "There's no off-the-shelf GrowthOS™ package, because the right starting point depends entirely on what your diagnosis finds.",
  phases: [
    {
      title: "GrowthOS™ Diagnostic",
      body: "A scoped assessment of where growth is actually breaking down today, and which capability layers need attention first.",
    },
    {
      title: "Foundation build",
      body: "The layers your diagnosis flags as missing or broken get built first -- often conversion infrastructure, since there's little point driving more demand to a system that can't handle it yet.",
    },
    {
      title: "Connect & measure",
      body: "Systems get connected so information moves automatically, and a real performance view goes live once there's genuine activity to measure.",
    },
    {
      title: "Optimise & scale",
      body: "Once the loop is running on trustworthy data, automation and AI optimisation are introduced -- and what's proven gets standardized for the next channel, location, or market.",
    },
  ],
};

export const growthOSFaq = [
  {
    question: "What is Qamira GrowthOS™?",
    answer:
      "Qamira GrowthOS™ is an AI-enabled business growth and performance operating system. It connects how a business attracts customers, converts them, delivers the work, measures the result, and improves into one continuous system, instead of running each of those as a separate, disconnected tool or vendor relationship.",
  },
  {
    question: "Is GrowthOS a CRM, a chatbot, or a marketing automation tool?",
    answer:
      "No. GrowthOS™ is an operating framework, not a single tool -- a CRM, a chatbot, and marketing automation are, at most, individual components that can sit inside it. Buying any one of them alone solves a narrow problem; GrowthOS™ is what connects them into one governed system.",
  },
  {
    question: "How is GrowthOS different from Qamira's QBPES™ methodology?",
    answer:
      "QBPES™ (the Qamira Business Performance Excellence System) is Qamira's core diagnostic methodology, applied across a business's strategy, process, people, data, technology, customer, and governance domains. GrowthOS™ is QBPES™ productized specifically for growth -- the packaged, client-facing operating system built on the same diagnostic discipline, scoped to customer acquisition, conversion, delivery, and continuous optimization.",
  },
  {
    question: "What technology does GrowthOS run on?",
    answer:
      "GrowthOS™ is deliberately not tied to any single vendor or platform. It's built from swappable components -- AI models for reasoning and content, a workflow-automation layer for connecting systems, a CRM or order-management system, and performance dashboards -- chosen and configured per client, not sold as one fixed piece of software.",
  },
  {
    question: "What kind of business is GrowthOS a good fit for?",
    answer:
      "Businesses running growth through a mix of disconnected tools and vendors, unable to say what a new customer actually costs to win, or where leads go cold because follow-up depends on someone remembering. It's not a fit for a business that just wants a single point tool rather than an operating system.",
  },
  {
    question: "How much does Qamira GrowthOS™ cost?",
    answer:
      "There's no fixed package price, because the right starting point depends on what a GrowthOS™ Diagnostic finds for that specific business. Engagements are scoped after that diagnostic, not sold off a rate card.",
  },
];

export const growthOSCta = {
  eyebrow: "Let's talk",
  heading: "Curious where your growth loop is actually breaking?",
  body: "Two ways to start -- pick whichever fits where you are right now.",
  paths: [
    {
      title: "Talk to a consultant",
      body: "Best if you already know you want expert input. A first conversation is a diagnostic, not a pitch -- we'll tell you plainly whether GrowthOS™ is the right starting point.",
      cta: { label: "Start a conversation", to: "/contact" },
    },
    {
      title: "Get your AI Opportunity Report",
      body: "Prefer a data point first? Answer 8 quick questions and get an instant, personalized report you can review before deciding whether to talk to us.",
      cta: { label: "Take the free assessment", to: "/assessment" },
    },
  ],
};
