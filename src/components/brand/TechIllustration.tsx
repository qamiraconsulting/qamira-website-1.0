// Line-art illustrations for the Technology page offerings -- same
// charcoal/brass visual language as ServiceIllustration.tsx (kept as a
// separate module since this is a distinct content domain, not a variant
// of the same list).

const CHARCOAL = "#14182a";
const CHARCOAL_DIM = "#4b4f60";
const BRASS = "#b8863a";

export type TechIconKey =
  | "chatbot-service"
  | "crm-build"
  | "voice-automation"
  | "ai-video"
  | "content-scheduler"
  | "marketing-automation"
  | "workflow-integration"
  | "knowledge-agent"
  | "document-extraction";

function ChatbotService() {
  return (
    <>
      <path
        d="M8 14 H58 A4 4 0 0 1 62 18 V42 A4 4 0 0 1 58 46 H30 L20 56 L22 46 H8 A4 4 0 0 1 4 42 V18 A4 4 0 0 1 8 14 Z"
        fill="#fff"
        stroke={CHARCOAL}
        strokeWidth="1.3"
      />
      <circle cx="33" cy="30" r="9" fill="none" stroke={BRASS} strokeWidth="1.6" />
      <circle cx="29.5" cy="29" r="1.6" fill={BRASS} />
      <circle cx="36.5" cy="29" r="1.6" fill={BRASS} />
      <path d="M29 34 Q33 37 37 34" stroke={BRASS} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <line x1="33" y1="21" x2="33" y2="18" stroke={BRASS} strokeWidth="1.4" />
      <circle cx="33" cy="17" r="1.4" fill={BRASS} />
    </>
  );
}

function CrmBuild() {
  return (
    <>
      <rect x="8" y="12" width="52" height="40" rx="2" fill="#fff" stroke={CHARCOAL} strokeWidth="1.3" />
      <circle cx="22" cy="28" r="7" fill="none" stroke={BRASS} strokeWidth="1.6" />
      <path d="M14 44 C14 37 18 34 22 34 C26 34 30 37 30 44" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1.3" />
      <line x1="38" y1="22" x2="54" y2="22" stroke={CHARCOAL_DIM} strokeWidth="1.4" />
      <line x1="38" y1="29" x2="54" y2="29" stroke={CHARCOAL_DIM} strokeWidth="1.4" opacity="0.6" />
      <line x1="38" y1="36" x2="50" y2="36" stroke={CHARCOAL_DIM} strokeWidth="1.4" opacity="0.6" />
      <line x1="38" y1="43" x2="47" y2="43" stroke={BRASS} strokeWidth="1.4" />
    </>
  );
}

function VoiceAutomation() {
  return (
    <>
      <path
        d="M18 12 C18 10 20 9 22 10 L28 13 C30 14 30 17 28 19 L25 22 C27 28 32 33 38 35 L41 32 C43 30 46 30 47 32 L50 38 C51 40 50 42 48 42 C34 45 21 32 18 18 C17.5 16 17.5 13 18 12 Z"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth="1.4"
      />
      <path d="M45 16 A12 12 0 0 1 45 28" fill="none" stroke={BRASS} strokeWidth="1.4" />
      <path d="M50 10 A20 20 0 0 1 50 34" fill="none" stroke={BRASS} strokeWidth="1.4" opacity="0.55" />
    </>
  );
}

function AiVideo() {
  return (
    <>
      <rect x="8" y="8" width="8" height="48" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <line x1="8" y1="16" x2="16" y2="16" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <line x1="8" y1="24" x2="16" y2="24" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <line x1="8" y1="32" x2="16" y2="32" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <line x1="8" y1="40" x2="16" y2="40" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <line x1="8" y1="48" x2="16" y2="48" stroke={CHARCOAL_DIM} strokeWidth="1" />
      <rect x="20" y="10" width="44" height="44" fill="#fff" stroke={CHARCOAL} strokeWidth="1.3" />
      <polygon points="36,24 36,40 50,32" fill={BRASS} />
    </>
  );
}

function ContentScheduler() {
  return (
    <>
      <rect x="10" y="14" width="48" height="42" rx="2" fill="#fff" stroke={CHARCOAL} strokeWidth="1.3" />
      <line x1="10" y1="24" x2="58" y2="24" stroke={CHARCOAL} strokeWidth="1.3" />
      <line x1="20" y1="9" x2="20" y2="18" stroke={CHARCOAL_DIM} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="48" y1="9" x2="48" y2="18" stroke={CHARCOAL_DIM} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="18" y="30" width="9" height="9" fill={CHARCOAL_DIM} opacity="0.18" />
      <rect x="30" y="30" width="9" height="9" fill={CHARCOAL_DIM} opacity="0.18" />
      <rect x="42" y="30" width="9" height="9" fill={BRASS} />
      <line x1="46.5" y1="39" x2="46.5" y2="50" stroke={BRASS} strokeWidth="1.8" />
      <path d="M43 43 L46.5 39 L50 43" fill="none" stroke={BRASS} strokeWidth="1.8" strokeLinejoin="round" />
    </>
  );
}

