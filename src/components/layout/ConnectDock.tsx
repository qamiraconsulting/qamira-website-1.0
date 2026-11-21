import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, Phone, X } from "lucide-react";
import clsx from "clsx";
import { site, whatsappUrl } from "@/data/site";

/**
 * The side contact rail, mounted once in Layout so it is on every route.
 *
 * A navy panel fixed to the right edge with three channels (WhatsApp, call,
 * email). On a pointer device it opens out on hover or keyboard focus into
 * a small concierge card: a heading, each channel with its detail, and a
 * link to book a free call. On touch screens it stays a slim rail and a tap
 * goes straight to the app.
 *
 * Clicks are reported by ContactLinkTracking, which watches every wa.me,
 * tel: and mailto: link on the site, so nothing is tracked here directly.
 * data-contact-location="Dock" keeps these clicks separable in GA4 and Meta.
 *
 * No third-party chat script is loaded: every channel is a plain link, so
 * the rail adds no network requests and nothing that can slow the page.
 */

/** Marks the teaser bubble as already seen, so it shows at most once. */
const TEASER_SEEN_KEY = "qamira:connect-teaser-seen";

/** Long enough that the bubble reads as an offer of help, not an interruption. */
const TEASER_DELAY_MS = 14000;

/** WhatsApp's own brand green, for its icon only. */
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

/** Classes for text that only appears once the rail has opened out. */
const revealed =
  "opacity-0 transition-opacity duration-200 sm:group-hover/rail:opacity-100 sm:group-hover/rail:delay-100 sm:group-focus-within/rail:opacity-100 sm:group-focus-within/rail:delay-100 motion-reduce:transition-none";

type ChannelProps = {
  href: string;
  external?: boolean;
  label: string;
  detail: string;
  icon: ReactNode;
  iconClassName: string;
};

/** One channel: a round icon that is always visible, and its label beside it. */
function Channel({ href, external, label, detail, icon, iconClassName }: ChannelProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      data-contact-location="Dock"
      aria-label={`${label}: ${detail}`}
      className="group/channel flex items-center gap-3.5 rounded-xl p-1 outline-none sm:p-1.5 transition-colors duration-200 hover:bg-white/[0.06] focus-visible:bg-white/[0.08] focus-visible:ring-1 focus-visible:ring-brass-logo/60"
    >
      <span
        className={clsx(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 sm:h-10 sm:w-10 ring-inset transition-transform duration-200 ease-signature group-hover/channel:scale-105 motion-reduce:transition-none",
          iconClassName,
        )}
      >
        {icon}
      </span>
      <span className={clsx("min-w-0 whitespace-nowrap", revealed)}>
        <span className="block text-[13px] font-medium leading-tight text-white">{label}</span>
        <span className="mt-0.5 block truncate font-mono text-[11px] leading-tight text-white/60">{detail}</span>
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

  // Naming the page gives the reply somewhere to start, and tells us which
  // pages actually earn conversations.
  const whatsappHref = whatsappUrl(`Hi Qamira, I was reading ${site.url}${pathname} and would like to talk.`);

  return (
    <aside
      aria-label="Contact Qamira Consulting"
      // Phones: low on the right, clear of headlines and the bottom bars.
      // Larger screens: centred on the right edge.
      className="fixed bottom-28 right-0 z-[80] print:hidden sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
    >
      <AnimatePresence>
        {teaserVisible && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            // Above the rail, so it never sits under the opened-out card.
            className="absolute bottom-full right-3 mb-3 flex w-[min(15rem,calc(100vw-2rem))] items-start gap-1 rounded-xl border border-charcoal/10 bg-white py-2.5 pl-3.5 pr-1.5 shadow-[0_18px_40px_-16px_rgba(15,24,48,0.45)]"
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

      <motion.div
        initial={prefersReducedMotion ? false : { x: 24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "group/rail relative overflow-hidden rounded-l-2xl border border-r-0 border-brass-logo/25 bg-navy/95 backdrop-blur-md",
          "shadow-[0_24px_60px_-20px_rgba(15,24,48,0.65)]",
          // Opens out on hover or keyboard focus, on pointer devices only.
          "w-[3.25rem] transition-[width] sm:w-[3.75rem] duration-300 ease-signature motion-reduce:transition-none",
          "sm:hover:w-[19.5rem] sm:focus-within:w-[19.5rem]",
        )}
      >
        {/* A gold hairline down the inner edge: the one flourish. */}
        <span aria-hidden="true" className="absolute inset-y-4 left-0 w-px bg-gradient-to-b from-transparent via-brass-logo/70 to-transparent" />

        {/* Header: a gold dot when closed, the heading when open. */}
        <div className="relative flex h-9 items-center gap-3 px-[1.25rem] pt-1.5 sm:h-11 sm:px-[1.4rem] sm:pt-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brass-logo" />
          <span className={clsx("whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-brass-logo", revealed)}>
            Talk to our team
          </span>
        </div>

        <div className="flex flex-col gap-0.5 px-1 pb-1.5 sm:gap-1 sm:px-[0.55rem] sm:pb-2">
          <Channel
            href={whatsappHref}
            external
            label="WhatsApp"
            detail={overseas ? "Chat with our team in India" : "Chat with our team"}
            iconClassName="text-white ring-white/10"
            icon={
              <span className="flex h-full w-full items-center justify-center rounded-full" style={{ backgroundColor: WHATSAPP_GREEN }}>
                <WhatsAppGlyph className="h-5 w-5" />
              </span>
            }
          />
          <Channel
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            label={overseas ? "Call us in India" : "Call us"}
            detail={displayPhone}
            iconClassName="bg-white/[0.07] text-white ring-white/15 group-hover/channel:ring-brass-logo/60"
            icon={<Phone className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />}
          />
          <Channel
            href={`mailto:${site.email}`}
            label="Email"
            detail={site.email}
            iconClassName="bg-white/[0.07] text-brass-logo ring-white/15 group-hover/channel:ring-brass-logo/60"
            icon={<Mail className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />}
          />
        </div>

        {/* Footer: only in the opened-out card. Hidden from touch and from
            the closed rail so it never takes a tap meant for a channel. */}
        <div
          className={clsx(
            "hidden max-h-0 overflow-hidden border-t border-transparent px-4 transition-[max-height,padding,border-color] duration-300 ease-signature sm:block",
            "sm:group-hover/rail:max-h-20 sm:group-hover/rail:border-white/10 sm:group-hover/rail:py-3",
            "sm:group-focus-within/rail:max-h-20 sm:group-focus-within/rail:border-white/10 sm:group-focus-within/rail:py-3",
            revealed,
          )}
        >
          <Link
            to="/contact"
            className="group/book flex items-center justify-between whitespace-nowrap text-xs text-white/80 transition-colors hover:text-brass-logo"
          >
            <span>
              Book a free 20-minute call
              <span className="block text-[10.5px] text-white/45">We reply within one business day</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/book:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    </aside>
  );
}
