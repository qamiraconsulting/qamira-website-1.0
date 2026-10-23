import { useEffect } from "react";
import { initApolloTracker } from "@/lib/apolloTracker";

/**
 * Loads Apollo's website visitor tracker once. Route changes need no code
 * of our own: the tracker watches history changes itself.
 *
 * Renders nothing.
 */
export function ApolloTracker() {
  useEffect(() => {
    initApolloTracker();
  }, []);

  return null;
}
