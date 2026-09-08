// Server entry used only by the build-time prerender (scripts/prerender.mjs).
//
// The site ships as a 100%-client-side SPA -- main.tsx still calls
// createRoot(...).render(...), never hydrateRoot -- so nothing here runs in
// a browser and nothing here has to stay in sync with client state. This
// module exists purely so the build can produce real HTML for each route
// instead of shipping an empty `<div id="root">` shell to crawlers that
// don't execute JavaScript (GPTBot, ClaudeBot, PerplexityBot and friends,
// plus every link-preview unfurler on LinkedIn, WhatsApp and Slack).
//
// This replaces an earlier Puppeteer-based prerender that could not launch
// Chromium inside Vercel's build container and, being deliberately
// non-fatal, skipped silently on every deploy. renderToString needs no
// browser at all, which is also why the step is now allowed to fail the
// build: a failure here is a code bug, not an environment limitation.
//
// Why SSR is safe for this component tree even though it was never audited
// for it: every DOM-touching call in the app (canvas getContext,
// matchMedia, ResizeObserver, window.scrollY) lives inside useEffect, and
// effects never run during renderToString.

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "@/App";
import { articles } from "@/data/content/insights";
import { customerFacingAI, contentAndGrowthSystems, internalAutomation } from "@/data/content/technology";

const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/technology",
  "/industries",
  "/methodology",
  "/growth-os",
  "/ai-solutions",
  "/assessment",
  "/case-studies",
  "/insights",
  "/careers",
  "/contact",
  "/privacy",
];

/**
 * Every route to prerender, derived from the same content modules the app
 * itself renders from -- so the crawl list can never drift out of sync
 * with the published articles and technology offerings.
 */
export const routes: string[] = [
  ...staticRoutes,
  ...articles.map((a) => `/insights/${a.slug}`),
  ...[...customerFacingAI, ...contentAndGrowthSystems, ...internalAutomation].map((o) => `/technology/${o.slug}`),
];

/**
 * Rendered separately to dist/404.html, which Vercel serves with a real
 * 404 status for any path that doesn't match a file. Hitting App's `*`
 * route, so it produces the same branded NotFound page the client router
 * shows.
 */
export const notFoundRoute = "/404";

/**
 * Real last-modified dates, for the routes that genuinely have one.
 *
 * Only the articles carry a true publication date, so only they get a
 * <lastmod>. The hand-maintained sitemap this replaces stamped every URL
 * with the same 2026-07-30 and then drifted out of date as pages shipped
 * -- and a uniform or stale lastmod is discounted rather than trusted, so
 * omitting it is strictly better than inventing one.
 */
export const lastModified: Record<string, string> = Object.fromEntries(
  articles.map((a) => [`/insights/${a.slug}`, a.datePublished]),
);

export type RenderResult = {
  /** The rendered app markup, to be placed inside `<div id="root">`. */
  body: string;
  /** Serialized <title>, <meta>, <link> and JSON-LD <script> tags. */
  head: string;
};

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const body = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter basename={import.meta.env.BASE_URL} location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );

  const { helmet } = helmetContext;
  const head = helmet
    ? [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString(), helmet.script.toString()]
        .filter(Boolean)
        .join("\n    ")
    : "";

  return { body, head };
}
