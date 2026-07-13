import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { industriesHero, industryGroups } from "@/data/content/industries";

export function Industries() {
  return (
    <>
      <Seo
        title="Industries"
        path="/industries"
        description="Industry-specific accelerators built on the QBPES™ framework -- pre-built KPIs, process taxonomies, and benchmarks across nine verticals."
      />
      <PageHero
        eyebrow={industriesHero.eyebrow}
        title={industriesHero.title}
        lede={industriesHero.lede}
        breadcrumbLabel="Industries"
      />

      {industryGroups.map((group, i) => (
        <Section key={group.group} tone={i % 2 === 0 ? "white" : "surface"} bordered={i > 0}>
          <Container>
            <Reveal className="max-w-[46rem]">
              <Eyebrow>{group.group}</Eyebrow>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.industries.map((industry) => (
                <RevealItem key={industry.title}>
                  <Card className="flex h-full flex-col">
                    <h3 className="text-charcoal">{industry.title}</h3>
                    <span className="mt-1.5 font-mono text-xs uppercase tracking-[0.05em] text-brass">
                      {industry.focus}
                    </span>
                    <p className="mt-4 text-sm text-charcoal-dim">{industry.body}</p>
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ))}

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">Don't see your industry?</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">
              The QBPES™ architecture applies regardless of vertical -- accelerators simply give us a head start.
              Tell us about your business and we'll scope from the general framework.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/services" variant="ghost" arrow={false}>
                See our services
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
