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
      <meta property="og:image" content={`${site.url}/logo/apple-touch-icon.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${site.url}/logo/apple-touch-icon.png`} />
      {jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
