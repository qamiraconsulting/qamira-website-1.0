// Technology page copy -- the "AI Accelerant" layer made concrete: the
// software, agents, and content systems Qamira actually builds, distinct
// from the consulting engagements on the Services page. Framing is
// deliberate: Services diagnoses and redesigns; Technology builds the fix;
// Managed Services (on the Services page) keeps it running. Kept to twelve
// offerings across three groups rather than an open-ended menu, to avoid
// the "ecosystem sprawl" pattern flagged in competitive research as a
// competitor weakness.
//
// Each offering also carries detail-page content (howItWorks, benefits,
// goodFitIf) rendered at /technology/:slug -- see TechnologyDetail.tsx.

export const technologyHero = {
  eyebrow: "Technology practice",
  title: "Software, AI and automation, built at a fixed price in weeks.",
  lede: "We build the systems a business runs on: websites, custom software, CRMs, chatbots and AI receptionists, and the automation that connects them. Each one is scoped in writing and priced before we start, and it goes into daily use, not a pilot that stalls.",
};

export const technologyFraming = {
  eyebrow: "How this fits",
  heading: "Advice, a build or both, and support once it's live.",
  body: "Our advisory practice helps you decide what to change. Our technology practice builds it, whether the plan came from us, from you or from someone else. Once it's live, our managed services keep it monitored and up to date, so nothing we build is left to degrade.",
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
  /** Other names people search for; added to the Service schema. */
  alternateNames?: string[];
  /** Market-specific landing pages for the same offering, linked from the hero. */
  localVersions?: { lead: string; links: { label: string; path: string }[] };
  /** Hero photo, when it isn't /photos/technology/<slug>.webp. */
  photo?: string;
};

// Country page links, for offerings that have country versions.
const countryLinks = (slug: string, regions: ("in" | "au" | "uk" | "us")[]) => {
  const names = { in: "India", au: "Australia", uk: "UK", us: "US" } as const;
  return regions.map((r) => ({ label: names[r], path: `/${r}/${slug}` }));
};

export const customerFacingAI: TechnologyOffering[] = [
  {
    // Was /technology/custom-saas-chatbots ("Custom SaaS Applications & AI
    // Chatbots"). vercel.json 301s the old URL here; social bios link to it.
    slug: "ai-chatbots",
    group: "Customer-facing AI",
    title: "AI Chatbots",
    body: "A chatbot for your website or WhatsApp, trained on your own policies, products and past answers rather than a generic FAQ widget. It answers routine questions and takes bookings day and night, and hands over to your team, with the conversation attached, when a question needs judgement.",
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
    alternateNames: ["AI chatbot", "Website chatbot", "WhatsApp chatbot", "Customer service chatbot"],
    localVersions: {
      lead: "See AI chatbots for your country:",
      links: countryLinks("ai-chatbot", ["in", "au", "uk", "us"]),
    },
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
    title: "AI Receptionist & Call Automation",
    // "AI receptionist" is what people actually search for; the old title,
    // "AI Voice & Call Automation", stays as an alternate name in the schema.
    alternateNames: ["AI receptionist", "AI Voice & Call Automation", "AI answering service", "AI phone answering"],
    body: "An AI receptionist that answers every call, day or night. It books appointments, answers common questions, takes details and hands anything tricky to your team, so missed calls stop turning into lost business. Every call is logged in your CRM automatically.",
    icon: "voice-automation",
    howItWorks:
      "Calls you don't pick up, or every call after hours, go to your AI receptionist on your existing number. It answers straight away, tells callers it's an AI assistant, and handles the routine: bookings, common questions and details for a quote. Anything outside that is handed to a person with a summary, and every call is logged in your CRM.",
    benefits: [
      "No missed calls, no missed business. Every call gets answered, even after hours and at weekends.",
      "Bookings made on the call, straight into your calendar or booking system.",
      "Staff stop losing hours to routine calls that don't need a human.",
      "Anything urgent or unusual reaches a person with a summary, instead of getting stuck with a bot.",
      "A searchable record of every call, not a gap in your CRM where phone conversations used to disappear.",
    ],
    goodFitIf: [
      "The phone is still a primary channel for your customers.",
      "Calls go unanswered while you're with a customer, on a job or closed for the day.",
      "Missed calls are costing you bookings and letting leads go cold.",
      "Your team spends meaningful time on calls that don't require judgment.",
    ],
    localVersions: {
      lead: "See the AI receptionist for your country:",
      links: countryLinks("ai-receptionist", ["au", "uk", "us"]),
    },
  },
];

