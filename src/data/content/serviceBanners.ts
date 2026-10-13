// Home page service banner slides.
//
// One slide per major offering, each set in a different kind of business
// (manufacturing, professional services, clinic, trades, e-commerce, team
// training) so most visitors find a slide that looks like them. Service
// names mirror the titles on /services, /technology and /growth-os.
//
// Images are generated at 1536x1024 (3:2) and stored in
// public/photos/services. Each is composed with the people in the right
// two-thirds and a calm left third, where the slide text overlays on
// desktop. Slides without an image yet render text-only.

export type ServiceBannerImage = {
  src: string;
  alt: string;
};

export type ServiceBannerSlide = {
  id: string;
  // Short name for the slide picker.
  tab: string;
  tag: string;
  headline: string;
  // Who this is for, and what we do about it -- one or two sentences.
  summary: string;
  services: string[];
  cta: { label: string; to: string };
  image?: ServiceBannerImage;
};

export const serviceBannerSlides: ServiceBannerSlide[] = [
  {
    id: "process-performance",
    tab: "Process & Performance",
    tag: "Process & Performance",
    headline: "Make your business run smoother.",
    summary:
      "For teams where work gets stuck, repeated or chased. We find where time leaks out and redesign how the work flows.",
    services: ["Process optimization", "Performance transformation", "Continuous improvement"],
    cta: { label: "Explore our services", to: "/services" },
    image: {
      src: "/photos/services/process-performance.webp",
      alt: "A Qamira consultant maps a simple Order, Make, Check, Ship process on a glass wall with a factory operations manager and a supervisor.",
    },
  },
  {
    id: "growth-marketing",
    tab: "Growth & Marketing",
    tag: "Growth & Marketing",
    headline: "Turn your website into a steady flow of customers.",
    summary:
      "For businesses that need more enquiries, not more ad spend. GrowthOS™ connects your website, CRM and marketing into one system.",
    services: ["GrowthOS™", "Websites", "CRM", "Lead scoring", "AI video & content"],
    cta: { label: "Discover GrowthOS™", to: "/growth-os" },
    image: {
      src: "/photos/services/growth-marketing.webp",
      alt: "Over the shoulder of a tradie checking a new enquiry and an accepted quote on her phone, beside a laptop showing her business website on the tray of her ute.",
    },
  },
  {
    id: "ai-automation",
    tab: "AI & Automation",
    tag: "AI Agents & Automation",
    headline: "Let AI handle the repetitive work.",
    summary:
      "For businesses losing hours to calls, data entry and the same emails. AI agents take it on, while your people check what matters.",
    services: ["AI agents", "AI voice & call answering", "Document extraction", "Workflow automation"],
    cta: { label: "See the technology", to: "/technology" },
    image: {
      src: "/photos/services/ai-automation.webp",
      alt: "A business owner and a colleague review a tablet in a bright office, below a wall screen showing the day's AI agent results: calls answered, invoices processed and emails drafted.",
    },
  },
  {
    id: "custom-software",
    tab: "Custom Software",
    tag: "Custom Software & Chatbots",
    headline: "Software built around how you work.",
    summary:
      "For when off-the-shelf tools don’t fit. We build the app, portal or chatbot your business actually needs.",
    services: ["Custom apps", "AI chatbots", "Customer portals"],
    cta: { label: "See the technology", to: "/technology" },
    image: {
      src: "/photos/services/custom-software.webp",
      alt: "A café owner holds a tablet with her custom catering orders app, beside a laptop where the website's AI chatbot is confirming a lunch booking.",
    },
  },
  {
    id: "data-dashboards",
    tab: "Data & Dashboards",
    tag: "Data & Dashboards",
    headline: "Know your numbers every morning.",
    summary:
      "For owners deciding on gut feel or month-old spreadsheets. We build the dashboards and KPIs that show what’s working and what isn’t.",
    services: ["BI dashboards", "KPI design", "Performance management as a service"],
    cta: { label: "Explore our services", to: "/services" },
    image: {
      src: "/photos/services/data-dashboards.webp",
      alt: "A Qamira consultant points to a wall dashboard of revenue, profit and cash flow while two business colleagues look on.",
    },
  },
  {
    id: "workshops-training",
    tab: "Training",
    tag: "Workshops & Training",
    headline: "Get your team AI-ready.",
    summary:
      "For leaders who want their people confident with AI and data. Practical, hands-on sessions, not lectures.",
    services: ["AI readiness bootcamps", "KPI masterclasses", "Executive workshops"],
    cta: { label: "Explore our services", to: "/services" },
    image: {
      src: "/photos/services/workshops-training.webp",
      alt: "A Qamira consultant leads a hands-on AI Readiness Bootcamp for a group of staff, with a participant raising a hand.",
    },
  },
];
