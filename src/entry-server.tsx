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
import App, { allPages } from "@/App";
import { articles } from "@/data/content/insights";
import { allIndustries } from "@/data/content/industries";
import { openJobs } from "@/data/content/jobs";
import { inServicePages } from "@/data/content/inServices";
import { auServicePages, ukServicePages, usServicePages } from "@/data/content/intlServices";
import { cityConsultingPages } from "@/data/content/cityConsulting";
import { receptionistPages } from "@/data/content/receptionist";
import { puneConsultingPage } from "@/data/content/puneConsulting";
import { melbourneConsultingPage } from "@/data/content/melbourneConsulting";
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
  "/advisory/qbpes-assessment",
  "/au/google-business-profile",
];

/**
 * Every route to prerender, derived from the same content modules the app
 * itself renders from -- so the crawl list can never drift out of sync
 * with the published articles, industry accelerators, and technology
 * offerings.
 */
export const routes: string[] = [
  ...staticRoutes,
  ...articles.map((a) => `/insights/${a.slug}`),
  ...allIndustries.map((i) => `/industries/${i.slug}`),
  ...openJobs.map((j) => `/careers/${j.slug}`),
  ...inServicePages.map((p) => `/in/${p.slug}`),
  ...auServicePages.map((p) => `/au/${p.slug}`),
  ...ukServicePages.map((p) => `/uk/${p.slug}`),
  ...usServicePages.map((p) => `/us/${p.slug}`),
  ...cityConsultingPages.map((p) => p.path),
  ...receptionistPages.map((p) => p.path),
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
 * Last-modified dates for the articles, which carry a real publication
 * date. Every other route gets its <lastmod> from git instead -- see
 * routeSources below and scripts/prerender.mjs.
 */
export const lastModified: Record<string, string> = Object.fromEntries(
  articles.map((a) => [`/insights/${a.slug}`, a.dateModified ?? a.datePublished]),
);

const P = "src/pages/";
const C = "src/data/content/";

/**
 * The source files that make up each route's content: its page component
 * and the content module it renders. The prerender step asks git when any
 * of them last changed and uses that as the route's <lastmod>, so the date
 * moves only when the page's own content does, not on every deploy.
 *
 * Shared chrome (header, footer, Seo) is deliberately left out: a footer
 * tweak is not a change to every page. Pages that share one content file
 * (all the industry pages, say) share a date, which errs towards "changed"
 * but is never invented.
 */
const staticRouteSources: Record<string, string[]> = {
  "/": [`${P}Home.tsx`, "src/components/sections/home", `${C}home.ts`],
  "/about": [`${P}About.tsx`, `${C}about.ts`],
  "/services": [`${P}Services.tsx`, `${C}services.ts`, `${C}serviceCatalogue.ts`, "src/components/sections/ServiceNavigator.tsx"],
  "/technology": [`${P}Technology.tsx`, `${C}technology.ts`],
  "/industries": [`${P}Industries.tsx`, `${C}industries.ts`],
  "/methodology": [`${P}Methodology.tsx`, `${C}methodology.ts`, `${C}process.ts`],
  "/growth-os": [`${P}GrowthOS.tsx`, `${C}growthOS.ts`],
  "/ai-solutions": [`${P}AISolutions.tsx`, `${C}aiSolutions.ts`],
  "/assessment": [`${P}Assessment.tsx`],
  "/case-studies": [`${P}CaseStudies.tsx`, `${C}caseStudies.ts`],
  "/insights": [`${P}Insights.tsx`, `${C}insights.ts`],
  "/careers": [`${P}Careers.tsx`, `${C}careers.ts`, `${C}jobs.ts`],
  "/contact": [`${P}Contact.tsx`],
  "/privacy": [`${P}Privacy.tsx`, `${C}privacy.ts`],
  "/advisory/qbpes-assessment": [`${P}AdvisoryAssessment.tsx`, `${C}advisoryAssessment.ts`, `${C}methodology.ts`],
  "/au/ai-receptionist": [`${P}AiReceptionistPage.tsx`, `${C}auReceptionist.ts`, `${C}receptionist.ts`],
  "/uk/ai-receptionist": [`${P}AiReceptionistPage.tsx`, `${C}receptionist.ts`],
  "/us/ai-receptionist": [`${P}AiReceptionistPage.tsx`, `${C}receptionist.ts`],
  "/au/google-business-profile": [`${P}AuGoogleBusinessProfile.tsx`, `${C}auGoogleBusinessProfile.ts`],
  [puneConsultingPage.path]: [`${P}CityConsultingPage.tsx`, `${C}puneConsulting.ts`],
  [melbourneConsultingPage.path]: [`${P}CityConsultingPage.tsx`, `${C}melbourneConsulting.ts`],
};

/** Route -> source files, for every route without a date in lastModified. */
export const routeSources: Record<string, string[]> = Object.fromEntries(
  routes
    .filter((route) => !(route in lastModified))
    .map((route): [string, string[]] => {
      if (staticRouteSources[route]) return [route, staticRouteSources[route]];
      if (route.startsWith("/industries/")) return [route, [`${P}IndustryDetail.tsx`, `${C}industries.ts`]];
      if (route.startsWith("/careers/")) return [route, [`${P}JobDetail.tsx`, `${C}jobs.ts`]];
      if (route.startsWith("/technology/")) return [route, [`${P}TechnologyDetail.tsx`, `${C}technology.ts`]];
      if (route.startsWith("/in/")) return [route, [`${P}InServicePage.tsx`, `${C}inServices.ts`]];
      if (/^\/(au|uk|us)\//.test(route)) return [route, [`${P}InServicePage.tsx`, `${C}intlServices.ts`]];
      return [route, []];
    }),
);

/**
 * Load every page chunk before rendering, so renderToString writes the
 * real page into each route's HTML rather than a loading state. Called
 * once by scripts/prerender.mjs.
 */
export async function preloadAllPages(): Promise<void> {
  await Promise.all(allPages.map((page) => page.preload()));
}

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
