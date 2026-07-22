import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessFlow } from "@/components/brand/ProcessFlow";
import {
  PERFORMANCE_DOMAINS,
  PRIORITY_OUTCOMES,
  REVENUE_CURRENCIES,
  REVENUE_RANGES,
  EMPLOYEE_BANDS,
  YEARS_IN_OPERATION,
  OWNERSHIP_STRUCTURES,
  SYSTEM_COUNT_BANDS,
  DUPLICATE_DATA_ENTRY_OPTIONS,
  type AssessmentRequest,
  type AssessmentReport,
} from "@/lib/assessmentTypes";

const TOTAL_STEPS = 5;

// Mirrors the domains published on the Methodology page
// (src/data/content/methodology.ts) -- duplicated here rather than
// imported since this is a display-only lookup local to the form. The
// question is the same one shown on /methodology; explanation and example
// are additional context specific to this form.
const DOMAIN_DETAILS: Record<(typeof PERFORMANCE_DOMAINS)[number], { question: string; explanation: string; example: string }> = {
  Strategy: {
    question: "Are objectives and priorities clear and shared?",
    explanation: "Whether the business has clear, agreed goals that guide day-to-day decisions -- not just a plan that lives in a slide deck.",
    example: "e.g. leadership and frontline managers would give the same answer if asked what the company's top priority is this quarter.",
  },
  "Financial Performance": {
    question: "Is profitability and cost visible and explainable?",
    explanation: "Whether you can see where money is actually made and lost, and explain why margins move the way they do.",
    example: "e.g. you can say exactly why one customer or product line is more profitable than another -- not just that it is.",
  },
  Process: {
    question: "Are workflows designed deliberately, or accumulated by accident?",
    explanation: "How consistently the same task gets done, regardless of who's doing it.",
    example: "e.g. two staff handling the same type of order follow the same steps, in the same order, every time.",
  },
  People: {
    question: "Does the organization have the skills, culture, and capacity the strategy requires?",
    explanation: "Whether the team has the right skills, workload, and clarity of ownership to actually execute on the plan.",
    example: "e.g. everyone knows who owns a decision, and nobody is the single point of failure for a critical task.",
  },
  Data: {
    question: "Is information trustworthy, timely, and unified?",
    explanation: "Whether everyone in the business is working from the same numbers, updated often enough to be useful.",
    example: "e.g. finance, sales, and operations would report the same revenue figure for the same month without reconciling first.",
  },
  Technology: {
    question: "Do systems serve the business, or fragment it?",
    explanation: "Whether your software tools actually support how the business works, or force people to work around them.",
    example: "e.g. a piece of information is entered once and flows to every system that needs it, rather than being re-typed by hand.",
  },
  Customer: {
    question: "Is the client experience understood end-to-end?",
    explanation: "Whether you have real visibility into what customers experience at each stage, not just at the point of sale.",
    example: "e.g. you'd know today which customers are at risk of leaving, before they actually cancel.",
  },
  Governance: {
    question: "Are decisions, metrics, and reviews owned and enforced?",
    explanation: "Whether there's a clear owner for key metrics and decisions, and a regular rhythm for reviewing them.",
    example: "e.g. there's a standing meeting where the same numbers get reviewed every month, by someone accountable for them.",
  },
};

// Mirrors methodology.ts's maturityLevels (same titles and descriptions
// shown on /methodology) -- numeric levels here since form state and the
// AI schema both need 1-5 ints, not the "01".."05" display codes.
const MATURITY_LEVELS: { level: 1 | 2 | 3 | 4 | 5; title: string; body: string }[] = [
  { level: 1, title: "Ad Hoc", body: "Undocumented, dependent on individuals." },
  { level: 2, title: "Emerging", body: "Some structure exists but is inconsistently applied." },
  { level: 3, title: "Defined", body: "Documented and standardized, not yet measured." },
  { level: 4, title: "Managed", body: "Measured against KPIs with regular review." },
  { level: 5, title: "Optimized", body: "Actively improved using data and, increasingly, AI." },
];

const MATURITY_TITLES: Record<number, string> = { 1: "Ad Hoc", 2: "Emerging", 3: "Defined", 4: "Managed", 5: "Optimized" };

