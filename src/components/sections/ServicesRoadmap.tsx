import { Fragment } from "react";
import { Search, Cpu, RefreshCw } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "react-router-dom";

const steps = [
  {
    label: "Diagnose",
    detail: "Services -- QBPES™ maturity assessment, root cause analysis",
    icon: Search,
    to: undefined,
  },
  {
    label: "Build",
    detail: "Technology -- the software and agents that execute the fix",
    icon: Cpu,
    to: "/technology",
  },
  {
    label: "Run",
    detail: "Managed Services -- kept monitored, current, and governed",
    icon: RefreshCw,
    to: undefined,
  },
];

// A static three-stop version of the home page Gap-Fix Banner's roadmap
// visual language (charcoal/brass ringed nodes on a connecting line) --
// no carousel needed here, just Diagnose -> Build -> Run, closing the loop
// on how Services, Technology, and Managed Services fit together.
export function ServicesRoadmap() {
  return (
    <Section tone="surface" bordered>
      <Container>
        <Reveal className="mx-auto max-w-[42rem] text-center">
          <Eyebrow center>How it fits together</Eyebrow>
          <h2 className="mt-4 text-charcoal">One architecture, three stages.</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">
            A Services engagement designs the fix. Technology builds it. Managed Services keeps it running.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 flex max-w-[46rem] items-start">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const node = (
              <div className="flex w-28 flex-none flex-col items-center text-center">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-brass bg-white">
                  <Icon className="h-5 w-5 text-brass" aria-hidden="true" />
                </span>
                <span className="mt-2.5 text-sm font-medium text-charcoal">{step.label}</span>
                <span className="mt-1 max-w-[8rem] text-xs leading-tight text-charcoal-dim">{step.detail}</span>
              </div>
            );
            return (
              <Fragment key={step.label}>
                {i > 0 && <div aria-hidden="true" className="mt-7 h-px flex-1 bg-brass" />}
                <div>{step.to ? <Link to={step.to}>{node}</Link> : node}</div>
              </Fragment>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
