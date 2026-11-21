import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Qami, floating just above the availability chip: the mascot gently
 * hovering, a small "24/7" badge, and a speech bubble that "types" a line
 * suited to the visitor's own clock. Clicking either opens the chat.
 *
 * The bubble can be dismissed for the rest of the visit (sessionStorage);
 * the mascot itself stays, so the way in is never lost.
 */

export const QAMI_FLOAT = "/qami/qami-float.webp";

const DISMISS_KEY = "qamira:qami-bubble-dismissed";

type Line = { title: string; body: string };

/** What Qami says, from the visitor's local time and whether our team is in. */
function lineFor(date: Date, teamOnline: boolean): Line {
  const hour = date.getHours();
  const day = date.getDay();
  if (hour >= 22 || hour < 6) {
    return { title: "Up late? So am I.", body: "I'm Qami, the AI assistant. I'm here 24/7, so ask me anything." };
  }
  if (day === 0 || day === 6) {
    return { title: "Weekends? I don't take them.", body: "I'm Qami, the AI assistant, here 24/7. Ask me anything." };
  }
  if (!teamOnline) {
    return { title: "The team's away. I'm not.", body: "I'm Qami, the AI assistant, here 24/7. Ask me anything." };
  }
  return { title: "Hi, I'm Qami.", body: "Our AI assistant, here day and night. Ask me anything, 24/7." };
}

function readDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function QamiBeacon({
  teamOnline,
  reducedMotion,
  onOpen,
}: {
  teamOnline: boolean;
  reducedMotion: boolean;
  onOpen: () => void;
}) {
  const [line] = useState(() => lineFor(new Date(), teamOnline));
  const [dismissed, setDismissed] = useState(readDismissed);
  // The bubble arrives a moment after the page, "typing" first.
  const [stage, setStage] = useState<"hidden" | "typing" | "said">(reducedMotion ? "said" : "hidden");

  useEffect(() => {
    if (reducedMotion || dismissed) return;
    const t1 = window.setTimeout(() => setStage("typing"), 1800);
    const t2 = window.setTimeout(() => setStage("said"), 3000);
    // On phones the bubble sits over page content, so it says its piece and
    // then tucks away; the mascot stays.
    const small = window.matchMedia("(max-width: 639px)").matches;
    const t3 = small ? window.setTimeout(() => setStage("hidden"), 12000) : undefined;
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      if (t3) window.clearTimeout(t3);
    };
  }, [reducedMotion, dismissed]);

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // storage blocked: hidden for this page only
    }
  };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-1 sm:gap-2"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {!dismissed && stage !== "hidden" && (
          <motion.div
            key="bubble"
            initial={reducedMotion ? false : { opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{ transformOrigin: "right center" }}
            className="relative"
          >
            <button
              type="button"
              onClick={onOpen}
              className="relative block w-[min(11.5rem,calc(100vw-9.5rem))] rounded-2xl border sm:w-[14.5rem] border-brass-logo/40 bg-white px-3.5 py-2.5 text-left shadow-[0_18px_40px_-18px_rgba(15,24,48,0.45)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {stage === "typing" ? (
                <span className="flex h-9 items-center gap-1" aria-hidden="true">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-charcoal-dim/60"
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                </span>
              ) : (
                <motion.span
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  <span className="block pr-4 text-[13px] font-medium leading-snug text-charcoal">{line.title}</span>
                  <span className="mt-0.5 hidden text-[12px] leading-snug text-charcoal-dim sm:block">{line.body}</span>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-brass-ink">
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      {!reducedMotion && (
                        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-60 [animation-duration:2.4s]" />
                      )}
                      <span className="relative h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                    </span>
                    <span className="sm:hidden">Here 24/7 · Start a chat</span>
                    <span className="hidden sm:inline">Awake now · Start a chat</span>
                  </span>
                </motion.span>
              )}
              {/* Tail pointing at Qami */}
              <span
                aria-hidden="true"
                className="absolute -right-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-brass-logo/40 bg-white"
              />
            </button>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Hide Qami's message"
              className="absolute right-1 top-1 rounded-full p-1 text-charcoal-dim/70 transition-colors hover:bg-parchment hover:text-charcoal"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Qami, hovering, with the 24/7 badge and a soft shadow that breathes with it */}
      <button
        type="button"
        onClick={onOpen}
        aria-label="Chat with Qami, our AI assistant, available 24/7"
        className="group relative flex h-[6.25rem] w-[6.25rem] shrink-0 flex-col items-center justify-end outline-none sm:h-[8.75rem] sm:w-[8.75rem]"
      >
        <motion.img
          src={QAMI_FLOAT}
          alt=""
          width={263}
          height={260}
          draggable={false}
          animate={reducedMotion ? undefined : { y: [0, -7, 0], rotate: [0, -2, 0] }}
          transition={reducedMotion ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-[1] h-[5.5rem] w-auto drop-shadow-[0_10px_14px_rgba(15,24,48,0.28)] transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105 sm:h-[7.75rem]"
        />
        <motion.span
          aria-hidden="true"
          animate={reducedMotion ? undefined : { scaleX: [1, 0.8, 1], opacity: [0.35, 0.2, 0.35] }}
          transition={reducedMotion ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="mt-0.5 h-1.5 w-12 rounded-[50%] bg-navy/60 blur-[3px] sm:h-2 sm:w-16"
        />
        {/* The 24/7 badge */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-0 z-[2] rounded-full bg-navy px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-brass-logo shadow-[0_4px_10px_-4px_rgba(15,24,48,0.6)] ring-2 ring-white sm:bottom-5 sm:px-2 sm:text-xs"
        >
          24/7
        </span>
      </button>
    </motion.div>
  );
}