const TRUST_STEPS = [
  {
    step: "01",
    title: "You answer",
    icon: "SlidersHorizontal",
    body: "Eight quick domain ratings plus a few details about your business -- five minutes, no account required.",
  },
  {
    step: "02",
    title: "Sent securely",
    icon: "Lock",
    body: "Your answers travel over an encrypted connection straight to our assessment engine -- nothing sits in transit.",
  },
  {
    step: "03",
    title: "Analyzed instantly",
    icon: "Cpu",
    body: "Our AI reasons through your answers against the QBPES™ framework and drafts your report in seconds.",
  },
  {
    step: "04",
    title: "Kept for you, not shared",
    icon: "FileCheck2",
    body: "We only retain your submission if you continue into a consultation with us. It's never shared with third parties or used to train any AI model -- only used for your own ongoing engagement.",
  },
] as const;

const emptyForm: AssessmentRequest = {
  companyName: "",
  industry: "",
  revenueCurrency: "",
  revenueRange: "",
  employeeCount: "",
  yearsInOperation: "",
  ownershipStructure: "",
  website: "",
  domainRatings: PERFORMANCE_DOMAINS.map((domain) => ({ domain, maturityLevel: 0 as const, note: "" })),
  systemCount: "",
  duplicateDataEntry: "",
  priorities: [],
  context: "",
  contactName: "",
  contactEmail: "",
  contactRole: "",
  contactPhone: "",
};

const inputClass =
  "w-full border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal transition-colors focus:border-brass focus:outline-none";
const labelClass = "font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim";

