// Industries page copy, adapted from Master Knowledge Base v1.6 section 9
// (Industry Accelerators).
//
// Each industry also carries detail-page content (constraints, prebuilt,
// outcomes, goodFitIf) rendered at /industries/:slug -- see
// IndustryDetail.tsx. The structure deliberately mirrors technology.ts /
// TechnologyDetail.tsx: the index page summarises, the detail page makes
// the accelerator concrete without publishing the toolkit itself.

export const industriesHero = {
  eyebrow: "Where we work",
  title: "The same QBPES™ architecture, pre-built for how your industry actually operates.",
  lede: "An Industry Accelerator is a pre-built QBPES™ variant for a specific vertical -- the same eight domains and eight-step delivery process, pre-populated with the KPIs, process taxonomies, and benchmark ranges that vertical typically needs. A new engagement starts from a mostly complete toolkit, not a blank Discovery.",
};

export type Industry = {
  slug: string;
  group: string;
  title: string;
  /** Three-item focus line shown under the title on the index cards. */
  focus: string;
  body: string;
  /** ~155 chars, for <meta name="description"> on the detail page. */
  metaDescription: string;
  /** The patterns we see repeatedly in this vertical, stated plainly. */
  constraints: string[];
  /** What already exists in the accelerator before Discovery starts --
   * outcome-framed, deliberately not the toolkit itself. */
  prebuilt: string[];
  /** What changes as a result. No invented client metrics. */
  outcomes: string[];
  goodFitIf: string[];
};

export type IndustryGroup = {
  group: string;
  industries: Industry[];
};

