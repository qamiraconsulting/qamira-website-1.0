import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't reset scroll position on navigation the way a
// traditional multi-page site would, so without this, clicking a link deep
// in the footer leaves a new page rendered but still scrolled to the
// bottom. Scrolls to the top on every route change, or to the matching
// element when the URL carries a hash (e.g. the Home page banner's
// /case-studies#process-optimization deep links).
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    // Explicit "instant" rather than the bare (0, 0) form -- the site sets
    // `scroll-behavior: smooth` globally on <html>, which would otherwise
    // hijack this into a 1-2 second animated scroll from wherever the user
    // was (often the footer) back to the top, instead of a page navigation
    // simply starting at the top the way one normally would.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
