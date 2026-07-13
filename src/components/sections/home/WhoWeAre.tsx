import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { pillars } from "@/data/content/home";

export function WhoWeAre() {
  return (
    <Section tone="white">
      <Container>
        <Reveal className="max-w-[46rem]">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-4 text-charcoal">A Business Performance Excellence firm, built AI-native from day one.</h2>
          <p className="mt-4 text-base text-charcoal-dim sm:text-lg">
            Most firms treat AI as a bolt-on. Qamira treats business performance as the foundation, AI-native execution
            as the mechanism, and reusable intellectual property as the moat that keeps getting stronger.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <RevealItem key={pillar.index}>
              <Card className="flex flex-col">
                <span className="font-mono text-xs text-brass">{pillar.index}</span>
                <h3 className="mt-4 text-charcoal">{pillar.title}</h3>
                <p className="mt-3 text-sm text-charcoal-dim">{pillar.body}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
