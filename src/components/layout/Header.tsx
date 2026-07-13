import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { NavOverlay } from "@/components/layout/NavOverlay";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-300 ease-signature",
        scrolled ? "border-b border-charcoal/10 bg-white/90 py-3 backdrop-blur-md" : "border-b border-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo />
        <div className="flex items-center gap-3 sm:gap-5">
          <Button to="/contact" variant="ghost" arrow={false} className="hidden sm:inline-flex">
            Start a conversation
          </Button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-sm border border-charcoal/15 px-3.5 py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-charcoal transition-colors hover:border-brass hover:text-brass"
          >
            {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            <span className="hidden sm:inline">{menuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>{menuOpen && <NavOverlay onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </header>
  );
}
