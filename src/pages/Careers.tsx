import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { careersHero, whatWeLookFor, howYouGrow } from "@/data/content/careers";

export function Careers() {
  return (
    <>
      <Seo
        title="Careers"
        path="/careers"
        description="We hire for diagnostic judgment first, technical skill second -- careers at a boutique consultancy built for the AI era."
      />
      <PageHero
        eyebrow={careersHero.eyebrow}
        title={careersHero.title}
        lede={careersHero.lede}
        breadcrumbLabel="Careers"
      />

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>What we look for</Eyebrow>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
            {whatWeLookFor.map((item) => (
              <RevealItem key={item.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-charcoal">{item.title}</h3>
                  <p className="mt-3 text-sm text-charcoal-dim">{item.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>How you grow here</Eyebrow>
          </Reveal>

          <RevealGroup className="mt-10 flex flex-col divide-y divide-charcoal/10 border-y border-charcoal/10">
            {howYouGrow.map((item) => (
              <RevealItem key={item.title} className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-[1fr_1.6fr] sm:gap-8">
                <h3 className="text-charcoal">{item.title}</h3>
                <p className="text-sm text-charcoal-dim sm:text-base">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="white" className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">No open roles listed right now -- reach out anyway.</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">
              We're a small, early-stage firm. If the description above sounds like you, tell us -- we'd rather hear
              from you before we have a formal opening than miss you after.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Get in touch</Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
