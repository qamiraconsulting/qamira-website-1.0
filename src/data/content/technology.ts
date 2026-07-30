// Technology page copy -- the "AI Accelerant" layer made concrete: the
// software, agents, and content systems Qamira actually builds, distinct
// from the consulting engagements on the Services page. Framing is
// deliberate: Services diagnoses and redesigns; Technology builds the fix;
// Managed Services (on the Services page) keeps it running. Kept to nine
// offerings across three groups rather than an open-ended menu, to avoid
// the "ecosystem sprawl" pattern flagged in competitive research as a
// competitor weakness.
//
// Each offering also carries detail-page content (howItWorks, benefits,
// goodFitIf) rendered at /technology/:slug -- see TechnologyDetail.tsx.

export const technologyHero = {
  eyebrow: "The AI Accelerant layer, built",
  title: "The technology that makes AI-native execution real, not a slide.",
  lede: "Every QBPES™ engagement identifies where AI should carry the work. This is where we actually build it -- production software, agents, and content systems, not a proof-of-concept that stalls the moment the workshop ends.",
};

export const technologyFraming = {
  eyebrow: "How this fits",
  heading: "Services diagnoses. Technology builds. Managed Services keeps it running.",
  body: "A Services engagement maps what's broken and designs the fix. Technology is where that redesign gets built into working software and agents. Once it's live, our Managed Services retainers (see the Services page) keep it monitored, current, and governed -- so nothing we build is left to degrade unattended.",
};

export type TechnologyOffering = {
  slug: string;
  group: string;
  title: string;
  body: string;
  icon:
    | "chatbot-service"
    | "crm-build"
    | "voice-automation"
    | "ai-video"
    | "content-scheduler"
    | "marketing-automation"
    | "workflow-integration"
    | "knowledge-agent"
    | "document-extraction";
  /** A short, outcome-framed summary -- deliberately not a build spec or a
   * list of data/system inputs, so this stays a reason to talk to us rather
   * than a checklist a prospect (or a competitor) could execute without us. */
  howItWorks: string;
  benefits: string[];
  goodFitIf: string[];
};

export const customerFacingAI: TechnologyOffering[] = [
  {
    slug: "custom-saas-chatbots",
    group: "Customer-facing AI",
    title: "Custom SaaS Applications & AI Chatbots",
    body: "Purpose-built customer service applications with an embedded AI chatbot trained on your actual policies, product catalog, and past resolutions -- not a generic FAQ widget bolted onto your site. Handles first-line triage and routine requests, escalates cleanly to a human the moment a query needs judgment.",
    icon: "chatbot-service",
    howItWorks:
      "Once it's live, it handles routine customer questions and requests on its own, day and night. The moment something needs real judgment, it hands off to a person on your team with full context attached, so nothing gets stuck in a queue or repeated from scratch.",
    benefits: [
      "Faster response times around the clock, without adding headcount to answer the same questions every day.",
      "Your team spends time on the judgment calls that actually need them, not typing the same answer for the fifth time this week.",
      "Consistent answers every time -- no variance based on which staff member happens to pick up the query.",
      "Every conversation is logged and searchable, so you can see exactly what customers are actually asking.",
    ],
    goodFitIf: [
      "Your support team is answering the same handful of questions repeatedly.",
      "Your current chatbot, if you have one, is a generic FAQ widget nobody trusts.",
      "You want automation on the first line, not instead of a human when it matters.",
    ],
  },
  {
    slug: "crm-build-configuration",
    group: "Customer-facing AI",
    title: "CRM Build & Configuration",
    body: "A CRM built or configured around how your sales and account teams actually work, not a generic template you bend your process to fit. Pipeline stages, fields, and automations mirror the process mapped during diagnosis, so adoption doesn't mean retraining your team on someone else's workflow.",
    icon: "crm-build",
    howItWorks:
      "The CRM is set up to match how your team already sells, so there's no retraining on someone else's process. Reminders, updates, and routine entry happen automatically in the background, and your existing tools stay connected rather than replaced.",
    benefits: [
      "Higher adoption -- reps use a system built around their actual job, not one built around someone else's template.",
      "Nothing falls through the cracks -- every lead, follow-up, and renewal date is tracked automatically.",
      "Real pipeline visibility for leadership, without asking reps to manually update a spreadsheet.",
      "Faster onboarding for new hires, since the system reflects the real process from day one.",
    ],
    goodFitIf: [
      "You're running sales through spreadsheets, email, or a CRM nobody actually updates.",
      "A past CRM rollout failed because the tool didn't match how your team sells.",
      "You need pipeline visibility without adding admin work for your reps.",
    ],
  },
  {
    slug: "ai-voice-call-automation",
    group: "Customer-facing AI",
    title: "AI Voice & Call Automation",
    body: "Inbound call handling that triages, books, and routes without a human answering every ring -- especially valuable where the phone is the primary channel. Escalates anything outside its script instantly, and logs every call into your CRM automatically.",
    icon: "voice-automation",
    howItWorks:
      "Every call gets answered immediately, day or night, and routine requests -- bookings, order status, common questions -- get resolved on the spot. Anything outside that gets handed to a person instantly, with the call already logged in your CRM.",
    benefits: [
      "No missed calls, no missed business -- every call gets answered, even outside business hours.",
      "Staff stop losing hours to routine calls that don't need a human.",
      "A searchable record of every call, not a gap in your CRM where phone conversations used to disappear.",
      "Callers get an instant answer instead of a hold queue.",
    ],
    goodFitIf: [
      "The phone is still a primary channel for your customers.",
      "Missed calls are a real, quantifiable cost -- bookings lost, leads gone cold.",
      "Your team spends meaningful time on calls that don't require judgment.",
    ],
  },
];

