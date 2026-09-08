import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { Seo } from "@/lib/Seo";
import { site, orgRef } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PhotoSlot } from "@/components/brand/PhotoSlot";
import { customerFacingAI, contentAndGrowthSystems, internalAutomation } from "@/data/content/technology";
import { NotFound } from "@/pages/NotFound";

const allOfferings = [...customerFacingAI, ...contentAndGrowthSystems, ...internalAutomation];

// Placeholder descriptions shown until a real photo lands at
// /photos/technology/<slug>.jpg -- see docs/photography-brief.md for the
// prompts these correspond to.
const photoDescriptions: Record<string, string> = {
  "custom-saas-chatbots": "Laptop screen showing a generic AI customer-service chat interface, bright and sunlit.",
  "crm-build-configuration": "Laptop screen showing a generic CRM pipeline view, bright and sunlit.",
  "ai-voice-call-automation": "A headset beside a laptop showing a generic call-log interface, bright and sunlit.",
  "ai-video-creation": "Laptop screen showing a generic video-editing timeline, bright and sunlit.",
  "content-scheduling-automation": "Laptop screen showing a generic social content calendar, bright and sunlit.",
  "marketing-automation-lead-scoring": "Laptop screen showing a generic lead-scoring dashboard, bright and sunlit.",
  "workflow-systems-integration": "Laptop screen showing a generic workflow/integration diagram, bright and sunlit.",
  "internal-knowledge-agents": "Laptop screen showing a generic internal knowledge-search interface, bright and sunlit.",
  "document-data-extraction": "A printed document beside a laptop showing a generic data-extraction interface, bright and sunlit.",
};

export function TechnologyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const offering = allOfferings.find((o) => o.slug === slug);

  if (!offering) {
    return <NotFound />;
  }

  const url = `${site.url}/technology/${offering.slug}`;

  return (
    <>
      <Seo
        title={offering.title}
        path={`/technology/${offering.slug}`}
        description={offering.body}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: offering.title,
            description: offering.body,
            provider: orgRef,
            url,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Technology", item: `${site.url}/technology` },
              { "@type": "ListItem", position: 3, name: offering.title, item: url },
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
                <Link to="/technology" className="hover:text-brass">
                  Technology
                </Link>
              </p>
              <div className="mt-5">
                <Eyebrow>{offering.group}</Eyebrow>
              </div>
              <h1 className="mt-4 max-w-[22ch] text-charcoal">{offering.title}</h1>
              <p className="mt-5 max-w-[56ch] text-base text-charcoal-dim sm:text-lg">{offering.body}</p>
            </div>
            <PhotoSlot
              src={`/photos/technology/${offering.slug}.jpg`}
              label={photoDescriptions[offering.slug]}
              alt={`Illustration of ${offering.title}`}
              className="hidden lg:block"
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>How it works</Eyebrow>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{offering.howItWorks}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <Eyebrow>What you get</Eyebrow>
              <h2 className="mt-4 text-charcoal">The benefit to your business, plainly stated.</h2>
            </Reveal>
            <RevealGroup className="flex flex-col gap-4">
              {offering.benefits.map((benefit) => (
                <RevealItem key={benefit}>
                  <div className="flex items-start gap-3 border border-charcoal/10 bg-white p-5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                    <p className="text-sm text-charcoal-dim sm:text-base">{benefit}</p>
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
            <Eyebrow>Is this you?</Eyebrow>
            <h2 className="mt-4 text-charcoal">Good fit if...</h2>
          </Reveal>
          <RevealGroup className="mt-8 flex flex-col gap-4">
            {offering.goodFitIf.map((signal) => (
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

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">Ready to talk about {offering.title.toLowerCase()}?</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">
              A first conversation is a diagnostic, not a pitch -- we'll tell you plainly whether this is the
              highest-leverage place to start.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/technology" variant="ghost" arrow={false}>
                See all technology solutions
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
