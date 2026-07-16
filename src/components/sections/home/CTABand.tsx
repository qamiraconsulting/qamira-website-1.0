import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { NeuronField } from "@/components/brand/NeuronField";
import { ctaBand } from "@/data/content/home";

export function CTABand() {
  return (
    <section className="relative overflow-hidden border-y border-charcoal/10 bg-parchment-2 py-16 text-center sm:py-24">
      <div className="absolute inset-0">
        <NeuronField className="h-full w-full" density={40} interactive={false} />
      </div>
      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-[42rem] text-center">
          <Eyebrow center>{ctaBand.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-charcoal">{ctaBand.heading}</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">{ctaBand.body}</p>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-[56rem] gap-6 sm:grid-cols-2">
          {ctaBand.paths.map((path, i) => (
            <Reveal key={path.title} delay={i * 0.08} className="flex h-full flex-col border border-charcoal/10 bg-white p-8 text-left">
              <h3 className="text-charcoal">{path.title}</h3>
              <p className="mt-3 flex-1 text-sm text-charcoal-dim">{path.body}</p>
              <div className="mt-6">
                <Button to={path.cta.to} variant={i === 0 ? "primary" : "ghost"}>
                  {path.cta.label}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
