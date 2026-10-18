import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronUp, X } from "lucide-react";
import clsx from "clsx";
import { catalogueByCode } from "@/data/content/serviceCatalogue";
import { useShortlist } from "@/lib/shortlist";

// Floating bar for the /services shortlist. It sits bottom-left and stops
// short of the right edge, because the ConnectDock trigger and BackToTop
// button own the bottom-right corner.
export function ShortlistBar() {
  const shortlist = useShortlist();
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const count = shortlist.codes.length;

  return (
    <>
      {/* Announces changes for screen readers even while the bar is hidden. */}
      <p className="sr-only" aria-live="polite">
        {count ? `${count} ${count === 1 ? "service" : "services"} shortlisted` : ""}
      </p>
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-4 right-24 z-[75] sm:left-6 sm:right-auto sm:w-[min(36rem,calc(100vw-9rem))] print:hidden"
          >
            <div className="overflow-hidden rounded-md bg-navy text-cream shadow-[0_20px_55px_-15px_rgba(20,24,42,0.45)]">
              {open && (
                <div id="shortlist-panel" className="max-h-[50vh] overflow-y-auto border-b border-cream/10 px-3 py-3">
                  <ul className="flex flex-col gap-1">
                    {shortlist.codes.map((code) => {
                      const svc = catalogueByCode[code];
                      return (
                        <li key={code} className="flex items-center gap-3 rounded-sm bg-navy-2 py-1 pl-3 pr-1">
                          <span className="font-mono text-[11px] text-brass-bright">{code}</span>
                          <span className="min-w-0 flex-1 text-sm leading-snug text-parchment">{svc?.name}</span>
                          <button
                            type="button"
                            onClick={() => shortlist.remove(code)}
                            aria-label={`Remove ${svc?.name ?? code} from shortlist`}
                            className="flex h-11 w-11 flex-none items-center justify-center rounded-sm text-cream-dim hover:bg-navy-3 hover:text-parchment"
                          >
                            <X aria-hidden="true" className="h-4 w-4" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      shortlist.clear();
                      setOpen(false);
                    }}
                    className="mt-2 min-h-[44px] px-3 text-sm text-cream-dim underline underline-offset-4 hover:text-parchment"
                  >
                    Clear shortlist
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2 p-2">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls="shortlist-panel"
                  onClick={() => setOpen((o) => !o)}
                  className="flex min-h-[44px] min-w-0 flex-1 items-center gap-3 rounded-sm px-2 text-left hover:bg-navy-2"
                >
                  <span className="flex h-7 min-w-7 flex-none items-center justify-center rounded-full bg-brass-bright px-2 font-mono text-xs font-medium text-ink">
                    {count}
                  </span>
                  <span className="truncate text-sm text-parchment">
                    <span className="hidden sm:inline">{count === 1 ? "service" : "services"} </span>shortlisted
                  </span>
                  <ChevronUp
                    aria-hidden="true"
                    className={clsx("h-4 w-4 flex-none text-cream-dim transition-transform", !open && "rotate-180")}
                  />
                </button>
                <Link
                  to="/contact"
                  className="group inline-flex min-h-[44px] flex-none items-center gap-2 rounded-sm bg-brass-bright px-3 font-mono sm:px-4 text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:bg-brass"
                >
                  Send<span className="hidden sm:inline"> enquiry</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-200 ease-signature group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
