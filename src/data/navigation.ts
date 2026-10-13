export type NavItem = {
  label: string;
  path: string;
};

export type NavGroupItem = NavItem & {
  description: string;
};

// A top-level entry in the desktop header nav: either a direct link or a
// dropdown grouping related pages.
export type NavEntry = { label: string; path: string } | { label: string; items: NavGroupItem[] };

// Desktop header nav (lg+), spread across the full header width. Every
// routed page is reachable from here; Home is the logo, and the AI
// Business Assessment also has its own header button.
export const mainNav: NavEntry[] = [
  {
    label: "Services",
    items: [
      { label: "All services", path: "/services", description: "Consulting, managed services and workshops" },
      { label: "GrowthOS™", path: "/growth-os", description: "Our AI-powered growth operating system" },
      { label: "AI Solutions", path: "/ai-solutions", description: "How we apply AI, with people in control" },
      { label: "AI Business Assessment", path: "/assessment", description: "8 quick questions, an instant report" },
    ],
  },
  { label: "Technology", path: "/technology" },
  { label: "Industries", path: "/industries" },
  { label: "Methodology", path: "/methodology" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Insights", path: "/insights" },
  {
    label: "Company",
    items: [
      { label: "About us", path: "/about", description: "Who we are and how we work" },
      { label: "Careers", path: "/careers", description: "Join the team" },
      { label: "Contact", path: "/contact", description: "Talk to a consultant" },
    ],
  },
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
    { label: "Technology", path: "/technology" },
    { label: "Industries", path: "/industries" },
    { label: "GrowthOS", path: "/growth-os" },
    { label: "AI Solutions", path: "/ai-solutions" },
    { label: "AI Business Assessment", path: "/assessment" },
    { label: "Insights", path: "/insights" },
  ],
} satisfies Record<string, NavItem[]>;
