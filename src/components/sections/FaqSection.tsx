import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export type FaqItem = { question: string; answer: string };

// Plain static Q&A list -- matches the site's existing restrained pattern
// (e.g. About page's "differentiators" list) rather than an interactive
// accordion. Doubles as GEO/SEO-friendly content: the corresponding
// FAQPage JSON-LD is added alongside wherever this is used.
export function FaqSection({ eyebrow, heading, items }: { eyebrow: string; heading: string; items: FaqItem[] }) {
  return (
    <Section tone="white">
      <Container>
        <Reveal className="max-w-[46rem]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-charcoal">{heading}</h2>
        </Reveal>

        <RevealGroup className="mt-12 flex flex-col divide-y divide-charcoal/10 border-y border-charcoal/10">
          {items.map((item) => (
            <RevealItem key={item.question} className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-[1fr_1.6fr] sm:gap-8">
              <h3 className="text-base text-charcoal">{item.question}</h3>
              <p className="text-sm text-charcoal-dim sm:text-base">{item.answer}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
