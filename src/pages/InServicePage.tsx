import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
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
import { inServicePageBySlug, inPromiseLine, inPricing, inProcess, inProof } from "@/data/content/inServices";
import { NotFound } from "@/pages/NotFound";

// One template for the three Indian build-service landing pages (/in/:slug).
// Content and prices live in src/data/content/inServices.ts.
export function InServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? inServicePageBySlug[slug] : undefined;
  const shortlist = useShortlist();

  if (!page) {
    return <NotFound />;
  }

  const path = `/in/${page.slug}`;
  const url = `${site.url}${path}`;

  // The CTA puts the page's services on the visitor's shortlist before it
  // opens /contact, so the enquiry arrives tagged. The lead itself
  // (GA4 generate_lead) fires on /contact's form submit, the conversion the
  // India campaign optimises for.
  const addToShortlist = () => {
    page.serviceCodes.forEach((code) => {
      if (!shortlist.has(code)) shortlist.toggle(code);
    });
  };

  const cta = (
    <Button to="/contact" onClick={addToShortlist}>
      Book a free 20-minute scoping call
    </Button>
  );

  return (
    <>
      <Seo
        title={page.seoTitle}
        path={path}
        description={page.description}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.breadcrumbLabel.replace(" (India)", ""),
            description: page.lede,
            provider: orgRef,
            areaServed: { "@type": "Country", name: "India" },
            audience: { "@type": "BusinessAudience", audienceType: "Small and medium-sized businesses" },
            url,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: page.breadcrumbLabel, item: url },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faq.map((f) => ({
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
                / {page.breadcrumbLabel}
              </p>
              <div className="mt-5">
                <Eyebrow>{page.eyebrow}</Eyebrow>
              </div>
              <h1 className="mt-4 max-w-[22ch] text-charcoal">{page.title}</h1>
              <p className="mt-5 max-w-[56ch] text-base text-charcoal-dim sm:text-lg">{page.lede}</p>
              <p className="mt-6 border-l-2 border-brass pl-4 font-mono text-sm text-charcoal">{inPromiseLine}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                {cta}
                <Button href="#how-it-works" variant="ghost" arrow={false}>
                  How it works
                </Button>
              </div>
            </div>
            <PhotoSlot src={page.photo.src} label={page.photo.label} alt={page.photo.label} className="hidden lg:block" />
          </Reveal>
        </Container>
      </Section>

      {/* The problem */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <Eyebrow>{page.pain.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-charcoal">{page.pain.heading}</h2>
              <p className="mt-4 max-w-[52ch] text-base text-charcoal-dim sm:text-lg">{page.pain.lede}</p>
            </Reveal>
            <RevealGroup className="flex flex-col gap-4">
              {page.pain.points.map((point) => (
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

      {/* What we build */}
      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{page.build.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{page.build.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{page.build.lede}</p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {page.build.items.map((item) => (
              <RevealItem key={item.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-lg text-charcoal">{item.title}</h3>
                  <p className="mt-2.5 text-sm text-charcoal-dim">{item.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* What it costs -- no figures on the site, by decision (2026-10-20) */}
      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <Eyebrow>{inPricing.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-charcoal">{inPricing.heading}</h2>
              <div className="mt-8">{cta}</div>
            </Reveal>
            <RevealGroup className="flex flex-col gap-4">
              {inPricing.points.map((point) => (
                <RevealItem key={point}>
                  <div className="flex items-start gap-3 border border-charcoal/10 bg-white p-5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                    <p className="text-sm text-charcoal-dim sm:text-base">{point}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* How a build works */}
      <Section tone="surface" bordered id="how-it-works" className="scroll-mt-24">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{inProcess.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{inProcess.heading}</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {inProcess.steps.map((step, i) => (
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

      {/* Proof */}
      <Section tone="navy">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>{inProof.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-cream">{inProof.heading}</h2>
            {inProof.body.map((para) => (
              <p key={para} className="mt-4 text-base text-cream-dim sm:text-lg">
                {para}
              </p>
            ))}
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.06em] text-cream-dim/70">{inProof.note}</p>
          </Reveal>
        </Container>
      </Section>

      <FaqSection eyebrow="Frequently asked" heading="Questions, answered plainly." items={page.faq} />

      {/* CTA */}
      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">{page.cta.heading}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">{page.cta.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {cta}
              <Button to={page.related.to} variant="ghost" arrow={false}>
                {page.related.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
