import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { executionHierarchy } from "@/data/content/home";

// Four ascending bars, the last one brass with an upward accent -- a
// one-off decorative graphic for "four layers working together, AI
// accelerating the whole" rather than a reusable illustration variant.
function AccelerantGraphic() {
  return (
    <svg viewBox="0 0 96 68" width="96" height="68" aria-hidden="true" className="shrink-0">
      <rect x="4" y="50" width="14" height="14" fill="none" stroke="#4b4f60" strokeWidth="1.2" />
      <rect x="24" y="38" width="14" height="26" fill="none" stroke="#4b4f60" strokeWidth="1.2" />
      <rect x="44" y="24" width="14" height="40" fill="none" stroke="#4b4f60" strokeWidth="1.2" />
      <rect x="64" y="10" width="14" height="54" fill="#b8863a" />
      <line x1="71" y1="10" x2="71" y2="3" stroke="#b8863a" strokeWidth="1.6" />
      <path d="M67 6 L71 1 L75 6" fill="none" stroke="#b8863a" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function Philosophy() {
  return (
    <Section tone="surface" bordered>
      <Container>
        <Reveal className="flex flex-wrap items-start gap-8">
          <div className="max-w-[46rem]">
            <Eyebrow>Our operating philosophy</Eyebrow>
            <h2 className="mt-4 text-charcoal">
              Strategy, process, people and AI -- designed and delivered as one system.
            </h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">
              Each layer is a discipline, not a slogan. Leave one out, and AI ends up accelerating the wrong problem.
            </p>
          </div>
          <AccelerantGraphic />
        </Reveal>

        <RevealGroup className="mt-14 grid divide-y divide-charcoal/10 border-y border-charcoal/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {executionHierarchy.map((step) => (
            <RevealItem key={step.step} className="px-2 py-8 sm:px-6">
              <span aria-hidden="true" className="block h-px w-6 bg-brass" />
              <h3 className="mt-4 text-lg text-charcoal">{step.title}</h3>
              <p className="mt-2.5 text-sm text-charcoal-dim">{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
