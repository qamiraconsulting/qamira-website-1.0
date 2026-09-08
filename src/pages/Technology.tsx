import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/lib/Seo";
import { orgRef } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TechIllustration } from "@/components/brand/TechIllustration";
import {
  technologyHero,
  technologyFraming,
  customerFacingAI,
  contentAndGrowthSystems,
  internalAutomation,
  technologyCta,
} from "@/data/content/technology";

const allOfferings = [...customerFacingAI, ...contentAndGrowthSystems, ...internalAutomation];

const technologyListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: allOfferings.map((o, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: o.title,
      description: o.body,
      provider: orgRef,
    },
  })),
};

const groups = [
  {
    eyebrow: "Customer-facing AI",
    heading: "Where your customers actually meet the automation.",
    tone: "white" as const,
    bordered: false,
    items: customerFacingAI,
  },
  {
    eyebrow: "Content & growth systems",
    heading: "The output an agency bills hourly for, running on a schedule.",
    tone: "surface" as const,
    bordered: true,
    items: contentAndGrowthSystems,
  },
  {
    eyebrow: "Internal automation & intelligence",
    heading: "The work happening behind the scenes, not in front of a customer.",
    tone: "white" as const,
    bordered: false,
    items: internalAutomation,
  },
];

export function Technology() {
  return (
    <>
      <Seo
        title="Technology"
        path="/technology"
        description="Custom SaaS applications, AI chatbots, CRM builds, AI video creation, scheduled content automation, and internal AI agents -- the software Qamira builds to make AI-native execution real."
        jsonLd={technologyListJsonLd}
      />
      <PageHero
        eyebrow={technologyHero.eyebrow}
        title={technologyHero.title}
        lede={technologyHero.lede}
        breadcrumbLabel="Technology"
        photo={{
          src: "/photos/technology-hero.jpg",
          label: "Product-mockup style -- a clean chatbot/CRM UI or automation workflow glimpsed on a screen. Charcoal/brass duotone, this one can be more literal since it's illustrating real software.",
          alt: "A laptop displaying a generic AI customer assistant chatbot interface",
        }}
      />

      <Section tone="surface" bordered>
        <Container>
          <Reveal className="max-w-[52rem]">
            <Eyebrow>{technologyFraming.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-charcoal">{technologyFraming.heading}</h2>
            <p className="mt-4 text-base text-charcoal-dim sm:text-lg">{technologyFraming.body}</p>
          </Reveal>
        </Container>
      </Section>

      {groups.map((group) => (
        <Section key={group.eyebrow} tone={group.tone} bordered={group.bordered}>
          <Container>
            <Reveal className="max-w-[46rem]">
              <Eyebrow>{group.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-charcoal">{group.heading}</h2>
            </Reveal>

            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
              {group.items.map((item) => (
                <RevealItem key={item.title}>
                  <Link to={`/technology/${item.slug}`} className="group block h-full">
                    <Card className="flex h-full flex-col">
                      <TechIllustration icon={item.icon} className="mb-2" />
                      <h3 className="mt-3 text-charcoal">{item.title}</h3>
                      <p className="mt-3 flex-1 text-sm text-charcoal-dim">{item.body}</p>
                      <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.05em] text-brass">
                        See how it works
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
      ))}

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">{technologyCta.heading}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">{technologyCta.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/services" variant="ghost" arrow={false}>
                See our diagnostic services
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