function MarketingAutomation() {
  return (
    <>
      <path d="M10 14 H58 L38 36 V50 L30 54 V36 Z" fill="none" stroke={CHARCOAL} strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="20" cy="14" r="2" fill={CHARCOAL_DIM} />
      <circle cx="34" cy="14" r="2" fill={CHARCOAL_DIM} />
      <circle cx="48" cy="14" r="2" fill={CHARCOAL_DIM} />
      <circle cx="34" cy="44" r="3" fill={BRASS} />
    </>
  );
}

function WorkflowIntegration() {
  return (
    <>
      <rect x="6" y="10" width="16" height="14" fill="#fff" stroke={CHARCOAL_DIM} strokeWidth="1.3" />
      <rect x="6" y="44" width="16" height="14" fill="#fff" stroke={CHARCOAL_DIM} strokeWidth="1.3" />
      <rect x="50" y="27" width="16" height="14" fill="#fff" stroke={CHARCOAL_DIM} strokeWidth="1.3" />
      <circle cx="36" cy="34" r="9" fill="#fff" stroke={BRASS} strokeWidth="1.8" />
      <path d="M32.5 34 L35 36.5 L40 31" stroke={BRASS} strokeWidth="1.6" fill="none" />
      <line x1="22" y1="17" x2="28" y2="30" stroke={CHARCOAL_DIM} strokeWidth="1.1" />
      <line x1="22" y1="51" x2="28" y2="38" stroke={CHARCOAL_DIM} strokeWidth="1.1" />
      <line x1="45" y1="34" x2="50" y2="34" stroke={CHARCOAL_DIM} strokeWidth="1.1" />
    </>
  );
}

function KnowledgeAgent() {
  return (
    <>
      <rect x="10" y="16" width="34" height="8" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1.1" transform="translate(0,26)" />
      <rect x="10" y="16" width="34" height="8" fill="none" stroke={CHARCOAL_DIM} strokeWidth="1.1" transform="translate(0,17)" />
      <rect x="10" y="16" width="34" height="8" fill="#fff" stroke={CHARCOAL} strokeWidth="1.3" />
      <circle cx="53" cy="46" r="11" fill="#fff" stroke={BRASS} strokeWidth="1.8" />
      <path d="M49 46 A4 4 0 1 1 53 50" stroke={BRASS} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="53" cy="53" r="0.9" fill={BRASS} />
    </>
  );
}

function DocumentExtraction() {
  return (
    <>
      <path d="M16 8 H44 L52 16 V60 H16 Z" fill="#fff" stroke={CHARCOAL} strokeWidth="1.3" />
      <path d="M44 8 V16 H52" fill="none" stroke={CHARCOAL} strokeWidth="1.3" />
      <line x1="22" y1="26" x2="46" y2="26" stroke={CHARCOAL_DIM} strokeWidth="1.1" opacity="0.5" />
      <line x1="22" y1="33" x2="46" y2="33" stroke={CHARCOAL_DIM} strokeWidth="1.1" opacity="0.5" />
      <line x1="22" y1="40" x2="38" y2="40" stroke={CHARCOAL_DIM} strokeWidth="1.1" opacity="0.5" />
      <line x1="12" y1="30" x2="58" y2="30" stroke={BRASS} strokeWidth="1.8" />
      <circle cx="12" cy="30" r="2.2" fill={BRASS} />
      <circle cx="58" cy="30" r="2.2" fill={BRASS} />
    </>
  );
}

const illustrations: Record<TechIconKey, () => JSX.Element> = {
  "chatbot-service": ChatbotService,
  "crm-build": CrmBuild,
  "voice-automation": VoiceAutomation,
  "ai-video": AiVideo,
  "content-scheduler": ContentScheduler,
  "marketing-automation": MarketingAutomation,
  "workflow-integration": WorkflowIntegration,
  "knowledge-agent": KnowledgeAgent,
  "document-extraction": DocumentExtraction,
};

export function TechIllustration({ icon, className }: { icon: TechIconKey; className?: string }) {
  const Illustration = illustrations[icon];
  return (
    <svg viewBox="0 0 72 72" width="64" height="64" aria-hidden="true" className={className}>
      <Illustration />
    </svg>
  );
}