function toggle(list: string[], value: string, max?: number): string[] {
  if (list.includes(value)) return list.filter((v) => v !== value);
  if (max && list.length >= max) return list;
  return [...list, value];
}

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function Assessment() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<AssessmentRequest>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [report, setReport] = useState<AssessmentReport | null>(null);

  function setDomainRating(domain: (typeof PERFORMANCE_DOMAINS)[number], level: 1 | 2 | 3 | 4 | 5) {
    setForm({
      ...form,
      domainRatings: form.domainRatings.map((d) => (d.domain === domain ? { ...d, maturityLevel: level } : d)),
    });
  }

  function setDomainNote(domain: (typeof PERFORMANCE_DOMAINS)[number], note: string) {
    setForm({
      ...form,
      domainRatings: form.domainRatings.map((d) => (d.domain === domain ? { ...d, note } : d)),
    });
  }

  const canProceed =
    (step === 0 && form.companyName.trim().length > 0) ||
    (step === 1 &&
      form.domainRatings.every((d) => d.maturityLevel > 0 && (d.maturityLevel >= 3 || d.note.trim().length > 0))) ||
    step === 2 ||
    (step === 3 && form.priorities.length > 0) ||
    step === 4;

  async function handleSubmit() {
    if (!EMAIL_PATTERN.test(form.contactEmail.trim())) {
      setErrorMessage("Enter a valid email address, e.g. name@company.com.");
      setStatus("error");
      return;
    }
    await submit();
  }

  async function submit() {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setReport(data.report);
      setStatus("idle");
    } catch {
      setErrorMessage("Something went wrong reaching the assessment service. Please try again.");
      setStatus("error");
    }
  }

  if (report) {
    return <ReportView report={report} companyName={form.companyName} />;
  }

  return (
    <>
      <Seo
        title="AI Business Assessment"
        path="/assessment"
        description="A multi-step assessment generating your personalized AI Opportunity Report -- GTM optimization, churn prediction, process automation, analytics, and a roadmap."
      />
      <PageHero
        eyebrow="Diagnose your performance"
        title="Get your AI Opportunity Report."
        lede="Five short steps. We'll tell you plainly where the highest-leverage AI opportunity in your business likely sits -- a starting point for a real conversation, not a substitute for one."
        breadcrumbLabel="AI Business Assessment"
      />

      <Container className="pt-10">
        <p className="mx-auto max-w-[42rem] text-center text-sm text-charcoal-dim">
          Prefer to just talk it through?{" "}
          <Link to="/contact" className="text-brass hover:text-brass-bright">
            Start a conversation
          </Link>{" "}
          with a consultant directly instead.
        </p>
      </Container>

      <Section tone="surface" bordered>
        <Container>
          <p className="text-center font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">
            How your data is handled
          </p>
          <div className="mt-8">
            <ProcessFlow steps={TRUST_STEPS} variant="compact" />
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="mx-auto max-w-[42rem]">
            <div className="mb-10 flex items-center gap-2" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={TOTAL_STEPS}>
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div key={i} className={`h-1 flex-1 ${i <= step ? "bg-brass" : "bg-charcoal/10"}`} />
              ))}
            </div>

            <Reveal key={step}>
              {step === 0 && (
                <div className="flex flex-col gap-5">
                  <p className={labelClass}>Step 1 of 5 — About your business</p>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="companyName">Company name</label>
                    <input
                      id="companyName"
                      className={inputClass}
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="industry">Industry</label>
                    <input
                      id="industry"
                      className={inputClass}
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                      placeholder="e.g. Manufacturing, Retail, Professional Services"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className={labelClass} htmlFor="revenueCurrency">Currency</label>
                      <select
                        id="revenueCurrency"
                        className={inputClass}
                        value={form.revenueCurrency}
                        onChange={(e) => setForm({ ...form, revenueCurrency: e.target.value as AssessmentRequest["revenueCurrency"] })}
                      >
                        <option value="">Select currency</option>
                        {REVENUE_CURRENCIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass} htmlFor="revenueRange">Revenue range</label>
                      <select
                        id="revenueRange"
                        className={inputClass}
                        value={form.revenueRange}
                        onChange={(e) => setForm({ ...form, revenueRange: e.target.value as AssessmentRequest["revenueRange"] })}
                      >
                        <option value="">Select a range</option>
                        {REVENUE_RANGES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass} htmlFor="employeeCount">Employee count</label>
                      <select
                        id="employeeCount"
                        className={inputClass}
                        value={form.employeeCount}
                        onChange={(e) => setForm({ ...form, employeeCount: e.target.value as AssessmentRequest["employeeCount"] })}
                      >
                        <option value="">Select a range</option>
                        {EMPLOYEE_BANDS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass} htmlFor="yearsInOperation">Years in operation</label>
                      <select
                        id="yearsInOperation"
                        className={inputClass}
                        value={form.yearsInOperation}
                        onChange={(e) => setForm({ ...form, yearsInOperation: e.target.value as AssessmentRequest["yearsInOperation"] })}
                      >
                        <option value="">Select a range</option>
                        {YEARS_IN_OPERATION.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass} htmlFor="ownershipStructure">Ownership structure</label>
                      <select
                        id="ownershipStructure"
                        className={inputClass}
                        value={form.ownershipStructure}
                        onChange={(e) => setForm({ ...form, ownershipStructure: e.target.value as AssessmentRequest["ownershipStructure"] })}
                      >
                        <option value="">Select one</option>
                        {OWNERSHIP_STRUCTURES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="website">Company website (optional)</label>
                    <input
                      id="website"
                      className={inputClass}
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="e.g. www.yourcompany.com"
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <p className={labelClass}>Step 2 of 5 — Domain checkup</p>
                    <p className="text-sm text-charcoal-dim">
                      Rate where the business stands today across our eight performance domains -- the same
                      framework behind our methodology. No wrong answers.
                    </p>
                  </div>

                  <div className="border border-charcoal/10 bg-parchment-2 p-5">
                    <p className={labelClass}>The scale, in plain terms</p>
                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-5">
                      {MATURITY_LEVELS.map((level) => (
                        <div key={level.level}>
                          <span className="font-mono text-xs text-brass">{level.level}. {level.title}</span>
                          <p className="mt-1 text-xs text-charcoal-dim">{level.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    {PERFORMANCE_DOMAINS.map((domain) => {
                      const rating = form.domainRatings.find((d) => d.domain === domain)!;
                      const noteRequired = rating.maturityLevel > 0 && rating.maturityLevel <= 2;
                      const details = DOMAIN_DETAILS[domain];
                      return (
                        <div key={domain} className="border border-charcoal/10 p-5">
                          <h4 className="text-charcoal">{domain}</h4>
                          <p className="mt-1 text-sm text-charcoal-dim">{details.question}</p>
                          <p className="mt-1.5 text-xs text-charcoal-dim/80">
                            {details.explanation} {details.example}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {MATURITY_LEVELS.map((level) => (
                              <button
                                key={level.level}
                                type="button"
                                title={level.body}
                                onClick={() => setDomainRating(domain, level.level)}
                                className={`border px-3 py-2 font-mono text-xs uppercase tracking-[0.04em] transition-colors ${
                                  rating.maturityLevel === level.level
                                    ? "border-brass bg-brass/10 text-charcoal"
                                    : "border-charcoal/20 text-charcoal-dim hover:border-charcoal/40"
                                }`}
                              >
                                {level.level}. {level.title}
                              </button>
                            ))}
                          </div>
                          <div className="mt-3 flex flex-col gap-1.5">
                            <label className={labelClass} htmlFor={`note-${domain}`}>
                              What's driving that? {noteRequired ? "(required)" : "(optional)"}
                            </label>
                            <input
                              id={`note-${domain}`}
                              className={inputClass}
                              value={rating.note}
                              onChange={(e) => setDomainNote(domain, e.target.value)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <p className={labelClass}>Step 3 of 5 — Systems & tools</p>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="systemCount">
                      Roughly how many core software systems does the business run on?
                    </label>
                    <p className="text-xs text-charcoal-dim">
                      e.g. CRM, accounting software, inventory system, email marketing tool, HR platform -- count the
                      ones your team uses regularly, not every app anyone has ever opened.
                    </p>
                    <select
                      id="systemCount"
                      className={inputClass}
                      value={form.systemCount}
                      onChange={(e) => setForm({ ...form, systemCount: e.target.value as AssessmentRequest["systemCount"] })}
                    >
                      <option value="">Select a range</option>
                      {SYSTEM_COUNT_BANDS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="duplicateDataEntry">
                      Do different teams often re-enter the same data into multiple systems?
                    </label>
                    <p className="text-xs text-charcoal-dim">
                      e.g. a sales rep enters a new customer in the CRM, then someone in finance re-types the same
                      details into the invoicing system.
                    </p>
                    <select
                      id="duplicateDataEntry"
                      className={inputClass}
                      value={form.duplicateDataEntry}
                      onChange={(e) => setForm({ ...form, duplicateDataEntry: e.target.value as AssessmentRequest["duplicateDataEntry"] })}
                    >
                      <option value="">Select an answer</option>
                      {DUPLICATE_DATA_ENTRY_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <p className={labelClass}>Step 4 of 5 — What matters most right now?</p>
                  <p className="text-sm text-charcoal-dim">Pick up to two priority outcomes.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {PRIORITY_OUTCOMES.map((priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => setForm({ ...form, priorities: toggle(form.priorities, priority, 2) })}
                        className={`border px-4 py-3 text-left text-sm transition-colors ${
                          form.priorities.includes(priority)
                            ? "border-brass bg-brass/10 text-charcoal"
                            : "border-charcoal/20 text-charcoal-dim hover:border-charcoal/40"
                        }`}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    <label className={labelClass} htmlFor="context">Anything else worth knowing? (optional)</label>
                    <textarea
                      id="context"
                      rows={4}
                      className={inputClass}
                      value={form.context}
                      onChange={(e) => setForm({ ...form, context: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col gap-5">
                  <p className={labelClass}>Step 5 of 5 — Where should we send it?</p>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className={labelClass} htmlFor="contactName">Your name</label>
                      <input
                        id="contactName"
                        className={inputClass}
                        value={form.contactName}
                        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass} htmlFor="contactRole">Your role (optional)</label>
                      <input
                        id="contactRole"
                        className={inputClass}
                        value={form.contactRole}
                        onChange={(e) => setForm({ ...form, contactRole: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className={labelClass} htmlFor="contactEmail">Email</label>
                      <input
                        id="contactEmail"
                        type="email"
                        required
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Enter a valid email address, e.g. name@company.com"
                        className={inputClass}
                        value={form.contactEmail}
                        onChange={(e) => {
                          setForm({ ...form, contactEmail: e.target.value });
                          if (status === "error") {
                            setStatus("idle");
                            setErrorMessage("");
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelClass} htmlFor="contactPhone">Phone (optional)</label>
                      <input
                        id="contactPhone"
                        type="tel"
                        className={inputClass}
                        value={form.contactPhone}
                        onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                      />
                    </div>
                  </div>
                  {status === "error" && (
                    <p className="font-mono text-sm text-[#b5573e]" role="alert">{errorMessage}</p>
                  )}
                  <p className="text-xs text-charcoal-dim">
                    Note: only one assessment attempt is allowed per person. For further assistance, please{" "}
                    <Link to="/contact" className="text-brass hover:text-brass-bright">
                      contact us
                    </Link>
                    .
                  </p>
                </div>
              )}
            </Reveal>

            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={`font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim hover:text-charcoal ${step === 0 ? "invisible" : ""}`}
              >
                Back
              </button>

              {step < TOTAL_STEPS - 1 ? (
                <Button onClick={() => canProceed && setStep((s) => s + 1)} className={!canProceed ? "pointer-events-none opacity-40" : ""}>
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className={!form.contactEmail || status === "submitting" ? "pointer-events-none opacity-40" : ""}
                >
                  {status === "submitting" ? "Generating report..." : "Generate my report"}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ReportView({ report, companyName }: { report: AssessmentReport; companyName: string }) {
  return (
    <>
      <Seo title="Your AI Opportunity Report" path="/assessment" description="Your personalized AI Opportunity Report from Qamira." />
      <PageHero
        eyebrow="Your AI Opportunity Report"
        title={`Here's where the leverage is for ${companyName}.`}
        lede={report.summary}
        breadcrumbLabel="AI Business Assessment"
      />

      <Section tone="white">
        <Container>
          <Reveal className="max-w-[46rem]">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-brass">Maturity snapshot</span>
            <p className="mt-3 text-charcoal-dim">{report.maturitySnapshot}</p>
          </Reveal>

          <div className="mt-10 flex flex-col">
            {report.domainSnapshot.map((entry, i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-2 border-t border-charcoal/10 py-6 last:border-b sm:grid-cols-[200px_1fr] sm:gap-8"
              >
                <div>
                  <span className="font-mono text-xs tracking-[0.04em] text-brass">
                    {entry.selfRating}/5 — {MATURITY_TITLES[entry.selfRating]}
                  </span>
                  <h3 className="mt-1 text-charcoal">{entry.domain}</h3>
                </div>
                <p className="text-sm text-charcoal-dim">{entry.comment}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <h2 className="text-charcoal">Recommendations</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {report.recommendations.map((rec, i) => (
              <div key={i} className="flex h-full flex-col border border-charcoal/10 bg-white p-8">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-brass">{rec.category}</span>
                <h3 className="mt-3 text-charcoal">{rec.title}</h3>
                <p className="mt-3 flex-1 text-sm text-charcoal-dim">{rec.description}</p>
                <p className="mt-4 border-t border-charcoal/10 pt-4 text-sm font-medium text-charcoal">{rec.estimatedImpact}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <h2 className="text-charcoal">Implementation roadmap</h2>
          <div className="mt-10 flex flex-col">
            {report.roadmap.map((phase, i) => (
              <div key={i} className="grid grid-cols-1 gap-2 border-t border-charcoal/10 py-8 last:border-b sm:grid-cols-[160px_1fr] sm:gap-8">
                <div>
                  <span className="font-mono text-xs tracking-[0.04em] text-brass">{phase.timeframe}</span>
                  <h3 className="mt-1 text-charcoal">{phase.phase}</h3>
                </div>
                <p className="text-sm text-charcoal-dim">{phase.focus}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[46rem]">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-brass">Directional ROI estimate</span>
            <p className="mx-auto mt-4 max-w-[65ch] text-charcoal-dim">{report.roiEstimate}</p>
            <p className="mx-auto mt-3 max-w-[65ch] text-xs italic text-charcoal-dim/70">
              This report is a preliminary, self-assessed starting point -- not a completed diagnostic engagement.
              Figures are directional, not guaranteed.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Discuss this with a consultant</Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
