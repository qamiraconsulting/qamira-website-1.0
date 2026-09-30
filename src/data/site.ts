export const site = {
  name: "Qamira Consulting",
  shortName: "Qamira",
  tagline: "Business Performance Excellence, AI-Native Execution",
  motto: "Strategy Foundation. Process Structure. People Capability. AI Accelerant.",
  description:
    "Qamira Consulting is a Business Performance Excellence firm. We diagnose what's constraining growth, redesign the process and operating model beneath it, and deploy AI-native execution to make the fix permanent -- governed by QBPES™, our proprietary performance system.",
  email: "enquiries@qamiraconsulting.com",
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
  ogImage: "/og/qamira-og.png",
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
  label: "LinkedIn" | "Instagram" | "Facebook";
  url: string;
};

export const socialProfiles: readonly SocialProfile[] = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/qamira-consulting/" },
  { label: "Instagram", url: "https://www.instagram.com/qamiraconsulting/" },
  // Same handle as Instagram, deliberately. The Page's numeric id is
  // 61594467201992 if the username ever needs to be traced back to it.
  { label: "Facebook", url: "https://www.facebook.com/qamiraconsulting" },
];

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
  "@type": "ProfessionalService",
  "@id": orgId,
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/logo/apple-touch-icon.png`,
  image: `${site.url}${site.ogImage}`,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  // Named explicitly rather than "Global": the firm's go-to-market is
  // India-primary with existing delivery in Australia, and a truthful,
  // specific areaServed is a stronger relevance signal than a broad one.
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Australia" },
  ],
  knowsAbout: [
    "Business Performance Excellence",
    "Operational Excellence",
    "Business Process Optimization",
    "Business Intelligence and Analytics Strategy",
    "AI Strategy and Intelligent Automation",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: site.email,
    telephone: site.phone,
    contactType: "customer service",
    areaServed: ["IN", "AU"],
    availableLanguage: ["English", "Hindi", "Marathi"],
  },
  // sameAs is the strongest entity-disambiguation signal available: it
  // tells search engines this site and these profiles are one entity,
  // which is what separates Qamira from the unrelated (deadpooled) US
  // company of the same name on Crunchbase and Tracxn, and from
  // Qamr/Qamar Consulting in India.
  //
  // Driven by socialProfiles above so the dock, the footer and this list
  // can never drift apart. Only profiles that actually resolve appear --
  // a URL that 404s is worse than an absent one. Add the Google Business
  // Profile and Crunchbase entries to socialProfiles as they go live.
  sameAs: activeSocialProfiles.map((profile) => profile.url),
} as const;
