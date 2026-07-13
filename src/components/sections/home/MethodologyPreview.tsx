import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessFlow } from "@/components/brand/ProcessFlow";
import { processIntro, processSteps } from "@/data/content/process";

export function MethodologyPreview() {
  return (
    <Section tone="white" bordered>
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[42rem]">
            <Eyebrow>{processIntro.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{processIntro.heading}</h2>
          </div>
          <Button to="/methodology" variant="ghost">
            Full methodology
          </Button>
        </Reveal>

        <div className="mt-14">
          <ProcessFlow steps={processSteps} variant="compact" />
        </div>
      </Container>
    </Section>
  );
}
