// The AI receptionist landing pages: /au/ai-receptionist (the original,
// content in auReceptionist.ts), /uk/ai-receptionist and /us/ai-receptionist.
// One template, AiReceptionistPage.tsx, renders all three.
//
// Rules for the UK and US copy, on top of those in auReceptionist.ts:
// - No Melbourne proof. That client is Australian and doesn't run the voice
//   receptionist, so it isn't evidence for a UK or US buyer. The UK and US
//   pages carry a local-rules section instead.
// - No demo phone number until our own receptionist is live.
// - Regulations are described plainly and without legal claims. We tell
//   buyers what the receptionist does; we don't tell them they're compliant.
// - No prices, no vendor or platform names.

import {
  auReceptionistHero,
  missedCallPain as auPain,
  howItWorksIntro as auIntro,
  howItWorksSteps as auSteps,
  differentiators as auDifferentiators,
  proof as auProof,
  included as auIncluded,
  auReceptionistFaq,
  auReceptionistCta,
} from "@/data/content/auReceptionist";

type Faq = { question: string; answer: string };
type StepIcon = (typeof auSteps)[number]["icon"];

export type ReceptionistContent = {
  path: string;
  /** Region code, for hreflang. */
  region: "au" | "uk" | "us";
  seo: { title: string; description: string; country: string; audienceType: string };
  hero: { eyebrow: string; title: string; lede: string; promiseLine: string; breadcrumbLabel: string };
  missedCallPain: { eyebrow: string; heading: string; lede: string; audiences: { title: string; points: string[] }[] };
  howItWorksIntro: { eyebrow: string; heading: string; lede: string };
  howItWorksSteps: readonly { icon: StepIcon; title: string; body: string }[];
  differentiators: { eyebrow: string; heading: string; lede: string; points: { title: string; body: string }[] };
  /** A real client result. Only where one exists in that market. */
  proof?: { eyebrow: string; heading: string; body: string[]; note: string };
  /** Local recording, privacy and data rules, in plain words. */
  localRules?: { eyebrow: string; heading: string; lede: string; points: { title: string; body: string }[] };
  included: { eyebrow: string; heading: string; items: string[]; note: string };
  faq: Faq[];
  cta: { heading: string; body: string };
};

export const auReceptionist: ReceptionistContent = {
  path: "/au/ai-receptionist",
  region: "au",
  seo: {
    title: "AI Receptionist for Australian Businesses",
    description:
      "Done-for-you AI receptionist for Australian tradies and clinics. Answers calls 24/7, books jobs, quotes from your own rate card and hands off to your team.",
    country: "Australia",
    audienceType: "Tradies, clinics and service businesses",
  },
  hero: auReceptionistHero,
  missedCallPain: auPain,
  howItWorksIntro: auIntro,
  howItWorksSteps: auSteps,
  differentiators: auDifferentiators,
  proof: auProof,
  included: auIncluded,
  faq: auReceptionistFaq,
  cta: auReceptionistCta,
};

// Steps shared by the UK and US pages: the AU steps, with "price list" for
// "rate card".
const steps = (area: string) =>
  [
    {
      icon: "PhoneCall",
      title: "Answers day and night",
      body: "Every call picked up straight away, evenings and weekends included. No hold music, no voicemail.",
    },
    {
      icon: "CalendarCheck",
      title: "Books the job",
      body: "Checks your availability and books the job or appointment into your calendar or booking system, then confirms it with the caller.",
    },
    {
      icon: "Calculator",
      title: "Gives a quote",
      body: `Quotes from your own price list for the ${area} you cover, worked out by a calculation we set up with you, never guessed. It reads the details back first and labels the figure as an estimate.`,
    },
    {
      icon: "UserRound",
      title: "Hands over to a person",
      body: "Anything unusual, urgent or sensitive gets passed on. The caller is told someone will ring back, and your team gets a summary and the number straight away.",
    },
    {
      icon: "Database",
      title: "Logs it to your CRM",
      body: "Every call's summary, details and outcome lands in your CRM or job system automatically, so no enquiry lives only in someone's head.",
    },
  ] as const;

