export type NavItem = {
  label: string;
  path: string;
};

// Primary nav -- every path has a routed page. Login/Client Portal is
// rendered directly in Footer.tsx and NavOverlay.tsx (auth-state-aware via
// Clerk's <SignedIn>/<SignedOut>), not listed here.
export const primaryNav: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Industries", path: "/industries" },
  { label: "Methodology", path: "/methodology" },
  { label: "AI Solutions", path: "/ai-solutions" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Insights", path: "/insights" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

export const footerNav = {
  firm: [
    { label: "About", path: "/about" },
    { label: "Methodology", path: "/methodology" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "Careers", path: "/careers" },
  ],
  work: [
    { label: "Services", path: "/services" },
    { label: "Industries", path: "/industries" },
    { label: "AI Solutions", path: "/ai-solutions" },
    { label: "AI Business Assessment", path: "/assessment" },
    { label: "Insights", path: "/insights" },
  ],
} satisfies Record<string, NavItem[]>;
