import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { NeuronField } from "@/components/brand/NeuronField";
import { hero } from "@/data/content/home";
import { ease } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-hero-glow pt-24">
      <div className="absolute inset-0">
        <NeuronField className="h-full w-full" />
      </div>

      <Container className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="max-w-[38rem]"
        >
          <Eyebrow className="mb-6">{hero.kicker}</Eyebrow>
          <h1 className="max-w-[18ch] text-charcoal">{hero.heading}</h1>
          <p className="mt-6 max-w-[44ch] text-lg text-charcoal-dim">{hero.lede}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button to={hero.primaryCta.to}>{hero.primaryCta.label}</Button>
            <Button to={hero.secondaryCta.to} variant="ghost" arrow={false}>
              {hero.secondaryCta.label}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
