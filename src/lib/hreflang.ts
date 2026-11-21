import { site } from "@/data/site";
import { inServicePages } from "@/data/content/inServices";
import { auServicePages, ukServicePages, usServicePages } from "@/data/content/intlServices";
import { receptionistPages } from "@/data/content/receptionist";
import type { HreflangLink } from "@/lib/Seo";

// hreflang for the country page sets (/in, /au, /uk, /us).
//
// The country versions of a service are largely the same page, so without
// these links Google tends to pick one and drop the rest. Each set lists
// every version, including the page itself, plus an x-default.
//
// x-default is the UK version: visitors from anywhere without its own page
// (Europe, the UAE and so on) are closest to the UK context, and all the
// copy is written in British English.
//
// Only pages that really are the same offer go in a set. The Pune and
// Melbourne consulting pages are city pages, not translations of each
// other, so they are left out.

type Region = "in" | "au" | "uk" | "us";

const hreflangByRegion: Record<Region, string> = {
  in: "en-IN",
  au: "en-AU",
  uk: "en-GB",
  us: "en-US",
};

/** India uses a different slug for some services. Keyed by the AU/UK/US slug. */
const inSlugFor: Record<string, string> = {
  "custom-software": "custom-software",
  "crm-development": "erp-crm-development",
  "business-automation": "business-automation",
  "website-development": "website-development",
  "ai-chatbot": "ai-chatbot",
};

const has = (pages: { slug: string }[], slug: string) => pages.some((p) => p.slug === slug);

/** Every set, as region -> path. Built from the content, so a removed page drops out. */
const sets: Partial<Record<Region, string>>[] = auServicePages.map(({ slug }) => {
  const set: Partial<Record<Region, string>> = { au: `/au/${slug}` };
  if (has(ukServicePages, slug)) set.uk = `/uk/${slug}`;
  if (has(usServicePages, slug)) set.us = `/us/${slug}`;
  const inSlug = inSlugFor[slug];
  if (inSlug && has(inServicePages, inSlug)) set.in = `/in/${inSlug}`;
  return set;
});

// The AI receptionist pages have their own template and content file.
sets.push(Object.fromEntries(receptionistPages.map((p) => [p.region, p.path])));

/** The hreflang links for `path`, or none if it isn't part of a country set. */
export function hreflangFor(path: string): HreflangLink[] {
  const set = sets.find((s) => Object.values(s).includes(path));
  if (!set || Object.keys(set).length < 2) return [];

  const links: HreflangLink[] = (Object.keys(hreflangByRegion) as Region[])
    .filter((region) => set[region])
    .map((region) => ({ hreflang: hreflangByRegion[region], href: `${site.url}${set[region]}` }));

  const fallback = set.uk ?? set.us ?? set.au;
  if (fallback) links.push({ hreflang: "x-default", href: `${site.url}${fallback}` });
  return links;
}
