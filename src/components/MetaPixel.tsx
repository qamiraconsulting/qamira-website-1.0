import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initMetaPixel, trackPageView } from "@/lib/metaPixel";

/**
 * Drives the Meta Pixel's page-view tracking.
 *
 * The site is a client-side SPA, so the browser only ever performs one
 * real document load. Every subsequent navigation is a React Router state
 * change that the pixel cannot see by itself -- without this, Meta would
 * attribute the entire session to whichever page the visitor happened to
 * land on, and every ad reporting a landing-page breakdown would be wrong.
 *
 * Renders nothing. Must live inside the router (it uses useLocation).
 */
export function MetaPixel() {
  const { pathname, search } = useLocation();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    const url = pathname + search;
    // Guards against React 18 StrictMode double-invoking effects in dev,
    // which would otherwise double-count the first page view.
    if (lastTracked.current === url) return;
    lastTracked.current = url;
    trackPageView();
  }, [pathname, search]);

  return null;
}
