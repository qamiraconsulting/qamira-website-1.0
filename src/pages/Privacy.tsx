import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { privacyHero, lastUpdated, sections } from "@/data/content/privacy";

export function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        path="/privacy"
        description="How Qamira Consulting collects, uses, retains, and protects your information across our website, contact form, and AI Business Assessment."
      />
      <PageHero eyebrow={privacyHero.eyebrow} title={privacyHero.title} lede={privacyHero.lede} breadcrumbLabel="Privacy Policy" />

      <Section tone="white">
        <Container>
          <div className="mx-auto flex max-w-[46rem] flex-col gap-14">
            <p className="font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">Last updated: {lastUpdated}</p>

            {sections.map((section) => (
              <Reveal key={section.heading}>
                <h2 className="text-charcoal">{section.heading}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {section.body.map((line, i) => (
                    <li key={i} className="text-charcoal-dim">
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal>
              <h2 className="text-charcoal">Questions</h2>
              <p className="mt-4 text-charcoal-dim">
                Reach us at{" "}
                <a href={`mailto:${site.email}`} className="text-brass hover:text-brass-bright">
                  {site.email}
                </a>{" "}
                with any privacy question, or to request access to, correction of, or deletion of your information.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
