import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Seo } from "@/lib/Seo";
import { site, orgRef } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PhotoSlot } from "@/components/brand/PhotoSlot";
import { allIndustries } from "@/data/content/industries";
import { NotFound } from "@/pages/NotFound";

// Alt text for each industry photo at /photos/industries/<slug>.jpg --
// same convention as the technology detail pages, see
// docs/photography-brief-industries.md for the prompts these were
// generated from.
//
// Doubles as PhotoSlot's `label`, which is only rendered if the image is
// ever missing; with all nine present it never shows.
const photoDescriptions: Record<string, string> = {
  manufacturing: "Two technicians beside a sunlit production line, reviewing something on a tablet.",
  "logistics-supply-chain": "Supervisor and driver checking a manifest together at a bright loading dock.",
  "construction-infrastructure": "Two site engineers reviewing a drawing, steel framing rising behind them.",
  "retail-ecommerce": "Retail associates arranging stock and checking a handheld device, sunlit interior.",
  healthcare: "Two clinicians conferring over a tablet in a calm, daylit hospital corridor.",
  "financial-services": "An analyst walking a colleague through a dashboard at a sunlit desk.",
  "professional-services": "Three colleagues mid-working-session over printed process diagrams.",
  "startups-tech": "Founders mapping something out on a sticky-note wall in a bright workspace.",
  "public-sector-education": "An administrator helping someone at a counter in a daylit civic atrium.",
};

export function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const industry = allIndustries.find((i) => i.slug === slug);

  if (!industry) {
    return <NotFound />;
  }

  const url = `${site.url}/industries/${industry.slug}`;
  const related = allIndustries.filter((i) => i.group === industry.group && i.slug !== industry.slug);

  return (
    <>
      <Seo
        title={`${industry.title} Industry Accelerator`}
        path={`/industries/${industry.slug}`}
        description={industry.metaDescription}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${industry.title} Industry Accelerator`,
            serviceType: "Business Performance Excellence consulting",
            description: industry.metaDescription,
            audience: { "@type": "Audience", audienceType: industry.title },
            provider: orgRef,
            url,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Industries", item: `${site.url}/industries` },
              { "@type": "ListItem", position: 3, name: industry.title, item: url },
            ],
          },
        ]}
      />

      <Section tone="parchment" className="pt-40 sm:pt-48">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">
                <Link to="/" className="hover:text-brass">
                  Home
                </Link>{" "}
                /{" "}
                <Link to="/industries" className="hover:text-brass">
                  Industries
                </Link>
              </p>
              <div className="mt-5">
                <Eyebrow>{industry.group}</Eyebrow>
              </div>
              <h1 className="mt-4 max-w-[22ch] text-charcoal">{industry.title}</h1>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.05em] text-brass">{industry.focus}</p>
              <p className="mt-5 max-w-[56ch] text-base text-charcoal-dim sm:text-lg">{industry.body}</p>
            </div>
            <PhotoSlot
              src={`/photos/industries/${industry.slug}.jpg`}
              label={photoDescriptions[industry.slug]}
              alt={photoDescriptions[industry.slug]}
              className="hidden lg:block"
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>What we usually find</Eyebrow>
            <h2 className="mt-4 text-charcoal">The patterns that show up again and again in this vertical.</h2>
          </Reveal>
          <RevealGroup className="mt-8 flex flex-col gap-4">
            {industry.constraints.map((constraint) => (
              <RevealItem key={constraint}>
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  <p className="text-sm text-charcoal-dim sm:text-base">{constraint}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <Eyebrow>What's already built</Eyebrow>
              <h2 className="mt-4 text-charcoal">Your engagement starts from a mostly complete toolkit.</h2>
              <p className="mt-4 text-charcoal-dim">
                The accelerator is the same QBPES™ architecture every engagement runs on, pre-populated for this
                vertical -- so Discovery begins with comparison data and a working taxonomy rather than a blank page.
              </p>
            </Reveal>
            <RevealGroup className="flex flex-col gap-4">
              {industry.prebuilt.map((item) => (
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

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>What changes</Eyebrow>
            <h2 className="mt-4 text-charcoal">The difference it makes to how the business runs.</h2>
          </Reveal>
          <RevealGroup className="mt-8 flex flex-col gap-4">
            {industry.outcomes.map((outcome) => (
              <RevealItem key={outcome}>
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  <p className="text-sm text-charcoal-dim sm:text-base">{outcome}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>Is this you?</Eyebrow>
            <h2 className="mt-4 text-charcoal">Good fit if...</h2>
          </Reveal>
          <RevealGroup className="mt-8 flex flex-col gap-4">
            {industry.goodFitIf.map((signal) => (
              <RevealItem key={signal}>
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  <p className="text-sm text-charcoal-dim sm:text-base">{signal}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="white">
          <Container>
            <Reveal className="max-w-[46rem]">
              <Eyebrow>{`Also in ${industry.group}`}</Eyebrow>
            </Reveal>
            <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <RevealItem key={item.slug}>
                  <Link to={`/industries/${item.slug}`} className="group block h-full">
                    <Card className="flex h-full flex-col">
                      <h3 className="text-charcoal">{item.title}</h3>
                      <span className="mt-1.5 font-mono text-xs uppercase tracking-[0.05em] text-brass">
                        {item.focus}
                      </span>
                      <p className="mt-4 flex-1 text-sm text-charcoal-dim">{item.body}</p>
                      <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.05em] text-brass">
                        See the accelerator
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform duration-200 ease-signature group-hover:translate-x-0.5"
                        />
                      </span>
                    </Card>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">Ready to talk about {industry.title.toLowerCase()}?</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">
              A first conversation is a diagnostic, not a pitch -- we'll tell you plainly whether the accelerator fits
              your operation, and where the highest-leverage place to start actually is.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/industries" variant="ghost" arrow={false}>
                See all industries
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