export const industryGroups: IndustryGroup[] = [
  {
    group: "Professional Services & Digital",
    industries: [
      {
        slug: "professional-services",
        group: "Professional Services & Digital",
        title: "Professional Services",
        focus: "Utilization and realization, project profitability, WIP to cash",
        body: "Pre-built utilization and project profitability KPI templates for firms that sell time and expertise rather than physical output -- accountancy and audit practices, law firms, recruitment agencies, engineering consultancies, and creative and IT shops. It is also the one accelerator we can validate against our own operating data, because Qamira is itself a professional services firm.",
        metaDescription:
          "QBPES™ Industry Accelerator for professional services -- utilization and realization as a pair, engagement-level profitability, and WIP read as a cash cycle.",
        constraints: [
          "Utilization is measured and reported while realization is not, so a fully-booked team and a team actually collecting its standard rate look identical until the cash lands.",
          "Scope creep on fixed-fee work is absorbed by delivery rather than surfaced as a commercial decision, which turns a margin problem into a retention problem.",
          "Work in progress ages quietly between delivery and invoice, and the firm ends up funding its clients' working capital without ever deciding to.",
          "Proposals, onboarding and approvals all route through the same partners who sell and deliver, which caps how much work the firm can take on.",
        ],
        prebuilt: [
          "Utilization and realization defined as a pair, so the gap between hours worked and rate collected stops being invisible -- and \"non-billable\" stops hiding both the best investments and the worst leakage.",
          "Project profitability definitions connecting delivery effort to realized margin at engagement level, not just at firm level.",
          "A scope-change pattern that routes creep to a priced commercial decision instead of leaving the delivery team to absorb it.",
          "WIP and lock-up read as a cash cycle rather than an accounting artefact, so ageing work surfaces while it can still be billed.",
        ],
        outcomes: [
          "You can see which engagements are actually profitable, and which are busy work that looks like success.",
          "The gap between what you bill and what you collect becomes a number with an owner, not a year-end surprise.",
          "Scope changes become a priced decision rather than a silent margin leak.",
          "Repeat work gets cheaper to deliver, because the second engagement of a kind starts from an asset rather than a blank page.",
        ],
        goodFitIf: [
          "Your team is fully utilized and the margin still is not there.",
          "Scope creep on fixed-fee work is normal, absorbed, and never priced.",
          "Proposals, onboarding and approvals still wait on a partner who is also selling and delivering.",
        ],
      },
      {
        slug: "startups-tech",
        group: "Professional Services & Digital",
        title: "Growing Startups & Tech",
        focus: "Agility mapping, burn-rate optimization",
        body: "An agility mapping template that assesses whether process and governance can survive the next funding round, plus burn-rate optimization models tuned to venture-backed cost structures.",
        metaDescription:
          "QBPES™ Accelerator for growing startups and tech -- agility mapping against the next funding round, plus burn-rate models for venture-backed cost structures.",
        constraints: [
          "The process that got you to this headcount is the same process, and it stopped scaling somewhere around the last two hires.",
          "Burn is tracked as a monthly total rather than by what it buys, so cost decisions are made by percentage cut rather than by priority.",
          "Governance is deliberately light, which is right until a diligence process asks for evidence that was never produced.",
          "Founders remain the escalation path for operational decisions, which caps how fast the company can actually move.",
        ],
        prebuilt: [
          "An agility mapping template that assesses whether current process and governance survive the next stage of growth, not just today's headcount.",
          "Burn-rate optimization models tuned to venture-backed cost structures, framed by what spend buys rather than by department line.",
          "A minimum-viable governance pattern -- enough evidence for diligence, deliberately not enough to slow the company down.",
          "A decision-rights rubric identifying which calls should stop reaching the founders, and what has to be true first.",
        ],
        outcomes: [
          "You know which parts of how you work will break at the next stage, before they break.",
          "Cost decisions are made against priority rather than by trimming a uniform percentage from everything.",
          "Diligence finds evidence that already exists, instead of triggering a scramble to reconstruct it.",
          "Founder time moves off operational escalation and back onto the things only founders can do.",
        ],
        goodFitIf: [
          "Headcount has grown faster than how you work has changed.",
          "You are raising in the next few quarters and want the operating story to hold up.",
          "Everything still routes through one or two people.",
        ],
      },
      {
        slug: "public-sector-education",
        group: "Professional Services & Digital",
        title: "Public Sector & Education",
        focus: "Resource allocation, compliance management",
        body: "Pre-built resource allocation models and a compliance management template suited to public sector and education procurement and reporting requirements.",
        metaDescription:
          "QBPES™ Accelerator for public sector and education -- resource allocation models and a compliance template built for procurement and reporting rules.",
        constraints: [
          "Allocation follows last year's budget line rather than this year's demand, because changing it costs more political capital than it saves.",
          "Reporting obligations are satisfied by producing documents, not by the process producing evidence as it runs.",
          "Procurement rules are treated as a constraint on improvement rather than designed into how improvement is planned.",
          "Improvement initiatives depend on individuals, so they end when those individuals move roles.",
        ],
        prebuilt: [
          "Resource allocation models connecting funding to demand and outcome, so reallocation arguments rest on evidence rather than precedent.",
          "A compliance management template built around the reporting obligations this sector actually carries, rather than a generic control library.",
          "Process designs that respect procurement rules from the outset, so the recommended fix is one you are permitted to implement.",
          "Governance that attaches ownership to roles rather than to individuals, so improvement survives a change of postholder.",
        ],
        outcomes: [
          "Allocation decisions can be defended with evidence, which is what makes reallocation politically survivable.",
          "Reporting becomes a by-product of the work instead of a parallel exercise run alongside it.",
          "Recommendations are implementable within procurement rules, rather than technically correct and practically blocked.",
          "Improvements outlast the people who started them, because ownership sits with a role and a governance forum.",
        ],
        goodFitIf: [
          "Budgets are allocated by precedent and nobody can evidence whether it is still the right split.",
          "Reporting requirements consume capacity that should be going into delivery.",
          "Past improvement programmes faded when their sponsor moved on.",
        ],
      },
    ],
  },  {
    group: "Asset-Heavy Verticals",
    industries: [
      {
        slug: "logistics-supply-chain",
        group: "Asset-Heavy Verticals",
        title: "Logistics & Supply Chain",
        focus: "Fleet utilization, route efficiency, warehouse analytics",
        body: "Pre-built KPI and process templates for fleet utilization, route efficiency, and warehouse throughput, mapped to common logistics sub-processes -- dispatch, last-mile, returns -- for maturity scoring against vertical-specific evidence.",
        metaDescription:
          "QBPES™ Accelerator for logistics and supply chain -- fleet utilization, route efficiency and warehouse throughput templates mapped to real sub-processes.",
        constraints: [
          "Fleet utilization is reported as a single percentage nobody can decompose into idle, deadhead, and revenue-earning time.",
          "Route planning optimises for distance, while the real cost accumulates after the vehicle arrives -- dwell time, failed deliveries, and re-attempts.",
          "Warehouse performance is measured at the dock but not through pick, pack, and returns, so the internal bottleneck stays invisible.",
          "Dispatch, last-mile, and returns run as separate teams against separate targets that pull against each other.",
        ],
        prebuilt: [
          "KPI templates for fleet utilization, route efficiency, and warehouse throughput, each decomposed to the sub-process that actually drives the number.",
          "A logistics process taxonomy covering dispatch, line-haul, last-mile, and returns, mapped as one continuous flow rather than four disconnected functions.",
          "Maturity scoring against vertical-specific evidence, so a claim that the capability already exists is tested against artefacts rather than accepted as an assertion.",
          "Exception-handling patterns for the events -- failed delivery, damage, re-route -- that consume a disproportionate share of cost and management attention.",
        ],
        outcomes: [
          "Utilization becomes a number you can act on, because it separates the time you are paying for from the time you are earning on.",
          "Cost shows up where it is actually incurred -- at dwell, at re-attempt, at returns -- instead of being smeared across a cost-per-km average.",
          "Handoffs between dispatch, line-haul, and last-mile get an owner and a measurement, so nothing sits in the gap between two teams.",
          "Automation is aimed at the exceptions that eat the day, rather than at the routine movements that already run fine.",
        ],
        goodFitIf: [
          "Your cost per delivery is rising and no single report explains why.",
          "Exceptions -- failed deliveries, re-routes, returns -- consume more management time than the core operation.",
          "You have bought a TMS or WMS and the underlying process never changed to match it.",
        ],
      },
      {
        slug: "manufacturing",
        group: "Asset-Heavy Verticals",
        title: "Manufacturing",
        focus: "Operational OEE, supply chain logistics, demand analytics",
        body: "Standard Overall Equipment Effectiveness (OEE) KPI definitions, a supply chain process taxonomy from procurement through fulfillment, and demand forecasting benchmarks by sub-sector -- so your current-state assessment starts against known-good comparison data, not generic benchmarks.",
        metaDescription:
          "QBPES™ Accelerator for manufacturing -- OEE definitions decomposed to loss category, a procurement-to-fulfillment taxonomy, and demand benchmarks by sub-sector.",
        constraints: [
          "OEE is quoted as a single plant-level number, which averages away the specific losses -- changeover, minor stops, quality rework -- that are actually costing you.",
          "Procurement, production, and fulfillment each hold a piece of the same process, and nobody owns the handoffs between them.",
          "Throughput is measured at the line but never reconciled against demand, so overproduction on one SKU hides underproduction on another and the plant hits its numbers while the business misses its orders.",
          "Maintenance runs to a calendar rather than to condition -- you pay for interventions you didn't need and still take the breakdowns you didn't see coming.",
        ],
        prebuilt: [
          "Standard OEE definitions -- availability, performance, quality -- decomposed to loss category, so the number points at a cause instead of just reporting a score.",
          "A supply chain process taxonomy running procurement through fulfillment, with the handoffs between functions already mapped.",
          "Demand forecasting benchmark ranges by sub-sector, so current-state is scored against comparable operations rather than a generic industry average.",
          "Maturity scoring rubrics for planning, scheduling, and maintenance governance, ready to apply against evidence from day one of Discovery.",
        ],
        outcomes: [
          "Discovery starts against known-good comparison data, so the assessment phase is shorter and the findings are harder to argue with.",
          "Losses are attributed to a named cause and a named owner, rather than absorbed into a plant-wide average nobody can act on.",
          "The KPI architecture outlives the engagement, because it is defined once and governed -- not rebuilt from scratch for each month's report.",
          "AI-native execution lands where it earns its keep -- forecasting, scheduling, exception handling -- instead of being spread thin across everything at once.",
        ],
        goodFitIf: [
          "You have plenty of plant data but no agreed definition of what good actually looks like.",
          "Improvement projects keep getting delivered and then quietly decaying back to the old way.",
          "Production and supply chain are optimising against numbers that quietly conflict.",
        ],
      },
      {
        slug: "construction-infrastructure",
        group: "Asset-Heavy Verticals",
        title: "Construction & Infrastructure",
        focus: "Resource management, project drift tracking",
        body: "Built for project-based businesses where the core performance risk is drift -- scope, schedule, and cost variance against baseline -- with standard resource utilization KPIs and a drift-tracking template that plugs directly into governance.",
        metaDescription:
          "QBPES™ Accelerator for construction and infrastructure -- utilization KPIs and a scope, schedule and cost drift-tracking template wired into governance.",
        constraints: [
          "Variance against baseline is discovered at month-end reporting, by which point the decision that caused it is weeks old.",
          "Scope, schedule, and cost are tracked in three different systems by three different people, so nobody sees drift compounding across all three.",
          "Resource utilization is estimated from timesheets filled in retrospectively, which makes the number directionally right and operationally useless.",
          "Lessons from the last project live in a closeout document nobody reads before starting the next one.",
        ],
        prebuilt: [
          "Standard resource utilization KPI definitions for project-based delivery, built around the difference between capacity you are selling and capacity you are merely carrying.",
          "A drift-tracking template that reads scope, schedule, and cost variance as one connected signal rather than three separate reports.",
          "Governance hooks so drift surfaces at the forum that can actually decide something, at the point where a decision still changes the outcome.",
          "A project maturity rubric covering estimation, change control, and closeout -- the three stages where drift is most often manufactured.",
        ],
        outcomes: [
          "Drift is visible while it is still small, because it is tracked continuously against baseline instead of reconstructed at month-end.",
          "Change control becomes a decision with an owner rather than an argument settled after the fact.",
          "Utilization reflects capacity you can actually deploy, which makes bidding and resourcing decisions less speculative.",
          "Closeout produces something reusable -- an estimating input for the next project, not a document filed and forgotten.",
        ],
        goodFitIf: [
          "Projects that look fine at the gate reviews still land over budget.",
          "You are bidding from estimates nobody has reconciled against how the last ten jobs actually ran.",
          "Change orders are a source of conflict rather than a controlled process.",
        ],
      },
    ],
  },
  {
    group: "Consumer & Service Verticals",
    industries: [
      {
        slug: "retail-ecommerce",
        group: "Consumer & Service Verticals",
        title: "Retail & E-Commerce",
        focus: "CAC/LTV models, inventory turns, customer journey",
        body: "Pre-built customer acquisition cost and lifetime value modeling, inventory turn benchmarks by category, and a standard customer journey map -- giving your engagement a head start on the KPI architecture that matters most to margin and growth decisions.",
        metaDescription:
          "QBPES™ Industry Accelerator for retail and e-commerce -- pre-built CAC/LTV modeling, inventory turn benchmarks by category, and a standard customer journey map.",
        constraints: [
          "Acquisition cost is measured per channel while lifetime value is measured in aggregate, so channel spend is judged on what a customer costs and never on what they turn out to be worth.",
          "Inventory turns are reported across the whole catalogue, which lets fast-moving lines subsidise dead stock indefinitely.",
          "The customer journey is owned in pieces -- marketing, site, fulfillment, support -- and the breaks happen exactly at the seams.",
          "Discounting is used to hit revenue targets without a model showing what it costs in margin and in future full-price behaviour.",
        ],
        prebuilt: [
          "CAC and LTV models built to be read against each other cohort by cohort and channel by channel, rather than reported as two unrelated headline figures.",
          "Inventory turn benchmarks segmented by category, so slow lines are identified instead of hidden inside a blended average.",
          "A standard customer journey map with the points where customers most commonly fall out already identified.",
          "A contribution-margin view that makes the real cost of promotional activity visible before the promotion runs, not after.",
        ],
        outcomes: [
          "Channel spend is judged on the customers it actually produces, not on the leads it reports.",
          "Dead stock surfaces early enough to act on, while markdown is still a choice rather than a write-off.",
          "The journey has named owners at every seam, so drop-off has somewhere to be resolved.",
          "AI-native execution goes where volume makes it pay -- forecasting, merchandising, first-line service -- instead of being deployed as a demo.",
        ],
        goodFitIf: [
          "Revenue is growing while margin is flat or falling.",
          "You can report CAC and LTV but cannot confidently connect them.",
          "Stock decisions are made on instinct because the data arrives too late to be useful.",
        ],
      },
      {
        slug: "healthcare",
        group: "Consumer & Service Verticals",
        title: "Healthcare",
        focus: "Patient flow and length of stay, cost per encounter, resource allocation",
        body: "Pre-built patient flow process maps, case-mix adjusted cost-per-encounter benchmarking, and resource allocation models tuned to healthcare's real staffing and licensing constraints -- with the regulatory regimes that apply to your operation identified at intake, not checked at the end.",
        metaDescription:
          "QBPES™ Accelerator for healthcare -- patient flow and length-of-stay maps, case-mix adjusted cost-per-encounter benchmarking, and real staffing constraints.",
        constraints: [
          "Patient flow is managed department by department, so the queue simply moves to whichever step has the least slack and length of stay barely shifts.",
          "Cost is understood at the facility level but not per encounter and never adjusted for case mix, so a routine consult and a complex admission land in the same average.",
          "Rostering is built around availability rather than demand pattern, producing simultaneous overtime and idle capacity.",
          "Compliance is treated as a periodic audit exercise rather than something the process itself is designed to satisfy.",
        ],
        prebuilt: [
          "Patient flow process maps covering the full encounter, with the handoffs where length of stay actually accumulates already identified.",
          "Cost-per-encounter benchmarking adjusted for case mix, so service-line performance can be compared rather than debated.",
          "Resource allocation models built around healthcare's real staffing and licensing constraints, not a generic workforce template.",
          "The regulatory regimes that apply to your operation identified at intake and designed into the process, rather than checked at the end.",
        ],
        outcomes: [
          "Bottlenecks are addressed where they actually form, instead of being pushed into the next department's queue.",
          "Service-line decisions rest on cost you can defend per encounter, not on facility-level allocation.",
          "Rosters follow demand pattern, which reduces the overtime-and-idle-capacity pairing that shows up in most schedules.",
          "Audit readiness stops being a project, because the evidence is produced by the process rather than assembled for the auditor.",
        ],
        goodFitIf: [
          "Wait times are a persistent complaint and every fix seems to move the queue somewhere else.",
          "You cannot state what an encounter costs by service line with confidence.",
          "Compliance work spikes before every audit and then goes quiet.",
        ],
      },
      {
        slug: "financial-services",
        group: "Consumer & Service Verticals",
        title: "Financial Services",
        focus: "Risk architecture, operational throughput, executive reporting",
        body: "Pre-built risk architecture templates, operational throughput KPIs for transaction-heavy processes, and executive reporting formats built for financial services' typically heavier governance expectations.",
        metaDescription:
          "QBPES™ Accelerator for financial services -- risk architecture templates, throughput KPIs for transaction-heavy processes, and governance-grade reporting.",
        constraints: [
          "Risk is documented in a register updated for the committee rather than used to run the business between meetings.",
          "Throughput is measured as volume processed, which says nothing about rework, exceptions, or how much of that volume had to be touched twice.",
          "Controls accumulate over years without anyone retiring the ones that were superseded, so cost rises while assurance does not.",
          "Executive reporting is assembled manually each cycle, which makes it expensive, late, and inconsistent between periods.",
        ],
        prebuilt: [
          "Risk architecture templates connecting risk, control, and process, so every control has a named process to sit in and a named owner.",
          "Operational throughput KPIs for transaction-heavy processes, separating clean straight-through volume from rework and exception handling.",
          "Executive reporting formats built to the heavier governance expectations this sector carries, defined once rather than rebuilt each cycle.",
          "A maturity rubric for first-line controls, so the assessment distinguishes controls that operate from controls that merely exist on paper.",
        ],
        outcomes: [
          "The risk register becomes an operating instrument rather than a committee artefact.",
          "Straight-through processing is separated from rework, which is usually where the recoverable cost turns out to be.",
          "Reporting is produced by the system rather than assembled by people, so it arrives earlier and says the same thing each period.",
          "Automation is applied to the controls and reconciliations that are genuinely repetitive, under governance rather than around it.",
        ],
        goodFitIf: [
          "Control cost keeps rising without a matching rise in assurance.",
          "Month-end reporting consumes senior capacity that should be spent on decisions.",
          "Exception handling is a permanent workaround rather than an exception.",
        ],
      },
    ],
  },
];

/** Flat list, for routing, prerendering, and slug lookups. */
export const allIndustries: Industry[] = industryGroups.flatMap((g) => g.industries);
