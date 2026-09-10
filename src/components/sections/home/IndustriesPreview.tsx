import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { allIndustries } from "@/data/content/industries";

// The three verticals the Commercial Playbook (3.2) actually sequences --
// Professional Services as the beachhead, then Logistics, then
// Manufacturing -- rather than the first of each group. Selected by slug
// so the intent survives any reordering of industries.ts, and so a
// renamed slug fails the build here rather than silently dropping a card.
const FEATURED = ["professional-services", "logistics-supply-chain", "manufacturing"] as const;

const featured = FEATURED.map((slug) => {
  const industry = allIndustries.find((i) => i.slug === slug);
  if (!industry) {
    throw new Error(`IndustriesPreview: no industry with slug "${slug}"`);
  }
  return industry;
});

export function IndustriesPreview() {
  return (
    <Section tone="white" bordered>
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[42rem]">
            <Eyebrow>Where we work</Eyebrow>
            <h2 className="mt-4 text-charcoal">
              The same architecture, shaped for how your industry actually runs.
            </h2>
          </div>
          <Button to="/industries" variant="ghost">
            See all nine industries
          </Button>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {featured.map((industry) => (
            <RevealItem key={industry.slug}>
              <Link to={`/industries/${industry.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col">
                  <h3 className="text-base text-charcoal">{industry.title}</h3>
                  <span className="mt-1.5 font-mono text-xs uppercase tracking-[0.05em] text-brass">
                    {industry.focus}
                  </span>
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
  );
}
