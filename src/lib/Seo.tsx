import { Helmet } from "react-helmet-async";
import { site, organizationSchema } from "@/data/site";

/** One <link rel="alternate" hreflang> entry. `href` is a full URL. */
export type HreflangLink = { hreflang: string; href: string };

type SeoProps = {
  title: string;
  /**
   * The whole <title>, used as-is instead of "{title} | Qamira Consulting".
   * For the homepage, whose title leads with what the firm does.
   */
  fullTitle?: string;
  description?: string;
  path?: string;
  /** One schema.org object, or several (rendered as separate <script> blocks). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /**
   * Shorter title for og:title / twitter:title. Link previews truncate at
   * roughly 60-90 characters, so a long article headline should supply a
   * short form here; the <title> keeps the full headline.
   */
  ogTitle?: string;
  /** Site-relative path to a 1200x630 card, e.g. "/og/my-article.png?v=1". Falls back to the site card. */
  ogImage?: string;
  /** "article" for insights pages, which also emits article:* tags. */
  ogType?: "website" | "article";
  /** ISO date, only used when ogType is "article". */
  publishedTime?: string;
  /** Article category, only used when ogType is "article". */
  section?: string;
  /** Equivalent pages for other countries, from hreflangFor(). Includes this page. */
  alternates?: HreflangLink[];
};

export function Seo({
  title,
  fullTitle: fullTitleOverride,
  description = site.description,
  path = "/",
  jsonLd,
  ogTitle,
  ogImage,
  ogType = "website",
  publishedTime,
  section,
  alternates = [],
}: SeoProps) {
  const fullTitle = fullTitleOverride ?? (title === "Home" ? site.name : `${title} | ${site.name}`);
  const socialTitle = ogTitle ? `${ogTitle} | ${site.name}` : fullTitle;
  const url = `${site.url}${path === "/" ? "" : path}`;
  // The organization node goes on every page, first, so the provider and
  // publisher references (orgRef) on any page resolve without a crawler
  // having to visit the homepage too.
  const jsonLdBlocks = [organizationSchema, ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [])];
  // A real 1200x630 card. This previously pointed at the 180x180
  // apple-touch-icon while still declaring summary_large_image, so every
  // share on LinkedIn and WhatsApp rendered as a tiny icon or no image at
  // all -- on the two channels most Qamira links actually travel through.
  const image = `${site.url}${ogImage ?? site.ogImage}`;
  const imageAlt = ogImage ? (ogTitle ?? title) : `${site.name}: ${site.tagline}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {alternates.map((alt) => (
        // Spread, not hrefLang=: Helmet writes attribute names as given, and
        // some SEO crawlers only match the lowercase "hreflang".
        <link key={alt.hreflang} rel="alternate" {...{ hreflang: alt.hreflang }} href={alt.href} />
      ))}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      {ogType === "article" && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {ogType === "article" && section && <meta property="article:section" content={section} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
