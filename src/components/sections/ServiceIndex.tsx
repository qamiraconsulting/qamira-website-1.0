import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { catalogue, families, familyOf, type FamilyKey } from "@/data/content/serviceCatalogue";

const familyKeys = Object.keys(families) as FamilyKey[];

// The whole catalogue at a glance: every family and the services under it.
// On desktop it sits in the sticky left column beside the Navigator; on
// smaller screens the Navigator shows it inside a "browse by category"
// disclosure. It's an index, not a filter -- picking a service scrolls to its
// card and leaves the problem/stage view alone unless that view hides it.
export function ServiceIndex({
  inView,
  activeFamily,
  shortlisted,
  onJumpToService,
  onJumpToFamily,
}: {
  // Codes in the current results. Null when every service is showing.
  inView: Set<string> | null;
  activeFamily: FamilyKey | null;
  shortlisted: string[];
  onJumpToService: (code: string) => void;
  onJumpToFamily: (key: FamilyKey) => void;
}) {
  const [collapsed, setCollapsed] = useState<FamilyKey[]>([]);
  const rootRef = useRef<HTMLElement>(null);

  function toggle(key: FamilyKey) {
    setCollapsed((cur) => (cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]));
  }

  // The full index is taller than the screen, so when it sits in a
  // scrollable panel, keep the family being read in view. Only the panel
  // scrolls -- scrollIntoView would drag the page along with it.
  useEffect(() => {
    const panel = rootRef.current?.parentElement;
    const head = activeFamily && rootRef.current?.querySelector<HTMLElement>(`[data-index-family="${activeFamily}"]`);
    if (!panel || !head || panel.scrollHeight <= panel.clientHeight) return;
    const panelBox = panel.getBoundingClientRect();
    const headBox = head.getBoundingClientRect();
    if (headBox.top < panelBox.top || headBox.top > panelBox.bottom - 120) {
      panel.scrollTo({ top: panel.scrollTop + headBox.top - panelBox.top - 40, behavior: "smooth" });
    }
  }, [activeFamily]);

  return (
    <nav ref={rootRef} aria-label="All services by category" className="flex flex-col gap-1">
      {familyKeys.map((key) => {
        const services = catalogue.filter((s) => familyOf(s.code) === key);
        const open = !collapsed.includes(key);
        const listId = `service-index-${key}`;
        return (
          <div key={key} data-index-family={key} className="border-b border-charcoal/10 pb-1 last:border-b-0">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => onJumpToFamily(key)}
                aria-current={activeFamily === key ? "true" : undefined}
                className={clsx(
                  "flex min-h-[40px] min-w-0 flex-1 items-center gap-2 text-left text-sm font-medium transition-colors hover:text-brass-dim",
                  activeFamily === key ? "text-brass-dim" : "text-charcoal",
                )}
              >
                <span
                  aria-hidden="true"
                  className={clsx(
                    "h-4 w-0.5 flex-none rounded-full transition-colors",
                    activeFamily === key ? "bg-brass" : "bg-transparent",
                  )}
                />
                <span className="py-1 leading-snug">{families[key].name}</span>
                <span className="ml-auto font-mono text-[11px] text-charcoal-dim">{services.length}</span>
              </button>
              <button
                type="button"
                onClick={() => toggle(key)}
                aria-expanded={open}
                aria-controls={listId}
                aria-label={`${open ? "Collapse" : "Expand"} ${families[key].name}`}
                className="flex h-10 w-9 flex-none items-center justify-center text-charcoal-dim hover:text-charcoal"
              >
                <ChevronDown aria-hidden="true" className={clsx("h-4 w-4 transition-transform", !open && "-rotate-90")} />
              </button>
            </div>
            {open && (
              <ul id={listId} className="mb-1.5 flex flex-col">
                {services.map((s) => {
                  const muted = inView !== null && !inView.has(s.code);
                  const picked = shortlisted.includes(s.code);
                  return (
                    <li key={s.code}>
                      <button
                        type="button"
                        onClick={() => onJumpToService(s.code)}
                        title={s.name}
                        className={clsx(
                          "group flex w-full items-baseline gap-2.5 rounded-sm py-1 pl-3 pr-1 text-left text-[13px] leading-5 transition-colors hover:bg-parchment-2",
                          muted ? "text-charcoal-dim/70" : "text-charcoal-dim",
                        )}
                      >
                        <span className="flex-none font-mono text-[10px] text-brass-dim">{s.code.slice(3)}</span>
                        <span className="min-w-0 flex-1 group-hover:text-charcoal lg:truncate">{s.name}</span>
                        {picked && (
                          <Check
                            role="img"
                            aria-label="Shortlisted"
                            className="h-3.5 w-3.5 flex-none self-center text-slate-teal"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
