// The eight-step delivery process -- Qamira's concrete, tangible answer to
// "how do you actually run an engagement." Single source of truth, shared
// by the Home methodology preview and the full Methodology page, so the
// two never drift out of sync.
//
// Icon names reference lucide-react components (see ProcessFlow.tsx).

export const processIntro = {
  eyebrow: "How we work",
  heading: "An eight-step delivery process, engineered to re-enter itself.",
  lede: "This is the concrete version of QBPES™ in motion -- not an abstract framework, but the literal sequence every engagement follows, from studying how work happens today to the system that keeps it improving after we leave.",
};

export const processSteps = [
  {
    step: "01",
    title: "Study the As-Is",
    icon: "Search",
    body: "Structured stakeholder interviews and workshops surface how work actually happens today -- and the real objectives and constraints behind it -- without proposing fixes.",
  },
  {
    step: "02",
    title: "Process Mapping",
    icon: "Workflow",
    body: "The current-state workflow is documented as it actually runs, not as leadership assumes -- exposing bottlenecks, waste, and unclear ownership at a glance.",
  },
  {
    step: "03",
    title: "Optimize the Processes",
    icon: "SlidersHorizontal",
    body: "Root cause analysis separates symptoms from causes, and workflows are redesigned to remove waste and friction -- before any technology is applied.",
  },
  {
    step: "04",
    title: "Enable the People",
    icon: "Users",
    body: "Skills, culture, and capacity are matched to the redesigned process, and roles are realigned -- so the new way of working survives contact with the team that has to run it.",
  },
  {
    step: "05",
    title: "Integrate with AI",
    icon: "Cpu",
    body: "Agentic AI and intelligent automation execute the optimized, people-ready process at a speed and scale no team can match manually -- always governed, always checked by a human.",
  },
  {
    step: "06",
    title: "Deploy SOPs",
    icon: "FileCheck2",
    body: "The redesigned, AI-integrated process is documented as a living Standard Operating Procedure -- so the new way of working is institutionalized, not tribal knowledge.",
  },
  {
    step: "07",
    title: "Performance Systems",
    icon: "BarChart3",
    body: "A KPI architecture, a single source of truth, and executive dashboards are stood up so performance against the new process is visible -- and owned.",
  },
  {
    step: "08",
    title: "Govern & Improve",
    icon: "RefreshCw",
    body: "Ownership, review cadence, and threshold alerts keep the system alive. Performance is re-measured on the same rubric, closing the loop back to Study the As-Is.",
  },
] as const;
