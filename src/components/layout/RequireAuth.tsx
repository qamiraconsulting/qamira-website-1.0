import type { ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

// Gate for authenticated-only routes (e.g. /portal). Clerk's auth state
// loads asynchronously on first paint, so we hold off deciding until
// isLoaded is true rather than flashing a redirect before Clerk resolves
// an existing session.
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
