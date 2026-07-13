import { Seo } from "@/lib/Seo";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" />
      <Section tone="parchment" className="pt-40 sm:pt-48">
        <Container>
          <Eyebrow>Page not found</Eyebrow>
          <h1 className="mt-4 text-charcoal">This page doesn't exist — error 404</h1>
          <p className="mt-4 max-w-[52ch] text-charcoal-dim">
            The page you're looking for has moved or never existed. Let's get you back on track.
          </p>
          <div className="mt-8">
            <Button to="/">Back to home</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
