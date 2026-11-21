import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, X } from "lucide-react";
import clsx from "clsx";
import { site, whatsappUrl } from "@/data/site";

/**
 * The side contact widget, mounted once in Layout so it is on every route:
 * three tabs fixed to the right edge for WhatsApp, a phone call and email.
 * Hovering or focusing a tab slides out a label with the number or address;
 * on touch screens a tap goes straight to the app.
 *
 * Clicks are reported by ContactLinkTracking, which watches every wa.me,
 * tel: and mailto: link on the site, so nothing is tracked here directly.
 * data-contact-location="Dock" keeps these clicks separable in GA4 and Meta.
 *
 * No third-party chat script is loaded: all three are plain links, so the
 * widget adds no network requests and nothing that can slow the page down.
 */

/** Marks the teaser bubble as already seen, so it shows at most once. */
const TEASER_SEEN_KEY = "qamira:connect-teaser-seen";

/** Long enough that the bubble reads as an offer of help, not an interruption. */
const TEASER_DELAY_MS = 14000;

/** WhatsApp's own brand green, used for its tab only. */
const WHATSAPP_GREEN = "#25D366";

/** "+91 9096236852" -> "+91 90962 36852", easier to read and to dial. */
const displayPhone = site.phone.replace(/^(\+\d{2})\s?(\d{5})(\d{5})$/, "$1 $2 $3");

/** The official single-path WhatsApp mark (lucide dropped brand icons). */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

type TabProps = {
  href: string;
  label: string;
  detail: string;
  external?: boolean;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** One tab: a square handle on the edge, with a label that slides out to its left. */
function Tab({ href, label, detail, external, className, style, children }: TabProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      data-contact-location="Dock"
      aria-label={`${label}: ${detail}`}
      className="group relative flex"
    >
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute right-full top-1/2 mr-2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-md bg-navy px-3 py-2 text-left opacity-0 shadow-lg sm:block",
          "transition-all duration-200 ease-signature group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
          "motion-reduce:transition-none",
        )}
      >
        <span className="block text-xs font-medium text-white">{label}</span>
        <span className="block font-mono text-[11px] text-white/75">{detail}</span>
      </span>
      <span
        className={clsx(
          "flex h-11 w-11 items-center justify-center rounded-l-md shadow-[0_8px_22px_-10px_rgba(20,24,42,0.55)] transition-[width] duration-200 ease-signature sm:h-12 sm:w-12 sm:group-hover:w-14 motion-reduce:transition-none",
          className,
        )}
        style={style}
      >
        {children}
      </span>
    </a>
  );
}

export function ConnectDock() {
  const [teaserVisible, setTeaserVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();

  /** Never offer the bubble again, on this browser, once it has had its turn. */
  const retireTeaser = useCallback(() => {
    setTeaserVisible(false);
    try {
      window.localStorage.setItem(TEASER_SEEN_KEY, "1");
    } catch {
      // Private mode or blocked storage: the bubble may reappear on a later
      // visit, which is a far smaller problem than throwing.
    }
  }, []);

  // Offer the bubble once per browser, after the visitor has had time to
  // start reading. Guarded on `window` because this module is imported by
  // the build-time prerender (scripts/prerender.mjs).
  useEffect(() => {
    if (typeof window === "undefined") return;
    let seen = false;
    try {
      seen = window.localStorage.getItem(TEASER_SEEN_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const timer = window.setTimeout(() => setTeaserVisible(true), TEASER_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // The line is an Indian number. On the AU, UK and US pages, say so
  // before someone taps it expecting a local call.
  const overseas = /^\/(au|uk|us)(\/|$)/.test(pathname);
  const india = overseas ? " · team in India" : "";

  // Naming the page gives the reply somewhere to start, and tells us which
  // pages actually earn conversations.
  const whatsappHref = whatsappUrl(`Hi Qamira, I was reading ${site.url}${pathname} and would like to talk.`);

  return (
    <aside
      aria-label="Contact Qamira Consulting"
      className="fixed right-0 top-1/2 z-[80] flex -translate-y-1/2 items-center print:hidden"
    >
      <AnimatePresence>
        {teaserVisible && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            // Above the tabs, not beside them, so it never covers the
            // labels that slide out to the left on hover.
            className="absolute bottom-full right-2 mb-3 flex w-[min(15rem,calc(100vw-2rem))] items-start gap-1 rounded-lg border border-charcoal/10 bg-white py-2.5 pl-3.5 pr-1.5 shadow-[0_14px_38px_-14px_rgba(20,24,42,0.3)]"
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              data-contact-location="Teaser"
              onClick={retireTeaser}
              className="text-xs leading-relaxed text-charcoal transition-colors hover:text-[#128c47]"
            >
              Got a question? Message us on WhatsApp. You'll reach a person, not a bot.
            </a>
            <button
              type="button"
              onClick={retireTeaser}
              aria-label="Dismiss"
              className="-mt-0.5 shrink-0 rounded p-1 text-charcoal-dim transition-colors hover:text-charcoal"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end gap-1.5">
        <Tab
          href={whatsappHref}
          external
          label={`WhatsApp us${india}`}
          detail={displayPhone}
          className="text-white"
          style={{ backgroundColor: WHATSAPP_GREEN }}
        >
          <WhatsAppGlyph className="h-6 w-6" />
        </Tab>
        <Tab
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          label={`Call us${india}`}
          detail={displayPhone}
          className="bg-navy text-white"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
        </Tab>
        <Tab href={`mailto:${site.email}`} label="Email us" detail={site.email} className="bg-brass-logo text-navy">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </Tab>
      </div>
    </aside>
  );
}
