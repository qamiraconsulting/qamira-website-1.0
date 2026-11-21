import { lazy, type ComponentType } from "react";

// Route-level code splitting that stays safe for the prerendered HTML.
//
// A plain React.lazy page renders its Suspense fallback until its chunk
// arrives. That breaks two things here:
//   1. The build-time prerender (renderToString) would write the fallback,
//      not the page, into every route's HTML.
//   2. main.tsx uses createRoot, not hydrateRoot, so the first client
//      render replaces the prerendered markup -- with a blank fallback,
//      for as long as the chunk takes to load.
//
// lazyPage() returns a component with a preload() method. Once preloaded
// it renders the real page synchronously, with no Suspense step at all.
// The prerender preloads every page before rendering (entry-server's
// preloadAllPages), and main.tsx preloads the current route's page before
// the first render, so neither ever sees a fallback. Only later in-app
// navigation to a page that hasn't loaded yet suspends, and main.tsx
// prefetches every page once the browser is idle to keep even that rare.

export type LazyPage<P extends object = object> = ComponentType<P> & { preload: () => Promise<void> };

export function lazyPage<P extends object>(load: () => Promise<ComponentType<P>>): LazyPage<P> {
  let Loaded: ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;

  const preload = () => {
    pending ??= load().then((component) => {
      Loaded = component;
    });
    return pending;
  };

  const Lazy = lazy(async () => {
    await preload();
    return { default: Loaded as ComponentType<P> };
  });
  // Typed loosely here only: React.lazy's prop types don't line up with a
  // generic P, though the props passed through are exactly the page's own.
  const LazyAny = Lazy as unknown as ComponentType<P>;

  const Page = (props: P) => (Loaded ? <Loaded {...props} /> : <LazyAny {...props} />);
  return Object.assign(Page, { preload });
}
