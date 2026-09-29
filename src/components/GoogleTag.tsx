import { useEffect } from "react";
import { initGoogleTag } from "@/lib/googleTag";

/**
 * Loads the Google tag once. Page views on route changes are recorded by
 * GA4's enhanced measurement, not here -- see initGoogleTag.
 *
 * Renders nothing.
 */
export function GoogleTag() {
  useEffect(() => {
    initGoogleTag();
  }, []);

  return null;
}
