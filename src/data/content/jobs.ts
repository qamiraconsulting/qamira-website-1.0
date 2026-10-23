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

/**
 * Which questions a role's apply form asks. Anything left out of a role's
 * form is not shown, not required by api/apply.ts, and stored as NULL.
 * Mirrored (required-ness and question text) in the ROLES map in
 * api/apply.ts -- keep the two in step.
 */
export type JobForm = {
  /** Label and options for the "total experience" select. */
  experienceLabel: string;
  experienceOptions: string[];
  /** Sales-style "international voice / telesales" select. Omit to hide it. */
  voiceExperience?: { label: string; options: string[] };
  /** Placeholder for "current or last role". */
  currentRolePlaceholder: string;
  /** A required yes/no shift question, word for word. Omit to hide it. */
  shiftQuestion?: string;
  /** The "reliable broadband and a quiet place" tick-box. */
  askSetup?: boolean;
  /** Role-specific written questions, all required. `id` is stored with the answer. */
  questions?: { id: string; label: string; hint?: string }[];
  /** Placeholder for the optional free-text note. */
  notePlaceholder: string;
  /** Replaces the default line under "Apply for this role". */
  applyIntro?: string;
};

export type Job = {
  slug: string;
  open: boolean;
  title: string;
  /** Shown on the careers list and as the page's meta description. */
  summary: string;
  /** One-line facts under the title on the careers list. */
  listLine: string;
  /** Key facts, rendered as a label/value strip under the hero. */
  facts: { label: string; value: string }[];
  sections: JobSection[];
  form: JobForm;
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
    listLine: "Pune, work from home  ·  Full-time  ·  1-3 years  ·  Melbourne hours (early morning IST)",
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
          "Based in Pune, or willing to relocate to Pune before joining, and able to work Melbourne business hours consistently, which means an early-morning shift in India.",
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
          "Location: work from home in Pune. If you live elsewhere, you need to relocate to Pune before joining.",
          "Employer: Qamira Consulting, working on an Australian client account",
          "Shift: 9:00am to 6:00pm Melbourne time",
          "Shift in India time: 3:30am to 12:30pm IST from October to early April (Melbourne daylight saving); 4:30am to 1:30pm IST for the rest of the year",
          "Working days: 6 days a week, with one weekly off that rotates and can fall on any day",
          "Equipment: we provide a laptop, headset, CRM and platform access. You need reliable broadband and a quiet place to work.",
        ],
        note: "We will train you on our client's services and pricing, Melbourne geography and the platforms you will use.",
      },
    ],
    form: {
      experienceLabel: "Total work experience",
      experienceOptions: ["Less than 1 year", "1 year", "2 years", "3 years", "4+ years"],
      voiceExperience: {
        label: "International voice / telesales",
        options: ["None", "Less than 1 year", "1-2 years", "2-3 years", "3+ years"],
      },
      currentRolePlaceholder: "Company, process and market, e.g. Telesales, AU telecom process",
      shiftQuestion:
        "Can you work 3:30am to 12:30pm IST (October to early April) and 4:30am to 1:30pm IST (rest of the year), 6 days a week with one rotating weekly off?",
      askSetup: true,
      notePlaceholder: "A best month you've had on targets, a market you've sold into, a question for us.",
    },
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
  {
    slug: "business-development-manager",
    open: true,
    title: "Business Development Manager",
    summary:
      "Our first business development hire. Win new clients for our digital marketing and consulting services: you decide who to approach, start the conversation and find the real problem we can solve. Pune, work from home.",
    listLine: "Pune, work from home  ·  Full-time  ·  2-4 years  ·  Fixed INR 4,00,000 a year, up to INR 7,00,000 with incentives",
    facts: [
      { label: "Location", value: "Pune, work from home" },
      { label: "Employment", value: "Full-time" },
      { label: "Experience", value: "2-4 years" },
      { label: "Reports to", value: "Founder" },
      { label: "Notice period", value: "Up to 30 days. Immediate joiners are welcome." },
      { label: "Pay", value: "Fixed INR 4,00,000 a year, up to INR 7,00,000 with incentives" },
    ],
    sections: [
      {
        heading: "Pay",
        paragraphs: [
          "Fixed pay: INR 4,00,000 a year.",
          "With variable incentives (bonuses and commission), total earnings can go up to INR 7,00,000 a year. The incentives depend on your results.",
        ],
      },
      {
        heading: "About Qamira",
        paragraphs: [
          "Qamira Consulting helps growing businesses find out why they are not performing as well as they should. Then we build the digital marketing, automation, analytics, AI and IT solutions that fix it. Team Qamira brings years of expertise in performance excellence and process optimisation.",
        ],
      },
      {
        heading: "About the role",
        paragraphs: [
          "You are our first business development hire. Your job is to win new clients for our digital marketing and consulting services.",
          "This is not a role where leads are handed to you. You decide which businesses are worth approaching, find the right person, start the conversation, and find out if there is a real problem we can solve. You will work closely with our founder on every important deal.",
          "Once a client signs, our delivery team does the work. You stay in touch with the clients you win and look for ways to grow the relationship.",
        ],
      },
      {
        heading: "What you will do",
        bullets: [
          "Make lists of businesses worth approaching, and find the person who makes the decision.",
          "Contact them by email, LinkedIn, phone and WhatsApp. Say something specific and true about their business - never a copy-paste message.",
          "Hold first calls that find the real problem before you pitch. Check each lead against our written scorecard.",
          "Close our digital marketing retainers, website and chatbot projects, and our one-day Operations Diagnostic Workshop on your own.",
          "Bring consulting opportunities to our founder, and join discovery and proposal calls to learn how they are run.",
          "Hand every new client to our delivery team with a clear written brief: what was sold, what was promised, and by when.",
          "Build referral partnerships with accountants, agencies and professional networks.",
          "Keep Apollo (our CRM) honest: the source, the stage and the next step of every deal. We would rather hear that a deal is dead than watch it sit in the list.",
          "Tell us what you learn in the market, so our offers and sales material keep getting better.",
        ],
      },
      {
        heading: "How we measure your work",
        bullets: [
          "Qualified meetings held.",
          "New clients won and revenue collected.",
          "Quality of your pipeline: are deals staged honestly, and do they move forward?",
          "Quality of your handovers: does the delivery team get what it needs to start?",
        ],
        note: "In your first three months we look mainly at your activity and the quality of your pipeline, not closed revenue. A pipeline takes time to build.",
      },
      {
        heading: "What we are looking for",
        bullets: [
          "2-4 years in business development or sales, ideally selling services to businesses - digital marketing agency, IT services, SaaS, or similar.",
          "You have won new business yourself, not only managed accounts that someone else signed. Tell us what you won and how much it was worth.",
          "You are professional and confident. You are comfortable speaking to business owners and senior people, and you speak and write in clear, professional English.",
          "You are steady and disciplined. You keep reaching out every day, even on the days when nothing is working.",
          "You are curious about how businesses make and lose money.",
          "You ask questions before you start pitching.",
          "You like being coached and you take feedback well.",
          "You live in Pune, or you can move to Pune before joining.",
        ],
        note: "You do not need an MBA or experience at a consulting firm. We will teach you how our consulting services work. We will judge you on a short piece of real work and a live conversation, not only on your CV.",
      },
      {
        heading: "Good to have",
        bullets: [
          "Experience selling digital marketing, websites or software.",
          "Experience selling to small and mid-size business owners.",
          "Experience with a CRM or sales tool such as Apollo, HubSpot or Zoho.",
          "Hindi or Marathi, in addition to English.",
        ],
      },
      {
        heading: "What you get",
        bullets: [
          "Real ownership as our first business development hire, with direct access to the founder.",
          "Coaching from the founder on live calls, with feedback every week.",
          "Pay that grows with your results: bonuses from month one, uncapped commission on every client you win, and a yearly performance and salary review.",
          "A ready sales kit - pitch deck, industry one-pagers, outreach emails and a pricing guide - so you never start from a blank page.",
        ],
      },
    ],
    form: {
      experienceLabel: "Experience in business development or sales",
      experienceOptions: ["Less than 2 years", "2 years", "3 years", "4 years", "5+ years"],
      currentRolePlaceholder: "Company and role, e.g. Business Development Manager, digital marketing agency",
      questions: [
        {
          id: "best-client-won",
          label: "Tell us about the best client you won yourself. How did you find them, and how did you close them?",
        },
        {
          id: "cold-opener",
          label:
            "Pick any Indian business with a weak website or social media. In five lines, what would you say to its owner to get a twenty-minute call?",
          hint: "Name the business, and say what you noticed about it.",
        },
        {
          id: "selling-lesson",
          label: "What is the most useful thing you have learned about selling in the last year?",
        },
      ],
      notePlaceholder: "Anything else we should know, or a question for us.",
      applyIntro:
        "Attach your CV and answer the three short questions. We read the answers closely, so give yourself about fifteen minutes. Prefer email? Send your CV and answers to careers@qamiraconsulting.com.",
    },
    schema: {
      datePosted: "2026-10-21",
      validThrough: "2026-12-31",
      employmentType: "FULL_TIME",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
      minMonthsExperience: 24,
    },
  },
];

export const openJobs = jobs.filter((job) => job.open);

export function findOpenJob(slug: string | undefined): Job | undefined {
  return openJobs.find((job) => job.slug === slug);
}
