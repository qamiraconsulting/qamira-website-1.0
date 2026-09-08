import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path is configurable for GitHub Pages project sites
// (https://<org>.github.io/<repo>/). Leave unset for a user/org root site
// (https://<org>.github.io/) or a custom domain.
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
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
