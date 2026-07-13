import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProcessFlow } from "@/components/brand/ProcessFlow";
import { methodologyHero, domains, maturityLevels, interoperabilityNote } from "@/data/content/methodology";
import { processIntro, processSteps } from "@/data/content/process";

export function Methodology() {
  return (
    <>
      <Seo
        title="Methodology"
        path="/methodology"
        description="QBPES™: the Qamira Business Performance Excellence System -- eight domains, a five-level maturity model, and an eight-step delivery process."
      />
      <PageHero
        eyebrow={methodologyHero.eyebrow}
        title={methodologyHero.title}
        lede={methodologyHero.lede}
        breadcrumbLabel="Methodology"
      />

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>The eight performance domains</Eyebrow>
            <h2 className="mt-4 text-charcoal">Every engagement is scoped against all eight.</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">
              No engagement scores every domain to the same depth -- Business Discovery determines which domains
              carry the client's real problem -- but all eight are checked so nothing material is missed.
            </p>
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

      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>The maturity model</Eyebrow>
            <h2 className="mt-4 text-charcoal">Five levels, scored on observable evidence.</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">
              Each domain is scored on this scale using a rubric of observable evidence, so two consultants scoring
              the same client converge on the same level. The eight scores roll up into a single Corporate Maturity
              Score.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 flex flex-col divide-y divide-charcoal/10 border-y border-charcoal/10">
            {maturityLevels.map((level) => (
              <RevealItem
                key={level.level}
                className="grid grid-cols-1 gap-2 py-7 sm:grid-cols-[100px_160px_1fr] sm:items-baseline sm:gap-8"
              >
                <span className="font-mono text-sm text-brass">{level.level}</span>
                <h3 className="text-charcoal">{level.title}</h3>
                <p className="text-sm text-charcoal-dim sm:text-base">{level.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{processIntro.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{processIntro.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{processIntro.lede}</p>
          </Reveal>

          <div className="mt-14">
            <ProcessFlow steps={processSteps} variant="full" />
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[46rem]">
            <Eyebrow center>{interoperabilityNote.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{interoperabilityNote.heading}</h2>
            <p className="mx-auto mt-4 max-w-[65ch] text-charcoal-dim">{interoperabilityNote.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/ai-solutions" variant="ghost" arrow={false}>
                See how AI fits in
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
