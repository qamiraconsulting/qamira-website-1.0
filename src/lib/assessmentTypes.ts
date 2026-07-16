// Shared between the Assessment form (src/pages/Assessment.tsx) and the
// Vercel serverless function that generates the report (api/assessment.ts).
// Imported by relative path from api/, not the "@/" alias -- Vercel's
// function bundler runs outside the Vite alias config.
//
// api/assessment.ts must only ever import TYPES from this file, never
// values -- Vercel's function bundler only traces type-only imports out
// of src/ from api/*.ts; a runtime value import 404s in production
// (ERR_MODULE_NOT_FOUND). Any runtime constant needed server-side must be
// hardcoded locally in api/assessment.ts instead.

export const PERFORMANCE_DOMAINS = [
  "Strategy",
  "Financial Performance",
  "Process",
  "People",
  "Data",
  "Technology",
  "Customer",
  "Governance",
] as const;

export const PRIORITY_OUTCOMES = [
  "Profitability",
  "Operational Efficiency",
  "Customer Experience",
  "Sustainable Growth",
] as const;

export const REVENUE_CURRENCIES = ["USD", "INR", "EUR", "GBP", "AED", "Other"] as const;

// Currency-agnostic magnitude bands -- paired with revenueCurrency at
// display and prompt time (e.g. "2M – 10M" + "INR").
export const REVENUE_RANGES = [
  "Under 2M",
  "2M – 10M",
  "10M – 50M",
  "50M – 100M",
  "100M+",
] as const;

export const EMPLOYEE_BANDS = ["1–10", "11–50", "51–200", "201–500", "500+"] as const;

export const YEARS_IN_OPERATION = [
  "Under 2 years",
  "2–5 years",
  "6–10 years",
  "11–20 years",
  "20+ years",
] as const;

export const OWNERSHIP_STRUCTURES = ["Private", "Family-owned", "PE-backed", "VC-backed", "Public"] as const;

export const SYSTEM_COUNT_BANDS = ["1–3", "4–7", "8–15", "16+"] as const;

export const DUPLICATE_DATA_ENTRY_OPTIONS = ["Yes", "No", "Somewhat"] as const;

export type DomainRating = {
  domain: (typeof PERFORMANCE_DOMAINS)[number];
  maturityLevel: 0 | 1 | 2 | 3 | 4 | 5; // 0 = unrated client-side sentinel, never submitted once gated
  note: string;
};

export type AssessmentRequest = {
  companyName: string;
  industry: string;
  revenueCurrency: (typeof REVENUE_CURRENCIES)[number] | "";
  revenueRange: (typeof REVENUE_RANGES)[number] | "";
  employeeCount: (typeof EMPLOYEE_BANDS)[number] | "";
  yearsInOperation: (typeof YEARS_IN_OPERATION)[number] | "";
  ownershipStructure: (typeof OWNERSHIP_STRUCTURES)[number] | "";
  website: string;
  domainRatings: DomainRating[];
  systemCount: (typeof SYSTEM_COUNT_BANDS)[number] | "";
  duplicateDataEntry: (typeof DUPLICATE_DATA_ENTRY_OPTIONS)[number] | "";
  priorities: string[];
  context: string;
  contactName: string;
  contactEmail: string;
  contactRole: string;
  contactPhone: string;
};

export type OpportunityRecommendation = {
  category: "GTM Optimization" | "Customer Churn Prediction" | "Process Automation" | "Analytics & Reporting" | "Other";
  title: string;
  description: string;
  estimatedImpact: string;
};

export type RoadmapPhase = {
  phase: string;
  timeframe: string;
  focus: string;
};

export type DomainSnapshotEntry = {
  domain: (typeof PERFORMANCE_DOMAINS)[number];
  selfRating: 1 | 2 | 3 | 4 | 5;
  comment: string;
};

export type AssessmentReport = {
  summary: string;
  maturitySnapshot: string;
  domainSnapshot: DomainSnapshotEntry[];
  recommendations: OpportunityRecommendation[];
  roadmap: RoadmapPhase[];
  roiEstimate: string;
};
