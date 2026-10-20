// /au/google-business-profile -- the Australian landing page for Google
// Business Profile & Local SEO Setup (catalogue code QC-403), built as the
// destination for ad group 2 of the AU Google Ads campaign
// (Sales/Qamira_Google_Ads_AU_AI_Receptionist_Campaign.md).
//
// The ads promise: profile set up or cleaned up, categories, service areas,
// photos, a review process and listings, done for you, for tradies and
// clinics. Keep this copy saying those same things so the click lands on
// what it was promised.
//
// Rules this copy keeps:
// - Brand-only voice, no founder name, no client names.
// - No ranking guarantees and no third-party statistics we can't source.
// - Reviews only within Google's rules: ask every customer, never buy,
//   fake, reward or filter reviews.
// - No vendor or directory names beyond Google itself.
//
// No prices on this page, by decision (2026-10-20): the price is given on
// the free 20-minute call. Keep figures out of this file too -- it ships in
// the public JS bundle.

export const auGbpHero = {
  eyebrow: "Google Business Profile · Australia",
  title: "Get found on Google Maps by the customers already searching for you.",
  lede: "Done-for-you Google Business Profile optimisation for Australian tradies, clinics and local service businesses. We set up or clean up your profile, fix your categories and service areas, add proper photos, give you a simple review process and line up your listings across the web, so local customers find you and call.",
  promiseLine: "Free 20-minute call. You get a fixed price for your business, no obligation.",
  breadcrumbLabel: "Google Business Profile (Australia)",
};

export const gbpPain = {
  eyebrow: "Why the phone isn't ringing",
  heading: "If your profile is thin, the business down the road gets the call.",
  lede: "When someone needs an electrician or a dentist nearby, they search, look at the map and ring one of the businesses at the top. A profile with the wrong category, no photos, old hours or a handful of reviews from years ago rarely makes that shortlist.",
  audiences: [
    {
      title: "For tradies",
      points: [
        "Your profile was set up years ago, or by someone who has since moved on, and nobody is sure who still has access.",
        "You work across a dozen suburbs, but the profile only shows you near your home address, or doesn't show your service area at all.",
        "Happy customers say they'll leave a review, then never do, because nobody sends them the link.",
      ],
    },
    {
      title: "For clinics",
      points: [
        "Opening hours, holiday closures and services on the profile don't match what's on your website or booking system.",
        "The primary category is too broad, so you don't show up for the treatments people actually search for.",
        "Your name, address and phone number appear differently across directories, which makes it harder for Google to trust the details.",
      ],
    },
  ],
};

export const gbpHowItWorksIntro = {
  eyebrow: "How it works",
  heading: "We audit it, fix it, fill it out and give you a way to keep it fresh.",
  lede: "You keep ownership of your profile. You add us as a manager, we do the work, and you can remove our access whenever you like.",
};

export const gbpHowItWorksSteps = [
  {
    icon: "Search",
    title: "Audit what's there",
    body: "We check your profile, who has access, how you show up for the searches that matter, and how your details appear across the web.",
  },
  {
    icon: "Store",
    title: "Set up or clean up",
    body: "Claim and verify a new profile, or recover and tidy an existing one: business name, hours, description, contact details and services, all accurate.",
  },
  {
    icon: "MapPin",
    title: "Categories and service areas",
    body: "The right primary and secondary categories, and the suburbs and regions you actually serve, so you appear for the work you want.",
  },
  {
    icon: "Camera",
    title: "Photos that sell the job",
    body: "Your team, your vehicles or rooms, and real work, chosen and uploaded properly instead of a logo and a blurry shopfront.",
  },
  {
    icon: "Star",
    title: "A review process",
    body: "A simple, repeatable way to ask every customer for a review after the job, plus reply templates so every review gets a response.",
  },
  {
    icon: "Link2",
    title: "Citation listings",
    body: "Your name, address and phone number made consistent across trusted Australian directories and your own website.",
  },
] as const;

export const gbpDifferentiators = {
  eyebrow: "Done for you, by the rules",
  heading: "Built to last, not a quick bump that gets your profile suspended.",
  lede: "Shortcuts like keyword-stuffed business names, fake addresses or bought reviews can get a profile suspended. We stick to Google's guidelines and set things up so they keep working after we hand over.",
  points: [
    {
      title: "Your profile, your access",
      body: "You stay the owner. We work as a manager on your account, and everything we set up is documented for you.",
    },
    {
      title: "Honest reviews only",
      body: "We help you ask every customer, not just the happy ones, and never buy, fake or reward reviews. That's what Google allows, and what customers trust.",
    },
    {
      title: "Fits your other marketing",
      body: "Your profile, website and listings tell the same story, so a customer who checks you out in two places sees the same business.",
    },
  ],
};

export const gbpIncluded = {
  eyebrow: "What's included",
  heading: "Set up properly, then handed back to you.",
  items: [
    "Profile audit, with access sorted out",
    "New profile set up and verified, or an existing one cleaned up",
    "Primary and secondary categories chosen for the work you want",
    "Service areas, hours, services and business description",
    "Photos selected and uploaded",
    "A review request process and reply templates",
    "Citation listings made consistent across key directories",
    "A short hand-over so your team can keep it current",
  ],
  note: "A one-off, fixed-price project that typically takes one to two weeks. If you'd like us to keep it maintained afterwards, we can do that too. You get a fixed price after a free 20-minute call.",
};

export const auGbpFaq = [
  {
    question: "What is Google Business Profile optimisation?",
    answer: "It's making your Google Business Profile, the listing that shows on Google Maps and in local search results, complete and accurate: the right categories, service areas, hours, services, photos and reviews, with your details consistent across the web. It helps Google show your business to nearby customers searching for what you do.",
  },
  {
    question: "Can you guarantee I'll rank first on Google Maps?",
    answer: "No, and be wary of anyone who does. Google decides rankings based on relevance, distance and how well-known a business is. What we can do is fix everything within your control so your profile gives you the best chance.",
  },
  {
    question: "I work from home. Will my address show?",
    answer: "Not if you don't want it to. Businesses that travel to customers can hide their address and show the suburbs and regions they serve instead. We set that up for you.",
  },
  {
    question: "Someone else set up my profile and I can't get into it. Can you help?",
    answer: "Yes. We help you request ownership or access through Google's own process. It can take a little time when the current owner doesn't respond, so we start on it first.",
  },
  {
    question: "Will you write or buy reviews for us?",
    answer: "No. Fake, paid or rewarded reviews break Google's rules and can get a profile suspended. We give you a simple way to ask every customer for an honest review, and templates to reply to them.",
  },
  {
    question: "What are citation listings?",
    answer: "Mentions of your business name, address and phone number on other websites, such as business directories. Keeping them consistent helps Google trust that your details are correct.",
  },
  {
    question: "How much does Google Business Profile optimisation cost?",
    answer: "It's a one-off, fixed-price project. The price depends on whether we're starting fresh or cleaning up an existing profile, how many locations you have and how many listings need fixing, so we give you a fixed price after a free 20-minute call. No obligation.",
  },
  {
    question: "How long does it take?",
    answer: "Typically one to two weeks. Verification and ownership requests depend on Google, so they can occasionally take longer.",
  },
  {
    question: "Do you work with businesses outside Melbourne?",
    answer: "Yes. All of the work is done remotely, so we work with businesses anywhere in Australia.",
  },
];

export const auGbpCta = {
  heading: "Find out what your Google profile is missing.",
  body: "Book a free 20-minute call. We'll look at your profile together, show you what's holding it back, and give you a fixed price to fix it. No obligation.",
};
