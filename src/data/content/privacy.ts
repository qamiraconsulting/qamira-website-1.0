// Privacy Policy copy. Describes actual data handling as implemented in
// api/contact.ts (Resend), api/assessment.ts (Anthropic Claude API), and
// Clerk (Client Portal auth) -- keep in sync if any of those change.

export const privacyHero = {
  eyebrow: "Privacy Policy",
  title: "How we handle your information.",
  lede: "Plain-language description of what we collect, why, and what we do with it -- no dense legal boilerplate.",
};

export const lastUpdated = "16 July 2026";

export const sections = [
  {
    heading: "What we collect",
    body: [
      "Contact form (/contact): your name, email, company, and message.",
      "AI Business Assessment (/assessment): your company profile (industry, revenue range, employee count, and similar), your self-rated answers across our eight performance domains, the systems/tools questions, your stated priorities, and your contact details (name, email, role, phone).",
      "Client Portal: standard authentication data (email and session information) handled by our sign-in provider, Clerk.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Contact form submissions are used solely to respond to your enquiry.",
      "Assessment submissions are sent to Anthropic's Claude API to generate your personalized AI Opportunity Report. Per Anthropic's API terms, data submitted through the API is not used to train Anthropic's models.",
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
      "Resend -- delivers contact form emails on our behalf.",
      "Anthropic -- processes assessment answers via the Claude API to generate your report.",
      "Clerk -- handles authentication for the Client Portal.",
      "Vercel -- hosts this website and its backend functions.",
      "Each of these providers processes data only as needed to provide their service to us and is bound by their own privacy and security terms.",
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
