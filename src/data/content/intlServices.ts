// /au/:slug and /uk/:slug -- Australian and UK landing pages for the build
// services, one per ad group in the "AU - Search - Software & Web" and
// "UK - Search - Software & Web" Google Ads campaigns
// (Sales/Qamira_Google_Ads_AU_UK_Software_Campaigns.md):
//   /<region>/custom-software        QC-309 Custom Software, ERP & Portals
//   /<region>/crm-development        QC-307 CRM Build + QC-309 for bigger systems
//   /<region>/business-automation    QC-301 Automation Quick-Win + QC-306 Integration
//   /<region>/website-development    QC-401 Website Starter + QC-402 Website Growth
//
// Same rules as inServices.ts: no prices on the website, brand-only voice,
// the proof client described but never named, and no partnership claims.
// The team is in India and works remotely; the FAQ says so plainly, the same
// way the Melbourne consulting page does.

import type { InServicePage } from "@/data/content/inServices";

type RegionCopy = {
  prefix: "au" | "uk";
  label: string; // breadcrumb suffix and eyebrow
  adjective: string; // "Australian", "UK"
  hours: string; // whose business hours calls run in
  accounts: string; // the accounting tools a buyer here typically uses
  reach: string; // where we work, for the "outside X" FAQ
};

const regions: RegionCopy[] = [
  {
    prefix: "au",
    label: "Australia",
    adjective: "Australian",
    hours: "Australian business hours",
    accounts: "Xero or MYOB",
    reach: "anywhere in Australia, from Melbourne and Sydney to Brisbane, Perth and regional towns",
  },
  {
    prefix: "uk",
    label: "UK",
    adjective: "UK",
    hours: "UK business hours",
    accounts: "Xero, Sage or QuickBooks",
    reach: "anywhere in the UK, from London and Manchester to Birmingham, Leeds and Glasgow",
  },
];

function teamFaq(r: RegionCopy) {
  return {
    question: "Where is your team based?",
    answer: `Our team is based in India and works remotely with ${r.adjective} businesses. Scoping calls and check-ins run by video during ${r.hours}, and builds and support are online. We work with businesses ${r.reach}.`,
  };
}

