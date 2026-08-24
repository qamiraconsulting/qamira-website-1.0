import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Search,
  Workflow,
  SlidersHorizontal,
  Users,
  Cpu,
  FileCheck2,
  BarChart3,
  RefreshCw,
  Lock,
  Stethoscope,
  Compass,
  Megaphone,
  Handshake,
  PackageCheck,
  LineChart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { ease, staggerChildren, viewportOnce } from "@/lib/motion";

const icons = {
  Search,
  Workflow,
  SlidersHorizontal,
  Users,
  Cpu,
  FileCheck2,
  BarChart3,
  RefreshCw,
  Lock,
  Stethoscope,
  Compass,
  Megaphone,
  Handshake,
  PackageCheck,
  LineChart,
  Sparkles,
  TrendingUp,
};

type Step = {
  step: string;
  title: string;
  icon: keyof typeof icons;
  body: string;
};

const lineVariantsY: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.2, ease } },
};
const lineVariantsX: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease } },
};
const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// The signature "way of working" illustration: numbered icon nodes
// connected by a line that draws itself in as the section scrolls into
// view. `full` renders the vertical, detailed timeline (Methodology page);
// the compact horizontal strip is used as a Home page preview.
//
// Note: whileInView is applied to the outer container, not the line
// itself -- a line whose *initial* state is scaleY/scaleX 0 has zero
// area, and an element with zero area never satisfies an
// IntersectionObserver visibility threshold on its own. Children inherit
// the container's animate state via Framer's variant propagation instead.
export function ProcessFlow({ steps, variant = "full" }: { steps: readonly Step[]; variant?: "full" | "compact" }) {
  const prefersReducedMotion = useReducedMotion();
  const container = prefersReducedMotion ? undefined : staggerChildren(variant === "compact" ? 0.06 : 0.07);

  if (variant === "compact") {
    return (
      <div className="relative -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
        <motion.div
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={viewportOnce}
          variants={container}
          className="relative flex min-w-[860px] items-start justify-between gap-2 sm:min-w-0"
        >
          <motion.div
            aria-hidden="true"
            variants={prefersReducedMotion ? undefined : lineVariantsX}
            style={{ transformOrigin: "left" }}
            className="absolute left-7 right-7 top-7 h-px bg-brass/40"
          />
          {steps.map((s) => {
            const Icon = icons[s.icon];
            return (
              <motion.div
                key={s.step}
                variants={prefersReducedMotion ? undefined : nodeVariants}
                className="relative z-10 flex w-[100px] flex-col items-center text-center"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-brass bg-white">
                  <Icon className="h-5 w-5 text-brass" aria-hidden="true" />
                </span>
                <span className="mt-3 font-mono text-[0.65rem] text-brass">{s.step}</span>
                <span className="mt-1 text-xs font-medium leading-tight text-charcoal">{s.title}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={viewportOnce}
      variants={container}
      className="relative"
    >
      <motion.div
        aria-hidden="true"
        variants={prefersReducedMotion ? undefined : lineVariantsY}
        style={{ transformOrigin: "top" }}
        className="absolute left-7 top-7 bottom-7 w-px bg-brass/30"
      />
      <div className="flex flex-col">
        {steps.map((s) => {
          const Icon = icons[s.icon];
          return (
            <motion.div
              key={s.step}
              variants={prefersReducedMotion ? undefined : nodeVariants}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-brass bg-white">
                <Icon className="h-6 w-6 text-brass" aria-hidden="true" />
              </span>
              <div className="pt-2.5">
                <span className="font-mono text-xs tracking-[0.04em] text-brass">{s.step}</span>
                <h3 className="mt-1 text-charcoal">{s.title}</h3>
                <p className="mt-2 max-w-[60ch] text-sm text-charcoal-dim">{s.body}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
