export const site = {
  name: "Qamira Consulting",
  shortName: "Qamira",
  tagline: "Business Performance Excellence, AI-Native Execution",
  motto: "Strategy Foundation. Process Structure. People Capability. AI Accelerant.",
  description:
    "Qamira Consulting is a Business Performance Excellence firm. We diagnose what's constraining growth, redesign the process and operating model beneath it, and deploy AI-native execution to make the fix permanent -- governed by QBPES™, our proprietary performance system.",
  email: "enquiries@qamiraconsulting.com",
  phone: "+91 9096236852",
  url: "https://www.qamiraconsulting.com",
  /** 1200x630 social card. Used for og:image and twitter:image site-wide. */
  ogImage: "/og/qamira-og.png",
} as const;

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
  // sameAs is the strongest entity-disambiguation signal available, and
  // it stays empty until the profiles actually exist -- listing a URL
  // that 404s is worse than listing nothing. Add the LinkedIn company
  // page here the day it goes live, then Crunchbase and the Google
  // Business Profile.
  // sameAs: ["https://www.linkedin.com/company/..."],
} as const;
