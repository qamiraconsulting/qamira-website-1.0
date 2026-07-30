// Services page copy, adapted from Master Knowledge Base v1.6 section 6
// (Service Portfolio & Managed Services).

export const servicesHero = {
  eyebrow: "What we do",
  title: "Every service ties back to a QBPES™ domain or lifecycle stage.",
  lede: "Nothing here exists as a standalone offer. Each service is scoped against the eight performance domains and the eight-step delivery process -- so the engagement you start with is sized to the problem you actually have.",
};

export const coreServices = [
  {
    title: "Business Performance Transformation",
    duration: "6–12 weeks",
    body: "The flagship engagement: a full QBPES™ cycle from Discover through Design, for leadership that can feel underperformance but can't yet name its root cause. Deliverables include a current-state maturity assessment across all eight domains, root cause analysis, a Target Operating Model, and a prioritized, sequenced implementation roadmap.",
    icon: "transformation" as const,
  },
  {
    title: "Operational Excellence & Process Optimization",
    duration: "Focused engagement",
    body: "For clients who already know their problem lives in process -- bottlenecks, manual handoffs, unclear ownership -- and want it solved without a full transformation program. Runs faster and at lower cost than a full engagement, a natural fit for teams that need results quickly.",
    icon: "process-optimization" as const,
  },
  {
    title: "Analytics Strategy & BI Engineering",
    duration: "Foundation build",
    body: "For clients whose core issue lives in Data and Technology -- untrustworthy metrics, fragmented tools, dashboards nobody uses. We design and build the analytics foundation: a single source of truth for core KPIs, a rationalized stack, and executive dashboards built to a real storytelling standard. This is the last deliverable of a diagnosis, never the first request taken at face value.",
    icon: "analytics" as const,
  },
  {
    title: "AI Strategy & Custom Agent Implementation",
    duration: "Milestone-based sprints",
    body: "For clients ready for AI-native execution who need it scoped against real business impact, not a generic “add AI” mandate. We identify which processes are genuinely suitable for automation, then run short sprints that implement a working agent or workflow with human-in-the-loop controls -- not a long speculative build.",
    icon: "ai-agent" as const,
  },
];

export const managedServices = [
  {
    title: "Performance Management as a Service",
    body: "A recurring retainer that keeps the KPI architecture and governance cadence installed during a transformation alive on an ongoing basis -- monthly performance reviews, threshold-alert monitoring, and quarterly re-scoring against the QBPES™ maturity model.",
    icon: "performance-retainer" as const,
  },
  {
    title: "AI-Agent-as-a-Service",
    body: "For clients running Qamira-built or Qamira-configured AI agents: ongoing monitoring, prompt and guardrail updates, and periodic re-alignment as data or processes change -- because a deployed agent left unattended degrades.",
    icon: "agent-service" as const,
  },
  {
    title: "Outsourced BI & Dashboard Governance",
    body: "For clients who don't want to build or staff an internal BI function. We maintain the dashboards, data models, and governance standards built during the initial engagement, and handle new requests under one consistent standard instead of dashboard sprawl.",
    icon: "governance" as const,
  },
  {
    title: "Continuous Improvement Advisory",
    body: "A lighter-touch retainer for clients who want periodic senior access -- quarterly strategy check-ins, light-touch process reviews, and priority access to new tools as they're released.",
    icon: "advisory-loop" as const,
  },
];

export const servicesFaq = [
  {
    question: "How is this different from a typical automation agency?",
    answer:
      "An automation agency starts from the tool. We start from a diagnosis -- an automation agency will happily build you a chatbot for a process that shouldn't exist in its current form. QBPES™ identifies the root cause first, so what eventually gets automated is the right fix, not just the first one someone pitched you.",
  },
  {
    question: "What does an engagement actually cost?",
    answer:
      "Pricing scales with client tier and engagement depth rather than a flat rate card -- a focused Operational Excellence engagement costs meaningfully less than a full Business Performance Transformation. A first conversation is a diagnostic, not a sales pitch, and includes a plain-language estimate before anything is scoped.",
  },
  {
    question: "Do I need the full diagnostic before Technology gets built?",
    answer:
      "Not strictly, but it's the default path: most clients start with a Services diagnosis so any build on the Technology page is scoped against a confirmed bottleneck instead of a guess. If you already know exactly what you need built, that's a reasonable place to start a conversation too.",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "It depends on scope -- a focused Operational Excellence engagement can run a few weeks, while a full Business Performance Transformation typically runs 6-12 weeks. Workshops and masterclasses are single-session or short-program commitments, listed with their own duration above.",
  },
];

export const workshops = [
  {
    title: "Business Discovery & Executive Visioning Workshops",
    duration: "1–2 days",
    body: "A structured, facilitated session that runs the Discover stage live with a client's leadership team -- surfacing strategic priorities, pain points, and misalignments in a single room. Frequently the first engagement with a new client: low-risk, fast, and diagnostic.",
    icon: "visioning" as const,
  },
  {
    title: "KPI Architecture & Performance Review Masterclasses",
    duration: "Training program",
    body: "Teaches a client's own leadership and analysts how to design, own, and run the KPI architecture and governance cadence QBPES™ installs -- so performance management capability doesn't stay dependent on us.",
    icon: "kpi-blueprint" as const,
  },
  {
    title: "AI Readiness & Intelligent Automation Bootcamps",
    duration: "Practical bootcamp",
    body: "Walks a client's team through the same readiness rubric we apply internally, so leadership can evaluate its own automation opportunities with real rigor before committing budget to a build.",
    icon: "readiness-checklist" as const,
  },
  {
    title: "Data-Driven Decision Making Seminars",
    duration: "Seminar",
    body: "Focused on the human side of analytics adoption -- how to read a dashboard critically, structure an executive narrative around data, and run a review meeting that changes decisions instead of just reporting numbers.",
    icon: "data-story" as const,
  },
];
