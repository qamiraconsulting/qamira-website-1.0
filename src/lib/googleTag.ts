// Google tag (gtag.js) -- Google Analytics 4, which also feeds Google Ads.
//
// Same shape as metaPixel.ts, for the same reasons: loaded from a module so
// it can be gated on host, and guarded on `typeof window` because this is
// still imported during the build-time prerender (scripts/prerender.mjs).
//
// Conversions reach Google Ads by way of GA4: `generate_lead` is marked as
// a key event in GA4, and that key event is imported into Ads. So this file
// never needs an AW- conversion ID or label.

/**
 * The GA4 measurement ID. Hardcoded rather than an env var for the reason
 * given on PIXEL_ID in metaPixel.ts: it is public anyway, and a missing
 * env var would ship a tag that silently records nothing.
 */
const MEASUREMENT_ID = "G-QJFM4FWQL5";

/**
 * Only the real site reports, so localhost and Vercel preview traffic never
 * land in Analytics or in the Ads conversion data. Set VITE_GA_MEASUREMENT_ID
 * to override (e.g. to point a staging host at a throwaway property).
 */
const PRODUCTION_HOSTS = ["www.qamiraconsulting.com", "qamiraconsulting.com"];

const OVERRIDE_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

function resolveMeasurementId(): string | undefined {
  if (OVERRIDE_ID) return OVERRIDE_ID;
  if (typeof window === "undefined") return undefined;
  return PRODUCTION_HOSTS.includes(window.location.hostname) ? MEASUREMENT_ID : undefined;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialised = false;

/** True when this host will actually report. Useful in the console. */
export function googleTagEnabled(): boolean {
  return Boolean(resolveMeasurementId());
}

/**
 * Load gtag.js and configure GA4. Safe to call repeatedly.
 *
 * Unlike the Meta pixel, SPA page views need no code of our own: GA4's
 * enhanced measurement (switched on when the property was created from
 * Google Ads) records a page_view on every history change, which is how
 * React Router navigates. Sending our own page_view on route change as
 * well would double-count every page after the first.
 */
export function initGoogleTag(): void {
  const id = resolveMeasurementId();
  if (initialised || !id || typeof window === "undefined") return;
  initialised = true;

  window.dataLayer = window.dataLayer ?? [];
  // gtag.js reads the `arguments` object, not an array -- Google's snippet
  // uses `function gtag(){dataLayer.push(arguments)}` for this reason, and
  // pushing a rest-parameter array instead is silently ignored.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
}

/**
 * Record a lead. Both lead forms send the same GA4 recommended event, so a
 * single key event (and a single Ads conversion) counts them together;
 * `form_name` keeps them separable in GA4 reports.
 */
export function trackGoogleLead(formName: "AI Business Assessment" | "Contact form"): void {
  if (typeof window === "undefined" || !resolveMeasurementId()) return;
  window.gtag?.("event", "generate_lead", { form_name: formName });
}
