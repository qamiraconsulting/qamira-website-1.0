# Qamira Consulting — Web

Premium marketing site for Qamira Consulting. React 18 + Vite + TypeScript +
Tailwind CSS + Framer Motion, built modular and scalable for the AI-powered
features on the roadmap (SSO login, multi-step AI Business Assessment).

## Getting started

Requires Node.js 18+ and npm.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-checks and outputs to dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  components/
    ui/          Design-system primitives (Button, Card, Section, Reveal...)
    brand/       Logo, NeuronField (the cursor-reactive particle network)
    layout/      Header, full-screen NavOverlay, Footer, SkipLink, BackToTop
    sections/    Page-level composed sections (PageHero, home/*)
  data/          Content and config as data, not hardcoded in JSX --
                 navigation.ts, site.ts, content/home.ts -- so copy and
                 future CMS/AI-agent integration don't require touching
                 components
  lib/           Seo.tsx (react-helmet-async wrapper), motion.ts (shared
                 Framer Motion variants/easing)
  pages/         Route-level components. ComingSoon.tsx is a shared
                 placeholder used by every page scoped for a later phase.
```

## Design system

- **Palette:** parchment / white surfaces, charcoal text, brass-gold accent,
  slate teal -- Tailwind tokens in `tailwind.config.ts`. Light-themed
  throughout; no dark section backgrounds anywhere on the site.
- **Type:** Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (labels,
  nav, data) -- self-hosted via `@fontsource/*`, no external font requests.
- **Signature motif:** `NeuronField.tsx`, a canvas-based ambient particle
  network -- soft-drifting nodes connected by faint lines that gather
  toward the cursor within a radius. Used full-bleed in the Hero (fully
  interactive) and at lower density as an ambient background in the CTA
  band and nav overlay (non-interactive). Respects
  `prefers-reduced-motion` by rendering a single static frame.
- **Navigation:** a persistent minimal header (logo + "Menu" toggle) opens a
  full-screen overlay listing every section. This scales cleanly to the
  full ten-page architecture without a cluttered top bar, on both desktop
  and mobile.

## Content grounding

Home page copy (`src/data/content/home.ts`) is grounded in the Qamira
Master Knowledge Base & Business Operating System v1.5: the QBPES™
framework (eight performance domains, seven-stage delivery lifecycle,
three client tiers, the Business First → Technology Last execution
hierarchy). Update that file as the IP library evolves rather than editing
copy inline in components.

## Routing & future pages

`src/App.tsx` already routes all ten planned sections (About, Services,
Industries, Methodology, AI Solutions, Case Studies, Insights, Careers,
Contact, Login) plus `/assessment` for the AI Business Assessment, each
currently rendering `ComingSoon`. Replace a route's element with a real
page component as each phase is built -- navigation, SEO, and the URL
structure won't need to change.

## Accessibility

Skip-to-content link, visible focus rings, `aria-*` throughout the nav
overlay (role="dialog", aria-modal, Escape-to-close, focus returned on
close), semantic headings, and every scroll/entrance animation respects
`prefers-reduced-motion` (see `useReducedMotion` usage in `Reveal.tsx` and
the reduced-motion check in `NeuronField.tsx`).

## SEO

Per-page `<title>`/description/canonical/Open Graph/Twitter tags via the
`Seo` component (`src/lib/Seo.tsx`), `ProfessionalService` JSON-LD on the
homepage, `public/robots.txt`, `public/sitemap.xml`.

Before going live: replace `https://www.qamiraconsulting.com` in
`src/data/site.ts`, `public/robots.txt`, and `public/sitemap.xml` with the
real production domain.

## Deploying to GitHub Pages

This repo builds to static files in `dist/` and needs no server.

1. **Custom domain or `<org>.github.io` root repo:** no changes needed --
   `vite.config.ts` defaults `base` to `/`.
2. **Project page** (`https://<org>.github.io/<repo>/`): build with
   `VITE_BASE_PATH=/<repo>/ npm run build` so asset URLs and the router
   basename resolve correctly. Also update the `content="0; url=/"` redirect
   in `public/404.html` to `url=/<repo>/`.
3. Client-side routing on GitHub Pages: `public/404.html` implements the
   [spa-github-pages](https://github.com/rafgraph/spa-github-pages)
   redirect trick so deep links (e.g. `/methodology`) resolve correctly
   instead of showing GitHub's 404.
4. Push `dist/` to the `gh-pages` branch (or wire up a GitHub Actions
   workflow that runs `npm run build` and deploys `dist/` on push to
   `main`), then enable Pages in the repo's Settings.

## Known follow-ups

- `src/assets/logo/qamira-lockup.png` ("Logo with Details") is unused --
  kept as a source asset for future pages (About, press kit) but not
  currently imported anywhere.
