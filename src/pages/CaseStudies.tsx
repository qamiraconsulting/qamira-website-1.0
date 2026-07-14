import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { caseStudiesHero, scenarios } from "@/data/content/caseStudies";

export function CaseStudies() {
  return (
    <>
      <Seo
        title="Case Studies"
        path="/case-studies"
        description="Illustrative scenarios covering revenue leakage, customer churn, process optimization, system standardization, and AI automation -- not claims about specific clients."
      />
      <PageHero
        eyebrow={caseStudiesHero.eyebrow}
        title={caseStudiesHero.title}
        lede={caseStudiesHero.lede}
        breadcrumbLabel="Case Studies"
      />

      <Section tone="white">
        <Container>
          <RevealGroup className="grid gap-6 lg:grid-cols-3">
            {scenarios.map((scenario) => (
              <RevealItem key={scenario.title}>
                <div className="flex h-full flex-col border border-charcoal/10 bg-white p-8">
                  <span className="font-mono text-xs uppercase tracking-[0.05em] text-brass">{scenario.tier}</span>
                  <h3 className="mt-3 text-charcoal">{scenario.title}</h3>

                  <dl className="mt-5 flex flex-1 flex-col gap-4">
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">Situation</dt>
                      <dd className="mt-1.5 text-sm text-charcoal-dim">{scenario.situation}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">Approach</dt>
                      <dd className="mt-1.5 text-sm text-charcoal-dim">{scenario.approach}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-[0.06em] text-brass">Outcome</dt>
                      <dd className="mt-1.5 text-sm text-charcoal-dim">{scenario.outcome}</dd>
                    </div>
                  </dl>

                  <p className="mt-6 border-t border-charcoal/10 pt-4 text-xs italic text-charcoal-dim/80">
                    {caseStudiesHero.disclaimer}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">Want to be our next real case study?</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">
              A first conversation is a diagnostic, not a pitch. Let's find out where your highest-leverage
              transformation actually lies.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/services" variant="ghost" arrow={false}>
                See our services
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
