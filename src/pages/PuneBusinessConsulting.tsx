import { Link } from "react-router-dom";
import { Check, MapPin } from "lucide-react";
import { Seo } from "@/lib/Seo";
import { site, orgRef } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PhotoSlot } from "@/components/brand/PhotoSlot";
import { FaqSection } from "@/components/sections/FaqSection";
import { useShortlist } from "@/lib/shortlist";
import {
  puneHero,
  punePain,
  puneServices,
  puneIndustries,
  puneAreas,
  puneHowItWorks,
  puneProof,
  puneFaq,
  puneCta,
} from "@/data/content/puneConsulting";

const path = "/in/business-consultant-pune";
const url = `${site.url}${path}`;
// The Operations Diagnostic Workshop is the paid entry point this page sells.
const SERVICE_CODE = "QC-101";

const description =
  "Business consultant in Pune for growing SMEs: process improvement, AI automation and KPIs for manufacturers, logistics and services firms. Free 20-minute call.";

export function PuneBusinessConsulting() {
  // Same pattern as the other landing pages: the CTA puts the service on
  // the visitor's shortlist before it opens /contact, so the enquiry
  // arrives already tagged.
  const shortlist = useShortlist();
  const addToShortlist = () => {
    if (!shortlist.has(SERVICE_CODE)) shortlist.toggle(SERVICE_CODE);
  };

  const cta = (
    <Button to="/contact" onClick={addToShortlist}>
      Book a free 20-minute call
    </Button>
  );

  return (
    <>
      <Seo
        title="Business Consultant in Pune for SMEs"
        path={path}
        description={description}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Business Consulting in Pune",
            alternateName: ["Business consultant in Pune", "Process improvement consultant in Pune", "Operations consultant in Pune"],
            serviceType: "Business consulting, process improvement and AI automation",
            description: puneHero.lede,
            provider: orgRef,
            areaServed: puneAreas.areas.map((name) => ({ "@type": "City", name })),
            audience: { "@type": "BusinessAudience", audienceType: "Small and medium-sized businesses" },
            url,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: puneHero.breadcrumbLabel, item: url },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: puneFaq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ]}
      />

      {/* Hero */}
      <Section tone="parchment" className="pt-40 sm:pt-48 lg:pt-56">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">
                <Link to="/" className="hover:text-brass">
                  Home
                </Link>{" "}
                / {puneHero.breadcrumbLabel}
              </p>
              <div className="mt-5">
                <Eyebrow>{puneHero.eyebrow}</Eyebrow>
              </div>
              <h1 className="mt-4 max-w-[22ch] text-charcoal">{puneHero.title}</h1>
              <p className="mt-5 max-w-[56ch] text-base text-charcoal-dim sm:text-lg">{puneHero.lede}</p>
              <p className="mt-6 border-l-2 border-brass pl-4 font-mono text-sm text-charcoal">{puneHero.promiseLine}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                {cta}
                <Button to="/assessment" variant="ghost" arrow={false}>
                  Take the free assessment
                </Button>
              </div>
            </div>
            <PhotoSlot
              src="/photos/services/process-performance.webp"
              label="A team reviewing an operations process together."
              alt="A team reviewing an operations process together"
              className="hidden lg:block"
            />
          </Reveal>
        </Container>
      </Section>

      {/* The problem */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <Eyebrow>{punePain.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-charcoal">{punePain.heading}</h2>
              <p className="mt-4 max-w-[52ch] text-base text-charcoal-dim sm:text-lg">{punePain.lede}</p>
            </Reveal>
            <RevealGroup className="flex flex-col gap-4">
              {punePain.points.map((point) => (
                <RevealItem key={point}>
                  <div className="flex items-start gap-3 border border-charcoal/10 bg-white p-5">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                    <p className="text-sm text-charcoal-dim sm:text-base">{point}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* What we do */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{puneServices.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{puneServices.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{puneServices.lede}</p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {puneServices.items.map((item) => (
              <RevealItem key={item.title}>
                <Link to={item.to} className="group block h-full">
                  <Card className="flex h-full flex-col">
                    <h3 className="text-lg text-charcoal group-hover:text-brass">{item.title}</h3>
                    <p className="mt-2.5 text-sm text-charcoal-dim">{item.body}</p>
                  </Card>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Who we work with */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{puneIndustries.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{puneIndustries.heading}</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {puneIndustries.items.map((item) => (
              <RevealItem key={item.title}>
                <Link to={item.to} className="group block h-full">
                  <Card className="flex h-full flex-col">
                    <h3 className="text-lg text-charcoal group-hover:text-brass">{item.title}</h3>
                    <p className="mt-2.5 text-sm text-charcoal-dim">{item.body}</p>
                  </Card>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* How it works */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{puneHowItWorks.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{puneHowItWorks.heading}</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {puneHowItWorks.steps.map((step, i) => (
              <RevealItem key={step.title}>
                <Card className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <Check aria-hidden="true" className="h-5 w-5 text-brass" />
                    <span className="font-mono text-xs text-brass">{`0${i + 1}`}</span>
                  </div>
                  <h3 className="mt-4 text-lg text-charcoal">{step.title}</h3>
                  <p className="mt-2.5 text-sm text-charcoal-dim">{step.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Areas served */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <Eyebrow>{puneAreas.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-charcoal">{puneAreas.heading}</h2>
              <p className="mt-4 max-w-[52ch] text-base text-charcoal-dim sm:text-lg">{puneAreas.lede}</p>
              <div className="mt-8">{cta}</div>
            </Reveal>
            <Reveal>
              <ul className="flex flex-wrap gap-3">
                {puneAreas.areas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-2 border border-charcoal/10 bg-white px-4 py-2.5 text-sm text-charcoal"
                  >
                    <MapPin aria-hidden="true" className="h-4 w-4 text-brass" />
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Proof */}
      <Section tone="navy">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{puneProof.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-cream">{puneProof.heading}</h2>
            {puneProof.body.map((para) => (
              <p key={para} className="mt-4 text-base text-cream-dim sm:text-lg">
                {para}
              </p>
            ))}
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.06em] text-cream-dim/70">{puneProof.note}</p>
          </Reveal>
        </Container>
      </Section>

      <FaqSection eyebrow="Frequently asked" heading="Questions, answered plainly." items={puneFaq} />

      {/* CTA */}
      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">{puneCta.heading}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">{puneCta.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {cta}
              <Button to="/assessment" variant="ghost" arrow={false}>
                Take the free assessment
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
