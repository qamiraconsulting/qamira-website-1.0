// /in/:slug -- Indian landing pages for the build services, one per ad group
// in the India "Custom Software" Google Ads campaign
// (Sales/Qamira_Google_Ads_India_Custom_Software_Campaign.md):
//   /in/custom-software        QC-309 Custom Software, ERP & Portals
//   /in/erp-crm-development    QC-307 CRM Build + QC-309 for custom ERP
//   /in/business-automation    QC-301 Automation Quick-Win + QC-306 Integration
//   /in/ai-chatbot             QC-302 Custom AI Chatbot + QC-503 run service (WhatsApp-led)
//   /in/website-development    QC-401 Website Starter + QC-402 Website Growth
//
// Rules this copy keeps:
// - No prices on the website, by decision (2026-10-20): "from" prices appear
//   in the ads only, and the visitor gets a fixed quote after the free
//   scoping call. Keep figures out of this file too -- it ships in the public
//   JS bundle.
// - Brand-only voice, no founder name.
// - The proof client is described, never named (private 1:1 outreach only).
//   The /case-studies scenarios are illustrative composites, so they are
//   never cited here as results.
// - No vendor or platform names we don't have a partnership with.

export type InServicePage = {
  slug: string;
  serviceCodes: string[];
  seoTitle: string;
  description: string;
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  lede: string;
  photo: { src: string; label: string };
  pain: { eyebrow: string; heading: string; lede: string; points: string[] };
  build: { eyebrow: string; heading: string; lede: string; items: { title: string; body: string }[] };
  faq: { question: string; answer: string }[];
  cta: { heading: string; body: string };
  related: { label: string; to: string };
};

// Shared by all three pages.
export const inPromiseLine = "Free 20-minute scoping call. A written scope and fixed quote before any work starts.";

export const inPricing = {
  eyebrow: "What it costs",
  heading: "A fixed quote for your scope, before any work starts.",
  points: [
    "Every build is quoted on its own scope, so you pay for what your business needs and nothing more.",
    "You get the scope, milestones and a fixed price in writing after a free 20-minute scoping call.",
    "Payment is tied to milestones you sign off, not to hours.",
    "Software licences, if any, are passed through at cost.",
  ],
};

export const inProcess = {
  eyebrow: "How a build works",
  heading: "A clear scope first, then a build you sign off in stages.",
  steps: [
    {
      title: "Scoping call",
      body: "Twenty minutes on what slows your team down, the systems you use today, and what a good result looks like. Free, no obligation.",
    },
    {
      title: "Written scope and quote",
      body: "What we'll build, what it connects to, the milestones and a fixed price. Nothing starts until you agree it.",
    },
    {
      title: "Build in milestones",
      body: "You see working pieces every week or two and sign each one off. Your team tests it on real work before it goes live.",
    },
    {
      title: "Live, then looked after",
      body: "We train your team, hand over the documentation and stay on for fixes and changes, with optional monthly support.",
    },
  ],
};

export const inProof = {
  eyebrow: "Built and running",
  heading: "We build software that real businesses run on every day.",
  body: [
    "For a Melbourne removals company we built an instant-quote engine and booking system: a job goes in, and the customer gets a branded quote in about 20 seconds, worked out from the company's own rate card.",
    "Its website chat assistant now quotes and books on that same engine, with a dashboard where the team manages every booking.",
    "The same thinking goes into every build: start from how the work actually happens, connect what's already there, and only build what pays back.",
  ],
  note: "Client named on request in a private conversation.",
};

