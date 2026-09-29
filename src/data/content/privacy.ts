// Privacy Policy copy. Describes actual data handling as implemented in
// api/contact.ts (Resend), api/assessment.ts (Anthropic Claude API), and
// the Meta tracking in src/lib/metaPixel.ts + api/_meta-capi.ts, and the
// Google tag (GA4, feeding Google Ads) in src/lib/googleTag.ts.
// Resend and Vercel are deliberately not named in the "Who else touches
// it" section below (2026-08-24, user decision) -- they're infrastructure
// (email delivery, hosting), not methodology, so omitting them doesn't
// change what data actually flows where, only what's disclosed publicly.
// Keep in sync if the Anthropic integration changes.
//
// Meta IS named, unlike Resend/Vercel, because the distinction drawn there
// was infrastructure vs. methodology. Meta is neither: it is an
// advertising company receiving personal data (hashed contact details, IP,
// browsing activity) for marketing measurement. That is precisely the
// disclosure a privacy policy exists to make, so it is named explicitly
// and the advertising section below spells out what it receives. Google
// is named for the same reason, since it receives browsing data for
// advertising measurement too.

export const privacyHero = {
  eyebrow: "Privacy Policy",
  title: "How we handle your information.",
  lede: "Plain-language description of what we collect, why, and what we do with it -- no dense legal boilerplate.",
};

export const lastUpdated = "29 September 2026";

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
      "We do not sell your information. We do share limited data with Meta (Facebook/Instagram) and Google to measure our own advertising -- see \"Cookies and advertising measurement\" below for exactly what. We do not share your information with any other third party for marketing.",
    ],
  },
  {
    heading: "Cookies and advertising measurement",
    body: [
      "We use the Meta pixel on every page of this site, and Meta's Conversions API on our server. Together they tell us which of our ads led someone to contact us -- nothing more. They run automatically when you open the site; we do not currently show a cookie banner.",
      "What Meta receives on every page: the page you viewed, your IP address, your browser and device type, and two first-party cookies the pixel sets (_fbp, and _fbc if you arrived by clicking one of our ads).",
      "What Meta receives when you submit a form: your email address, name, and (on the assessment) phone number -- one-way hashed with SHA-256 before they are sent, so we never transmit them in readable form. Hashing is a real protection, but it is not anonymisation: Meta can match a hash to one of its own users. That is what makes the measurement work, and you should assume it does.",
      "We also use the Google tag (Google Analytics, linked to Google Ads) on every page. It records the pages you view, your browser and device type, your approximate location, and whether you arrived from one of our Google ads, using first-party cookies such as _ga. When you submit a form, it records only that a form was submitted and which one -- never your name, email, phone number, or anything you typed.",
      "We never send Meta or Google your assessment answers, your maturity ratings, your stated priorities, your revenue figures, or the content of your message. Those stay between you, us, and the report generation described above.",
      "Why: to see whether our advertising works, and to reach people who have shown interest. It plays no part in the report you receive or in how we respond to you.",
      "To opt out: block third-party trackers in your browser or use a content blocker -- the pixel, the Google tag and our server-side events all stop having anything to match you with. You can also adjust what Meta shows you at facebook.com/adpreferences, opt out of Google Analytics with Google's browser add-on at tools.google.com/dlpage/gaoptout, and adjust Google's ads at myadcenter.google.com. The contact form and the assessment work exactly the same either way.",
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
      "Meta Platforms -- receives the advertising measurement data described above. Meta acts under its own terms and privacy policy, not ours.",
      "Google -- receives the analytics and advertising measurement data described above, under its own terms and privacy policy.",
      "Each processes data only as needed to provide its service to us, and is bound by its own privacy and security terms.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can request a copy of the information we hold about you, ask us to correct it, or ask us to delete it, by emailing us at the address below.",
      "You're never required to create an account or provide payment information to use the contact form or the AI Business Assessment.",
      "You can stop the advertising measurement at any time using the browser controls described above -- no account, request, or email to us required.",
    ],
  },
];
