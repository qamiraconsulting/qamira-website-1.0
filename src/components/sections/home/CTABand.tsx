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
        <Reveal className="mx-auto max-w-[42rem]">
          <Eyebrow center>{ctaBand.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-charcoal">{ctaBand.heading}</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">{ctaBand.body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button to={ctaBand.primaryCta.to}>{ctaBand.primaryCta.label}</Button>
            <Button to={ctaBand.secondaryCta.to} variant="ghost" arrow={false}>
              {ctaBand.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
