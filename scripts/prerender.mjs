// Post-build static prerendering.
//
// Renders every real route to HTML with react-dom/server and writes the
// result into the client build as that route's index.html, so crawlers
// that don't execute JavaScript get the page's actual content, title,
// description and JSON-LD instead of an empty `<div id="root">` shell.
//
// This runs after two Vite builds (see package.json):
//   1. `vite build`                       -> dist/        (the client SPA)
//   2. `vite build --ssr src/entry-server.tsx --outDir dist-ssr`
//
// The app is NOT switched to hydrateRoot -- main.tsx still calls
// createRoot(...).render(...), so the client simply replaces this markup
// with a fresh client render on load. That means zero hydration-mismatch
// risk on a component tree that was never audited for SSR safety, which
// matters more here than saving one render pass.
//
// Unlike the Puppeteer-based version this replaces, nothing here depends
// on the build environment being able to launch a browser, so a failure
// is a real bug and is allowed to fail the build rather than skipping
// silently and shipping an empty shell.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIST = path.resolve("dist");
const SITE_URL = "https://www.qamiraconsulting.com";
const SSR_ENTRY = path.resolve("dist-ssr/entry-server.js");

/**
 * Strip the static <title> and <meta name="description"> that index.html
 * carries for the un-prerendered SPA case, so Helmet's per-page versions
 * don't end up duplicated alongside them.
 */
function stripStaticHead(template) {
  return template
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n?/, "")
    .replace(/[ \t]*<meta\s+name="description"[\s\S]*?\/>\r?\n?/, "");
}

/**
 * Reveal/RevealGroup use Framer Motion's `initial="hidden"` with
 * `whileInView`, which serializes to `opacity:0` inline styles because
 * IntersectionObserver never fires during renderToString. Text in an
 * opacity-0 element is still extracted by text-only crawlers, but a
 * crawler that renders CSS can treat it as hidden content -- so strip
 * exactly Framer Motion's hidden-variant signature and let the elements
 * sit visible at rest.
 *
 * This only changes what a non-JS visitor sees: main.tsx calls createRoot
 * (never hydrateRoot), so the client re-renders the whole tree from
 * scratch and the real scroll animations run untouched.
 */
function unhideRevealVariants(body) {
  return body.replace(/ style="opacity:0;transform:translateY\(\d+px\)"/g, "");
}

function buildPage(template, { body, head }) {
  return stripStaticHead(template)
    .replace("</head>", `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${unhideRevealVariants(body)}</div>`);
}

/**
 * Build sitemap.xml from the same route list that was just prerendered,
 * so the two can never disagree. The previous sitemap lived in public/
 * and was maintained by hand, which is why it had already drifted.
 *
 * <priority> is deliberately omitted -- Google has ignored it for years,
 * and a signal nobody reads is just a second thing to keep in sync.
 */
function buildSitemap(routes, lastModified) {
  const urls = routes
    .map((route) => {
      const loc = `${SITE_URL}${route === "/" ? "/" : route}`;
      const lastmod = lastModified[route];
      return `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  const template = await readFile(path.join(DIST, "index.html"), "utf-8");

  if (!template.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div> to render into');
  }

  const { render, routes, notFoundRoute, lastModified } = await import(pathToFileURL(SSR_ENTRY).href);
  console.log(`[prerender] ${routes.length} routes`);

  const write = async (route, outFile) => {
    const { body, head } = render(route);

    if (!body.trim()) {
      throw new Error(`${route} rendered empty markup`);
    }

    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, buildPage(template, { body, head }), "utf-8");
    console.log(`[prerender] ${route} -> ${path.relative(process.cwd(), outFile)}`);
  };

  for (const route of routes) {
    await write(route, path.join(route === "/" ? DIST : path.join(DIST, route), "index.html"));
  }

  // Vercel serves dist/404.html with a 404 status for any unmatched path.
  // Every real route above is now a real file, so nothing legitimate
  // reaches this -- which is why vercel.json no longer rewrites unknown
  // paths to index.html (that returned the home page, with a 200, for
  // every typo and dead link).
  await write(notFoundRoute, path.join(DIST, "404.html"));

  await writeFile(path.join(DIST, "sitemap.xml"), buildSitemap(routes, lastModified), "utf-8");
  console.log(`[prerender] sitemap.xml -> ${routes.length} urls`);

  console.log(`[prerender] done: ${routes.length} routes + 404.html`);
}

main().catch((err) => {
  console.error("[prerender] FAILED -- the site would ship an empty shell to crawlers, so this fails the build.");
  console.error(err);
  process.exit(1);
});
