// /au/ai-process-consulting-melbourne -- written for "AI and process
// consulting for small businesses in Melbourne", the query the 2026-10-27
// AI-visibility retest found Qamira missing from on every tool.
//
// Rules this copy keeps:
// - No prices on the website, by decision (2026-10-20).
// - Brand-only voice, no founder name.
// - Process and AI are one combined offer, never a first/second sequence.
// - The proof client is described, never named, and only what is actually
//   running is claimed (the instant-quote engine is in production).
// - Removalists and junk removal are never named as a target vertical:
//   the proof client works in both, so they're parked for neutrality.
// - Delivery is remote, and the FAQ says so plainly. No Melbourne office is
//   implied anywhere.
// - Australian spelling.

import type { CityConsultingPage } from "@/data/content/cityConsulting";

export const melbourneConsultingPage: CityConsultingPage = {
  path: "/au/ai-process-consulting-melbourne",
  // The free Digital Presence & AI Opportunity Audit is the AU entry point.
  serviceCode: "QC-002",
  seoTitle: "AI & Process Consulting in Melbourne",
  description:
    "AI and process consulting for Melbourne small businesses: automation, AI receptionists and chatbots, and better workflows for clinics, trades and professional firms.",
  schema: {
    name: "AI and Process Consulting in Melbourne",
    alternateName: ["AI consultant in Melbourne", "Process improvement consultant in Melbourne", "AI automation for Melbourne small businesses"],
    serviceType: "AI consulting, process improvement and business automation",
    areaServed: [
      { "@type": "City", name: "Melbourne" },
      { "@type": "City", name: "Geelong" },
      { "@type": "State", name: "Victoria" },
      { "@type": "Country", name: "Australia" },
    ],
  },
  hero: {
    breadcrumbLabel: "AI & Process Consulting (Melbourne)",
    eyebrow: "AI & process consulting · Melbourne",
    title: "Practical AI and better processes for Melbourne small businesses.",
    lede: "We help Melbourne clinics, trades and professional firms take the busywork out of the day: fewer missed calls, faster quotes, less admin and cleaner numbers. Better processes and practical AI, built together and sized for a small team.",
    promiseLine: "Free 20-minute call. A fixed price for your business before any work starts.",
    photo: { src: "/photos/services/ai-automation.webp", label: "A small-business owner reviewing an automated workflow on a laptop." },
  },
  pain: {
    eyebrow: "Sound familiar?",
    heading: "The work is there. The hours aren't.",
    lede: "Most Melbourne small businesses we speak to don't need an AI strategy deck. They need the phone answered, quotes out the same day, and the admin off the owner's evenings.",
    points: [
      "Calls go to voicemail while you're with a customer, and the caller books someone else.",
      "Quotes and follow-ups wait until after hours, so jobs go cold.",
      "The same details get typed into the booking system, the invoice and a spreadsheet.",
      "You've tried an AI tool or two, but nothing is actually connected to how the business runs.",
    ],
  },
  services: {
    eyebrow: "What we do in Melbourne",
    heading: "Small, working fixes that pay back quickly.",
    lede: "We start with the one or two jobs that cost you the most time or the most missed work, fix the process around them, and automate what doesn't need a person.",
    items: [
      {
        title: "AI receptionist",
        body: "Answers every call 24/7, books the job, quotes from your own rate card and passes anything tricky to your team for a call back.",
        to: "/au/ai-receptionist",
      },
      {
        title: "Website and WhatsApp chatbots",
        body: "Trained on your business to answer questions, capture enquiries and book appointments, with a hand-over to staff when it matters.",
        to: "/technology/custom-saas-chatbots",
      },
      {
        title: "Workflow automation",
        body: "Quotes, bookings, invoices and reminders connected across the tools you already use, so details are typed once.",
        to: "/technology/workflow-systems-integration",
      },
      {
        title: "Process and operations review",
        body: "We map how a job moves from enquiry to payment, find where time and money leak, and fix it with your team.",
        to: "/services",
      },
      {
        title: "Google Business Profile and local search",
        body: "A complete, accurate profile with the right categories, service areas and a review process, so locals find you first.",
        to: "/au/google-business-profile",
      },
      {
        title: "Visibility in AI search",
        body: "How your business shows up when customers ask ChatGPT or Google's AI for a recommendation, and what to change so you're named.",
        to: "/insights/is-your-business-invisible-to-chatgpt",
      },
    ],
  },
  industries: {
    eyebrow: "Who we work with",
    heading: "Built for the businesses that keep Melbourne running.",
    items: [
      {
        title: "Clinics and allied health",
        body: "Dental, physio and allied-health practices: after-hours calls, new-patient bookings, reminders and the questions the front desk answers all day.",
        to: "/industries/healthcare",
      },
      {
        title: "Trades and home services",
        body: "Cleaners, landscapers, pest controllers, plumbers and electricians: missed calls on the job, same-day quotes and booking without the back-and-forth.",
        to: "/au/ai-receptionist",
      },
      {
        title: "Professional services",
        body: "Accountants, bookkeepers, legal and real-estate offices: client onboarding, document collection, follow-ups and reporting.",
        to: "/industries/professional-services",
      },
    ],
  },
  areas: {
    eyebrow: "Areas we serve",
    heading: "Across Melbourne and regional Victoria, and Australia-wide.",
    lede: "Everything runs remotely: calls and workshops by video during Melbourne business hours, builds and support online. That keeps the cost down for a small business without slowing anything down.",
    areas: [
      "Melbourne CBD",
      "Southbank",
      "Docklands",
      "Richmond",
      "South Yarra",
      "St Kilda",
      "Box Hill",
      "Dandenong",
      "Moorabbin",
      "Tullamarine",
      "Laverton",
      "Geelong",
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    heading: "Start small, prove it works, then grow it.",
    steps: [
      {
        title: "Free audit or call",
        body: "A free AI Opportunity Audit of your website, Google profile and enquiry handling, or a 20-minute call. You get the findings either way.",
      },
      {
        title: "Fixed-price first fix",
        body: "We pick the one change that saves the most time or wins the most work, and quote it as a fixed price in writing.",
      },
      {
        title: "Built with your team",
        body: "We set it up around how you actually work, test it on real enquiries, and train your staff before it goes live.",
      },
      {
        title: "Looked after",
        body: "We monitor it, fix what gets in your way, and add the next improvement when the first one has paid back.",
      },
    ],
  },
  proof: {
    eyebrow: "Built and running in Melbourne",
    heading: "Already working for a Melbourne business.",
    body: [
      "For a Melbourne removals company we redesigned how quotes were handled and built an instant-quote engine around it: a job goes in, and the customer gets a branded quote in about 20 seconds, worked out from the company's own rate card.",
      "Quotes that used to wait for the owner's evening now go out while the customer is still comparing options.",
    ],
    note: "Client named on request in a private conversation.",
  },
  faq: [
    {
      question: "What does an AI consultant do for a small business?",
      answer:
        "We find the jobs that eat your team's time or cost you work, like missed calls, slow quotes or double data entry, and fix them with a mix of better process and practical AI. You get a working change in your business, not a strategy document.",
    },
    {
      question: "How much does it cost?",
      answer:
        "It depends on what we build. After a free 20-minute call or audit you get a fixed price in writing before any work starts, and most first projects are deliberately small.",
    },
    {
      question: "Do we need to change our software?",
      answer:
        "Usually not. We connect to the booking, accounting and CRM tools you already use, and only suggest a change when a tool genuinely can't connect to anything.",
    },
    {
      question: "Where is your team based?",
      answer:
        "Our team is based in India and works remotely with Australian businesses. Calls and workshops run by video during Melbourne business hours, and support is online. Our first Australian client is a Melbourne business.",
    },
    {
      question: "Will AI replace my staff?",
      answer:
        "That's not the aim. AI takes the repetitive work, like answering the same questions or re-typing details, so your people spend their time on customers and the work that needs judgement.",
    },
    {
      question: "Do you work outside Melbourne?",
      answer:
        "Yes. Because everything runs remotely, we work with businesses anywhere in Australia, from Geelong and regional Victoria to Sydney and Brisbane.",
    },
  ],
  cta: {
    heading: "Find the one fix that would save you the most time.",
    body: "Book a free 20-minute call, or start with the free AI Opportunity Audit. We'll tell you honestly where AI will help your business, and where it won't.",
  },
  secondaryCta: { label: "See the AI receptionist", to: "/au/ai-receptionist" },
};
