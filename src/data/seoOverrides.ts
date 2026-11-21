// Search-result titles and descriptions, by path, where the page's own copy
// doesn't make a good one. Seo checks this first, so a page can keep a long
// on-page summary while search shows a description that fits.
//
// Limits: titles up to about 60 characters (Google cuts the rest),
// descriptions 120-160. Same copy rules as the site: no prices, "we"
// voice, plain British English.

type SeoOverride = { title?: string; description?: string };

export const seoOverrides: Record<string, SeoOverride> = {
  "/about": {
    title: "About Us: Business Advisory and Technology | Qamira Consulting",
    description:
      "We advise owner-led and mid-sized businesses on what to change, and build the systems that change it. Our team is based in India and works remotely worldwide.",
  },
  "/services": {
    title: "Services: Advisory, Software and Automation | Qamira Consulting",
    description:
      "Every service we offer, from a free assessment to process reviews, custom software, CRMs, chatbots, websites and managed support. Fixed price, agreed up front.",
  },
  "/contact": {
    title: "Contact Us: Book a Free 20-Minute Call | Qamira Consulting",
    description:
      "Tell us what isn't working in your business. Book a free 20-minute call, send us a message, or reach us on WhatsApp or email. We reply within one working day.",
  },
  "/careers": {
    title: "Careers at Qamira Consulting: Advisory and Technology Roles",
    description:
      "Join a remote consulting and technology team based in India, working with businesses in India, Australia, the UK and Europe. See our open roles.",
  },
  "/insights": {
    title: "Business Insights: Performance, Data and AI | Qamira Consulting",
    description:
      "Short articles from our team on running and growing a business: performance, processes, data and reporting, and where AI genuinely helps.",
  },
  "/case-studies": {
    description:
      "Illustrative scenarios showing the problems we solve: revenue leakage, customer churn, process improvement, system clean-up and AI automation.",
  },
  "/ai-solutions": {
    description:
      "How we use AI in our own work: every finding cites its evidence, client data is never used to train shared models, and a person reviews every recommendation.",
  },
  "/growth-os": {
    description:
      "Qamira GrowthOS™ connects how a business wins, converts, delivers and measures customers into one loop, so growth stops depending on guesswork.",
  },
  "/technology": {
    description:
      "Websites, custom software, CRMs, AI chatbots and receptionists, HR software and business automation, built by our technology practice at a fixed price.",
  },

  // Technology offerings
  "/technology/ai-chatbots": {
    description:
      "A chatbot for your website or WhatsApp, trained on your own services and policies. It answers questions, books appointments and passes leads to your team.",
  },
  "/technology/crm-build-configuration": {
    description:
      "A CRM built or set up around how your team actually sells: pipeline stages, lead capture, follow-up reminders and reports that people actually use.",
  },
  "/technology/ai-voice-call-automation": {
    description:
      "An AI receptionist that answers every call, day or night. It books appointments, answers common questions and hands anything tricky to your team.",
  },
  "/technology/websites": {
    description:
      "Fast, mobile-first websites and online stores built to turn visitors into enquiries, bookings and orders, and set up for search from the first day.",
  },
  "/technology/seo-geo": {
    description:
      "Get found on Google and named by AI assistants like ChatGPT. Search optimisation for your site and local listings, plus AI search visibility (GEO).",
  },
  "/technology/ai-video-creation": {
    description:
      "On-brand video for products, services and social channels, produced without hiring a video team. Explainers, short clips and client walkthroughs.",
  },
  "/technology/content-scheduling-automation": {
    description:
      "Content planned, drafted and scheduled across your social channels on a set rhythm, with a person reviewing every post before it goes out.",
  },
  "/technology/marketing-automation-lead-scoring": {
    description:
      "Follow-up emails and lead scoring that point your sales team at the prospects ready to talk, instead of working a flat list in the order it arrived.",
  },
  "/technology/hr-software": {
    description:
      "HR software built around how you manage people: staff records, leave, hiring and reviews in one place, replacing spreadsheets and paper forms.",
  },
  "/technology/workflow-systems-integration": {
    description:
      "We connect the tools you already use so data moves between them automatically, instead of someone re-typing it into three systems every day.",
  },
  "/technology/internal-knowledge-agents": {
    description:
      "An internal assistant trained on your own procedures and policies, so staff get a straight answer without interrupting a manager or searching folders.",
  },
  "/technology/document-data-extraction": {
    description:
      "Invoices, contracts and forms read automatically, with the fields that matter sent straight into your systems and errors flagged for a person to check.",
  },

  // Country service pages
  "/au/custom-software": {
    title: "Custom Software Development in Australia | Qamira Consulting",
    description:
      "Custom software, business systems and client portals for growing Australian businesses, with a written scope and a fixed quote before work starts.",
  },
  "/uk/custom-software": {
    description:
      "Custom software, business systems and client portals for growing UK businesses, with a written scope and a fixed quote before any work starts.",
  },
  "/us/custom-software": {
    description:
      "Custom software, business systems and client portals for growing US businesses, with a written scope and a fixed quote before any work starts.",
  },
  "/in/custom-software": {
    description:
      "Custom software, ERP and client portals for growing Indian businesses: orders, stock, production and billing in one place, at a fixed quote.",
  },
  "/au/website-development": {
    title: "Website Development for Australian Businesses | Qamira Consulting",
    description:
      "Mobile-first websites for Australian small businesses, built to turn visitors into enquiries and bookings, with your Google Business Profile linked.",
  },
  "/au/ai-chatbot": {
    description:
      "A website chatbot for Australian businesses, trained on your own services and policies. It answers, quotes and books day and night, then hands over.",
  },
  "/uk/ai-chatbot": {
    description:
      "A website chatbot for UK businesses, trained on your own services and policies. It answers questions, quotes and books day and night, then hands over.",
  },
  "/us/ai-chatbot": {
    description:
      "A website chatbot for US businesses, trained on your own services and policies. It answers questions, quotes and books day and night, then hands over.",
  },
  "/au/google-business-profile": {
    title: "Google Business Profile Optimisation (AU) | Qamira Consulting",
    description:
      "Done-for-you Google Business Profile and local SEO for Australian tradies, clinics and local businesses, so you show up in local search and on Maps.",
  },
  "/in/ai-chatbot": { title: "WhatsApp and Website AI Chatbots in India | Qamira Consulting" },
  "/au/business-automation": { title: "Business Automation and Integration (AU) | Qamira Consulting" },
  "/uk/business-automation": { title: "Business Automation and Integration (UK) | Qamira Consulting" },
  "/us/business-automation": { title: "Business Automation and Integration (US) | Qamira Consulting" },
  "/in/business-automation": { title: "Business Automation and Integration in India | Qamira Consulting" },

  // Industries
  "/industries/construction-infrastructure": { title: "Construction and Infrastructure Consulting | Qamira Consulting" },
  "/industries/public-sector-education": { title: "Public Sector and Education Consulting | Qamira Consulting" },

  // Careers
  "/careers/sales-executive-australia": {
    description:
      "Sales executive role, based in Pune and working from home, selling our advisory and technology services to Australian businesses. See the role and apply.",
  },
  "/careers/business-development-manager": {
    description:
      "Business development manager role, based in Pune and working from home, winning and growing advisory and technology clients. See the role and apply.",
  },

  // Insights: long headlines lose the brand suffix rather than the headline.
  "/insights/what-breaks-first-scaling-headcount-before-process": {
    title: "What breaks first when a startup scales headcount before process",
  },
  "/insights/why-we-score-ai-readiness-first": { title: "Why we score AI readiness before we recommend automation" },
  "/insights/dashboard-is-the-last-deliverable": { title: "The dashboard is the last deliverable, not the first" },
  "/insights/divergence-is-a-finding": { title: "Divergence is a finding, not a data quality problem" },
  "/insights/most-common-finding-in-every-data-audit": { title: "The most common finding in every data audit we run" },
};
