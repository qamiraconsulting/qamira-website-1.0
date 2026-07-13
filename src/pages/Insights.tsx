import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { insightsHero, articles } from "@/data/content/insights";

export function Insights() {
  return (
    <>
      <Seo
        title="Insights"
        path="/insights"
        description="Qamira's perspective on performance, process, and AI-native execution -- why most transformation programs fail before the technology is even chosen."
      />
      <PageHero
        eyebrow={insightsHero.eyebrow}
        title={insightsHero.title}
        lede={insightsHero.lede}
        breadcrumbLabel="Insights"
      />

      <Section tone="white">
        <Container>
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <RevealItem key={article.title}>
                <Card className="flex h-full flex-col">
                  <span className="font-mono text-xs uppercase tracking-[0.05em] text-brass">{article.category}</span>
                  <h3 className="mt-3 text-lg text-charcoal">{article.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-charcoal-dim">{article.summary}</p>
                  <span className="mt-5 font-mono text-xs uppercase tracking-[0.05em] text-charcoal-dim/70">
                    Full article in progress
                  </span>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">Want our take on your situation specifically?</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">
              These are general perspectives. A conversation about your business gets a specific one.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
