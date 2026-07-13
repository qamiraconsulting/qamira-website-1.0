import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  aboutHero,
  foundation,
  pillarsDetail,
  differentiators,
  idealClientSignals,
  brandPromise,
} from "@/data/content/about";

export function About() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Qamira is a Business Performance Excellence firm, not a technology vendor. Learn our foundation, our three pillars, and who we're built for."
      />
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        lede={aboutHero.lede}
        breadcrumbLabel="About"
      />

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{foundation.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{foundation.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{foundation.body}</p>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-3">
            {pillarsDetail.map((pillar) => (
              <RevealItem key={pillar.index}>
                <Card className="flex h-full flex-col">
                  <span className="font-mono text-xs text-brass">{pillar.index}</span>
                  <h3 className="mt-4 text-charcoal">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-charcoal-dim">{pillar.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>What makes us different</Eyebrow>
            <h2 className="mt-4 text-charcoal">Three things you'll notice in the first meeting.</h2>
          </Reveal>

          <RevealGroup className="mt-12 flex flex-col divide-y divide-charcoal/10 border-y border-charcoal/10">
            {differentiators.map((item) => (
              <RevealItem key={item.title} className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-[1fr_1.6fr] sm:gap-8">
                <h3 className="text-charcoal">{item.title}</h3>
                <p className="text-sm text-charcoal-dim sm:text-base">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <Eyebrow>Is this you?</Eyebrow>
              <h2 className="mt-4 text-charcoal">Our ideal client shares three signals.</h2>
              <p className="mt-4 text-base text-charcoal-dim sm:text-lg">
                Regardless of size or industry, the clients we serve best recognize themselves here.
              </p>
            </Reveal>
            <RevealGroup className="flex flex-col gap-5">
              {idealClientSignals.map((signal) => (
                <RevealItem key={signal}>
                  <Card className="flex items-start gap-4">
                    <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brass" />
                    <p className="text-sm text-charcoal-dim sm:text-base">{signal}</p>
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <Eyebrow center>{brandPromise.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{brandPromise.heading}</h2>
            <p className="mx-auto mt-4 max-w-[56ch] text-charcoal-dim">{brandPromise.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/methodology" variant="ghost" arrow={false}>
                Explore our methodology
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