export const inServicePages: InServicePage[] = [
  {
    slug: "custom-software",
    serviceCodes: ["QC-309"],
    seoTitle: "Custom Software Development for Indian SMEs",
    description:
      "Custom software, ERP and client portals for growing Indian businesses that have outgrown Excel and WhatsApp. Written scope and fixed quote after a free 20-minute scoping call.",
    breadcrumbLabel: "Custom Software (India)",
    eyebrow: "Custom software · India",
    title: "Software built around how your business actually runs.",
    lede: "Custom applications, ERP and client portals for growing Indian businesses that have outgrown Excel sheets, WhatsApp groups and a patchwork of tools. Built to fit your process, connected to what you already use.",
    photo: { src: "/photos/technology/ai-chatbots.webp", label: "A laptop showing a custom business application." },
    pain: {
      eyebrow: "Sound familiar?",
      heading: "When the business outgrows the tools it started with.",
      lede: "Most growing firms run on a mix of Tally, Excel, WhatsApp and one or two apps that were never meant to work together. It holds until it doesn't.",
      points: [
        "The same order, invoice or customer gets typed into three different places.",
        "Only one or two people know how the master spreadsheet really works.",
        "Off-the-shelf software forces you to change how you work, or needs ten workarounds.",
        "Getting a simple answer, like what's pending or what we're owed, means asking around.",
      ],
    },
    build: {
      eyebrow: "What we build",
      heading: "One system that fits the way your team works.",
      lede: "We build only what off-the-shelf tools can't do well for you, and connect it to the tools that already work.",
      items: [
        {
          title: "Operations and ERP systems",
          body: "Orders, inventory, production, dispatch and billing in one place, shaped around your actual process.",
        },
        {
          title: "Client and vendor portals",
          body: "Let customers or suppliers check status, upload documents and raise requests without calling or messaging your team.",
        },
        {
          title: "Booking and scheduling systems",
          body: "Quotes, slots matched to staff and vehicle availability, deposits and confirmations, with a dashboard for your team.",
        },
        {
          title: "Dashboards on live data",
          body: "One screen with the numbers that matter, updated automatically instead of compiled by hand every Monday.",
        },
      ],
    },
    faq: [
      {
        question: "How much does custom software cost?",
        answer: "It depends on what the software needs to do and connect to. After a free 20-minute scoping call you get a written scope and a fixed quote, before any work starts. No obligation.",
      },
      {
        question: "How long does a build take?",
        answer: "It depends on scope, so we agree the timeline in the written scope before starting. You see working pieces every week or two and sign each milestone off.",
      },
      {
        question: "Will it work with Tally, Excel and the tools we already use?",
        answer: "That's usually the point. We connect to the systems you keep, so data is entered once and flows to the others, rather than forcing a switch.",
      },
      {
        question: "Do you work outside Pune and Mumbai?",
        answer: "Yes. We're based in Pune and work with businesses across India. Scoping, builds and support all work well remotely.",
      },
    ],
    cta: {
      heading: "Tell us what the business has outgrown.",
      body: "Book a free 20-minute scoping call. We'll look at how the work runs today and tell you honestly whether custom software is the right answer, or something simpler is.",
    },
    related: { label: "ERP & CRM builds", to: "/in/erp-crm-development" },
  },
  {
    slug: "erp-crm-development",
    serviceCodes: ["QC-307", "QC-309"],
    seoTitle: "ERP & CRM Development for Indian Businesses",
    description:
      "CRM and custom ERP builds set up around how your Indian business sells and operates. Written scope and fixed quote after a free 20-minute scoping call.",
    breadcrumbLabel: "ERP & CRM Builds (India)",
    eyebrow: "ERP & CRM builds · India",
    title: "A CRM and ERP set up around how you sell and operate.",
    lede: "Whether you need a CRM your sales team will actually use or an ERP that ties orders, stock and billing together, we build and configure it around your process and connect it to the tools you keep.",
    photo: { src: "/photos/technology/crm-build-configuration.webp", label: "A laptop showing a sales pipeline view." },
    pain: {
      eyebrow: "Sound familiar?",
      heading: "Leads, orders and stock living in different places.",
      lede: "Sales tracks leads in a spreadsheet, operations works from WhatsApp, accounts lives in Tally, and nobody has the full picture.",
      points: [
        "Follow-ups slip because nobody can see which leads are waiting on a reply.",
        "The CRM you bought is half set up, and the team went back to Excel.",
        "Stock, orders and invoices don't match, and month-end means reconciling by hand.",
        "Management asks for a sales or stock report and someone spends a day building it.",
      ],
    },
    build: {
      eyebrow: "What we build",
      heading: "From a working CRM to a full ERP.",
      lede: "We start with the smallest system that fixes the problem, and build up from there only if it pays back.",
      items: [
        {
          title: "CRM build and configuration",
          body: "Pipeline stages, lead capture from your website and WhatsApp, follow-up reminders and reports, set up around how your team actually sells.",
        },
        {
          title: "Custom ERP",
          body: "Orders, inventory, production, dispatch and billing in one system, designed for your process instead of a generic template.",
        },
        {
          title: "Connected to your accounts",
          body: "Data flows to and from your accounting system and spreadsheets, so invoices and stock are typed once.",
        },
        {
          title: "Reports that build themselves",
          body: "Sales, stock and receivables reports that update automatically, with clear definitions for every number.",
        },
      ],
    },
    faq: [
      {
        question: "How much does a CRM or ERP build cost?",
        answer: "A CRM setup costs far less than a custom ERP, and both depend on your scope. You get a written scope and fixed quote after a free 20-minute scoping call. Software licences, if any, are passed through at cost.",
      },
      {
        question: "Should we buy an off-the-shelf CRM or ERP, or build one?",
        answer: "Often a well-configured off-the-shelf CRM is the right answer, and we'll say so. Custom makes sense when your process is what sets you apart, or when the ready-made options need too many workarounds.",
      },
      {
        question: "Can you move our data from Excel or an old system?",
        answer: "Yes. Cleaning up and moving your existing customers, products and open orders is part of the scope, so the team starts with real data on day one.",
      },
      {
        question: "Will our team actually use it?",
        answer: "We design it with the people who'll use it, train them, and stay on after go-live to fix what gets in their way. Adoption is part of the job, not an afterthought.",
      },
      {
        question: "How long does it take?",
        answer: "A CRM setup typically takes 3 to 5 weeks. A custom ERP depends on scope; we agree the timeline in writing and deliver it in milestones you sign off.",
      },
    ],
    cta: {
      heading: "Get one picture of sales and operations.",
      body: "Book a free 20-minute scoping call. We'll look at how leads, orders and stock move today, and whether a CRM, an ERP or something smaller is the right next step.",
    },
    related: { label: "Business automation & integration", to: "/in/business-automation" },
  },
  {
    slug: "business-automation",
    serviceCodes: ["QC-306", "QC-301"],
    seoTitle: "Business Automation & Systems Integration in India",
    description:
      "Connect Tally, Excel, your CRM and other tools so data is typed once, with no forced switch to new software. Fixed quote after a free scoping call.",
    breadcrumbLabel: "Business Automation (India)",
    eyebrow: "Automation & integration · India",
    title: "Stop typing the same data into three different systems.",
    lede: "We connect the tools you already use, such as your accounting system, Excel, CRM and email, so information is entered once and moves on its own. No forced switch to new software.",
    photo: { src: "/photos/technology/workflow-systems-integration.webp", label: "A laptop showing connected business systems." },
    pain: {
      eyebrow: "Sound familiar?",
      heading: "Hours lost every week to copy and paste.",
      lede: "Most of the manual work in a growing business isn't hard. It's the same data moved by hand from one system to another, again and again.",
      points: [
        "Orders arrive on email or WhatsApp and get re-typed into the accounting system.",
        "Someone spends Monday morning compiling the same report from three spreadsheets.",
        "Numbers in different systems quietly drift apart, and nobody knows which one is right.",
        "A small typo in one place turns into a wrong invoice or a missed delivery.",
      ],
    },
    build: {
      eyebrow: "What we automate",
      heading: "Connect what you have before buying anything new.",
      lede: "We start from the work your team repeats most and automate the parts that don't need a person's judgment. Anything that doesn't match gets flagged for a person to check.",
      items: [
        {
          title: "System-to-system connections",
          body: "Your accounting system, CRM, spreadsheets and order tools kept in step, so data is typed once.",
        },
        {
          title: "Order and invoice capture",
          body: "Details pulled from emails, forms and documents into the right system, with exceptions sent to a person.",
        },
        {
          title: "Reports and reminders",
          body: "Daily and weekly reports compiled and sent automatically, plus reminders for follow-ups, renewals and payments.",
        },
        {
          title: "Approvals and hand-offs",
          body: "Requests routed to the right person in the right order, with a clear record of who approved what.",
        },
      ],
    },
    faq: [
      {
        question: "How much does business automation cost?",
        answer: "A single, tightly scoped automation costs less than connecting several systems. Either way, you get a written scope and fixed quote after a free 20-minute scoping call.",
      },
      {
        question: "Do we have to replace our current software?",
        answer: "No. The aim is to connect what you already use. We only suggest replacing a tool when it genuinely can't connect to anything.",
      },
      {
        question: "Can you connect to Tally?",
        answer: "In most cases, yes, depending on your version and how it's set up. We check this on the scoping call before quoting.",
      },
      {
        question: "What happens when an automation hits something unusual?",
        answer: "It stops and flags it for a person instead of guessing. You see what was flagged and why, so nothing goes wrong silently.",
      },
      {
        question: "How quickly can we see results?",
        answer: "A single automation usually goes live in 2 to 3 weeks. Larger integrations take 3 to 6 weeks, delivered in stages.",
      },
    ],
    cta: {
      heading: "Find the copy-and-paste work worth automating first.",
      body: "Book a free 20-minute scoping call. Tell us which tasks your team repeats every day, and we'll tell you which ones are worth automating and roughly what it would cost.",
    },
    related: { label: "Custom software", to: "/in/custom-software" },
  },
  {
    // Leads with WhatsApp: in India that is where customers ask first.
    slug: "ai-chatbot",
    serviceCodes: ["QC-302", "QC-503"],
    seoTitle: "WhatsApp & Website AI Chatbots for Indian Businesses",
    description:
      "An AI chatbot for WhatsApp and your website, trained on your products, prices and policies. Answers in English, Hindi and more, books and hands over to your team.",
    breadcrumbLabel: "AI Chatbots (India)",
    eyebrow: "WhatsApp & website chatbots · India",
    title: "A WhatsApp chatbot that answers customers while your team is busy.",
    lede: "An AI chatbot for WhatsApp and your website, trained on your own products, prices and policies. It answers questions, shares details and payment links, takes orders and bookings, and hands the chat to your team when a person is needed.",
    photo: { src: "/photos/technology/internal-knowledge-agents.webp", label: "A laptop showing an AI assistant answering a question." },
    pain: {
      eyebrow: "Sound familiar?",
      heading: "WhatsApp is busy, and every reply waits for a person.",
      lede: "Most Indian customers would rather send a WhatsApp message than fill a form or make a call. That works until the messages arrive faster than your team can answer them.",
      points: [
        "The same questions come in all day: price, stock, timings, location, delivery.",
        "Messages after 7pm and on Sundays wait until the next working day, and the customer has moved on.",
        "Replies depend on who picks up the phone, so prices and promises vary.",
        "Enquiries sit in one person's phone instead of in a system the business can see.",
      ],
    },
    build: {
      eyebrow: "What we build",
      heading: "A chatbot that knows your business, in your customers' language.",
      lede: "We train it on your catalogue, price list and policies, set clear limits on what it answers, and connect it to the tools you already use.",
      items: [
        {
          title: "WhatsApp first, website too",
          body: "One assistant on your WhatsApp business number and your website, so customers get the same answer wherever they ask.",
        },
        {
          title: "English, Hindi and regional languages",
          body: "It replies in the language the customer writes in, including Hindi and mixed Hindi-English, and in other Indian languages where you need them.",
        },
        {
          title: "Orders, bookings and payment links",
          body: "Takes the order or booking, sends a UPI payment link where you use one, and confirms it, with every chat saved to your CRM or a shared sheet.",
        },
        {
          title: "Hand-over to your team",
          body: "Complaints, bulk orders and anything unusual go to a person with the chat attached, so nobody has to ask the customer to repeat themselves.",
        },
      ],
    },
    faq: [
      {
        question: "How much does a WhatsApp chatbot cost?",
        answer: "It depends on what it needs to know and connect to. After a free 20-minute scoping call you get a written scope and a fixed quote, before any work starts. WhatsApp's own messaging charges are separate and passed through at cost.",
      },
      {
        question: "Can it run on our existing WhatsApp number?",
        answer: "Usually, yes, once the number is moved to a WhatsApp Business account that allows automated replies. We check this on the scoping call and handle the set-up with you.",
      },
      {
        question: "Will it make things up?",
        answer: "It answers only from the information you approve. When it isn't sure, it says so and passes the chat to your team. We test it on real customer questions before it goes live.",
      },
      {
        question: "What about customer data and the DPDP Act?",
        answer: "The chatbot collects only what it needs to answer, book or take an order, and tells customers it's an automated assistant. We give you a plain list of what it stores and for how long, so you can check it against your obligations under the Digital Personal Data Protection Act.",
      },
      {
        question: "How long does it take?",
        answer: "Usually 2 to 4 weeks from the scoping call, depending on how many of your systems it connects to.",
      },
    ],
    cta: {
      heading: "See what a WhatsApp chatbot would handle for you.",
      body: "Book a free 20-minute scoping call. Show us the questions your team answers every day, and we'll tell you honestly how many a chatbot could take on.",
    },
    related: { label: "Business automation & integration", to: "/in/business-automation" },
  },
  {
    slug: "website-development",
    serviceCodes: ["QC-401", "QC-402"],
    seoTitle: "Website Development for Indian Businesses",
    description:
      "Fast, mobile-first websites for Indian businesses, built to bring in enquiries on WhatsApp, calls and forms. Written scope and fixed quote after a free scoping call.",
    breadcrumbLabel: "Website Development (India)",
    eyebrow: "Website development · India",
    title: "A website that brings in enquiries, not just visitors.",
    lede: "Mobile-first websites for Indian businesses, built for the phones and connections your customers actually use, and for the one thing a site is for: getting the right people to message, call or ask for a quote.",
    photo: { src: "/photos/technology/marketing-automation-lead-scoring.webp", label: "A laptop showing where enquiries come from." },
    pain: {
      eyebrow: "Sound familiar?",
      heading: "The site exists. It just doesn't bring in business.",
      lede: "Many business websites in India were built once, handed over and never looked at again. Customers find you through search and maps, open the site on a phone, and leave.",
      points: [
        "It loads slowly on mobile data, so visitors give up before it opens.",
        "There's no quick way to message you on WhatsApp or call from the page.",
        "Your products or services aren't described in the words customers search for.",
        "You can't tell which enquiries came from the website, so you can't tell whether it's working.",
      ],
    },
    build: {
      eyebrow: "What we build",
      heading: "From a clean starter site to a full enquiry and booking flow.",
      lede: "We build the smallest site that does the job, then add catalogues, quote forms and bookings only where they pay back.",
      items: [
        {
          title: "Starter website",
          body: "A fast, mobile-first site of about six pages with click-to-WhatsApp, click-to-call, an enquiry form, basic search set-up and analytics.",
        },
        {
          title: "Catalogue and enquiry flows",
          body: "Product or service pages, quote requests and bookings that arrive in your inbox or CRM with the details already filled in.",
        },
        {
          title: "Found in search and maps",
          body: "Service and location pages for the areas you cover, your business profile linked, and the technical set-up search engines and AI answers look for.",
        },
        {
          title: "English and Hindi, if you need it",
          body: "Pages in Hindi or another Indian language alongside English, for customers who search in their own language.",
        },
      ],
    },
    faq: [
      {
        question: "How much does a website cost?",
        answer: "A starter site costs much less than one with catalogues and booking flows, and both depend on the pages and features you need. You get a written scope and fixed quote after a free 20-minute scoping call.",
      },
      {
        question: "How long does it take?",
        answer: "A starter site usually takes 2 to 3 weeks. A site with enquiry and booking flows takes 4 to 6 weeks, delivered in stages you sign off.",
      },
      {
        question: "Will we be able to update it ourselves?",
        answer: "Yes. We hand over access and show your team how to change text, prices and photos. Optional monthly care covers hosting, updates, backups and small changes.",
      },
      {
        question: "Can you redo our existing site rather than start again?",
        answer: "Often, yes. We look at what's working on the current site first and keep it, then fix what's costing you enquiries.",
      },
      {
        question: "Do you work outside Pune and Mumbai?",
        answer: "Yes. We're based in Pune and work with businesses across India. Scoping, builds and support all work well remotely.",
      },
    ],
    cta: {
      heading: "Find out what your website is missing.",
      body: "Book a free 20-minute scoping call. We'll look at your current site with you and tell you honestly whether it needs a rebuild, a few fixes, or nothing at all.",
    },
    related: { label: "WhatsApp & website chatbots", to: "/in/ai-chatbot" },
  },
];

export const inServicePageBySlug: Record<string, InServicePage> = Object.fromEntries(
  inServicePages.map((p) => [p.slug, p]),
);
