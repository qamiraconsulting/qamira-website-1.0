import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, matchRoutes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App, { allPages, pageRoutes } from "@/App";
import "@/index.css";

// Load the current page's chunk before the first render, so the
// prerendered HTML is replaced by the same page rather than a blank
// loading state (see lib/lazyPage.tsx).
const match = matchRoutes(pageRoutes, window.location.pathname, import.meta.env.BASE_URL);
const current = match ? pageRoutes.find((r) => r.path === match[match.length - 1].route.path) : undefined;

function render() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>,
  );
}

(current ? current.page.preload() : Promise.resolve()).then(render, render);

// Once the page has loaded and the browser is idle, fetch the other pages
// in the background so moving around the site doesn't wait on the network.
window.addEventListener("load", () => {
  const prefetch = () => allPages.forEach((page) => void page.preload().catch(() => {}));
  if ("requestIdleCallback" in window) window.requestIdleCallback(prefetch, { timeout: 5000 });
  else setTimeout(prefetch, 3000);
});
