import { Link, useParams } from "react-router-dom";
import { Seo } from "@/lib/Seo";
import { site, orgRef } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { articles } from "@/data/content/insights";
import { NotFound } from "@/pages/NotFound";

export function InsightArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <NotFound />;
  }

  const url = `${site.url}/insights/${article.slug}`;

  return (
    <>
      <Seo
        title={article.title}
        path={`/insights/${article.slug}`}
        description={article.summary}
        ogTitle={article.ogTitle}
        ogImage={article.ogImage}
        ogType="article"
        publishedTime={article.datePublished}
        section={article.category}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.summary,
            datePublished: article.datePublished,
            dateModified: article.datePublished,
            articleSection: article.category,
            author: orgRef,
            publisher: orgRef,
            mainEntityOfPage: url,
            url,
            ...(article.sources && {
              citation: article.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
            }),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Insights", item: `${site.url}/insights` },
              { "@type": "ListItem", position: 3, name: article.title, item: url },
            ],
          },
        ]}
      />

      <Section tone="parchment" className="pt-40 sm:pt-48 lg:pt-60">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <p className="font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">
              <Link to="/" className="hover:text-brass">
                Home
              </Link>{" "}
              /{" "}
              <Link to="/insights" className="hover:text-brass">
                Insights
              </Link>
            </p>
            <div className="mt-5">
              <Eyebrow>{article.category}</Eyebrow>
            </div>
            <h1 className="mt-4 text-charcoal">{article.title}</h1>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.05em] text-charcoal-dim/70">
              {new Date(article.datePublished).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal className="mx-auto flex max-w-[42rem] flex-col gap-6">
            {article.body.map((block, i) => {
              if (typeof block === "string") {
                return (
                  <p key={i} className="text-base leading-relaxed text-charcoal-dim sm:text-lg">
                    {block}
                  </p>
                );
              }
              if ("heading" in block) {
                return (
                  <h2 key={i} className="mt-6 text-2xl text-charcoal sm:text-3xl">
                    {block.heading}
                  </h2>
                );
              }
              const ListTag = block.ordered ? "ol" : "ul";
              return (
                <ListTag
                  key={i}
                  className={`flex flex-col gap-4 pl-6 text-base leading-relaxed text-charcoal-dim marker:text-brass sm:text-lg ${
                    block.ordered ? "list-decimal" : "list-disc"
                  }`}
                >
                  {block.list.map((item, j) => (
                    <li key={j} className="pl-1">
                      {item}
                    </li>
                  ))}
                </ListTag>
              );
            })}

            {article.sources && article.sources.length > 0 && (
              <div className="mt-6 border-t border-charcoal/10 pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">Sources</p>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-charcoal-dim">
                  {article.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-charcoal/30 underline-offset-2 hover:text-brass"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">Want our take on your situation specifically?</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">
              This is a general perspective. A conversation about your business gets a specific one.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/insights" variant="ghost" arrow={false}>
                More perspectives
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
