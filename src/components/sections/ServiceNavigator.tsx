import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ShortlistBar } from "@/components/sections/ShortlistBar";
import { serviceIcons } from "@/components/brand/serviceIcons";
import { useShortlist } from "@/lib/shortlist";
import {
  catalogue,
  catalogueByCode,
  detailPaths,
  families,
  familyOf,
  problems,
  stages,
  type CatalogueService,
  type FamilyKey,
  type StageId,
} from "@/data/content/serviceCatalogue";

type Group = { key: string; tag: string; title: string; services: CatalogueService[] };

const stepLabelClass = "font-mono text-xs uppercase tracking-[0.12em] text-brass-dim";

// In the unfiltered view each family shows this many cards until expanded.
const PREVIEW_PER_FAMILY = 3;

// Problem-first entry to the full catalogue. A visitor picks the problem that
// sounds like their week and sees the services that fix it, laid out along
// the Start free -> Diagnose -> Build -> Run path; or picks a stage to browse
// it. With nothing picked, every family shows its first few services. The
// rest are hidden with CSS rather than left unrendered, so the prerendered
// HTML still carries all 45 for crawlers.
export function ServiceNavigator() {
  const [problemId, setProblemId] = useState<string | null>(null);
  const [stageId, setStageId] = useState<StageId | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const shortlist = useShortlist();
  const resultsRef = useRef<HTMLDivElement>(null);

  const problem = problems.find((p) => p.id === problemId) ?? null;
  const browsingAll = !problem && !stageId;

  function toggleFamily(key: string) {
    setExpanded((cur) => (cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]));
  }

  // On a phone the results sit several screens below the buttons, so bring
  // them into view; on desktop they're usually already visible, so leave the
  // page where it is.
  function revealResults() {
    requestAnimationFrame(() => {
      const el = resultsRef.current;
      if (el && el.getBoundingClientRect().top > window.innerHeight * 0.7) {
        el.scrollIntoView({ block: "start" });
      }
    });
  }

  function pickProblem(id: string) {
    const turningOff = id === problemId;
    setStageId(null);
    setProblemId(turningOff ? null : id);
    if (!turningOff) revealResults();
  }

  function pickStage(id: StageId) {
    const turningOff = id === stageId;
    setProblemId(null);
    setStageId(turningOff ? null : id);
    if (!turningOff) revealResults();
  }

  function showAll() {
    setProblemId(null);
    setStageId(null);
  }

  let groups: Group[];
  let eyebrow: string;
  let title: string;
  let summary: string;

  if (problem) {
    groups = stages
      .map((s) => ({
        key: s.id,
        tag: s.step,
        title: s.name,
        services: problem.codes.map((c) => catalogueByCode[c]).filter((svc) => svc.stage === s.id),
      }))
      .filter((g) => g.services.length > 0);
    eyebrow = "What we'd do about it";
    title = `“${problem.label}”`;
    summary = `${problem.codes.length} services, in the order we'd usually run them.`;
  } else {
    const pool = stageId ? catalogue.filter((s) => s.stage === stageId) : catalogue;
    groups = (Object.keys(families) as FamilyKey[])
      .map((k) => ({
        key: k,
        tag: `QC-${k}00`,
        title: families[k].name,
        services: pool.filter((s) => familyOf(s.code) === k),
      }))
      .filter((g) => g.services.length > 0);
    const stage = stages.find((s) => s.id === stageId);
    eyebrow = stage ? "Browsing one stage" : "The full catalogue";
    title = stage ? `${stage.name} · ${pool.length} services` : `All ${catalogue.length} services`;
    summary = stage
      ? "Grouped by service family."
      : "Seven families, from free starting points to training your team.";
  }

  return (
    <Section tone="white" id="find-a-service">
      <Container>
        <Reveal className="max-w-[46rem]">
          <Eyebrow>Find the right service</Eyebrow>
          <h2 className="mt-4 text-charcoal">Start with what's slowing you down.</h2>
          <p className="mt-4 text-lg text-charcoal-dim">
            Pick the problem that sounds most like your week. We'll show the services that fix it, in the order
            we'd usually run them. Shortlist what fits and send it to us as one enquiry.
          </p>
        </Reveal>

        <div className="mt-12">
          <p className={stepLabelClass}>01 · What's slowing you down?</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, i) => {
              const on = p.id === problemId;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pickProblem(p.id)}
                  className={clsx(
                    "flex min-h-[76px] items-start gap-3.5 rounded-sm border px-5 py-4 text-left transition-colors duration-200 ease-signature",
                    on
                      ? "border-navy bg-navy text-parchment"
                      : "border-charcoal/10 bg-white text-charcoal hover:border-brass",
                  )}
                >
                  <span className={clsx("pt-0.5 font-mono text-xs", on ? "text-brass-bright" : "text-brass-dim")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium leading-snug">{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <p className={stepLabelClass}>02 · The path we take with you</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s) => {
              const on = s.id === stageId;
              const total = catalogue.filter((svc) => svc.stage === s.id).length;
              const matched = problem
                ? problem.codes.filter((c) => catalogueByCode[c].stage === s.id).length
                : 0;
              const lit = on || matched > 0;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pickStage(s.id)}
                  className={clsx(
                    "flex min-h-[132px] flex-col gap-1.5 rounded-sm border border-t-[3px] border-charcoal/10 px-5 pb-5 pt-4 text-left transition-colors duration-200 ease-signature hover:bg-parchment-2",
                    lit ? "border-t-brass" : "border-t-charcoal/10",
                    on ? "bg-parchment-2" : "bg-white",
                  )}
                >
                  <span className={stepLabelClass}>{s.step}</span>
                  <span className="font-display text-[22px] font-medium text-charcoal">{s.name}</span>
                  <span className="text-sm leading-relaxed text-charcoal-dim">{s.blurb}</span>
                  <span
                    className={clsx(
                      "mt-auto pt-1 font-mono text-xs",
                      problem && !matched ? "text-charcoal-dim" : "text-slate-teal",
                    )}
                  >
                    {problem ? (matched ? `${matched} for this problem` : "Not needed here") : `${total} services`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={resultsRef} className="mt-16 scroll-mt-28">
          <p className={stepLabelClass}>03 · {eyebrow}</p>
          <h3 className="mt-3 text-charcoal">{title}</h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
            <p className="text-charcoal-dim" aria-live="polite">
              {summary}
            </p>
            {(problem || stageId) && (
              <button
                type="button"
                onClick={showAll}
                className="py-2 font-medium text-brass-dim underline underline-offset-4 hover:text-charcoal"
              >
                Browse all {catalogue.length} services
              </button>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-12">
            {groups.map((g) => (
              <div key={g.key}>
                <div className="flex items-baseline gap-3 border-b border-charcoal/10 pb-2.5">
                  <span className={stepLabelClass}>{g.tag}</span>
                  <h4 className="text-charcoal">{g.title}</h4>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {g.services.map((svc, i) => (
                    <ServiceCard
                      key={svc.code}
                      service={svc}
                      hidden={browsingAll && !expanded.includes(g.key) && i >= PREVIEW_PER_FAMILY}
                      shortlisted={shortlist.has(svc.code)}
                      onToggle={() => shortlist.toggle(svc.code)}
                    />
                  ))}
                </div>
                {browsingAll && g.services.length > PREVIEW_PER_FAMILY && (
                  <button
                    type="button"
                    aria-expanded={expanded.includes(g.key)}
                    onClick={() => toggleFamily(g.key)}
                    className="mt-4 py-2 text-sm font-medium text-brass-dim underline underline-offset-4 hover:text-charcoal"
                  >
                    {expanded.includes(g.key) ? "Show fewer" : `Show all ${g.services.length} services`}
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-[70ch] text-sm text-charcoal-dim">
            We don't list prices because they depend on scope and market. Every fee is agreed on a short scoping
            call before anything is committed, and workshop fees are credited in full against any project started
            within 60 days.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border border-charcoal/10 bg-parchment-2 px-6 py-6">
            <div className="max-w-[36rem]">
              <p className="font-display text-xl font-medium text-charcoal">None of these sound quite right?</p>
              <p className="mt-1.5 text-charcoal-dim">
                Take the free AI Business Assessment. It takes about 15 minutes and returns an opportunity report
                that points to the services worth looking at.
              </p>
            </div>
            <Link
              to="/assessment"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-navy px-5 font-mono text-xs uppercase tracking-[0.08em] text-navy transition-colors hover:border-brass hover:text-brass-dim"
            >
              Take the assessment
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
      <ShortlistBar />
    </Section>
  );
}

function ServiceCard({
  service,
  hidden = false,
  shortlisted,
  onToggle,
}: {
  service: CatalogueService;
  hidden?: boolean;
  shortlisted: boolean;
  onToggle: () => void;
}) {
  const Icon = serviceIcons[service.code];
  const detail = detailPaths[service.code];
  // The assessment is self-serve, so it gets a link rather than a place on
  // the shortlist.
  const selfServe = service.code === "QC-001";

  return (
    <article
      className={clsx(
        hidden ? "hidden" : "flex",
        "group h-full flex-col gap-3 border bg-white p-6 transition-all duration-200 ease-signature hover:-translate-y-1 hover:shadow-card",
        shortlisted ? "border-brass" : "border-charcoal/10 hover:border-charcoal/20",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className={clsx(
            "flex h-11 w-11 flex-none items-center justify-center rounded-md transition-all duration-300 ease-signature",
            shortlisted
              ? "bg-navy text-brass-bright"
              : "bg-brass/10 text-brass-dim group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brass group-hover:text-white",
          )}
        >
          {Icon && <Icon className="h-5 w-5" strokeWidth={1.75} />}
        </span>
        <div className="flex flex-col items-end gap-0.5 font-mono text-[11px] uppercase tracking-[0.08em]">
          <span className="text-brass-dim">{service.code}</span>
          <span className="text-charcoal-dim">{families[familyOf(service.code)].short}</span>
        </div>
      </div>
      <h5 className="font-display text-lg font-medium leading-snug text-charcoal">{service.name}</h5>
      <p className="text-sm leading-relaxed text-charcoal-dim">{service.description}</p>
      <div className="flex flex-wrap gap-2 text-xs text-charcoal-dim">
        <span className="rounded-sm bg-parchment-2 px-2 py-1">{service.duration}</span>
        <span className="rounded-sm bg-parchment-2 px-2 py-1">{service.unit}</span>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-2">
        {selfServe ? (
          <Link
            to="/assessment"
            className="group/cta inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-navy hover:text-brass-dim"
          >
            Start the assessment
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 ease-signature group-hover/cta:translate-x-0.5"
            />
          </Link>
        ) : (
          <button
            type="button"
            aria-pressed={shortlisted}
            onClick={onToggle}
            className={clsx(
              "inline-flex min-h-[44px] items-center gap-2 rounded-sm border px-4 text-sm font-medium transition-colors duration-200",
              shortlisted
                ? "border-navy bg-navy text-parchment hover:bg-navy-3"
                : "border-navy/30 text-navy hover:border-navy",
            )}
          >
            {shortlisted ? (
              <Check aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Plus aria-hidden="true" className="h-4 w-4" />
            )}
            {shortlisted ? "Shortlisted" : "Add to shortlist"}
          </button>
        )}
        {detail && (
          <Link
            to={detail}
            className="inline-flex min-h-[44px] items-center text-sm text-charcoal-dim underline underline-offset-4 hover:text-brass-dim"
          >
            How it works
          </Link>
        )}
      </div>
    </article>
  );
}
