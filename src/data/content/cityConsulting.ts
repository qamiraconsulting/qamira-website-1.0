// City landing pages for "business consultant in <city>" searches, one
// content object per city, all rendered by src/pages/CityConsultingPage.tsx:
//   /in/business-consultant-pune          puneConsulting.ts
//   /au/ai-process-consulting-melbourne   melbourneConsulting.ts
//
// Each city needs its own substance (local industries, areas, how delivery
// works there). A page that only swaps the city name is a doorway page and
// does more harm than good, so don't add a city without real local copy.

import { puneConsultingPage } from "@/data/content/puneConsulting";
import { melbourneConsultingPage } from "@/data/content/melbourneConsulting";

type LinkedItem = { title: string; body: string; to: string };

export type CityConsultingPage = {
  path: string;
  /** Catalogue code the CTA adds to the /contact shortlist. */
  serviceCode: string;
  seoTitle: string;
  description: string;
  schema: {
    name: string;
    alternateName: string[];
    serviceType: string;
    areaServed: Record<string, string>[];
  };
  hero: {
    breadcrumbLabel: string;
    eyebrow: string;
    title: string;
    lede: string;
    promiseLine: string;
    photo: { src: string; label: string };
  };
  pain: { eyebrow: string; heading: string; lede: string; points: string[] };
  services: { eyebrow: string; heading: string; lede: string; items: LinkedItem[] };
  industries: { eyebrow: string; heading: string; items: LinkedItem[] };
  areas: { eyebrow: string; heading: string; lede: string; areas: string[] };
  howItWorks: { eyebrow: string; heading: string; steps: { title: string; body: string }[] };
  proof: { eyebrow: string; heading: string; body: string[]; note: string };
  faq: { question: string; answer: string }[];
  cta: { heading: string; body: string };
  secondaryCta: { label: string; to: string };
};

export const cityConsultingPages: CityConsultingPage[] = [puneConsultingPage, melbourneConsultingPage];
