import { Link } from "react-router-dom";
import { Calculator, CalendarCheck, Check, Database, PhoneCall, UserRound } from "lucide-react";
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
  auReceptionistHero,
  missedCallPain,
  howItWorksIntro,
  howItWorksSteps,
  differentiators,
  proof,
  included,
  auReceptionistFaq,
  auReceptionistCta,
} from "@/data/content/auReceptionist";

const path = "/au/ai-receptionist";
const url = `${site.url}${path}`;
const SERVICE_CODE = "QC-303";

const stepIcons = { PhoneCall, CalendarCheck, Calculator, UserRound, Database };

const description =
  "Done-for-you AI receptionist for Australian tradies and clinics. Answers calls 24/7, books jobs, quotes from your own rate card and hands off to your team.";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: auReceptionistFaq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export function AuAiReceptionist() {
  // The CTA puts QC-303 on the visitor's shortlist before it opens /contact,
  // so the enquiry arrives already tagged with the service. The lead itself
  // (GA4 generate_lead, Meta Contact) fires on /contact's form submit, the
  // same conversion the Ads campaign optimises for.
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
        title="AI Receptionist for Australian Businesses"
        path={path}
        description={description}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Receptionist",
            alternateName: ["AI Voice & Call Automation", "AI answering service"],
            serviceType: "AI phone answering and booking",
            description: auReceptionistHero.lede,
            provider: orgRef,
            areaServed: { "@type": "Country", name: "Australia" },
            audience: { "@type": "BusinessAudience", audienceType: "Tradies, clinics and service businesses" },
            url,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: auReceptionistHero.breadcrumbLabel, item: url },
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
                / {auReceptionistHero.breadcrumbLabel}
              </p>
              <div className="mt-5">
                <Eyebrow>{auReceptionistHero.eyebrow}</Eyebrow>
              </div>
              <h1 className="mt-4 max-w-[22ch] text-charcoal">{auReceptionistHero.title}</h1>
              <p className="mt-5 max-w-[56ch] text-base text-charcoal-dim sm:text-lg">{auReceptionistHero.lede}</p>
              <p className="mt-6 border-l-2 border-brass pl-4 font-mono text-sm text-charcoal">
                {auReceptionistHero.promiseLine}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {cta}
                <Button href="#how-it-works" variant="ghost" arrow={false}>
                  How it works
                </Button>
              </div>
            </div>
            <PhotoSlot
              src="/photos/technology/ai-voice-call-automation.jpg"
              label="A headset beside a laptop showing a call log."
              alt="A headset beside a laptop showing a call log"
              className="hidden lg:block"
            />
          </Reveal>
        </Container>
      </Section>

      {/* The missed-call problem */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{missedCallPain.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{missedCallPain.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{missedCallPain.lede}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {missedCallPain.audiences.map((audience) => (
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
            <Eyebrow>{howItWorksIntro.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{howItWorksIntro.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{howItWorksIntro.lede}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {howItWorksSteps.map((step, i) => {
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

      {/* Done for you */}
      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{differentiators.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{differentiators.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{differentiators.lede}</p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {differentiators.points.map((point) => (
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

      {/* Proof */}
      <Section tone="navy">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{proof.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-cream">{proof.heading}</h2>
            {proof.body.map((para) => (
              <p key={para} className="mt-4 text-base text-cream-dim sm:text-lg">
                {para}
              </p>
            ))}
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.06em] text-cream-dim/70">{proof.note}</p>
          </Reveal>
        </Container>
      </Section>

      {/* What's included */}
      <Section tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <Eyebrow>{included.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-charcoal">{included.heading}</h2>
              <p className="mt-6 max-w-[52ch] text-base text-charcoal-dim sm:text-lg">{included.note}</p>
              <div className="mt-8">{cta}</div>
            </Reveal>
            <RevealGroup className="flex flex-col gap-4">
              {included.items.map((item) => (
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

      <FaqSection eyebrow="Frequently asked" heading="AI receptionist questions, answered plainly." items={auReceptionistFaq} />

      {/* CTA */}
      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">{auReceptionistCta.heading}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">{auReceptionistCta.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {cta}
              <Button to="/technology/ai-voice-call-automation" variant="ghost" arrow={false}>
                More on AI receptionists
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
