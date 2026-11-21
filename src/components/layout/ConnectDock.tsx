import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, Phone, X } from "lucide-react";
import clsx from "clsx";
import { site, whatsappUrl } from "@/data/site";

/**
 * The availability chip, mounted once in Layout so it is on every route.
 *
 * A small navy pill in the bottom-right corner that says whether the team
 * is working right now, with the time in India: "Our team is online ·
 * 3:42 pm IST" during working hours, "Message us · back at 9 am IST"
 * outside them. Clicking it opens a card with WhatsApp, a call and email.
 *
 * Working hours are Monday to Saturday, 9 am to 7 pm India time. Public
 * holidays are not modelled, so on a holiday the chip still says online.
 *
 * Clicks are reported by ContactLinkTracking, which watches every wa.me,
 * tel: and mailto: link on the site, so nothing is tracked here directly.
 * data-contact-location="Dock" keeps these clicks separable in GA4 and Meta.
 *
 * Rendered only after mount: the page is prerendered at build time, and a
 * baked-in "online" or "offline" would be wrong for most visitors.
 */

const OPEN_HOUR = 9; // 9 am IST
const CLOSE_HOUR = 19; // 7 pm IST
const WORKING_DAYS = new Set([1, 2, 3, 4, 5, 6]); // Mon-Sat (0 = Sunday)

/** WhatsApp's own brand green, for its icon and the online dot. */
const WHATSAPP_GREEN = "#25D366";

/** "+91 9096236852" -> "+91 90962 36852", easier to read and to dial. */
const displayPhone = site.phone.replace(/^(\+\d{2})\s?(\d{5})(\d{5})$/, "$1 $2 $3");

type Availability = { online: boolean; time: string; back: string };

/** The current time in India, and whether it falls inside working hours. */
function availabilityAt(date: Date): Availability {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = Number(get("hour"));
  const minute = get("minute");

  const online = WORKING_DAYS.has(day) && hour >= OPEN_HOUR && hour < CLOSE_HOUR;
  const time = `${hour % 12 || 12}:${minute} ${hour < 12 ? "am" : "pm"}`;

  // When the team is next in: later today, tomorrow, or Monday.
  let back = "back at 9 am IST";
  if (!online) {
    const beforeOpenToday = WORKING_DAYS.has(day) && hour < OPEN_HOUR;
    const nextDay = (day + 1) % 7;
    if (!beforeOpenToday) back = WORKING_DAYS.has(nextDay) ? "back tomorrow, 9 am IST" : "back Monday, 9 am IST";
  }
  return { online, time, back };
}

/** The official single-path WhatsApp mark (lucide dropped brand icons). */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

/** Green and gently pulsing when the team is in; a still gold dot when not. */
function StatusDot({ online, reducedMotion }: { online: boolean; reducedMotion: boolean }) {
  return (
    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
      {online && !reducedMotion && (
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-60 [animation-duration:2.4s]"
          style={{ backgroundColor: WHATSAPP_GREEN }}
        />
      )}
      <span className="relative h-2 w-2 rounded-full" style={{ backgroundColor: online ? WHATSAPP_GREEN : "#cf9e3b" }} />
    </span>
  );
}

type RowProps = {
  href: string;
  external?: boolean;
  label: string;
  detail: string;
  iconClassName: string;
  icon: ReactNode;
};

function Row({ href, external, label, detail, iconClassName, icon }: RowProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      data-contact-location="Dock"
      className="group flex items-center gap-3 rounded-lg px-2.5 py-2.5 outline-none transition-colors hover:bg-parchment focus-visible:bg-parchment"
    >
      <span className={clsx("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", iconClassName)}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-charcoal">{label}</span>
        <span className="block truncate font-mono text-[11px] text-charcoal-dim">{detail}</span>
      </span>
      <ArrowRight
        className="h-3.5 w-3.5 shrink-0 text-transparent transition-all group-hover:translate-x-0.5 group-hover:text-charcoal-dim"
        aria-hidden="true"
      />
    </a>
  );
}

