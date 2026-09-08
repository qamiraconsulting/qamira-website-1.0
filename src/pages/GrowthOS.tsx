import { Seo } from "@/lib/Seo";
import { site, orgRef } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProcessFlow } from "@/components/brand/ProcessFlow";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  growthOSHero,
  whatItIs,
  growthLoopIntro,
  growthLoopSteps,
  growthLoopClosing,
  capabilitiesIntro,
  capabilities,
  aiAndAutomation,
  exampleJourney,
  whyQamira,
  suitableFor,
  implementationApproach,
  growthOSFaq,
  growthOSCta,
} from "@/data/content/growthOS";

const url = `${site.url}/growth-os`;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: growthOSFaq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export function GrowthOS() {
  return (
    <>
      <Seo
        title="Qamira GrowthOS™"
        path="/growth-os"
        description="Qamira GrowthOS™: the AI-powered business growth and performance operating system that connects acquisition, conversion, delivery, and measurement into one continuous loop."
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Qamira GrowthOS™",
            alternateName: "GrowthOS",
            description: whatItIs.body,
            provider: orgRef,
            areaServed: "Global",
            audience: { "@type": "BusinessAudience", audienceType: "Small and medium-sized businesses" },
            url,
          },
          faqJsonLd,
        ]}
      />
      <PageHero
        eyebrow={growthOSHero.eyebrow}
        title={growthOSHero.title}
        lede={growthOSHero.lede}
        breadcrumbLabel={growthOSHero.breadcrumbLabel}
      />

      {/* What GrowthOS is -- and isn't */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{whatItIs.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{whatItIs.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{whatItIs.body}</p>
          </Reveal>

          <Reveal className="mt-10 max-w-[46rem] border-l-2 border-brass/40 pl-6">
            <p className="text-sm text-charcoal-dim">{whatItIs.notThisIntro}</p>
            <ul className="mt-3 space-y-1.5">
              {whatItIs.notThis.map((item) => (
                <li key={item} className="text-sm text-charcoal-dim">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-charcoal-dim">{whatItIs.notThisOutro}</p>
          </Reveal>
        </Container>
      </Section>

      {/* The Growth Loop */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{growthLoopIntro.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{growthLoopIntro.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{growthLoopIntro.lede}</p>
          </Reveal>

          <div className="mt-14">
            <ProcessFlow steps={growthLoopSteps} variant="full" />
          </div>

          <Reveal className="mt-10 max-w-[46rem]">
            <p className="text-sm italic text-charcoal-dim">{growthLoopClosing}</p>
          </Reveal>
        </Container>
      </Section>

      {/* Eight capabilities */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{capabilitiesIntro.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{capabilitiesIntro.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{capabilitiesIntro.lede}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap) => (
              <RevealItem key={cap.number}>
                <Card className="flex h-full flex-col">
                  <span className="font-mono text-xs text-brass">{cap.number}</span>
                  <h3 className="mt-2 text-lg text-charcoal">{cap.title}</h3>
                  <p className="mt-2.5 text-sm text-charcoal-dim">{cap.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* How AI and automation work together */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{aiAndAutomation.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{aiAndAutomation.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{aiAndAutomation.body}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {aiAndAutomation.points.map((point) => (
              <RevealItem key={point.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-lg text-charcoal">{point.title}</h3>
                  <p className="mt-2.5 text-sm text-charcoal-dim">{point.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Example business journey */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{exampleJourney.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{exampleJourney.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{exampleJourney.lede}</p>
          </Reveal>

          <RevealGroup className="mt-12 flex flex-col divide-y divide-charcoal/10 border-y border-charcoal/10">
            {exampleJourney.stages.map((stage) => (
              <RevealItem
                key={stage.title}
                className="grid grid-cols-1 gap-2 py-7 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-8"
              >
                <h3 className="text-charcoal">{stage.title}</h3>
                <p className="text-sm text-charcoal-dim sm:text-base">{stage.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-6">
            <p className="text-xs text-charcoal-dim/70">{exampleJourney.disclaimer}</p>
          </Reveal>
        </Container>
      </Section>

      {/* Why Qamira */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{whyQamira.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{whyQamira.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{whyQamira.body}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {whyQamira.points.map((point) => (
              <RevealItem key={point.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-lg text-charcoal">{point.title}</h3>
                  <p className="mt-2.5 text-sm text-charcoal-dim">{point.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Suitable businesses */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{suitableFor.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{suitableFor.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{suitableFor.lede}</p>
          </Reveal>

          <RevealGroup className="mt-10 max-w-[46rem] space-y-3">
            {suitableFor.signals.map((signal) => (
              <RevealItem key={signal} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                <p className="text-sm text-charcoal-dim sm:text-base">{signal}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Implementation approach */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{implementationApproach.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{implementationApproach.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{implementationApproach.lede}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {implementationApproach.phases.map((phase, i) => (
              <RevealItem key={phase.title}>
                <Card className="flex h-full flex-col">
                  <span className="font-mono text-xs text-brass">{`0${i + 1}`}</span>
                  <h3 className="mt-2 text-lg text-charcoal">{phase.title}</h3>
                  <p className="mt-2.5 text-sm text-charcoal-dim">{phase.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <FaqSection eyebrow="Frequently asked" heading="Questions about GrowthOS™, answered plainly." items={growthOSFaq} />

      {/* CTA */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="mx-auto max-w-[46rem] text-center">
            <Eyebrow center>{growthOSCta.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{growthOSCta.heading}</h2>
            <p className="mx-auto mt-4 max-w-[60ch] text-charcoal-dim">{growthOSCta.body}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {growthOSCta.paths.map((path) => (
              <RevealItem key={path.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-lg text-charcoal">{path.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm text-charcoal-dim">{path.body}</p>
                  <div className="mt-6">
                    <Button to={path.cta.to}>{path.cta.label}</Button>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
