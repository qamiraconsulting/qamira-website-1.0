import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { clientTiers } from "@/data/content/home";

export function ClientTiers() {
  return (
    <Section tone="surface" bordered>
      <Container>
        <Reveal className="max-w-[46rem]">
          <Eyebrow>Who we serve</Eyebrow>
          <h2 className="mt-4 text-charcoal">Three tiers. One architecture.</h2>
          <p className="mt-4 text-base text-charcoal-dim sm:text-lg">
            Every client enters through a different door, but moves through the same QBPES™ architecture — pricing,
            delivery depth, and consultant seniority scale with complexity, not the other way around.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {clientTiers.map((tier) => (
            <RevealItem key={tier.title}>
              <Card className="flex flex-col">
                <h3 className="text-charcoal">{tier.title}</h3>
                <span className="mt-1.5 font-mono text-xs uppercase tracking-[0.05em] text-brass">{tier.range}</span>
                <p className="mt-4 text-sm text-charcoal-dim">{tier.body}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
