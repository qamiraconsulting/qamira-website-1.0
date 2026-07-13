import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

type ComingSoonProps = {
  title: string;
  eyebrow: string;
  path: string;
  description: string;
};

// Placeholder for pages scoped into the site architecture but scheduled
// for a later build phase. Keeps routing, navigation, and SEO consistent
// from Phase 1 onward.
export function ComingSoon({ title, eyebrow, path, description }: ComingSoonProps) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <PageHero eyebrow={eyebrow} title={title} lede={description} breadcrumbLabel={title} />
      <Section tone="white" bordered>
        <Container>
          <Reveal className="max-w-[46rem]">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-brass">In development</span>
            <h2 className="mt-3 text-charcoal">This page is part of Qamira's next build phase.</h2>
            <p className="mt-4 text-charcoal-dim">
              We're building the site in phases so every section gets full attention. In the meantime, tell us what
              you're looking for and we'll get back to you directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/" variant="ghost" arrow={false}>
                Back to home
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
