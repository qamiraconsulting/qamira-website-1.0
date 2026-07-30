import { Link } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { scenarios } from "@/data/content/caseStudies";

// A spread that complements the home page's Gap-Fix Banner (which already
// covers Process/System Optimization, Automation, and Revenue Leakage) --
// Customer Churn gets its first home page visibility here.
const previewSlugs = ["customer-churn", "process-optimization", "revenue-leakage"];
const preview = previewSlugs
  .map((slug) => scenarios.find((s) => s.slug === slug))
  .filter((s): s is (typeof scenarios)[number] => Boolean(s));

export function CaseStudiesPreview() {
  return (
    <Section tone="white" bordered>
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[42rem]">
            <Eyebrow>Illustrative, not testimonial</Eyebrow>
            <h2 className="mt-4 text-charcoal">The kinds of problems we get called in for.</h2>
          </div>
          <Button to="/case-studies" variant="ghost">
            See all case studies
          </Button>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {preview.map((scenario) => (
            <RevealItem key={scenario.slug}>
              <Link
                to={`/case-studies#${scenario.slug}`}
                className="flex h-full flex-col border border-charcoal/10 bg-white p-8 transition-all duration-200 ease-signature hover:-translate-y-1 hover:border-charcoal/20 hover:shadow-card"
              >
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-brass">{scenario.tier}</span>
                <h3 className="mt-3 text-lg text-charcoal">{scenario.title}</h3>
                <p className="mt-3 flex-1 text-sm text-charcoal-dim">{scenario.outcome}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
