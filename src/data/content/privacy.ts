// Privacy Policy copy. Describes actual data handling as implemented in
// api/contact.ts (Resend) and api/assessment.ts (Anthropic Claude API).
// Resend and Vercel are deliberately not named in the "Who else touches
// it" section below (2026-08-24, user decision) -- they're infrastructure
// (email delivery, hosting), not methodology, so omitting them doesn't
// change what data actually flows where, only what's disclosed publicly.
// Keep in sync if the Anthropic integration changes.

export const privacyHero = {
  eyebrow: "Privacy Policy",
  title: "How we handle your information.",
  lede: "Plain-language description of what we collect, why, and what we do with it -- no dense legal boilerplate.",
};

export const lastUpdated = "24 August 2026";

export const sections = [
  {
    heading: "What we collect",
    body: [
      "Contact form (/contact): your name, email, company, and message.",
      "AI Business Assessment (/assessment): your company profile (industry, revenue range, employee count, and similar), your self-rated answers across our eight performance domains, the systems/tools questions, your stated priorities, and your contact details (name, email, role, phone).",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Contact form submissions are used solely to respond to your enquiry.",
      "Assessment submissions are sent to Anthropic's Claude API to generate your personalized AI Opportunity Report. Per Anthropic's commercial API terms (anthropic.com/legal/commercial-terms), data submitted through the API is not used to train Anthropic's models, and is retained only briefly for abuse and safety monitoring.",
      "We do not sell your information, and we do not share it with third parties for marketing or any other unrelated purpose.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Assessment submissions are retained by Qamira only if you choose to continue into a consultation with us. If you don't, we don't keep your submission on file for any other purpose.",
      "Where we do retain your information, it is used only for your own ongoing engagement with Qamira -- never repurposed for another client, and never used to train any AI model.",
      "Contact form messages are kept only as long as needed for correspondence with you.",
    ],
  },
  {
    heading: "Who else touches it",
    body: [
      "Anthropic -- processes assessment answers via the Claude API to generate your report.",
      "Anthropic processes data only as needed to provide this service to us, and is bound by its own privacy and security terms.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can request a copy of the information we hold about you, ask us to correct it, or ask us to delete it, by emailing us at the address below.",
      "You're never required to create an account or provide payment information to use the contact form or the AI Business Assessment.",
    ],
  },
];
