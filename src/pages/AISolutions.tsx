import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { aiSolutionsHero, principles, transformationMatrix, pipeline, stack } from "@/data/content/aiSolutions";

export function AISolutions() {
  return (
    <>
      <Seo
        title="AI Solutions"
        path="/ai-solutions"
        description="AI that augments our judgment, never replaces it -- responsible AI principles, the Cognitive Transformation Matrix, and our multi-agent assessment pipeline."
      />
      <PageHero
        eyebrow={aiSolutionsHero.eyebrow}
        title={aiSolutionsHero.title}
        lede={aiSolutionsHero.lede}
        breadcrumbLabel="AI Solutions"
      />

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>Responsible AI principles</Eyebrow>
            <h2 className="mt-4 text-charcoal">Governed, not improvised.</h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {principles.map((principle) => (
              <RevealItem key={principle.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-charcoal">{principle.title}</h3>
                  <p className="mt-3 text-sm text-charcoal-dim">{principle.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{transformationMatrix.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{transformationMatrix.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{transformationMatrix.body}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {transformationMatrix.quadrants.map((q) => (
              <RevealItem key={q.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-charcoal">{q.title}</h3>
                  <p className="mt-3 text-sm text-charcoal-dim">{q.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>How an assessment runs</Eyebrow>
            <h2 className="mt-4 text-charcoal">A five-agent pipeline, with a mandatory human-review gate.</h2>
          </Reveal>

          <RevealGroup className="mt-12 flex flex-col">
            {pipeline.map((agent, i) => (
              <RevealItem
                key={agent.title}
                className="grid grid-cols-1 gap-2 border-t border-charcoal/10 py-8 last:border-b sm:grid-cols-[140px_1fr] sm:gap-8"
              >
                <span className="font-mono text-sm tracking-[0.04em] text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-charcoal">{agent.title}</h3>
                  <p className="mt-2 max-w-[65ch] text-sm text-charcoal-dim">{agent.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[46rem]">
            <Eyebrow center>{stack.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{stack.heading}</h2>
            <p className="mx-auto mt-4 max-w-[65ch] text-charcoal-dim">{stack.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/methodology" variant="ghost" arrow={false}>
                See the full methodology
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
