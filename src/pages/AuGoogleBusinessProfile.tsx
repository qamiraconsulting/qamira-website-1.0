import { Link } from "react-router-dom";
import { Camera, Check, Link2, MapPin, Search, Star, Store } from "lucide-react";
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
  auGbpHero,
  gbpPain,
  gbpHowItWorksIntro,
  gbpHowItWorksSteps,
  gbpDifferentiators,
  gbpIncluded,
  auGbpFaq,
  auGbpCta,
} from "@/data/content/auGoogleBusinessProfile";

const path = "/au/google-business-profile";
const url = `${site.url}${path}`;
const SERVICE_CODE = "QC-403";

const stepIcons = { Search, Store, MapPin, Camera, Star, Link2 };

const description =
  "Done-for-you Google Business Profile optimisation for Australian tradies and clinics: profile set up or cleaned up, categories, service areas, photos, reviews and listings.";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: auGbpFaq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export function AuGoogleBusinessProfile() {
  // Same pattern as /au/ai-receptionist: the CTA puts QC-403 on the
  // visitor's shortlist before it opens /contact, so the enquiry arrives
  // already tagged with the service.
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
        title="Google Business Profile Optimisation in Australia"
        path={path}
        description={description}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Google Business Profile & Local SEO Setup",
            alternateName: ["Google Business Profile optimisation", "Google My Business optimisation", "Local SEO setup"],
            serviceType: "Google Business Profile optimisation and local SEO",
            description: auGbpHero.lede,
            provider: orgRef,
            areaServed: { "@type": "Country", name: "Australia" },
            audience: { "@type": "BusinessAudience", audienceType: "Tradies, clinics and local service businesses" },
            url,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: auGbpHero.breadcrumbLabel, item: url },
            ],
          },
          faqJsonLd,
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
                / {auGbpHero.breadcrumbLabel}
              </p>
              <div className="mt-5">
                <Eyebrow>{auGbpHero.eyebrow}</Eyebrow>
              </div>
              <h1 className="mt-4 max-w-[22ch] text-charcoal">{auGbpHero.title}</h1>
              <p className="mt-5 max-w-[56ch] text-base text-charcoal-dim sm:text-lg">{auGbpHero.lede}</p>
              <p className="mt-6 border-l-2 border-brass pl-4 font-mono text-sm text-charcoal">
                {auGbpHero.promiseLine}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {cta}
                <Button href="#how-it-works" variant="ghost" arrow={false}>
                  How it works
                </Button>
              </div>
            </div>
            <PhotoSlot
              src="/photos/services/growth-marketing.webp"
              label="A tradie beside their ute checking a new enquiry on their phone."
              alt="A tradie beside their ute checking a new enquiry on their phone"
              className="hidden lg:block"
            />
          </Reveal>
        </Container>
      </Section>

      {/* The visibility problem */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{gbpPain.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{gbpPain.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{gbpPain.lede}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {gbpPain.audiences.map((audience) => (
              <RevealItem key={audience.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-lg text-charcoal">{audience.title}</h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {audience.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                        <p className="text-sm text-charcoal-dim sm:text-base">{point}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* How it works */}
      <Section tone="surface" bordered id="how-it-works" className="scroll-mt-24">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{gbpHowItWorksIntro.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{gbpHowItWorksIntro.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{gbpHowItWorksIntro.lede}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gbpHowItWorksSteps.map((step, i) => {
              const Icon = stepIcons[step.icon];
              return (
                <RevealItem key={step.title}>
                  <Card className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <Icon aria-hidden="true" className="h-5 w-5 text-brass" />
                      <span className="font-mono text-xs text-brass">{`0${i + 1}`}</span>
                    </div>
                    <h3 className="mt-4 text-lg text-charcoal">{step.title}</h3>
                    <p className="mt-2.5 text-sm text-charcoal-dim">{step.body}</p>
                  </Card>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* Done for you, by the rules */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{gbpDifferentiators.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{gbpDifferentiators.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{gbpDifferentiators.lede}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {gbpDifferentiators.points.map((point) => (
              <RevealItem key={point.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-lg text-charcoal">{point.title}</h3>
                  <p className="mt-2.5 text-sm text-charcoal-dim">{point.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* What's included */}
      <Section tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <Eyebrow>{gbpIncluded.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-charcoal">{gbpIncluded.heading}</h2>
              <p className="mt-6 max-w-[52ch] text-base text-charcoal-dim sm:text-lg">{gbpIncluded.note}</p>
              <div className="mt-8">{cta}</div>
            </Reveal>
            <RevealGroup className="flex flex-col gap-4">
              {gbpIncluded.items.map((item) => (
                <RevealItem key={item}>
                  <div className="flex items-start gap-3 border border-charcoal/10 bg-white p-5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                    <p className="text-sm text-charcoal-dim sm:text-base">{item}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <FaqSection eyebrow="Frequently asked" heading="Google Business Profile questions, answered plainly." items={auGbpFaq} />

      {/* CTA */}
      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">{auGbpCta.heading}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">{auGbpCta.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {cta}
              <Button to="/au/ai-receptionist" variant="ghost" arrow={false}>
                Missing calls? See the AI receptionist
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
