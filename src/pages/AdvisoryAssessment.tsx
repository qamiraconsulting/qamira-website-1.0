import { Check } from "lucide-react";
import { Seo } from "@/lib/Seo";
import { site, orgRef } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FaqSection } from "@/components/sections/FaqSection";
import { useShortlist } from "@/lib/shortlist";
import { domains } from "@/data/content/methodology";
import {
  advisoryAssessmentHero as hero,
  whenItsWorthIt,
  domainsIntro,
  deliverables,
  howItRuns,
  advisoryAssessmentFaq as faq,
  advisoryAssessmentCta as ctaCopy,
} from "@/data/content/advisoryAssessment";

const path = "/advisory/qbpes-assessment";
const url = `${site.url}${path}`;
const SERVICE_CODE = "QC-202";

const description =
  "A fixed-price assessment of your business across eight areas, with a target operating model and a sequenced roadmap of the changes worth making. Six to twelve weeks.";

export function AdvisoryAssessment() {
  // Puts QC-202 on the shortlist before /contact opens, so the enquiry
  // arrives tagged with the service, as on the other service pages.
  const shortlist = useShortlist();
  const addToShortlist = () => {
    if (!shortlist.has(SERVICE_CODE)) shortlist.toggle(SERVICE_CODE);
  };
  const cta = (
    <Button to="/contact" onClick={addToShortlist}>
      Book a free 20-minute call
    </Button>
  );

  return (
    <>
      <Seo
        title="QBPES™ Business Assessment"
        path={path}
        description={description}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "QBPES™ Business Assessment",
            alternateName: ["Business Performance Transformation", "Business performance assessment", "Operating model review"],
            serviceType: "Business assessment and operating model design",
            description: hero.lede,
            provider: orgRef,
            url,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ]}
      />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lede={hero.lede}
        breadcrumbLabel={hero.breadcrumbLabel}
        photo={{
          src: "/photos/who-we-are.webp",
          label: "Hands annotating a printed process map on a desk.",
          alt: "Hands annotating a printed business process map on a sunlit desk",
        }}
      />

      {/* When it's worth it */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{whenItsWorthIt.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{whenItsWorthIt.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{whenItsWorthIt.lede}</p>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
            {whenItsWorthIt.points.map((point) => (
              <RevealItem key={point}>
                <div className="flex h-full items-start gap-3 border border-charcoal/10 bg-parchment p-5">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  <p className="text-sm text-charcoal-dim sm:text-base">{point}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* The eight areas */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{domainsIntro.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{domainsIntro.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{domainsIntro.lede}</p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map((domain) => (
              <RevealItem key={domain.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-lg text-charcoal">{domain.title}</h3>
                  <p className="mt-2.5 text-sm text-charcoal-dim">{domain.question}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* What you get */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <Eyebrow>{deliverables.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-charcoal">{deliverables.heading}</h2>
              <div className="mt-8">{cta}</div>
            </Reveal>
            <RevealGroup className="flex flex-col gap-4">
              {deliverables.items.map((item) => (
                <RevealItem key={item}>
                  <div className="flex items-start gap-3 border border-charcoal/10 bg-parchment p-5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                    <p className="text-sm text-charcoal-dim sm:text-base">{item}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* How it runs */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{howItRuns.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{howItRuns.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{howItRuns.lede}</p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItRuns.steps.map((step, i) => (
              <RevealItem key={step.title}>
                <Card className="flex h-full flex-col">
                  <span className="font-mono text-xs text-brass">{`0${i + 1}`}</span>
                  <h3 className="mt-3 text-lg text-charcoal">{step.title}</h3>
                  <p className="mt-2.5 text-sm text-charcoal-dim">{step.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <FaqSection eyebrow="Frequently asked" heading="Questions about the assessment." items={faq} />

      {/* CTA */}
      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">{ctaCopy.heading}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">{ctaCopy.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {cta}
              <Button to="/methodology" variant="ghost" arrow={false}>
                More on QBPES™
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
