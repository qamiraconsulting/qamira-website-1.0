import { Helmet } from "react-helmet-async";
import { site } from "@/data/site";

type SeoProps = {
  title: string;
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
};

export function Seo({
  title,
  description = site.description,
  path = "/",
  jsonLd,
  ogTitle,
  ogImage,
  ogType = "website",
  publishedTime,
  section,
}: SeoProps) {
  const fullTitle = title === "Home" ? site.name : `${title} | ${site.name}`;
  const socialTitle = ogTitle ? `${ogTitle} | ${site.name}` : fullTitle;
  const url = `${site.url}${path === "/" ? "" : path}`;
  const jsonLdBlocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  // A real 1200x630 card. This previously pointed at the 180x180
  // apple-touch-icon while still declaring summary_large_image, so every
  // share on LinkedIn and WhatsApp rendered as a tiny icon or no image at
  // all -- on the two channels most Qamira links actually travel through.
  const image = `${site.url}${ogImage ?? site.ogImage}`;
  const imageAlt = ogImage ? (ogTitle ?? title) : `${site.name} -- ${site.tagline}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
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