export function ConnectDock() {
  const [now, setNow] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Start the clock after mount (see the note at the top), then keep it
  // current so the minutes and the online state roll over on their own.
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  // A card left open across a route change looks like a bug.
  useEffect(() => setOpen(false), [pathname]);

  // Escape and outside-click both close it. Bound only while open.
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

  if (!now) return null;
  const { online, time, back } = availabilityAt(now);

  // Naming the page gives the reply somewhere to start, and tells us which
  // pages actually earn conversations.
  const whatsappHref = whatsappUrl(`Hi Qamira, I was reading ${site.url}${pathname} and would like to talk.`);

  return (
    <div ref={rootRef} className="fixed bottom-5 right-4 z-[80] flex flex-col items-end gap-3 sm:right-6 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            id="availability-card"
            role="dialog"
            aria-label="Contact Qamira Consulting"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-[0_28px_60px_-22px_rgba(15,24,48,0.5)]"
          >
            <div className="relative border-b border-charcoal/10 px-5 pb-4 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-full p-1.5 text-charcoal-dim transition-colors hover:bg-parchment hover:text-charcoal"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="flex items-center gap-2 pr-8 font-mono text-[10.5px] uppercase tracking-[0.12em] text-brass-ink">
                <StatusDot online={online} reducedMotion={prefersReducedMotion} />
                {online ? `Online now · ${time} IST` : `Offline · ${back}`}
              </p>
              <h2 className="mt-2 font-display text-xl leading-snug text-charcoal">Talk to our team</h2>
              <p className="mt-1 text-xs leading-relaxed text-charcoal-dim">
                Based in India, working Monday to Saturday, 9 am to 7 pm IST.
                {online ? " You'll reach a person." : " Leave a message and we'll reply when we're back."}
              </p>
            </div>

            <div className="flex flex-col gap-0.5 p-2">
              <Row
                href={whatsappHref}
                external
                label="WhatsApp"
                detail={online ? "Usually the fastest reply" : "Message us any time"}
                iconClassName="text-white"
                icon={
                  <span
                    className="flex h-full w-full items-center justify-center rounded-full"
                    style={{ backgroundColor: WHATSAPP_GREEN }}
                  >
                    <WhatsAppGlyph className="h-[1.15rem] w-[1.15rem]" />
                  </span>
                }
              />
              <Row
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                label={online ? "Call us" : "Call us (from 9 am IST)"}
                detail={displayPhone}
                iconClassName="bg-navy text-white"
                icon={<Phone className="h-4 w-4" aria-hidden="true" />}
              />
              <Row
                href={`mailto:${site.email}`}
                label="Email"
                detail={site.email}
                iconClassName="bg-brass-logo text-navy"
                icon={<Mail className="h-4 w-4" aria-hidden="true" />}
              />
            </div>

            <Link
              to="/contact"
              className="group flex items-center justify-between border-t border-charcoal/10 bg-parchment/60 px-5 py-3 text-xs text-charcoal transition-colors hover:text-brass-ink"
            >
              <span>
                Book a free 20-minute call
                <span className="block text-[11px] text-charcoal-dim">We reply within one business day</span>
              </span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="availability-card"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "flex items-center gap-2.5 rounded-full border border-white/10 bg-navy py-2.5 pl-3.5 pr-4 text-left text-white",
          "shadow-[0_16px_36px_-14px_rgba(15,24,48,0.7)] transition-transform duration-200 ease-signature hover:-translate-y-0.5",
          "outline-none focus-visible:ring-2 focus-visible:ring-brass-logo focus-visible:ring-offset-2",
        )}
      >
        <StatusDot online={online} reducedMotion={prefersReducedMotion} />
        <span className="text-[13px] font-medium">
          {online ? (
            <>
              <span className="sm:hidden">We're online</span>
              <span className="hidden sm:inline">Our team is online</span>
            </>
          ) : (
            "Message us"
          )}
        </span>
        <span className="hidden font-mono text-[11px] text-brass-logo sm:inline">{online ? `${time} IST` : back}</span>
      </motion.button>
    </div>
  );
}
