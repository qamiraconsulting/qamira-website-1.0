import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { NeuronField } from "@/components/brand/NeuronField";

export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumbLabel,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  breadcrumbLabel: string;
}) {
  return (
    <section className="relative overflow-hidden bg-hero-glow pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="absolute inset-0">
        <NeuronField className="h-full w-full" density={40} />
      </div>
      <Container className="relative z-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">
            <Link to="/" className="hover:text-brass">
              Home
            </Link>{" "}
            / {breadcrumbLabel}
          </p>
          <div className="mt-5">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-4 max-w-[22ch] text-charcoal">{title}</h1>
          {lede && <p className="mt-5 max-w-[56ch] text-base text-charcoal-dim sm:text-lg">{lede}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
