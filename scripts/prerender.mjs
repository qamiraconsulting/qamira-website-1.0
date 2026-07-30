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
  "/ai-solutions",
  "/assessment",
  "/case-studies",
  "/insights",
  "/careers",
  "/contact",
  "/privacy",
];

async function main() {
  const server = await preview({ preview: { port: 4173, strictPort: false } });
  const baseUrl = server.resolvedUrls.local[0];
  console.log(`[prerender] preview server at ${baseUrl}`);

  const browser = await puppeteer.launch();
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

  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
  console.log(`[prerender] done: ${routes.length} routes`);
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