const differentiators = (area: string) => ({
  eyebrow: "Done for you, not another app",
  heading: "Built around how your business actually quotes and books.",
  lede: "Self-serve AI phone apps hand you a dashboard and leave the set-up to you. We build it with you, connect it to your systems and keep tuning it.",
  points: [
    {
      title: "Your rules, not a template",
      body: `Your services, the ${area} you cover, your prices, your booking rules and the questions your customers actually ask. Set up from a call with you, not a form.`,
    },
    {
      title: "A real person behind it",
      body: "Anything the receptionist shouldn't handle goes to your team with a summary, so a tricky job or an upset caller never gets stuck with a bot.",
    },
    {
      title: "Looked after every month",
      body: "We review calls, fix what it got wrong and add answers it didn't have. It gets better over time instead of going stale.",
    },
  ],
});

const included = (divert: string) => ({
  eyebrow: "What's included",
  heading: "Set up, connected and looked after for you.",
  items: [
    divert,
    "Script, voice and answers tuned to your business",
    "Booking and quote rules connected to your systems",
    "Every call logged to your CRM or job system",
    "Hand-over to your team, with call summaries",
    "Monthly call review and tuning",
  ],
  note: "A one-off set-up, then a monthly service fee that depends on how many calls you get and what it connects to. You get a fixed price after a free 20-minute call.",
});

const sharedFaq: Record<"ai" | "fails" | "prices" | "cost" | "setup" | "systems", Faq> = {
  ai: {
    question: "Will callers know they're talking to an AI?",
    answer:
      "Yes. It says so at the start of every call, along with a note that the call is recorded. The point is that every caller gets an answer and a booking instead of voicemail.",
  },
  fails: {
    question: "What happens when it can't handle a call?",
    answer:
      "It takes the caller's name, number and what they need, tells them someone will ring back, and sends your team a summary straight away. Urgent or sensitive calls are handed over this way by design.",
  },
  prices: {
    question: "Can it really give prices?",
    answer:
      "Only from your own price list, through a calculation we set up with you, never from guesswork. It reads the job details back before quoting, labels the figure as an estimate, and passes unusual jobs to a person.",
  },
  cost: {
    question: "How much does an AI receptionist cost?",
    answer:
      "There is a one-off set-up fee, then a monthly service fee. Both depend on how many calls you get and which systems it connects to, so we give you a fixed price after a free 20-minute call. No obligation.",
  },
  setup: {
    question: "How long does set-up take?",
    answer:
      "Typically three to five weeks from the first call. That covers your script and answers, the booking and quote rules, the CRM connection, and test calls before it takes a real one.",
  },
  systems: {
    question: "Which booking systems and CRMs does it work with?",
    answer:
      "Most calendars, booking tools and CRMs that can connect to other software. If yours can't, we log calls to a simple shared system your team can use straight away.",
  },
};

const cta = {
  heading: "Find out how many calls you're missing.",
  body: "Book a free 20-minute call. We'll look at how your calls come in today, what a receptionist would need to handle, and give you a fixed price. No obligation.",
};

const promiseLine = "Free 20-minute call. You get a fixed price for your business, no obligation.";