export const contentAndGrowthSystems: TechnologyOffering[] = [
  {
    slug: "websites",
    group: "Content & growth systems",
    title: "Websites & Online Stores",
    alternateNames: ["Website development", "Website design", "Online store development", "Ecommerce website"],
    body: "Fast, mobile-first websites and online stores built around the one thing a site is for: turning visitors into enquiries, bookings and orders. Set up for search from day one, with every enquiry tracked back to where it came from.",
    icon: "marketing-automation",
    photo: "/photos/technology/marketing-automation-lead-scoring.webp",
    howItWorks:
      "We start from what the site needs to produce, whether that's calls, quote requests, bookings or orders, and build the smallest site that does it well. Quote forms, booking flows and payments are added only where they pay back. You can update text, prices and photos yourself, and optional monthly care covers hosting, updates and backups.",
    benefits: [
      "A site that loads quickly on a phone, where most of your visitors are.",
      "Visitors can see in seconds what you do, where you work and how to get in touch.",
      "Enquiries, bookings and orders arrive with the details filled in, not as a vague message.",
      "Every call, form and order tracked back to the page, search or ad that brought it in.",
    ],
    goodFitIf: [
      "Your current site looks fine but rarely brings in work.",
      "It's slow or awkward on a phone, or hard to update.",
      "You want to take bookings or sell online without a separate system for each.",
    ],
    localVersions: {
      lead: "See website development for your country:",
      links: countryLinks("website-development", ["in", "au", "uk", "us"]),
    },
  },
  {
    slug: "seo-geo",
    group: "Content & growth systems",
    title: "SEO & AI Search Visibility (GEO)",
    alternateNames: ["Search engine optimisation", "Generative engine optimisation", "AI search optimisation", "Local SEO"],
    body: "Getting found when customers search, and named when they ask an AI assistant for a recommendation. Search engine optimisation (SEO) for your site and local listings, plus generative engine optimisation (GEO) so AI answers can find and cite you.",
    icon: "content-scheduler",
    photo: "/photos/technology/content-scheduling-automation.webp",
    howItWorks:
      "We check how you show up today: in search results, in maps and local listings, and in the answers AI assistants give to the questions your customers ask. Then we fix the site structure, pages and listings that hold you back, and add the content and evidence AI answers draw on. You get a short report each month on what changed and what it brought in.",
    benefits: [
      "Found by customers searching for what you do, in the places you work.",
      "A business profile and listings that are complete, consistent and reviewed.",
      "A better chance of being named when someone asks an AI assistant who to call.",
      "Plain monthly reporting on rankings, mentions and the enquiries they produced.",
    ],
    goodFitIf: [
      "Competitors show up in search and AI answers, and you don't.",
      "Most of your work comes from referrals and you want a second steady source.",
      "You've paid for SEO before and couldn't tell what it achieved.",
    ],
  },
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
    slug: "hr-software",
    group: "Internal automation & intelligence",
    title: "HR Software",
    alternateNames: ["HRM system", "HR management software", "Leave management system", "Staff records system"],
    body: "One place for staff records, leave, hiring and reviews, built around how your business actually manages people. It replaces the spreadsheets, paper forms and message threads that HR runs on in most growing firms.",
    icon: "workflow-integration",
    photo: "/photos/technology/workflow-systems-integration.webp",
    howItWorks:
      "We map how staff records, leave requests, hiring and reviews work in your business today, then set up a system that follows the same rules, with approvals going to the right manager. Staff request leave and see their own details, managers approve in a click, and the owner sees the whole picture without asking around. Where you already run payroll, we connect to it rather than replace it.",
    benefits: [
      "Staff records, documents and leave balances in one place, not spread across spreadsheets and inboxes.",
      "Leave and other requests approved by the right person, with a record of who approved what.",
      "Hiring tracked from application to offer, so good candidates don't get lost.",
      "Reviews and probation dates that come round on time instead of being forgotten.",
    ],
    goodFitIf: [
      "HR lives in spreadsheets, paper forms and message threads.",
      "Nobody is quite sure how much leave anyone has left.",
      "Off-the-shelf HR software is either too expensive or doesn't fit how you work.",
    ],
  },
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
