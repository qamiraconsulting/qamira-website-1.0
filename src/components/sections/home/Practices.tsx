import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { practices } from "@/data/content/home";

// The two practices, side by side and styled identically so neither reads
// as the main offer or as a step towards the other. No numbering and no
// arrow between them, for the same reason.
export function Practices() {
  return (
    <Section tone="white" id="practices">
      <Container>
        <Reveal className="max-w-[46rem]">
          <Eyebrow>{practices.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-charcoal">{practices.heading}</h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
          {practices.items.map((practice) => (
            <RevealItem key={practice.name} className="h-full">
              <div className="flex h-full flex-col border border-charcoal/10 border-t-[3px] border-t-brass bg-parchment p-8 sm:p-10">
                <h3 className="text-charcoal">{practice.name}</h3>
                <p className="mt-3 text-base text-charcoal-dim sm:text-lg">{practice.summary}</p>
                <ul className="mt-6 flex flex-1 flex-wrap content-start gap-2" aria-label={`${practice.name} services`}>
                  {practice.areas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full border border-brass/30 bg-white px-3.5 py-1.5 text-sm text-charcoal"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button to={practice.cta.to} variant="ghost">
                    {practice.cta.label}
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <p className="mx-auto mt-10 max-w-[52ch] text-center text-base text-charcoal sm:text-lg">{practices.footnote}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
