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

      <Section tone="parchment" className="pt-40 sm:pt-48">
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
            {article.body.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-charcoal-dim sm:text-lg">
                {paragraph}
              </p>
            ))}
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