export const contentAndGrowthSystems: TechnologyOffering[] = [
  {
    slug: "ai-video-creation",
    group: "Content & growth systems",
    title: "AI Video Creation",
    body: "Produces on-brand video content -- product explainers, social clips, client-facing walkthroughs -- that most SMBs can't justify hiring a video team for. The same tooling we use for our own marketing, applied to yours at a fraction of agency cost and turnaround.",
    icon: "ai-video",
    howItWorks:
      "Video content gets produced in your brand's voice and turned around in days, not weeks. A person always reviews before anything ships, so quality and accuracy stay in your hands, not on autopilot.",
    benefits: [
      "Professional video content at a fraction of agency cost and turnaround.",
      "Consistent output -- you're not dependent on one freelancer's availability or a single agency relationship.",
      "Content built for how it'll actually be used -- social, sales, onboarding -- not a generic corporate reel.",
      "The same tooling and workflow Qamira uses for its own marketing, proven internally before it's offered externally.",
    ],
    goodFitIf: [
      "Hiring an in-house video team or agency retainer isn't justified by your current volume.",
      "You need a steady stream of content, not a single one-off production.",
      "Brand consistency matters more than one-off cinematic polish.",
    ],
  },
  {
    slug: "content-scheduling-automation",
    group: "Content & growth systems",
    title: "Content Creation & Scheduled Auto-Publishing",
    body: "Plans, drafts, and queues content across your social handles on a set cadence, so posting doesn't depend on someone remembering to do it every week. A human reviews and approves before anything goes live -- automation handles the grind, not the judgment call.",
    icon: "content-scheduler",
    howItWorks:
      "Content gets planned and drafted ahead of time against a real posting calendar, so it doesn't depend on someone remembering each week. You approve before anything goes live -- automation handles the grind, you keep the judgment call.",
    benefits: [
      "Consistent posting cadence without depending on someone remembering to do it every week.",
      "Marketing doesn't stall the moment the one person who \"does the socials\" is busy or out.",
      "Time back for your team -- review and approve takes minutes, not the hours drafting from scratch would.",
      "A queue you can see and adjust ahead of time, not a scramble the day of.",
    ],
    goodFitIf: [
      "Posting has gone quiet for stretches because nobody had time.",
      "You want consistency without hiring a dedicated social media manager.",
      "You're comfortable with a quick approval step, not full hands-off autopilot.",
    ],
  },
  {
    slug: "marketing-automation-lead-scoring",
    group: "Content & growth systems",
    title: "Marketing Automation & Lead Scoring",
    body: "Nurture sequences and lead scoring that route your sales team's attention to the prospects actually ready to talk, instead of a flat list worked in order received. Built to plug into whatever outreach tool you already run, not a wholesale replacement of it.",
    icon: "marketing-automation",
    howItWorks:
      "Leads get nurtured automatically until they're actually ready to talk, and your sales team's attention goes to the ones showing real intent -- not whoever happened to arrive first. It plugs into the outreach tool you already use, rather than replacing it.",
    benefits: [
      "Sales time spent on the leads most likely to close, not worked in the order they happened to arrive.",
      "Fewer good leads going cold from lack of timely follow-up.",
      "No rip-and-replace of your existing outreach stack.",
      "Clear visibility into why a lead is, or isn't, sales-ready.",
    ],
    goodFitIf: [
      "Your sales team works leads in order received rather than by readiness.",
      "Leads are going cold because nurture follow-up depends on someone remembering.",
      "You already have an outreach tool, but it isn't doing any real scoring.",
    ],
  },
];

