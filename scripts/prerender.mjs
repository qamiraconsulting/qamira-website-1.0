// Post-build static prerendering.
//
// This site is a 100%-client-side React SPA (Vite + react-router-dom).
// Crawlers that don't execute JavaScript -- which reportedly includes many
// AI-answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot), even where
// Googlebot itself generally does -- would otherwise see nothing but the
// empty `<div id="root">` shell in dist/index.html.
//
// This script serves the built `dist/` output with Vite's own preview
// server (which already does SPA history-fallback to index.html for every
// route), visits every real route with a headless Chromium via Puppeteer,
// waits for the page to fully render (including react-helmet-async's
// per-page <title>/meta/JSON-LD, which mutate document.head after mount),
// and writes the resulting live DOM back to disk as that route's
// index.html.
//
// This intentionally does NOT switch the app to hydrateRoot -- main.tsx
// still calls createRoot(...).render(...), so the client JS simply
// replaces the prerendered markup with a fresh client render on load.
// There's a brief visible "swap" for a real visitor, but zero hydration-
// mismatch risk, which matters far more given this is a retrofit onto an
// existing, unaudited-for-SSR-safety component tree (Framer Motion,
// canvas, matchMedia, etc.) rather than an app built for SSR from the
// start.
//
// IMPORTANT: this step is best-effort, not required for a working
// deployment. Vercel's build container doesn't reliably support launching
// a real Chromium (missing OS-level shared libraries headless Chrome
// needs, which a static build image was never meant to provide) -- if
// Puppeteer can't launch here, this script logs a warning and exits 0
// rather than failing the build. The site is a fully working SPA without
// this step; losing prerendering costs some crawlability for JS-less
// crawlers, but must never cost a deployment.

import { preview } from "vite";
import puppeteer from "puppeteer";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

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

// `server` and `browser` are tracked here (not local to main()) so the
// top-level catch below can always tear them down, on any failure at any
// point -- an unclosed preview server keeps the Node process alive
// indefinitely, which would turn a Chromium-launch failure into a hung
// build (timing out) instead of a fast, harmless skip.
let server;
let browser;

async function main() {
  server = await preview({ preview: { port: 4173, strictPort: false } });
  const baseUrl = server.resolvedUrls.local[0];
  console.log(`[prerender] preview server at ${baseUrl}`);

  browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Discover article and technology-solution routes from their rendered
  // listing pages themselves, rather than importing the TS content files
  // into this plain Node script -- this also means the crawl list never
  // drifts out of sync with real content.
  await page.goto(new URL("/insights", baseUrl).toString(), { waitUntil: "networkidle0", timeout: 30000 });
  const articleHrefs = await page.$$eval('a[href^="/insights/"]', (as) => as.map((a) => new URL(a.href).pathname));

  await page.goto(new URL("/technology", baseUrl).toString(), { waitUntil: "networkidle0", timeout: 30000 });
  const technologyHrefs = await page.$$eval('a[href^="/technology/"]', (as) => as.map((a) => new URL(a.href).pathname));

  const routes = [...staticRoutes, ...new Set([...articleHrefs, ...technologyHrefs])];
  console.log(`[prerender] discovered ${articleHrefs.length} article route(s), ${technologyHrefs.length} technology-solution route(s)`);

  for (const route of routes) {
    const target = new URL(route, baseUrl).toString();
    await page.goto(target, { waitUntil: "networkidle0", timeout: 30000 });
    // A short settle window for any deferred client-side rendering
    // (Framer Motion viewport reveals, Helmet head mutations) to finish.
    await new Promise((resolve) => setTimeout(resolve, 300));

    const html = await page.content();
    const outDir = route === "/" ? "dist" : path.join("dist", route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html, "utf-8");
    console.log(`[prerender] ${route} -> ${path.join(outDir, "index.html")}`);
  }

  console.log(`[prerender] done: ${routes.length} routes`);
}

async function cleanup() {
  if (browser) {
    await browser.close().catch(() => {});
  }
  if (server?.httpServer) {
    await new Promise((resolve) => server.httpServer.close(resolve));
  }
}

main()
  .catch((err) => {
    // Deliberately non-fatal: this is an SEO enhancement on top of a
    // working SPA, not a build requirement. A hosting environment that
    // can't launch Chromium (e.g. Vercel's build container) should still
    // ship the site.
    console.warn("[prerender] skipped -- could not complete prerendering, deploying without it.");
    console.warn(`[prerender] reason: ${err.message}`);
  })
  .finally(async () => {
    await cleanup();
    // Explicit exit (rather than letting the event loop drain naturally)
    // guarantees the process ends even if something -- an open browser
    // connection, a lingering server socket -- would otherwise keep it
    // alive, which matters far more in a CI/build context than locally.
    process.exit(0);
  });
