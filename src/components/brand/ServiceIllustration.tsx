// Brand-styled line-art illustrations for each service listed on the
// Services page. Deliberately vector, not photographic -- matches the
// existing ProcessFlow/NeuronField visual language (charcoal linework,
// brass accents, occasional rust for a called-out "gap") rather than
// introducing a photographic style the rest of the site never uses.

const CHARCOAL = "#14182a";
const CHARCOAL_DIM = "#4b4f60";
const BRASS = "#b8863a";
const RUST = "#9c3b2e";

export type ServiceIconKey =
  | "transformation"
  | "process-optimization"
  | "analytics"
  | "ai-agent"
  | "performance-retainer"
  | "agent-service"
  | "governance"
  | "advisory-loop"
  | "visioning"
  | "kpi-blueprint"
  | "readiness-checklist"
  | "data-story";

function Transformation() {
  return (
    <>
      <polygon points="36,10 55,22 55,50 36,62 17,50 17,22" fill="none" stroke={CHARCOAL} strokeWidth="1.2" opacity="0.35" />
      <line x1="36" y1="36" x2="36" y2="10" stroke={BRASS} strokeWidth="1.5" />
      <line x1="36" y1="36" x2="55" y2="22" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <line x1="36" y1="36" x2="55" y2="50" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <line x1="36" y1="36" x2="36" y2="62" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <line x1="36" y1="36" x2="17" y2="50" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <line x1="36" y1="36" x2="17" y2="22" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <circle cx="36" cy="36" r="4" fill={BRASS} />
      <circle cx="36" cy="10" r="3" fill={BRASS} />
      <circle cx="55" cy="22" r="3" fill={CHARCOAL} opacity="0.4" />
      <circle cx="55" cy="50" r="3" fill={CHARCOAL} opacity="0.4" />
      <circle cx="36" cy="62" r="3" fill={CHARCOAL} opacity="0.4" />
      <circle cx="17" cy="50" r="3" fill={CHARCOAL} opacity="0.4" />
      <circle cx="17" cy="22" r="3" fill={CHARCOAL} opacity="0.4" />
    </>
  );
}

function ProcessOptimizationIcon() {
  return (
    <>
      <line x1="8" y1="36" x2="25" y2="36" stroke={CHARCOAL_DIM} strokeWidth="1.4" />
      <circle cx="8" cy="36" r="5" fill="#fff" stroke={CHARCOAL_DIM} strokeWidth="1.4" />
      <line x1="25" y1="36" x2="43" y2="36" stroke={RUST} strokeWidth="1.4" strokeDasharray="2,2" />
      <circle cx="25" cy="36" r="5" fill="#fff" stroke={CHARCOAL_DIM} strokeWidth="1.4" />
      <circle cx="43" cy="36" r="6.5" fill="#fff" stroke={RUST} strokeWidth="1.6" />
      <path d="M40.5 33.5 L45.5 38.5 M45.5 33.5 L40.5 38.5" stroke={RUST} strokeWidth="1.3" />
      <line x1="49.5" y1="36" x2="60" y2="36" stroke={BRASS} strokeWidth="1.6" />
      <circle cx="60" cy="36" r="6" fill={BRASS} />
      <path d="M57 36 L59.5 38.5 L63.5 33" stroke="#fff" strokeWidth="1.6" fill="none" />
    </>
  );
}

function Analytics() {
  return (
    <>
      <rect x="6" y="8" width="14" height="10" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1" transform="rotate(-8 13 13)" />
      <rect x="8" y="24" width="12" height="12" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1" transform="rotate(6 14 30)" />
      <rect x="4" y="42" width="16" height="9" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1" transform="rotate(-4 12 46)" />
      <line x1="24" y1="28" x2="40" y2="28" stroke={BRASS} strokeWidth="1.2" />
      <rect x="40" y="12" width="24" height="32" fill="#fff" stroke={CHARCOAL} strokeWidth="1.3" />
      <line x1="44" y1="36" x2="48" y2="26" stroke={BRASS} strokeWidth="2" />
      <line x1="48" y1="26" x2="53" y2="31" stroke={BRASS} strokeWidth="2" />
      <line x1="53" y1="31" x2="60" y2="18" stroke={BRASS} strokeWidth="2" />
    </>
  );
}

