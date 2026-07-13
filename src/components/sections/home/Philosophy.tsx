import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { executionHierarchy } from "@/data/content/home";

export function Philosophy() {
  return (
    <Section tone="surface" bordered>
      <Container>
        <Reveal className="max-w-[46rem]">
          <Eyebrow>Our operating philosophy</Eyebrow>
          <h2 className="mt-4 text-charcoal">
            Strategy is the foundation. Process is the structure. People are the capability. AI is the accelerant.
          </h2>
          <p className="mt-4 text-base text-charcoal-dim sm:text-lg">
            Each layer is a discipline, not a slogan. Skip one, and AI ends up accelerating the wrong problem.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid divide-y divide-charcoal/10 border-y border-charcoal/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {executionHierarchy.map((step) => (
            <RevealItem key={step.step} className="px-2 py-8 sm:px-6">
              <span className="font-mono text-xs tracking-[0.05em] text-brass">{step.step}</span>
              <h3 className="mt-3 text-lg text-charcoal">{step.title}</h3>
              <p className="mt-2.5 text-sm text-charcoal-dim">{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
