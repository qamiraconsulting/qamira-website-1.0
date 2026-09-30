import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, X } from "lucide-react";
import clsx from "clsx";
import { activeSocialProfiles, site, whatsappUrl, type SocialProfile } from "@/data/site";
import { track } from "@/lib/metaPixel";
import { trackGoogleContactChannel } from "@/lib/googleTag";

/**
 * The floating "talk to us" dock, mounted once in Layout so it is present
 * on every route.
 *
 * Three things live here rather than in three separate widgets, because
 * for the visitor they are one decision -- "how do I reach these people":
 *   1. a WhatsApp deep link to the firm's line, pre-filled with the page
 *      the visitor was reading;
 *   2. the enquiries mailbox, for anyone who would rather write;
 *   3. the public social profiles.
 *
 * No third-party chat script is loaded. wa.me is a plain link, so this
 * adds no network requests, nothing that can watch the visitor, and
 * nothing that can slow the page down.
 */

/** Marks the teaser bubble as already seen, so it shows at most once. */
const TEASER_SEEN_KEY = "qamira:connect-teaser-seen";

/** Long enough that the bubble reads as an offer of help, not an interruption. */
const TEASER_DELAY_MS = 14000;

const socialIcons: Record<SocialProfile["label"], typeof Linkedin> = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Facebook: Facebook,
};

/**
 * The WhatsApp glyph. Not in lucide -- it dropped brand marks -- so the
 * official single-path logo is inlined rather than adding an icon package
 * for one shape.
 */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function ConnectDock() {
  const [open, setOpen] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  /** Never offer the bubble again, on this browser, once it has had its turn. */
  const retireTeaser = useCallback(() => {
    setTeaserVisible(false);
    try {
      window.localStorage.setItem(TEASER_SEEN_KEY, "1");
    } catch {
      // Private mode or blocked storage. The bubble simply reappears on a
      // later visit, which is a far smaller problem than throwing.
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

  // A panel left hanging open across a route change looks like a bug.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape and outside-click both dismiss. Bound only while open, so the
  // closed dock costs nothing.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Move focus into the panel so a keyboard visitor lands on the action
  // they opened it for.
  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  const toggle = () => {
    retireTeaser();
    setOpen((value) => !value);
  };

  /**
   * Report a channel click to both ad platforms.
   *
   * Meta's `Contact` is the standard event for contact between a customer
   * and the business, which a chat click is; `content_name` keeps it
   * separable from the contact form in Events Manager. No `eventId` is
   * passed because nothing matching is sent server-side, so there is
   * nothing to deduplicate against.
   */
  const report = (channel: string) => {
    track("Contact", { content_name: channel });
    trackGoogleContactChannel(channel);
  };

  // Naming the page gives the reply somewhere to start, and tells us which
  // pages actually earn conversations.
  const message = `Hi Qamira, I was reading ${site.url}${pathname} and would like to talk.`;

  return (
    <div ref={rootRef} className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-3 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            id="connect-dock-panel"
            role="dialog"
            aria-label="Ways to reach Qamira Consulting"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="w-[min(21rem,calc(100vw-3rem))] overflow-hidden rounded-lg border border-charcoal/10 bg-white shadow-[0_20px_55px_-15px_rgba(20,24,42,0.32)]"
          >
            <div className="border-b border-charcoal/10 bg-gradient-to-br from-parchment-2 to-parchment px-5 py-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-brass">Talk to us</p>
              <h2 className="mt-1 font-display text-lg text-charcoal">Start a conversation</h2>
              <p className="mt-1 text-xs leading-relaxed text-charcoal-dim">
                Ask a question, or tell us what is not working. No form, no gate.
              </p>
            </div>

            <div className="flex flex-col gap-1 p-2">
              <a
                ref={firstLinkRef}
                href={whatsappUrl(message)}
                target="_blank"
                rel="noreferrer"
                onClick={() => report("WhatsApp")}
                className="group flex items-center gap-3 rounded-md px-3 py-3 transition-colors hover:bg-parchment focus-visible:bg-parchment"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25d366]/10 text-[#128c47] transition-colors group-hover:bg-[#25d366] group-hover:text-white">
                  <WhatsAppGlyph className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-charcoal">WhatsApp</span>
                  <span className="block font-mono text-xs text-charcoal-dim">{site.phone}</span>
                </span>
              </a>

              <a
                href={`mailto:${site.email}`}
                onClick={() => report("Email")}
                className="group flex items-center gap-3 rounded-md px-3 py-3 transition-colors hover:bg-parchment focus-visible:bg-parchment"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass/10 text-brass transition-colors group-hover:bg-brass group-hover:text-white">
                  <Mail className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-charcoal">Email</span>
                  <span className="block truncate font-mono text-xs text-charcoal-dim">{site.email}</span>
                </span>
              </a>
            </div>

            {activeSocialProfiles.length > 0 && (
              <div className="flex items-center justify-between gap-3 border-t border-charcoal/10 bg-parchment/60 px-5 py-3">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-charcoal-dim">Follow</span>
                <div className="flex items-center gap-1.5">
                  {activeSocialProfiles.map((profile) => {
                    const Icon = socialIcons[profile.label];
                    return (
                      <a
                        key={profile.label}
                        href={profile.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Qamira Consulting on ${profile.label}`}
                        onClick={() => report(profile.label)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/10 bg-white text-charcoal-dim transition-colors hover:border-brass hover:text-brass"
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {teaserVisible && !open && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="flex max-w-[min(17rem,calc(100vw-3rem))] items-start gap-2 rounded-lg border border-charcoal/10 bg-white py-2.5 pl-4 pr-2 shadow-[0_14px_38px_-14px_rgba(20,24,42,0.3)]"
          >
            <button
              type="button"
              onClick={toggle}
              className="text-left text-xs leading-relaxed text-charcoal transition-colors hover:text-brass"
            >
              Got a question? Message us on WhatsApp — you will reach a person, not a bot.
            </button>
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

      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="connect-dock-panel"
        aria-label={open ? "Close contact options" : "Open contact options"}
        className={clsx(
          "relative flex h-14 w-14 items-center justify-center rounded-full text-white",
          "bg-gradient-to-br from-brass-bright to-brass-dim shadow-[0_10px_28px_-8px_rgba(184,134,58,0.75)]",
          "transition-all duration-300 ease-signature hover:-translate-y-0.5",
          "hover:shadow-[0_16px_34px_-8px_rgba(184,134,58,0.85)]",
        )}
      >
        {/* One slow halo rather than a strobe: enough to catch the eye on a
            long page without competing with the content. */}
        {!open && !prefersReducedMotion && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-brass/30 [animation-duration:2.8s]"
          />
        )}
        <span className="relative">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                <WhatsAppGlyph className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </div>
  );
}