function AiAgent() {
  return (
    <>
      <circle cx="16" cy="16" r="2.4" fill={CHARCOAL} opacity="0.45" />
      <circle cx="12" cy="38" r="2" fill={CHARCOAL} opacity="0.45" />
      <circle cx="28" cy="50" r="2.2" fill={CHARCOAL} opacity="0.45" />
      <circle cx="8" cy="22" r="1.6" fill={CHARCOAL} opacity="0.3" />
      <line x1="16" y1="16" x2="36" y2="36" stroke={CHARCOAL} strokeWidth="0.8" opacity="0.3" />
      <line x1="12" y1="38" x2="36" y2="36" stroke={CHARCOAL} strokeWidth="0.8" opacity="0.3" />
      <line x1="28" y1="50" x2="36" y2="36" stroke={CHARCOAL} strokeWidth="0.8" opacity="0.3" />
      <line x1="8" y1="22" x2="36" y2="36" stroke={CHARCOAL} strokeWidth="0.8" opacity="0.3" />
      <circle cx="36" cy="36" r="10" fill="#fff" stroke={BRASS} strokeWidth="1.8" />
      <path d="M32 36 L35 39.5 L41 32.5" stroke={BRASS} strokeWidth="1.8" fill="none" />
    </>
  );
}

function PerformanceRetainer() {
  return (
    <>
      <path d="M14 46 A22 22 0 0 1 58 46" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1.4" />
      <line x1="14" y1="46" x2="10" y2="46" stroke={CHARCOAL_DIM} strokeWidth="1.4" />
      <line x1="58" y1="46" x2="62" y2="46" stroke={CHARCOAL_DIM} strokeWidth="1.4" />
      <line x1="36" y1="46" x2="47" y2="28" stroke={BRASS} strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="46" r="3" fill={BRASS} />
      <path d="M50 14 A14 14 0 0 1 60 24" fill="none" stroke={BRASS} strokeWidth="1.4" strokeDasharray="2,2" />
      <path d="M58 20 L60 24 L63 21" fill="none" stroke={BRASS} strokeWidth="1.4" />
    </>
  );
}

