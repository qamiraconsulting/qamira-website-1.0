import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Base path is configurable for GitHub Pages project sites
// (https://<org>.github.io/<repo>/). Leave unset for a user/org root site
// (https://<org>.github.io/) or a custom domain.
const base = process.env.VITE_BASE_PATH ?? "/";

/**
 * Preload the two font files the first screen needs (the heading serif and
 * the body sans), so text paints in the right face without waiting for the
 * stylesheet to be parsed first. The file names are hashed, so they are
 * looked up in the finished bundle rather than written into index.html.
 */
function preloadFonts(names: string[]): Plugin {
  return {
    name: "qamira-preload-fonts",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx) {
        if (!ctx.bundle) return [];
        return Object.keys(ctx.bundle)
          .filter((file) => file.endsWith(".woff2") && names.some((name) => file.includes(name)))
          .map((file) => ({
            tag: "link",
            attrs: { rel: "preload", href: `${base}${file}`, as: "font", type: "font/woff2", crossorigin: "" },
            injectTo: "head" as const,
          }));
      },
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), preloadFonts(["fraunces-latin-500-normal", "ibm-plex-sans-latin-400-normal"])],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    // Deliberately off. A published sourcemap put the full unminified
    // source -- comments included -- on the public origin, and added
    // ~1.8 MB to every deploy. For a firm whose asset is its IP that is
    // not a trade worth making for production debuggability.
    sourcemap: false,
  },
  ssr: {
    // react-helmet-async ships CommonJS, which Node's ESM loader can't
    // take named imports from once Vite leaves it external. Bundling it
    // into the prerender entry lets Vite apply the interop instead.
    noExternal: ["react-helmet-async"],
  },
});
