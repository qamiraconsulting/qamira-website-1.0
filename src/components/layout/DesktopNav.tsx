import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { mainNav, type NavGroupItem } from "@/data/navigation";

const itemClass =
  "relative flex items-center gap-1.5 py-3 text-[15px] font-medium transition-colors duration-200 ease-signature hover:text-brass";

// The brass underline that marks the current section.
const activeBar = "after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:bg-brass";

function NavDropdown({
  label,
  items,
  align,
  open,
  onOpenChange,
}: {
  label: string;
  items: NavGroupItem[];
  align: "left" | "right";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { pathname } = useLocation();
  const active = items.some((item) => pathname === item.path || pathname.startsWith(`${item.path}/`));
  const panelId = `nav-${label.toLowerCase()}`;

  return (
    <li
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onOpenChange(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
        className={clsx(itemClass, active ? clsx("text-brass", activeBar) : "text-charcoal")}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={clsx("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        // pt-2 bridges the gap so the pointer can travel into the panel
        // without leaving the hover area.
        <div id={panelId} className={clsx("absolute top-full z-10 pt-2", align === "left" ? "left-0" : "right-0")}>
          <ul className="w-80 rounded-lg border border-charcoal/10 bg-white p-2 shadow-lg">
            {items.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => onOpenChange(false)}
                  className={({ isActive }) =>
                    clsx(
                      "block rounded-md px-4 py-3 transition-colors duration-200 hover:bg-parchment-2",
                      isActive && "bg-parchment-2",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={clsx("block text-sm font-medium", isActive ? "text-brass" : "text-charcoal")}>
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-charcoal-dim">{item.description}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

// Desktop (lg+) header nav: every top-level section spread across the
// full header width, with related pages grouped into dropdowns that open
// on hover, click or keyboard focus. Mobile keeps the full-screen
// NavOverlay behind the Menu button.
export function DesktopNav() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { pathname } = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => setOpenGroup(null), [pathname]);

  useEffect(() => {
    if (!openGroup) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenGroup(null);
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openGroup]);

  return (
    <nav ref={navRef} aria-label="Main" className="mx-auto mt-3 hidden max-w-content px-12 lg:block">
      <ul className="flex items-center justify-between border-t border-charcoal/10">
        {mainNav.map((entry, i) =>
          "items" in entry ? (
            <NavDropdown
              key={entry.label}
              label={entry.label}
              items={entry.items}
              align={i === mainNav.length - 1 ? "right" : "left"}
              open={openGroup === entry.label}
              onOpenChange={(open) => setOpenGroup(open ? entry.label : null)}
            />
          ) : (
            <li key={entry.path}>
              <NavLink
                to={entry.path}
                className={({ isActive }) =>
                  clsx(itemClass, isActive ? clsx("text-brass", activeBar) : "text-charcoal")
                }
              >
                {entry.label}
              </NavLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
