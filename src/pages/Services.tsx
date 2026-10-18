import { Seo } from "@/lib/Seo";
import { orgRef } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceNavigator } from "@/components/sections/ServiceNavigator";
import { FaqSection } from "@/components/sections/FaqSection";
import { servicesHero, servicesFaq } from "@/data/content/services";
import { catalogue } from "@/data/content/serviceCatalogue";

const serviceListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: catalogue.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name,
      description: s.description,
      provider: orgRef,
    },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: servicesFaq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export function Services() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="45 services from free assessments to managed retainers: diagnostics, process and AI consulting, automation builds, growth marketing and training. Start from the problem you have."
        jsonLd={[serviceListJsonLd, faqJsonLd]}
      />
      <PageHero
        eyebrow={servicesHero.eyebrow}
        title={servicesHero.title}
        lede={servicesHero.lede}
        breadcrumbLabel="Services"
        photo={{
          src: "/photos/services-hero.jpg",
          label: "Editorial, process/strategy mood -- e.g. a whiteboard mid-session, or documents and a laptop on a desk. Bright, warm and high-key.",
          alt: "A strategy session mapping a business process on a whiteboard",
        }}
      />

      <ServiceNavigator />

      <FaqSection eyebrow="Frequently asked" heading="Questions we get before the first call." items={servicesFaq} />

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
              <Button to="/growth-os" variant="ghost" arrow={false}>
                See Qamira GrowthOS™
              </Button>
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
