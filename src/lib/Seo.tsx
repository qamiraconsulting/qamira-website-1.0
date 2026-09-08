import { Helmet } from "react-helmet-async";
import { site } from "@/data/site";

type SeoProps = {
  title: string;
  description?: string;
  path?: string;
  /** One schema.org object, or several (rendered as separate <script> blocks). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function Seo({ title, description = site.description, path = "/", jsonLd }: SeoProps) {
  const fullTitle = title === "Home" ? site.name : `${title} | ${site.name}`;
  const url = `${site.url}${path === "/" ? "" : path}`;
  const jsonLdBlocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  // A real 1200x630 card. This previously pointed at the 180x180
  // apple-touch-icon while still declaring summary_large_image, so every
  // share on LinkedIn and WhatsApp rendered as a tiny icon or no image at
  // all -- on the two channels most Qamira links actually travel through.
  const image = `${site.url}${site.ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${site.name} -- ${site.tagline}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
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
