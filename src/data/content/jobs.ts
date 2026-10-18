// Open roles, rendered by src/pages/JobDetail.tsx at /careers/<slug> and
// listed on /careers. Each role's apply form posts to api/apply.ts.
//
// Brand-only, like every public Qamira asset: no founder name, and the
// client a role serves is described ("an Australian client"), never named,
// until the client agrees to be named.
//
// `open: false` takes a role off the careers list and drops it from the
// prerender/sitemap without deleting the copy, so a filled role can be
// reopened later by flipping one flag.

export type JobSection = {
  heading: string;
  /** Plain paragraphs, rendered before any bullets. */
  paragraphs?: string[];
  bullets?: string[];
  /** A closing line, rendered after the bullets. */
  note?: string;
};

export type Job = {
  slug: string;
  open: boolean;
  title: string;
  /** Shown on the careers list and as the page's meta description. */
  summary: string;
  /** Key facts, rendered as a label/value strip under the hero. */
  facts: { label: string; value: string }[];
  sections: JobSection[];
  /** The shift question the apply form asks, word for word. */
  shiftQuestion: string;
  schema: {
    datePosted: string;
    validThrough: string;
    employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    minMonthsExperience: number;
  };
};

export const jobs: Job[] = [
  {
    slug: "sales-executive-australia",
    open: true,
    title: "Sales Executive (Australian Market)",
    summary:
      "Work from home in Pune on an Australian client's account: call every new enquiry, quote it clearly and turn it into a booking. Early-morning shift that ends by 1:30pm IST.",
    facts: [
      { label: "Location", value: "Pune, work from home" },
      { label: "Type", value: "Full-time" },
      { label: "Experience", value: "1-3 years" },
      { label: "Shift", value: "Melbourne hours (early morning IST)" },
    ],
    sections: [
      {
        heading: "About us",
        paragraphs: [
          "Qamira Consulting helps businesses grow through process optimisation, automation, digital marketing and lead generation. Team Qamira brings years of expertise in performance excellence and process optimisation.",
          "You will join our team and work full-time on the account of an Australian client, an established company in Melbourne.",
        ],
      },
      {
        heading: "About the role",
        paragraphs: [
          "You will be the first voice our client's customers hear after they request a quote or a callback on its website or other channels. You call them, understand their request, give them a clear quote and confirm the booking. When website enquiries are slow, you find and win work on other official platforms.",
          "You are employed by Qamira Consulting, work from home in Pune, and work Melbourne business hours.",
        ],
      },
      {
        heading: "What you'll do",
        bullets: [
          "Call every new quote request and callback request quickly, ideally within 10 minutes during your shift, and keep following up by phone, SMS, WhatsApp and email until you reach them.",
          "Find out what the customer needs.",
          "Turn that into an accurate quote using the client's rate card, pricing template and instant-quote tool, and explain clearly what is included.",
          "Handle questions and objections on price, timing, insurance and trust, and close the booking without hard selling.",
          "Follow up on every open quote until it is booked or closed out.",
          "Win jobs on relevant platforms (part of your training) through the client's accounts: write clear offers, answer customer questions and convert them to bookings, following each platform's rules.",
          "Pass every booked job to the client's operations team with complete details, so the team is prepared for it.",
          "Log every call, outcome and next step in our CRM or lead tracker the same day.",
          "Send a short daily report and tell us which objections and questions keep coming up.",
        ],
      },
      {
        heading: "How success is measured",
        bullets: [
          "Speed to first call on new enquiries",
          "Share of enquiries you reach",
          "Quote-to-booking conversion rate",
          "Number of completed bookings each month, from the website and from platforms",
          "Accuracy of quotes and booking details, measured by changes needed on the day of the move",
        ],
      },
      {
        heading: "What we're looking for",
        bullets: [
          "1-3 years in telesales, inside sales or an international voice process, ideally with customers in Australia, the UK or the US.",
          "Excellent spoken and written English. You speak clearly, follow Australian accents and phrasing with ease, and write clean, friendly, professional messages.",
          "A record of meeting call, conversion or booking targets.",
          "Confidence on the phone: you build rapport fast, ask good questions and ask for the booking.",
          "Comfort with a CRM, Google Sheets, email, SMS and WhatsApp, and online marketplaces.",
          "Organised and reliable, with honest, accurate records.",
          "Based in Pune, and able to work Melbourne business hours consistently, which means an early-morning shift in India.",
        ],
      },
      {
        heading: "Good to have",
        bullets: [
          "Experience selling logistics, home services or real estate.",
          "Experience quoting or bidding on online platforms.",
          "Familiarity with Melbourne suburbs, or a willingness to learn them quickly.",
        ],
      },
      {
        heading: "Shift and location",
        bullets: [
          "Location: Pune, work from home",
          "Employer: Qamira Consulting, working on an Australian client account",
          "Shift: 9:00am to 6:00pm Melbourne time",
          "Shift in India time: 3:30am to 12:30pm IST from October to early April (Melbourne daylight saving); 4:30am to 1:30pm IST for the rest of the year",
          "Working days: 5 days a week; weekly offs rotate and can fall on any day",
          "Equipment: we provide a laptop, headset, CRM and platform access. You need reliable broadband and a quiet place to work.",
        ],
        note: "We will train you on our client's services and pricing, Melbourne geography and the platforms you will use.",
      },
    ],
    shiftQuestion:
      "Can you work 3:30am to 12:30pm IST (October to early April) and 4:30am to 1:30pm IST (rest of the year), 5 days a week with rotating weekly offs?",
    schema: {
      datePosted: "2026-10-18",
      validThrough: "2026-12-31",
      employmentType: "FULL_TIME",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
      minMonthsExperience: 12,
    },
  },
];

export const openJobs = jobs.filter((job) => job.open);

export function findOpenJob(slug: string | undefined): Job | undefined {
  return openJobs.find((job) => job.slug === slug);
}
