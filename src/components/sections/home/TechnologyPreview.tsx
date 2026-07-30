import { Link } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { PhotoSlot } from "@/components/brand/PhotoSlot";
import { TechIllustration } from "@/components/brand/TechIllustration";
import { customerFacingAI, contentAndGrowthSystems, internalAutomation } from "@/data/content/technology";

const preview = [customerFacingAI[0], contentAndGrowthSystems[0], internalAutomation[0]];

export function TechnologyPreview() {
  return (
    <Section tone="surface" bordered>
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[42rem]">
            <Eyebrow>The AI Accelerant layer, built</Eyebrow>
            <h2 className="mt-4 text-charcoal">We don't just tell you what to fix. We can build it.</h2>
          </div>
          <Button to="/technology" variant="ghost">
            See all technology solutions
          </Button>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <PhotoSlot
            src="/photos/technology-preview.jpg"
            label="Abstract tech/automation visual -- a clean UI dashboard glimpsed on a screen, or a close-up of an automation workflow diagram. Charcoal/brass duotone."
            alt="A laptop screen displaying an abstract analytics dashboard"
          />
          <RevealGroup className="grid gap-6 sm:grid-cols-3">
            {preview.map((item) => (
              <RevealItem key={item.title}>
                <Link to={`/technology/${item.slug}`} className="block h-full">
                  <Card className="flex h-full flex-col">
                    <TechIllustration icon={item.icon} className="mb-2" />
                    <h3 className="mt-3 text-base text-charcoal">{item.title}</h3>
                  </Card>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
