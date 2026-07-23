import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Mail,
  AlertTriangle,
  Workflow,
  Copy,
  Unlink,
  Layers,
  ClipboardList,
  Repeat,
  Cpu,
  Search,
  FileWarning,
  Percent,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ease } from "@/lib/motion";
import { gapFixSlides, type FlowIconKey } from "@/data/content/homeBanners";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 60;

const icons: Record<FlowIconKey, LucideIcon> = {
  "file-text": FileText,
  mail: Mail,
  "alert-triangle": AlertTriangle,
  workflow: Workflow,
  copy: Copy,
  unlink: Unlink,
  layers: Layers,
  "clipboard-list": ClipboardList,
  repeat: Repeat,
  cpu: Cpu,
  search: Search,
  "file-warning": FileWarning,
  percent: Percent,
};

type NodeTone = "before" | "gap" | "fix" | "result";
type ConnectorTone = "before" | "gap" | "fix";

const ringClasses: Record<NodeTone, string> = {
  before: "border-charcoal-dim/40 bg-white",
  gap: "border-rust bg-rust-wash",
  fix: "border-brass bg-white",
  result: "border-brass bg-brass",
};

const iconClasses: Record<NodeTone, string> = {
  before: "text-charcoal-dim",
  gap: "text-rust",
  fix: "text-brass",
  result: "text-white",
};

const labelClasses: Record<NodeTone, string> = {
  before: "text-charcoal-dim",
  gap: "text-rust",
  fix: "text-charcoal-dim",
  result: "text-charcoal",
};

const connectorClasses: Record<ConnectorTone, string> = {
  before: "bg-charcoal/15",
  gap: "bg-rust",
  fix: "bg-brass",
};

// A milestone on the roadmap -- a relevant icon in a tone-colored ring
// (charcoal for the ordinary "before" steps, rust for the flagged gap,
// brass for Qamira's fix and the result) rather than a generic dot, so
// each stop reads at a glance.
function RoadmapNode({ label, icon, tone }: { label: string; icon?: FlowIconKey; tone: NodeTone }) {
  const Icon = tone === "result" ? Check : icons[icon as FlowIconKey];
  return (
    <div className="flex w-16 flex-none flex-col items-center text-center sm:w-24">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 sm:h-14 sm:w-14 ${ringClasses[tone]}`}
      >
        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconClasses[tone]}`} aria-hidden="true" />
      </span>
      <span className={`mt-2 max-w-[4.5rem] text-[10px] font-medium leading-tight sm:mt-2.5 sm:max-w-[6.5rem] sm:text-xs ${labelClasses[tone]}`}>
        {label}
      </span>
    </div>
  );
}

// The connecting road: charcoal while nothing's wrong yet, rust for the
// stretch running into the flagged gap, brass from the fix onward -- the
// color change alone tells the "before / gap / after" story.
function Connector({ tone }: { tone: ConnectorTone }) {
  return <div aria-hidden="true" className={`mt-[22px] h-px flex-1 sm:mt-7 ${connectorClasses[tone]}`} />;
}

// Full-width home page banner: each slide dramatizes one illustrative
// scenario from /case-studies as a five-stop roadmap (before -> before ->
// gap -> fix -> result), reusing the ProcessFlow/NeuronField visual
// language (charcoal nodes, brass accents) rather than photography.
// Autoplays, pauses on hover, and supports drag-to-swipe; entrance/exit is
// skipped entirely under prefers-reduced-motion.
export function GapFixBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const slide = gapFixSlides[index];

  useEffect(() => {
    if (prefersReducedMotion || paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % gapFixSlides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, prefersReducedMotion]);

  function go(delta: number) {
    setIndex((i) => (i + delta + gapFixSlides.length) % gapFixSlides.length);
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
      aria-label="How Qamira closes process gaps"
    >
      <Container>
        <Eyebrow center className="mb-10">
          Where the gap was, and how we closed it
        </Eyebrow>

        <div className="relative" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.scenarioAnchor}
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease }}
              drag={prefersReducedMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={onDragEnd}
              className="touch-pan-y"
            >
              <div className="mx-auto max-w-[42rem] text-center">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-brass">{slide.tag}</span>
                <h3 className="mt-3 text-charcoal">{slide.headline}</h3>
                <p className="mt-3 font-mono text-sm text-charcoal-dim">{slide.stat}</p>
                <Button to={`/case-studies#${slide.scenarioAnchor}`} className="mt-7">
                  See the case study
                </Button>
              </div>

              <div className="mt-14 select-none">
                <div className="flex items-start px-1">
                  <RoadmapNode label={slide.steps[0].label} icon={slide.steps[0].icon} tone="before" />
                  <Connector tone="before" />
                  <RoadmapNode label={slide.steps[1].label} icon={slide.steps[1].icon} tone="before" />
                  <Connector tone="gap" />
                  <RoadmapNode label={slide.gap.label} icon={slide.gap.icon} tone="gap" />
                  <Connector tone="fix" />
                  <RoadmapNode label={slide.fix.label} icon={slide.fix.icon} tone="fix" />
                  <Connector tone="fix" />
                  <RoadmapNode label={slide.result} tone="result" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors duration-200 ease-signature hover:border-brass hover:text-brass"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {gapFixSlides.map((s, i) => (
              <button
                key={s.scenarioAnchor}
                type="button"
                aria-label={`Show ${s.tag} slide`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ease-signature ${
                  i === index ? "w-6 bg-brass" : "w-1.5 bg-charcoal/20 hover:bg-charcoal/35"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors duration-200 ease-signature hover:border-brass hover:text-brass"
          >
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </section>
  );
}