function pagesFor(r: RegionCopy): InServicePage[] {
  const p = `/${r.prefix}`;
  return [
    {
      slug: "custom-software",
      serviceCodes: ["QC-309"],
      seoTitle: `Custom Software Development for ${r.adjective} Businesses`,
      description: `Custom software, business systems and client portals for growing ${r.adjective} businesses that have outgrown spreadsheets. Written scope and fixed quote after a free 20-minute scoping call.`,
      breadcrumbLabel: `Custom Software (${r.label})`,
      eyebrow: `Custom software · ${r.label}`,
      title: "Software built around how your business actually runs.",
      lede: `Custom applications, business systems and client portals for growing ${r.adjective} businesses that have outgrown spreadsheets, shared inboxes and a patchwork of apps. Built to fit your process, connected to what you already use.`,
      photo: { src: "/photos/technology/custom-saas-chatbots.jpg", label: "A laptop showing a custom business application." },
      pain: {
        eyebrow: "Sound familiar?",
        heading: "When the business outgrows the tools it started with.",
        lede: `Most growing firms run on ${r.accounts}, a few spreadsheets and one or two apps that were never meant to work together. It holds until it doesn't.`,
        points: [
          "The same job, invoice or customer gets typed into three different places.",
          "Only one or two people know how the master spreadsheet really works.",
          "Off-the-shelf software forces you to change how you work, or needs ten workarounds.",
          "Getting a simple answer, like what's booked or what we're owed, means asking around.",
        ],
      },
      build: {
        eyebrow: "What we build",
        heading: "One system that fits the way your team works.",
        lede: "We build only what off-the-shelf tools can't do well for you, and connect it to the tools that already work.",
        items: [
          {
            title: "Operations and job management",
            body: "Jobs, orders, stock, scheduling and invoicing in one place, shaped around your actual process.",
          },
          {
            title: "Client and supplier portals",
            body: "Let customers or suppliers check status, upload documents and raise requests without calling or emailing your team.",
          },
          {
            title: "Quoting, booking and scheduling",
            body: "Instant quotes from your own rate card, slots matched to staff availability, deposits and confirmations, with a dashboard for your team.",
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
          question: `Will it work with ${r.accounts} and the tools we already use?`,
          answer: "That's usually the point. We connect to the systems you keep, so data is entered once and flows to the others, rather than forcing a switch. We confirm each connection on the scoping call before quoting.",
        },
        teamFaq(r),
      ],
      cta: {
        heading: "Tell us what the business has outgrown.",
        body: "Book a free 20-minute scoping call. We'll look at how the work runs today and tell you honestly whether custom software is the right answer, or something simpler is.",
      },
      related: { label: "CRM development", to: `${p}/crm-development` },
    },
    {
      slug: "crm-development",
      serviceCodes: ["QC-307", "QC-309"],
      seoTitle: `CRM Development for ${r.adjective} Businesses`,
      description: `A CRM and business system set up around how your ${r.adjective} business sells and operates. Written scope and fixed quote after a free 20-minute scoping call.`,
      breadcrumbLabel: `CRM Development (${r.label})`,
      eyebrow: `CRM development · ${r.label}`,
      title: "A CRM set up around how you actually sell.",
      lede: "Whether you need a CRM your sales team will actually use or a bigger system that ties leads, jobs and invoicing together, we build and configure it around your process and connect it to the tools you keep.",
      photo: { src: "/photos/technology/crm-build-configuration.jpg", label: "A laptop showing a sales pipeline view." },
      pain: {
        eyebrow: "Sound familiar?",
        heading: "Leads, jobs and invoices living in different places.",
        lede: `Sales tracks leads in a spreadsheet, operations works from email, accounts lives in ${r.accounts}, and nobody has the full picture.`,
        points: [
          "Follow-ups slip because nobody can see which leads are waiting on a reply.",
          "The CRM you bought is half set up, and the team went back to spreadsheets.",
          "Quotes, jobs and invoices don't match, and month-end means reconciling by hand.",
          "Someone spends a day building the sales report every time it's asked for.",
        ],
      },
      build: {
        eyebrow: "What we build",
        heading: "From a working CRM to a full business system.",
        lede: "We start with the smallest system that fixes the problem, and build up from there only if it pays back.",
        items: [
          {
            title: "CRM build and configuration",
            body: "Pipeline stages, lead capture from your website and inbox, follow-up reminders and reports, set up around how your team actually sells.",
          },
          {
            title: "Custom CRM",
            body: "When the ready-made options need too many workarounds, a CRM built for your process: your stages, your fields, your rules.",
          },
          {
            title: "Connected to your accounts",
            body: "Data flows to and from your accounting system and spreadsheets, so quotes and invoices are typed once.",
          },
          {
            title: "Reports that build themselves",
            body: "Sales, pipeline and receivables reports that update automatically, with clear definitions for every number.",
          },
        ],
      },
      faq: [
        {
          question: "How much does a CRM build cost?",
          answer: "Configuring an existing CRM costs far less than building a custom one, and both depend on your scope. You get a written scope and fixed quote after a free 20-minute scoping call. Software licences, if any, are passed through at cost.",
        },
        {
          question: "Should we buy an off-the-shelf CRM, or build one?",
          answer: "Often a well-configured off-the-shelf CRM is the right answer, and we'll say so. Custom makes sense when your process is what sets you apart, or when the ready-made options need too many workarounds.",
        },
        {
          question: "Can you move our data from spreadsheets or an old system?",
          answer: "Yes. Cleaning up and moving your existing customers, contacts and open deals is part of the scope, so the team starts with real data on day one.",
        },
        {
          question: "How long does it take?",
          answer: "A CRM setup typically takes 3 to 5 weeks. A custom build depends on scope; we agree the timeline in writing and deliver it in milestones you sign off.",
        },
        teamFaq(r),
      ],
      cta: {
        heading: "Get one picture of sales and operations.",
        body: "Book a free 20-minute scoping call. We'll look at how leads and jobs move today, and whether a configured CRM, a custom one or something smaller is the right next step.",
      },
      related: { label: "Business automation", to: `${p}/business-automation` },
    },
    {
      slug: "business-automation",
      serviceCodes: ["QC-306", "QC-301"],
      seoTitle: `Business Automation & Systems Integration (${r.label})`,
      description: `Connect ${r.accounts}, your CRM and other tools so data is typed once, with no forced switch to new software. Fixed quote after a free scoping call.`,
      breadcrumbLabel: `Business Automation (${r.label})`,
      eyebrow: `Automation & integration · ${r.label}`,
      title: "Stop typing the same data into three different systems.",
      lede: "We connect the tools you already use, such as your accounting system, spreadsheets, CRM and email, so information is entered once and moves on its own. No forced switch to new software.",
      photo: { src: "/photos/technology/workflow-systems-integration.jpg", label: "A laptop showing connected business systems." },
      pain: {
        eyebrow: "Sound familiar?",
        heading: "Hours lost every week to copy and paste.",
        lede: "Most of the manual work in a growing business isn't hard. It's the same data moved by hand from one system to another, again and again.",
        points: [
          "Orders and enquiries arrive by email and get re-typed into the accounting system.",
          "Someone spends Monday morning compiling the same report from three spreadsheets.",
          "Numbers in different systems quietly drift apart, and nobody knows which one is right.",
          "A small typo in one place turns into a wrong invoice or a missed job.",
        ],
      },
      build: {
        eyebrow: "What we automate",
        heading: "Connect what you have before buying anything new.",
        lede: "We start from the work your team repeats most and automate the parts that don't need a person's judgment. Anything that doesn't match gets flagged for a person to check.",
        items: [
          {
            title: "System-to-system connections",
            body: "Your accounting system, CRM, spreadsheets and job tools kept in step, so data is typed once.",
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
          question: "What happens when an automation hits something unusual?",
          answer: "It stops and flags it for a person instead of guessing. You see what was flagged and why, so nothing goes wrong silently.",
        },
        {
          question: "How quickly can we see results?",
          answer: "A single automation usually goes live in 2 to 3 weeks. Larger integrations take 3 to 6 weeks, delivered in stages.",
        },
        teamFaq(r),
      ],
      cta: {
        heading: "Find the copy-and-paste work worth automating first.",
        body: "Book a free 20-minute scoping call. Tell us which tasks your team repeats every day, and we'll tell you which ones are worth automating first.",
      },
      related: { label: "Custom software", to: `${p}/custom-software` },
    },
    {
      slug: "website-development",
      serviceCodes: ["QC-401", "QC-402"],
      seoTitle: `Website Development for ${r.adjective} Small Businesses`,
      description: `Fast, mobile-first websites for ${r.adjective} small businesses, built to turn visitors into enquiries and bookings. Written scope and fixed quote after a free 20-minute call.`,
      breadcrumbLabel: `Website Development (${r.label})`,
      eyebrow: `Website development · ${r.label}`,
      title: "A website that brings in enquiries, not just visitors.",
      lede: `Mobile-first websites for ${r.adjective} small businesses, built around the one thing a site is for: getting the right people to call, book or ask for a quote. Set up for Google from day one.`,
      photo: { src: "/photos/technology/marketing-automation-lead-scoring.jpg", label: "A laptop showing where enquiries come from." },
      pain: {
        eyebrow: "Sound familiar?",
        heading: "The site looks fine. It just doesn't bring in work.",
        lede: "Most small-business websites were built once, years ago, and nobody has looked at whether they actually produce enquiries.",
        points: [
          "It's slow or awkward on a phone, which is where most visitors are.",
          "Visitors can't tell in five seconds what you do, where, and how to get a quote.",
          "Enquiries arrive by a form nobody checks, or not at all.",
          "You can't tell which pages, searches or ads actually bring in jobs.",
        ],
      },
      build: {
        eyebrow: "What we build",
        heading: "From a clean starter site to a full booking flow.",
        lede: "We build the smallest site that does the job, then add quote and booking flows only where they pay back.",
        items: [
          {
            title: "Starter website",
            body: "A fast, mobile-first site of about six pages, with a clear enquiry form, basic SEO, analytics and your Google Business Profile linked.",
          },
          {
            title: "Quote and booking flows",
            body: "Instant quotes from your own rate card, online bookings and deposits, so enquiries arrive ready to confirm.",
          },
          {
            title: "Found on Google",
            body: "Clean page structure, service and location pages, and the technical set-up search engines and AI answers look for.",
          },
          {
            title: "Tracking that shows what works",
            body: "Every call, form and booking tracked back to the page, search or ad it came from.",
          },
        ],
      },
      faq: [
        {
          question: "How much does a website cost?",
          answer: "A starter site costs much less than one with quote and booking flows, and both depend on the pages and features you need. You get a written scope and fixed quote after a free 20-minute call.",
        },
        {
          question: "How long does it take?",
          answer: "A starter site usually takes 2 to 3 weeks. A site with quote and booking flows takes 4 to 6 weeks, delivered in stages you sign off.",
        },
        {
          question: "Will we be able to update it ourselves?",
          answer: "Yes. We hand over access and show your team how to change text and photos. Optional monthly care covers hosting, updates, backups and small changes.",
        },
        {
          question: "Can you redo our existing site rather than start again?",
          answer: "Often, yes. We look at what's working on the current site first and keep it, then fix what's costing you enquiries.",
        },
        teamFaq(r),
      ],
      cta: {
        heading: "Find out what your website is missing.",
        body: "Book a free 20-minute call. We'll look at your current site with you and tell you honestly whether it needs a rebuild, a few fixes, or nothing at all.",
      },
      related: { label: "Custom software", to: `${p}/custom-software` },
    },
  ];
}

export const auServicePages = pagesFor(regions[0]);
export const ukServicePages = pagesFor(regions[1]);
