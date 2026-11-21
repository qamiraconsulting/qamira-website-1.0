export const site = {
  name: "Qamira Consulting",
  shortName: "Qamira",
  /** The firm statement. Used as the homepage H1 and the social card's alt text. */
  tagline: "We advise on what to change, and build the systems that change it.",
  /** Footer line. Kept short and free of any ordering between advice and technology. */
  motto: "Advisory and technology. Fixed price, delivered in weeks.",
  /**
   * The homepage meta description, and the fallback for any page that
   * doesn't set its own. Keep it under 155 characters so search results
   * don't cut it off.
   */
  description:
    "We advise owner-led and mid-sized businesses on what to change, and build the systems that change it. Start with a free AI Business Assessment.",
  /**
   * The longer, CTA-free version used in the organization schema, where a
   * call to action would read oddly.
   */
  summary:
    "Qamira Consulting is a business advisory and technology firm. We advise owner-led and mid-sized businesses on what to change, and build the systems that change it, at a fixed price and in weeks. Our team is based in India and works remotely across Indian, Australian, UK and European business hours.",
  email: "enquiries@qamiraconsulting.com",
  /** Job applications. Duplicated as CAREERS_TO_EMAIL in api/apply.ts. */
  careersEmail: "careers@qamiraconsulting.com",
  phone: "+91 9096236852",
  /**
   * The same line as `phone`, in the form wa.me requires: country code
   * first, no `+`, no spaces. Kept beside `phone` rather than derived from
   * it so there is one obvious place to change the number, and so a
   * stray space in `phone` can never silently produce a dead chat link.
   */
  whatsapp: "919096236852",
  url: "https://www.qamiraconsulting.com",
  /** 1200x630 social card. Used for og:image and twitter:image site-wide. */
  // Bump ?v= whenever scripts/make-og-card.py regenerates the card:
  // LinkedIn and others cache preview images by URL, so a same-URL
  // replacement keeps showing the old card.
  ogImage: "/og/qamira-og.png?v=3",
} as const;

/**
 * Public profiles, in the order the connect dock and the footer show them.
 *
 * A profile with an empty `url` is skipped everywhere -- in the dock, in
 * the footer, and in the organization schema's `sameAs`. That is
 * deliberate: a social link that 404s is worse than an absent one, so an
 * unknown or unpublished profile stays blank until its real URL is known,
 * rather than shipping a guess.
 */
export type SocialProfile = {
  label: "LinkedIn" | "Instagram" | "Facebook" | "X" | "YouTube";
  url: string;
};

export const socialProfiles: readonly SocialProfile[] = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/qamira-consulting/" },
  { label: "Instagram", url: "https://www.instagram.com/qamiraconsulting/" },
  // Same handle as Instagram, deliberately. The Page's numeric id is
  // 61594467201992 if the username ever needs to be traced back to it.
  { label: "Facebook", url: "https://www.facebook.com/qamiraconsulting" },
  // "qamiraconsulting" was too long for an X handle (15-character limit).
  { label: "X", url: "https://x.com/QamiraConsult" },
  // Channel-id URL, not an @handle, so it keeps resolving if the handle changes.
  { label: "YouTube", url: "https://www.youtube.com/channel/UCJkqMxTA-R8GYNlIwRaEoTg" },
];

/**
 * Directory listings that describe the firm (review and agency sites).
 * Schema-only: they go into the organization's sameAs, but are not shown
 * in the connect dock or footer. Same rule as above -- leave a URL blank
 * until it is confirmed live.
 */
export const directoryProfiles: readonly { label: string; url: string }[] = [
  { label: "GoodFirms", url: "" },
  { label: "Clutch", url: "" },
];

export const activeDirectoryProfiles = directoryProfiles.filter((profile) => profile.url !== "");

/** The profiles that actually resolve. Everything renders from this. */
export const activeSocialProfiles = socialProfiles.filter((profile) => profile.url !== "");

/**
 * A wa.me deep link that opens WhatsApp on the firm's line with `message`
 * already typed but not sent, so the visitor still chooses to send it.
 *
 * wa.me works on desktop web, the desktop app and both mobile OSes, which
 * is why it is used instead of the api.whatsapp.com or whatsapp:// forms.
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Stable identifier for the one Organization node on the site.
 *
 * Every schema block that names a publisher or provider references this
 * @id rather than re-declaring an anonymous Organization, so search
 * engines resolve them all to a single entity instead of ~20 unrelated
 * ones. That matters more than usual here: "Qamira" collides with an
 * unrelated (deadpooled) US company on Crunchbase and Tracxn, and with
 * Qamr/Qamar Consulting in India, so entity disambiguation is doing real
 * work rather than being a formality.
 */
export const orgId = `${site.url}/#organization`;

/** Reference to the organization node, for publisher/provider fields. */
export const orgRef = { "@id": orgId } as const;

/**
 * The full Organization node, emitted once on the home page. Everything
 * else points at it via orgRef.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  // Both types: Organization is what search engines look for first, and
  // ProfessionalService says what kind of organization it is.
  "@type": ["Organization", "ProfessionalService"],
  "@id": orgId,
  name: site.name,
  description: site.summary,
  url: site.url,
  logo: `${site.url}/logo/apple-touch-icon.png`,
  image: `${site.url}${site.ogImage}`,
  email: site.email,
  telephone: site.phone,
  // City, region and country only. No street address: there is no public office.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  // Named explicitly rather than "Global": a truthful, specific list of the
  // markets the firm sells into is a stronger relevance signal than a
  // broad one. Keep in step with the country pages (/in, /au, /uk, /us).
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  // The two practices, in the same words the homepage uses.
  knowsAbout: [
    "Business advisory",
    "Operating model design",
    "Business process improvement",
    "Pricing strategy",
    "Growth planning",
    "Website and online store development",
    "Search engine optimisation",
    "Generative engine optimisation",
    "AI chatbots and assistants",
    "AI voice reception",
    "CRM development",
    "HR management software",
    "Business reporting and dashboards",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: site.email,
    telephone: site.phone,
    contactType: "customer service",
    areaServed: ["IN", "AU", "GB", "US", "AE"],
    availableLanguage: ["English", "Hindi", "Marathi"],
  },
  // sameAs is the strongest entity-disambiguation signal available: it
  // tells search engines this site and these profiles are one entity,
  // which is what separates Qamira from the unrelated (deadpooled) US
  // company of the same name on Crunchbase and Tracxn, and from
  // Qamr/Qamar Consulting in India.
  //
  // Driven by socialProfiles and directoryProfiles above, so the dock,
  // the footer and this list can never drift apart. Only profiles that
  // actually resolve appear -- a URL that 404s is worse than an absent one.
  sameAs: [...activeSocialProfiles, ...activeDirectoryProfiles].map((profile) => profile.url),
} as const;
