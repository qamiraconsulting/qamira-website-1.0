// Meta (Facebook) Pixel.
//
// Loaded from a module rather than a raw <script> in index.html so the
// pixel can be gated on where it is running. Everything is also guarded on
// `typeof window`, because App renders through renderToString during the
// build-time prerender (see scripts/prerender.mjs) -- effects never run
// there, but this module is still imported and evaluated.

/**
 * The live dataset ID, from Events Manager.
 *
 * Hardcoded rather than required as an env var on purpose. Pixel IDs are
 * public by design -- anyone can read this one out of the shipped bundle
 * -- so there is nothing to protect, and a missing env var would fail the
 * worst possible way: a clean build, a green deploy, and a pixel that
 * silently records nothing until someone thinks to check. The host check
 * below does the job the env var was there for.
 */
const PIXEL_ID = "2006622356723246";

/**
 * Only the real site reports. localhost, Vercel preview deploys and any
 * other host resolve to no pixel at all, so development traffic and
 * half-finished branches never land in the ad account's conversion data
 * -- which would otherwise poison the very optimisation the pixel exists
 * to feed. Set VITE_META_PIXEL_ID to override (e.g. to point a staging
 * host at a throwaway test dataset).
 */
const PRODUCTION_HOSTS = ["www.qamiraconsulting.com", "qamiraconsulting.com"];

const OVERRIDE_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

function resolvePixelId(): string | undefined {
  if (OVERRIDE_ID) return OVERRIDE_ID;
  if (typeof window === "undefined") return undefined;
  return PRODUCTION_HOSTS.includes(window.location.hostname) ? PIXEL_ID : undefined;
}

/**
 * The subset of Meta's standard events this site actually sends. Kept as
 * a union rather than `string` so a typo fails the build instead of
 * quietly creating a custom event that no ad set can optimise for.
 */
export type MetaStandardEvent =
  | "PageView"
  | "Lead"
  | "Contact"
  | "CompleteRegistration"
  | "ViewContent"
  | "Schedule";

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

let initialised = false;

/** True when this host will actually report. Useful in the console. */
export function pixelEnabled(): boolean {
  return Boolean(resolvePixelId());
}

/**
 * Meta's official snippet, rewritten readably. The shape matters more than
 * it looks: fbevents.js checks for `fbq.callMethod` and otherwise drains
 * `fbq.queue`, so calls made before the remote script lands are replayed
 * rather than lost. That is what makes it safe to fire a PageView on the
 * same tick as init.
 */
function loadFbevents(): void {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  } as FbqFn;

  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";

  window.fbq = fbq;
  window._fbq ??= fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

/**
 * Initialise the pixel. Safe to call repeatedly; only the first call does
 * anything. Deliberately does NOT fire a PageView -- MetaPixel.tsx owns
 * that, so the initial load and every client-side route change go through
 * exactly one code path.
 */
export function initMetaPixel(): void {
  const id = resolvePixelId();
  if (initialised || !id || typeof window === "undefined") return;
  initialised = true;
  loadFbevents();
  window.fbq?.("init", id);
}

/**
 * A unique id for one conversion, shared between the browser pixel and the
 * matching Conversions API call (api/_meta-capi.ts) so Meta counts it once.
 * Generate it BEFORE the form POST and pass the same value to both.
 */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // randomUUID needs a secure context; this only runs on http:// hosts,
  // where the pixel is inert anyway.
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Fire a standard event. No-ops when the pixel is not configured.
 *
 * Pass `eventId` for anything also sent server-side -- without it Meta
 * cannot deduplicate, and the conversion is counted twice.
 */
export function track(event: MetaStandardEvent, params?: Record<string, unknown>, eventId?: string): void {
  if (typeof window === "undefined" || !resolvePixelId()) return;
  // Arity matters: passing an explicit `undefined` third argument made
  // fbevents.js classify PageView as a custom event rather than the
  // standard one (Contact, which passes a real params object, classified
  // correctly). Only ever pass the arguments that actually exist.
  if (eventId) window.fbq?.("track", event, params ?? {}, { eventID: eventId });
  else if (params) window.fbq?.("track", event, params);
  else window.fbq?.("track", event);
}

/** Fire a PageView. Called on first paint and on every route change. */
export function trackPageView(): void {
  track("PageView");
}