export const internalAutomation: TechnologyOffering[] = [
  {
    slug: "workflow-systems-integration",
    group: "Internal automation & intelligence",
    title: "Workflow & Systems Integration Automation",
    body: "Connects the tools you already run so data moves between them without someone re-typing it three times a day -- the exact fix behind our \"five tools doing the job of two\" case study. Scoped only after the diagnosis identifies where the redundancy actually lives.",
    icon: "workflow-integration",
    howItWorks:
      "Once scoped against a real, diagnosed redundancy, your existing tools get connected so information moves between them on its own. Anything that doesn't match up gets flagged for a person to check, rather than failing silently.",
    benefits: [
      "Hours back every week that were spent re-entering the same data across systems.",
      "One place to trust for accurate information, instead of three versions that quietly drift apart.",
      "Fewer manual-entry errors, since data is only typed once.",
      "No forced migration off tools your team already knows.",
    ],
    goodFitIf: [
      "Staff re-type the same information into multiple systems to complete one task.",
      "You've accumulated tools that overlap in function over the years.",
      "A diagnosis has identified where the real redundancy lives -- this is built after that finding, not instead of it.",
    ],
  },
  {
    slug: "internal-knowledge-agents",
    group: "Internal automation & intelligence",
    title: "Internal Knowledge & Document Q&A Agents",
    body: "An internal chatbot trained on your actual SOPs, policies, and past decisions, so staff get a straight answer instead of interrupting a manager or hunting through a shared drive. Every answer traces back to the source document it came from -- no confident-sounding guesses.",
    icon: "knowledge-agent",
    howItWorks:
      "Staff ask a plain-language question and get a straight answer, with the source cited every time so it can be checked, not just trusted. If the answer isn't in your material, it says so instead of guessing.",
    benefits: [
      "Fewer interruptions for managers answering the same policy questions repeatedly.",
      "Consistent answers -- no depending on which manager happens to be reachable, or their memory of a policy that changed last quarter.",
      "Staff get answers in seconds instead of hunting through a shared drive or waiting on a reply.",
      "Every answer is traceable and verifiable, not a confident-sounding guess.",
    ],
    goodFitIf: [
      "Staff regularly interrupt managers with the same recurring questions.",
      "Your SOPs and policies exist but are hard to actually find or search.",
      "You need answers that cite a real source, not just plausible-sounding text.",
    ],
  },
  {
    slug: "document-data-extraction",
    group: "Internal automation & intelligence",
    title: "Document & Data Extraction Automation",
    body: "Reads invoices, contracts, and forms and extracts the fields that matter directly into your systems -- catching the pricing errors and missed renewals our \"revenue leakage\" case study was built around. A human spot-checks a sample, not every document.",
    icon: "document-extraction",
    howItWorks:
      "Routine documents get read and the key details pulled straight into your systems instead of typed in by hand. Anything unusual -- a pricing error, a missed renewal -- gets flagged for a person to check, rather than everything needing a manual review.",
    benefits: [
      "Fewer pricing errors and missed contract renewals slipping through unnoticed.",
      "Hours back from manual data entry that was never the best use of staff time.",
      "Faster processing -- documents get actioned same-day instead of sitting in a queue.",
      "Oversight stays with your team, focused on what's actually flagged as unusual.",
    ],
    goodFitIf: [
      "Your team manually re-keys data from invoices, contracts, or forms.",
      "You suspect, or have found, pricing errors or missed renewals slipping through.",
      "Volume is high enough that spot-checking makes more sense than full manual review.",
    ],
  },
];

export const technologyCta = {
  heading: "Not sure which piece to build first?",
  body: "Most clients start with a Services diagnosis so the build is scoped against a real bottleneck, not a guess. If you already know what you need built, that's a fine place to start a conversation too.",
};