export const ukReceptionist: ReceptionistContent = {
  path: "/uk/ai-receptionist",
  region: "uk",
  seo: {
    title: "AI Receptionist for UK Businesses",
    description:
      "Done-for-you AI receptionist for UK trades and clinics. Answers calls day and night, books jobs, quotes from your own price list and hands off to your team.",
    country: "United Kingdom",
    audienceType: "Trades, clinics and service businesses",
  },
  hero: {
    eyebrow: "AI receptionist · UK",
    title: "An AI receptionist that answers every call while you're on a job.",
    lede: "A done-for-you AI receptionist for UK trades, clinics and service businesses. It answers day and night, books the job, gives a quote from your own price list, and passes anything tricky to your team for a call back. Every call is logged.",
    promiseLine,
    breadcrumbLabel: "AI Receptionist (UK)",
  },
  missedCallPain: {
    eyebrow: "The missed-call problem",
    heading: "Every unanswered call is a job someone else gets.",
    lede: "When a boiler packs up or a tooth starts aching, people ring the first business they find. If it goes to voicemail, many don't leave a message. They ring the next number on the list.",
    audiences: [
      {
        title: "For trades",
        points: [
          "You can't answer from a loft, a roof or under a floor, and the call you miss is often the best job of the week.",
          "Ringing back after six means ringing back after the customer has booked someone else.",
          "A receptionist or a call-answering service rarely adds up for a one- or two-person firm.",
        ],
      },
      {
        title: "For clinics and practices",
        points: [
          "Reception is booking a patient in when the phone rings, so it rings out or goes on hold.",
          "Calls at lunchtime and after hours go to voicemail, and new patients book with whoever answers.",
          'Staff lose hours to the same questions: opening times, fees, parking, "have you got anything on Thursday?"',
        ],
      },
    ],
  },
  howItWorksIntro: {
    eyebrow: "How it works",
    heading: "It answers, books, quotes and hands over, then logs the lot.",
    lede: "Keep your existing landline or mobile number. Calls you don't pick up, or every call after hours, divert to your AI receptionist. It speaks in a natural voice and tells callers at the start that it's an AI assistant and that the call is recorded.",
  },
  howItWorksSteps: steps("postcodes"),
  differentiators: differentiators("postcodes"),
  localRules: {
    eyebrow: "Set up for UK rules",
    heading: "Recording, data and your callers' privacy, handled from day one.",
    lede: "An AI receptionist records and transcribes calls, so it has to fit UK data protection law. We set it up with that in mind, and tell you plainly what it collects so you can check it against your own policies.",
    points: [
      {
        title: "Callers are told",
        body: "Every call opens by saying the caller is speaking to an AI assistant and that the call is recorded. Nobody is caught out.",
      },
      {
        title: "Only what it needs",
        body: "It collects the details needed to book or quote and nothing more. We give you a plain list of what it records and why, ready for your privacy notice.",
      },
      {
        title: "Patient details kept to a minimum",
        body: "For clinics and practices, health information is special category data under UK GDPR. The receptionist books and answers general questions, and leaves anything clinical to your team.",
      },
      {
        title: "Retention you choose",
        body: "You decide how long recordings and transcripts are kept, and we set it to match.",
      },
    ],
  },
  included: included("Call divert set up on your existing number"),
  faq: [
    sharedFaq.ai,
    {
      question: "Do I need a new phone number?",
      answer:
        "No. You keep your existing landline or mobile number and divert calls to the AI receptionist: the ones you don't answer, every call after hours, or all of them. You can change that at any time.",
    },
    sharedFaq.fails,
    sharedFaq.prices,
    {
      question: "Is it GDPR compliant?",
      answer:
        "It's built to fit UK GDPR: callers hear about the recording at the start, it collects only what it needs, and you choose how long recordings are kept. Compliance also depends on your own privacy notice and processes, so we give you a plain summary of what it collects to check against them.",
    },
    sharedFaq.cost,
    sharedFaq.setup,
    sharedFaq.systems,
    {
      question: "Where is your team based?",
      answer:
        "Our team is based in India and works remotely with UK businesses during UK business hours. Set-up, test calls and monthly reviews all happen by video call and email, and we work with businesses anywhere in the UK.",
    },
  ],
  cta,
};

