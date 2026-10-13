import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ease } from "@/lib/motion";
import { serviceBannerSlides } from "@/data/content/serviceBanners";

const AUTOPLAY_MS = 8000;
const SWIPE_THRESHOLD = 60;

// Home page service banner: one slide per major offering, each a single
// photo of a real-looking business with the slide text overlaid on the
// photo's calm left side (desktop) or stacked under it (mobile). The named
// tab row doubles as the slide picker, so visitors can scan every offering
// without waiting for autoplay. Autoplays, pauses on hover, supports
// drag-to-swipe; motion is skipped under prefers-reduced-motion.
export function ServiceBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);
  const slide = serviceBannerSlides[index];

  useEffect(() => {
    if (prefersReducedMotion || paused) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % serviceBannerSlides.length), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, prefersReducedMotion]);

  // Keep the active tab visible in the scrollable tab row on narrow
  // screens. Scrolls the row only, never the page.
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.children[index] as HTMLElement | undefined;
    if (!row || !tab) return;
    row.scrollTo({ left: tab.offsetLeft - 20, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [index, prefersReducedMotion]);

  function go(delta: number) {
    setIndex((i) => (i + delta + serviceBannerSlides.length) % serviceBannerSlides.length);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  }

  return (
    <section
      className="relative overflow-hidden border-y border-charcoal/10 bg-gradient-to-b from-white to-parchment py-16 sm:py-20 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="What Qamira does"
    >
      <Container>
        <Eyebrow className="mb-8">What we do for growing businesses</Eyebrow>

        <div className="mb-6 flex items-center gap-4">
          <div
            ref={tabsRef}
            className="flex flex-1 gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {serviceBannerSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-200 ease-signature ${
                  i === index
                    ? "border-brass bg-brass text-white shadow-sm"
                    : "border-charcoal/15 bg-white text-charcoal-dim hover:border-brass hover:text-brass"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>
          <div className="hidden flex-none gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors duration-200 ease-signature hover:border-brass hover:text-brass"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors duration-200 ease-signature hover:border-brass hover:text-brass"
            >
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-charcoal/10 bg-parchment-2" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease }}
              drag={prefersReducedMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={onDragEnd}
              // Fixed desktop heights (444px = 8:3 of the full 1184px
              // container) so slides don't change height as they rotate;
              // 410px fits the longest copy in the narrower lg column. The
              // text panel stays in flow, so longer future copy grows the
              // banner rather than clipping.
              className="relative touch-pan-y select-none lg:flex lg:min-h-[410px] xl:min-h-[444px]"
            >
              {slide.image ? (
                <div className="relative aspect-[3/2] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[58%] xl:w-[68%]">
                  <img
                    src={slide.image.src}
                    alt={slide.image.alt}
                    width={1536}
                    height={1024}
                    draggable={false}
                    className="h-full w-full object-cover object-right"
                  />
                  {/* Fades the photo's left edge into the text panel. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 hidden w-[14%] bg-gradient-to-r from-parchment-2 to-transparent lg:block"
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 right-0 hidden w-[58%] xl:w-[68%] bg-[radial-gradient(ellipse_at_60%_50%,rgba(184,134,58,0.16),transparent_70%)] lg:block"
                />
              )}

              <div className="relative p-6 sm:p-10 lg:flex lg:w-1/2 lg:flex-col xl:w-[42%] lg:justify-center lg:px-12 lg:py-8">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-brass">{slide.tag}</span>
                <h3 className="mt-3 text-2xl leading-tight text-charcoal sm:text-3xl">{slide.headline}</h3>
                <p className="mt-4 text-sm leading-relaxed text-charcoal-dim sm:text-[15px]">{slide.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Services">
                  {slide.services.map((service) => (
                    <li
                      key={service}
                      className="rounded-full border border-brass/30 bg-white/80 px-3 py-1 text-xs text-charcoal"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
                <div>
                  <Button to={slide.cta.to} className="mt-7">
                    {slide.cta.label}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
