// Shared between the Assessment form (src/pages/Assessment.tsx) and the
// Vercel serverless function that generates the report (api/assessment.ts).
// Imported by relative path from api/, not the "@/" alias -- Vercel's
// function bundler runs outside the Vite alias config.

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

export const REVENUE_RANGES = [
  "Under $2M",
  "$2M – $10M",
  "$10M – $50M",
  "$50M – $100M",
  "$100M+",
] as const;

export type AssessmentRequest = {
  companyName: string;
  industry: string;
  revenueRange: (typeof REVENUE_RANGES)[number] | "";
  frictionDomains: string[];
  priorities: string[];
  context: string;
  contactName: string;
  contactEmail: string;
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

export type AssessmentReport = {
  summary: string;
  maturitySnapshot: string;
  recommendations: OpportunityRecommendation[];
  roadmap: RoadmapPhase[];
  roiEstimate: string;
};
