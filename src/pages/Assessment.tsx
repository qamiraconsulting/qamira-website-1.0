import { useState } from "react";
import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  PERFORMANCE_DOMAINS,
  PRIORITY_OUTCOMES,
  REVENUE_RANGES,
  type AssessmentRequest,
  type AssessmentReport,
} from "@/lib/assessmentTypes";

const TOTAL_STEPS = 4;

const emptyForm: AssessmentRequest = {
  companyName: "",
  industry: "",
  revenueRange: "",
  frictionDomains: [],
  priorities: [],
  context: "",
  contactName: "",
  contactEmail: "",
};

const inputClass =
  "w-full border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal transition-colors focus:border-brass focus:outline-none";
const labelClass = "font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim";

function toggle(list: string[], value: string, max?: number): string[] {
  if (list.includes(value)) return list.filter((v) => v !== value);
  if (max && list.length >= max) return list;
  return [...list, value];
}

export function Assessment() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<AssessmentRequest>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [report, setReport] = useState<AssessmentReport | null>(null);

  const canProceed =
    (step === 0 && form.companyName.trim().length > 0) ||
    (step === 1 && form.frictionDomains.length > 0) ||
    (step === 2 && form.priorities.length > 0) ||
    step === 3;

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
        lede="Four short steps. We'll tell you plainly where the highest-leverage AI opportunity in your business likely sits -- a starting point for a real conversation, not a substitute for one."
        breadcrumbLabel="AI Business Assessment"
      />

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
                  <p className={labelClass}>Step 1 of 4 — About your business</p>
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
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <p className={labelClass}>Step 2 of 4 — Where's the friction?</p>
                  <p className="text-sm text-charcoal-dim">Select every domain where performance feels off. No wrong answers.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {PERFORMANCE_DOMAINS.map((domain) => (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => setForm({ ...form, frictionDomains: toggle(form.frictionDomains, domain) })}
                        className={`border px-4 py-3 text-left text-sm transition-colors ${
                          form.frictionDomains.includes(domain)
                            ? "border-brass bg-brass/10 text-charcoal"
                            : "border-charcoal/20 text-charcoal-dim hover:border-charcoal/40"
                        }`}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <p className={labelClass}>Step 3 of 4 — What matters most right now?</p>
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

              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <p className={labelClass}>Step 4 of 4 — Where should we send it?</p>
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
                    <label className={labelClass} htmlFor="contactEmail">Email</label>
                    <input
                      id="contactEmail"
                      type="email"
                      className={inputClass}
                      value={form.contactEmail}
                      onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    />
                  </div>
                  {status === "error" && (
                    <p className="font-mono text-sm text-[#b5573e]" role="alert">{errorMessage}</p>
                  )}
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
                  onClick={submit}
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
