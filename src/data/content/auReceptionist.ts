// /au/ai-receptionist -- the Australian landing page for AI Voice & Call
// Automation (catalogue code QC-303), built as the destination for the AU
// "AI receptionist" Google Ads campaign
// (Sales/Qamira_Google_Ads_AU_AI_Receptionist_Campaign.md).
//
// Written in the searcher's words ("AI receptionist", tradies, clinics,
// missed calls) rather than the generic /technology/ai-voice-call-automation
// copy, which never says any of them.
//
// Rules this copy keeps:
// - Brand-only voice, no founder name.
// - The proof client is described, never named, until they agree to be
//   named publicly (they have agreed to private 1:1 outreach only). Swap
//   `proof.client` for the real name once they say yes.
// - Only claims what is actually running: the instant-quote engine is in
//   production; the booking assistant and voice receptionist are being
//   rolled out on it. Update `proof` when that changes.
// - No vendor or platform names, and no third-party statistics we can't
//   source.
//
// No prices on this page, by decision (2026-10-20): the price is given on
// the free 20-minute call. Keep figures out of this file too -- it ships in
// the public JS bundle.

export const auReceptionistHero = {
  eyebrow: "AI receptionist · Australia",
  title: "An AI receptionist that answers every call while you're on the tools.",
  lede: "A done-for-you AI receptionist for Australian tradies, clinics and service businesses. It answers 24/7, books the job, gives a quote from your own rate card, and passes anything tricky to your team for a call back. Every call is logged.",
  promiseLine: "Free 20-minute call. You get a fixed price for your business, no obligation.",
  breadcrumbLabel: "AI Receptionist (Australia)",
};

export const missedCallPain = {
  eyebrow: "The missed-call problem",
  heading: "Every unanswered call is a job someone else gets.",
  lede: "When a customer needs a plumber, a pest controller or a physio appointment, they ring the first business they find. If it goes to voicemail, many don't leave a message. They ring the next one on the list.",
  audiences: [
    {
      title: "For tradies",
      points: [
        "You can't pick up from a roof, a ceiling cavity or under a sink, and the call you miss is often the biggest job of the week.",
        "Calling back at 7pm means calling back after the customer has already booked someone else.",
        "Paying a receptionist or an answering service for a one- or two-person business rarely adds up.",
      ],
    },
    {
      title: "For clinics",
      points: [
        "The front desk is checking a patient in when the phone rings, so it rings out or goes on hold.",
        "After-hours and lunchtime calls go to voicemail, and new patients book with whoever answers.",
        "Staff lose hours to the same few questions: opening times, fees, parking, \"do you have anything Thursday?\"",
      ],
    },
  ],
};

export const howItWorksIntro = {
  eyebrow: "How it works",
  heading: "It answers, books, quotes and hands over, then logs the lot.",
  lede: "Keep your existing number. Calls you don't pick up, or every call after hours, forward to your AI receptionist. It speaks in a natural voice and tells callers up front that it's an AI assistant.",
};

export const howItWorksSteps = [
  {
    icon: "PhoneCall",
    title: "Answers 24/7",
    body: "Every call picked up on the first ring, nights and weekends included. No hold music, no voicemail.",
  },
  {
    icon: "CalendarCheck",
    title: "Books the job",
    body: "Checks your availability and books the job or appointment straight into your calendar or booking system, then confirms it with the caller.",
  },
  {
    icon: "Calculator",
    title: "Gives a quote",
    body: "Quotes from your own rate card, worked out by a calculation we set up with you, never guessed. It reads the details back first and labels the figure as an estimate.",
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

export const differentiators = {
  eyebrow: "Done for you, not another app",
  heading: "Built around how your business actually quotes and books.",
  lede: "Self-serve AI phone apps hand you a dashboard and leave the setup to you. We build it with you, connect it to your systems and keep tuning it.",
  points: [
    {
      title: "Your rules, not a template",
      body: "Your services, suburbs, pricing, booking rules and the questions your customers actually ask. Set up from a call with you, not a form.",
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
};

export const proof = {
  eyebrow: "Already working in Melbourne",
  client: "A Melbourne removals company",
  heading: "We built the quoting engine behind a Melbourne removals company.",
  body: [
    "Our first Australian client is a Melbourne removals business. We built its instant-quote engine: once a job is entered, the customer gets a branded quote in about 20 seconds.",
    "Its chat booking assistant and AI receptionist are being rolled out on that same engine. That matters: the price a caller hears is worked out the same way as the price on the website, so the two can't disagree.",
  ],
  note: "Client named on request in a private conversation.",
};

export const included = {
  eyebrow: "What's included",
  heading: "Set up, connected and looked after for you.",
  items: [
    "Call forwarding set up on your existing number",
    "Script, voice and answers tuned to your business",
    "Booking and quote rules connected to your systems",
    "Every call logged to your CRM or job system",
    "Hand-over to your team, with call summaries",
    "Monthly call review and tuning",
  ],
  note: "A one-off setup, then a monthly service fee that depends on how many calls you get and what it connects to. You get a fixed price after a free 20-minute call.",
};

export const auReceptionistFaq = [
  {
    question: "Will callers know they're talking to an AI?",
    answer: "Yes. It says so at the start of every call, along with a note that the call may be recorded. The point is that every caller gets an answer and a booking instead of voicemail.",
  },
  {
    question: "Do I need a new phone number?",
    answer: "No. You keep your existing number and forward calls to the AI receptionist, either the ones you don't answer, every call after hours, or all of them. You can change that at any time.",
  },
  {
    question: "What happens when it can't handle a call?",
    answer: "It takes the caller's name, number and what they need, tells them someone will call back, and sends your team a summary straight away. Urgent or sensitive calls are handed over this way by design.",
  },
  {
    question: "Can it really give prices?",
    answer: "Only from your own rate card, through a calculation we set up with you, never from guesswork. It reads the job details back before quoting, labels the figure as an estimate, and passes unusual jobs to a person.",
  },
  {
    question: "How much does an AI receptionist cost?",
    answer: "There is a one-off setup fee, then a monthly service fee. Both depend on how many calls you get and which systems it connects to, so we give you a fixed price after a free 20-minute call. No obligation.",
  },
  {
    question: "How long does setup take?",
    answer: "Typically three to five weeks from the first call. That covers your script and answers, the booking and quote rules, the CRM connection, and test calls before it takes a real one.",
  },
  {
    question: "Which booking systems and CRMs does it work with?",
    answer: "Most calendars, booking tools and CRMs that can connect to other software. If yours can't, we log calls to a simple shared system your team can use straight away.",
  },
  {
    question: "Do you work with businesses outside Melbourne?",
    answer: "Yes. Setup and support are done remotely, so we work with businesses anywhere in Australia.",
  },
];

export const auReceptionistCta = {
  heading: "Find out how many calls you're missing.",
  body: "Book a free 20-minute call. We'll look at how your calls come in today, what a receptionist would need to handle, and give you a fixed price. No obligation.",
};