function AgentService() {
  return (
    <>
      <line x1="8" y1="40" x2="20" y2="40" stroke={CHARCOAL_DIM} strokeWidth="1.3" />
      <path d="M20 40 L26 40 L29 28 L33 50 L36 40 L46 40" fill="none" stroke={BRASS} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="46" cy="40" r="9" fill="#fff" stroke={BRASS} strokeWidth="1.8" />
      <circle cx="46" cy="40" r="2.2" fill={BRASS} />
      <path
        d="M58 20 l1.8 -1 0.6 2 1.6 -3.2 0.8 2.4 1.2 -1.4"
        fill="none"
        stroke={CHARCOAL_DIM}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function Governance() {
  return (
    <>
      <path
        d="M36 8 L56 14 V34 C56 46 47 54 36 58 C25 54 16 46 16 34 V14 Z"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth="1.4"
      />
      <rect x="26" y="26" width="20" height="20" fill="#fff" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <line x1="30" y1="42" x2="30" y2="34" stroke={BRASS} strokeWidth="2.2" />
      <line x1="36" y1="42" x2="36" y2="30" stroke={BRASS} strokeWidth="2.2" />
      <line x1="42" y1="42" x2="42" y2="36" stroke={BRASS} strokeWidth="2.2" />
    </>
  );
}

function AdvisoryLoop() {
  return (
    <>
      <rect x="10" y="46" width="10" height="10" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1.3" />
      <rect x="22" y="36" width="10" height="20" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1.3" />
      <rect x="34" y="26" width="10" height="30" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1.3" />
      <rect x="46" y="16" width="10" height="40" fill="none" stroke={CHARCOAL} strokeWidth="1.3" />
      <path d="M56 14 C 64 14 64 60 15 44" fill="none" stroke={BRASS} strokeWidth="1.6" strokeDasharray="2.5,2.5" />
      <path d="M18 41 L15 44 L20 47" fill="none" stroke={BRASS} strokeWidth="1.6" strokeLinejoin="round" />
    </>
  );
}

function Visioning() {
  const seats = [
    [36, 14],
    [56, 28],
    [49, 52],
    [23, 52],
    [16, 28],
  ];
  return (
    <>
      {seats.map(([x, y], idx) => (
        <line key={idx} x1={x} y1={y} x2="36" y2="36" stroke={CHARCOAL} strokeWidth="0.8" opacity="0.25" />
      ))}
      {seats.map(([x, y], idx) => (
        <circle key={idx} cx={x} cy={y} r="3.2" fill={CHARCOAL} opacity="0.45" />
      ))}
      <circle cx="36" cy="36" r="11" fill="#fff" stroke={BRASS} strokeWidth="1.6" />
      <polygon points="36,29 39,36 36,43 33,36" fill={BRASS} />
    </>
  );
}

function KpiBlueprint() {
  return (
    <>
      <rect x="8" y="8" width="56" height="56" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1" strokeDasharray="2.5,3" />
      <line x1="8" y1="24" x2="64" y2="24" stroke={CHARCOAL_DIM} strokeWidth="0.6" strokeDasharray="2,3" opacity="0.6" />
      <line x1="8" y1="48" x2="64" y2="48" stroke={CHARCOAL_DIM} strokeWidth="0.6" strokeDasharray="2,3" opacity="0.6" />
      <line x1="26" y1="8" x2="26" y2="64" stroke={CHARCOAL_DIM} strokeWidth="0.6" strokeDasharray="2,3" opacity="0.6" />
      <line x1="46" y1="8" x2="46" y2="64" stroke={CHARCOAL_DIM} strokeWidth="0.6" strokeDasharray="2,3" opacity="0.6" />
      <path d="M22 46 A14 14 0 0 1 50 46" fill="none" stroke={BRASS} strokeWidth="1.8" />
      <circle cx="36" cy="46" r="2.4" fill={BRASS} />
      <line x1="36" y1="46" x2="44" y2="34" stroke={BRASS} strokeWidth="1.8" strokeLinecap="round" />
    </>
  );
}

function ReadinessChecklist() {
  return (
    <>
      <line x1="10" y1="18" x2="38" y2="18" stroke={CHARCOAL_DIM} strokeWidth="1.4" />
      <path d="M10 27 L12.5 29.5 L17 24" fill="none" stroke={BRASS} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="27" x2="38" y2="27" stroke={CHARCOAL_DIM} strokeWidth="1.4" />
      <path d="M10 36 L12.5 38.5 L17 33" fill="none" stroke={BRASS} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="36" x2="38" y2="36" stroke={CHARCOAL_DIM} strokeWidth="1.4" />
      <path d="M10 45 L12.5 47.5 L17 42" fill="none" stroke={BRASS} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="45" x2="34" y2="45" stroke={CHARCOAL_DIM} strokeWidth="1.4" opacity="0.4" />
      <circle cx="52" cy="46" r="11" fill="none" stroke={CHARCOAL} strokeWidth="1.4" />
      <circle cx="52" cy="46" r="4" fill="none" stroke={CHARCOAL} strokeWidth="1.3" />
      <line x1="52" y1="35" x2="52" y2="31" stroke={CHARCOAL} strokeWidth="1.4" />
      <line x1="52" y1="57" x2="52" y2="61" stroke={CHARCOAL} strokeWidth="1.4" />
      <line x1="41" y1="46" x2="37" y2="46" stroke={CHARCOAL} strokeWidth="1.4" />
      <line x1="63" y1="46" x2="67" y2="46" stroke={CHARCOAL} strokeWidth="1.4" />
    </>
  );
}

function DataStory() {
  return (
    <>
      <path
        d="M10 12 H58 A4 4 0 0 1 62 16 V40 A4 4 0 0 1 58 44 H30 L20 54 L22 44 H10 A4 4 0 0 1 6 40 V16 A4 4 0 0 1 10 12 Z"
        fill="#fff"
        stroke={CHARCOAL}
        strokeWidth="1.3"
      />
      <line x1="18" y1="34" x2="18" y2="24" stroke={BRASS} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="27" y1="34" x2="27" y2="19" stroke={BRASS} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="36" y1="34" x2="36" y2="27" stroke={BRASS} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="45" y1="34" x2="45" y2="22" stroke={CHARCOAL_DIM} strokeWidth="2.6" strokeLinecap="round" opacity="0.5" />
    </>
  );
}

const illustrations: Record<ServiceIconKey, () => JSX.Element> = {
  transformation: Transformation,
  "process-optimization": ProcessOptimizationIcon,
  analytics: Analytics,
  "ai-agent": AiAgent,
  "performance-retainer": PerformanceRetainer,
  "agent-service": AgentService,
  governance: Governance,
  "advisory-loop": AdvisoryLoop,
  visioning: Visioning,
  "kpi-blueprint": KpiBlueprint,
  "readiness-checklist": ReadinessChecklist,
  "data-story": DataStory,
};

export function ServiceIllustration({ icon, className }: { icon: ServiceIconKey; className?: string }) {
  const Illustration = illustrations[icon];
  return (
    <svg viewBox="0 0 72 72" width="64" height="64" aria-hidden="true" className={className}>
      <Illustration />
    </svg>
  );
}
