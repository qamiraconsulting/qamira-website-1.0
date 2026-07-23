import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ServiceIllustration } from "@/components/brand/ServiceIllustration";
import { servicesHero, coreServices, managedServices, workshops } from "@/data/content/services";

export function Services() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Business Performance Excellence services across strategy, process, analytics, and AI-native execution -- plus managed services and executive workshops."
      />
      <PageHero
        eyebrow={servicesHero.eyebrow}
        title={servicesHero.title}
        lede={servicesHero.lede}
        breadcrumbLabel="Services"
      />

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>Core consulting services</Eyebrow>
            <h2 className="mt-4 text-charcoal">Premium advisory, priced on outcome.</h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {coreServices.map((service) => (
              <RevealItem key={service.title}>
                <Card className="flex h-full flex-col">
                  <ServiceIllustration icon={service.icon} className="mb-2" />
                  <span className="font-mono text-xs uppercase tracking-[0.05em] text-brass">{service.duration}</span>
                  <h3 className="mt-3 text-charcoal">{service.title}</h3>
                  <p className="mt-3 text-sm text-charcoal-dim">{service.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>Managed services</Eyebrow>
            <h2 className="mt-4 text-charcoal">Continuous value delivery, after the engagement ends.</h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {managedServices.map((service) => (
              <RevealItem key={service.title}>
                <Card className="flex h-full flex-col">
                  <ServiceIllustration icon={service.icon} className="mb-2" />
                  <h3 className="text-charcoal">{service.title}</h3>
                  <p className="mt-3 text-sm text-charcoal-dim">{service.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>Workshops & executive training</Eyebrow>
            <h2 className="mt-4 text-charcoal">Build the capability in-house, or borrow ours first.</h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {workshops.map((item) => (
              <RevealItem key={item.title}>
                <Card className="flex h-full flex-col">
                  <ServiceIllustration icon={item.icon} className="mb-2" />
                  <span className="font-mono text-xs uppercase tracking-[0.05em] text-brass">{item.duration}</span>
                  <h3 className="mt-3 text-charcoal">{item.title}</h3>
                  <p className="mt-3 text-sm text-charcoal-dim">{item.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">Not sure which service fits?</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">
              A first conversation is a diagnostic, not a pitch. We'll tell you plainly where the highest-leverage
              transformation lies.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/industries" variant="ghost" arrow={false}>
                See industry accelerators
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
