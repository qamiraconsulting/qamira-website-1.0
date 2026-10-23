// Apollo.io website visitor tracker.
//
// Same shape as metaPixel.ts and googleTag.ts, for the same reasons: loaded
// from a module so it can be gated on host, and guarded on `typeof window`
// because this is still imported during the build-time prerender
// (scripts/prerender.mjs).
//
// What it is for: Apollo matches a visitor's IP address to the company it
// belongs to and lists those companies under Website Visitors in Apollo, so
// a prospect's firm that has been reading the site shows up as a warm lead.
// It identifies companies, not people, for visitors outside the US.

/**
 * The team's tracker ID, from Apollo (Settings > Website Visitors).
 * Hardcoded rather than an env var for the reason given on PIXEL_ID in
 * metaPixel.ts: it is public anyway, and a missing env var would ship a
 * tracker that silently records nothing.
 */
const APP_ID = "6a79ff42e204ef001cc7a211";

/**
 * Only the real site reports, so localhost and Vercel preview traffic never
 * spend the plan's monthly website-visitor credits. Set VITE_APOLLO_APP_ID
 * to override.
 */
const PRODUCTION_HOSTS = ["www.qamiraconsulting.com", "qamiraconsulting.com"];

const OVERRIDE_ID = import.meta.env.VITE_APOLLO_APP_ID as string | undefined;

function resolveAppId(): string | undefined {
  if (OVERRIDE_ID) return OVERRIDE_ID;
  if (typeof window === "undefined") return undefined;
  return PRODUCTION_HOSTS.includes(window.location.hostname) ? APP_ID : undefined;
}

declare global {
  interface Window {
    trackingFunctions?: { onLoad: (options: { appId: string }) => void };
  }
}

let initialised = false;

/** True when this host will actually report. Useful in the console. */
export function apolloTrackerEnabled(): boolean {
  return Boolean(resolveAppId());
}

/**
 * Load Apollo's tracker. Safe to call repeatedly.
 *
 * This is Apollo's own install snippet, unrolled. The random `nocache`
 * query string is theirs too -- it keeps a stale cached copy of the loader
 * from pinning an old tracker version.
 */
export function initApolloTracker(): void {
  const appId = resolveAppId();
  if (initialised || !appId || typeof window === "undefined") return;
  initialised = true;

  const nocache = Math.random().toString(36).substring(7);
  const script = document.createElement("script");
  script.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${nocache}`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    window.trackingFunctions?.onLoad({ appId });
  };
  document.head.appendChild(script);
}