export const usReceptionist: ReceptionistContent = {
  path: "/us/ai-receptionist",
  region: "us",
  seo: {
    title: "AI Receptionist for US Businesses",
    description:
      "Done-for-you AI receptionist for US contractors and clinics. Answers every call, books jobs, quotes from your own price list and hands off to your team.",
    country: "United States",
    audienceType: "Contractors, clinics and service businesses",
  },
  hero: {
    eyebrow: "AI receptionist · US",
    title: "An AI receptionist that answers every call while you're out on a job.",
    lede: "A done-for-you AI receptionist for US contractors, clinics and service businesses. It answers around the clock, books the job, gives a quote from your own price list, and passes anything tricky to your team for a call back. Every call is logged.",
    promiseLine,
    breadcrumbLabel: "AI Receptionist (US)",
  },
  missedCallPain: {
    eyebrow: "The missed-call problem",
    heading: "Every unanswered call is a job someone else gets.",
    lede: "When the air conditioning quits or a tooth starts aching, people call the first business they find. If it goes to voicemail, many don't leave a message. They call the next number on the list.",
    audiences: [
      {
        title: "For contractors",
        points: [
          "You can't pick up from an attic, a roof or a crawl space, and the call you miss is often the biggest job of the week.",
          "Calling back at the end of the day means calling back after the customer has booked someone else.",
          "A full-time receptionist or an answering service is hard to justify for a small crew.",
        ],
      },
      {
        title: "For clinics and practices",
        points: [
          "The front desk is checking a patient in when the phone rings, so it rings out or goes on hold.",
          "Calls at lunch and after hours go to voicemail, and new patients book with whoever answers.",
          'Staff lose hours to the same questions: hours, insurance, parking, "do you have anything Thursday?"',
        ],
      },
    ],
  },
  howItWorksIntro: {
    eyebrow: "How it works",
    heading: "It answers, books, quotes and hands over, then logs the lot.",
    lede: "Keep your existing number. Calls you don't pick up, or every call after hours, forward to your AI receptionist. It speaks in a natural voice and tells callers at the start that it's an AI assistant and that the call is recorded.",
  },
  howItWorksSteps: steps("zip codes"),
  differentiators: differentiators("zip codes"),
  localRules: {
    eyebrow: "Set up for US rules",
    heading: "Recording consent and patient privacy, handled from day one.",
    lede: "Call-recording and privacy rules differ from state to state, so we set the receptionist up for the stricter ones by default and tell you plainly what it collects.",
    points: [
      {
        title: "Notice at the start of every call",
        body: "Some states require everyone on a call to agree to it being recorded. The receptionist opens every call by saying it's an AI assistant and that the call is recorded, so callers in every state hear the same notice.",
      },
      {
        title: "HIPAA-covered practices",
        body: "If you're a covered practice, tell us at the start. We keep the receptionist to bookings and general questions, and check that every service it relies on can sign a business associate agreement before it handles patient details.",
      },
      {
        title: "Only what it needs",
        body: "It collects the details needed to book or quote and nothing more. We give you a plain list of what it records and why.",
      },
      {
        title: "Retention you choose",
        body: "You decide how long recordings and transcripts are kept, and we set it to match.",
      },
    ],
  },
  included: included("Call forwarding set up on your existing number"),
  faq: [
    sharedFaq.ai,
    {
      question: "Do I need a new phone number?",
      answer:
        "No. You keep your existing number and forward calls to the AI receptionist: the ones you don't answer, every call after hours, or all of them. You can change that at any time.",
    },
    sharedFaq.fails,
    sharedFaq.prices,
    {
      question: "Do you work with HIPAA-covered practices?",
      answer:
        "Yes, with care. We scope the receptionist to bookings and general questions, keep clinical details out of it, and confirm that every service involved can sign a business associate agreement before it goes live. If that can't be confirmed for your set-up, we tell you before you pay for anything.",
    },
    sharedFaq.cost,
    sharedFaq.setup,
    sharedFaq.systems,
    {
      question: "Where is your team based?",
      answer:
        "Our team is based in India and works remotely. Set-up calls and monthly reviews are held by video at times agreed with you, and the receptionist itself answers around the clock in your time zone. We work with businesses anywhere in the US.",
    },
  ],
  cta,
};

export const receptionistPages: ReceptionistContent[] = [auReceptionist, ukReceptionist, usReceptionist];
