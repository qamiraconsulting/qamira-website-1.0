// Home page "gap to fix" banner slides.
//
// Each slide dramatizes one of the illustrative scenarios already published
// on the Case Studies page (content/caseStudies.ts) as a five-stop roadmap:
// two "before" steps, the specific gap that was costing the client, then
// Qamira's fix and the result. Deliberately reuses that existing,
// already-labeled-illustrative copy rather than introducing new claims --
// the `scenarioAnchor` maps each slide to its matching scenario card on
// /case-studies (see the `id` on each card in CaseStudies.tsx) so the
// slide's CTA can deep-link straight to it.

export type FlowIconKey =
  | "file-text"
  | "mail"
  | "alert-triangle"
  | "workflow"
  | "copy"
  | "unlink"
  | "layers"
  | "clipboard-list"
  | "repeat"
  | "cpu"
  | "search"
  | "file-warning"
  | "percent";

export type GapFixNode = {
  label: string;
  icon: FlowIconKey;
};

export type GapFixSlide = {
  tag: string;
  headline: string;
  stat: string;
  steps: [GapFixNode, GapFixNode];
  gap: GapFixNode;
  fix: GapFixNode;
  result: string;
  scenarioAnchor: string;
};

export const gapFixSlides: GapFixSlide[] = [
  {
    tag: "Process Optimization",
    headline: "Cutting a five-day approval into a same-day one.",
    stat: "5 days → 1 day",
    steps: [
      { label: "Request filed", icon: "file-text" },
      { label: "Bounces over email", icon: "mail" },
    ],
    gap: { label: "No clear order", icon: "alert-triangle" },
    fix: { label: "Qamira maps the flow", icon: "workflow" },
    result: "Same-day approval",
    scenarioAnchor: "process-optimization",
  },
  {
    tag: "System Optimization",
    headline: "Retiring five tools that were only ever doing the job of two.",
    stat: "5 tools → 2",
    steps: [
      { label: "Same data typed 3x", icon: "copy" },
      { label: "Tools don’t talk", icon: "unlink" },
    ],
    gap: { label: "Redundant systems", icon: "alert-triangle" },
    fix: { label: "Qamira consolidates", icon: "layers" },
    result: "One source of truth",
    scenarioAnchor: "system-optimization",
  },
  {
    tag: "Automation",
    headline: "Letting AI take over the boring, repetitive work.",
    stat: "Hours back / week",
    steps: [
      { label: "Copying numbers by hand", icon: "clipboard-list" },
      { label: "Same emails, same reports", icon: "repeat" },
    ],
    gap: { label: "Hours lost weekly", icon: "alert-triangle" },
    fix: { label: "Qamira deploys an agent", icon: "cpu" },
    result: "Judgment kept, hours back",
    scenarioAnchor: "automation",
  },
  {
    tag: "Revenue Leakage",
    headline: "Finding the money that was quietly slipping away.",
    stat: "Recovered revenue",
    steps: [
      { label: "Invoices go out wrong", icon: "file-warning" },
      { label: "Discounts unapproved", icon: "percent" },
    ],
    gap: { label: "Leaking quietly", icon: "alert-triangle" },
    fix: { label: "Qamira audits line by line", icon: "search" },
    result: "Monthly leak check",
    scenarioAnchor: "revenue-leakage",
  },
];
