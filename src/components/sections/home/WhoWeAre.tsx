import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PhotoSlot } from "@/components/brand/PhotoSlot";
import { pillars } from "@/data/content/home";

export function WhoWeAre() {
  return (
    <Section tone="white">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 text-charcoal">One team for the advice and the build.</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">
              Most firms either advise or build. We do both, so the people who work out what to change can also put
              it in place, and you deal with one team throughout.
            </p>
          </div>
          <PhotoSlot
            src="/photos/who-we-are.jpg"
            label="Diagnosis in progress -- hands annotating a printed process map on a sunlit desk, warm and high-key."
            alt="Hands annotating a printed business process map on a sunlit desk"
          />
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
