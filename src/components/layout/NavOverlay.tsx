import { useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";
import { NeuronField } from "@/components/brand/NeuronField";

const panelVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export function NavOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      "font-display text-3xl sm:text-4xl transition-colors duration-200 hover:text-brass",
      isActive ? "text-brass" : "text-charcoal",
    );

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={panelVariants}
      className="fixed inset-0 z-[90] overflow-y-auto bg-white"
    >
      <div className="absolute inset-0">
        <NeuronField className="h-full w-full" density={50} interactive={false} />
      </div>

      <div className="relative mx-auto flex min-h-full max-w-content flex-col px-5 pb-16 pt-28 sm:px-8 lg:px-12">
        <motion.nav initial="hidden" animate="visible" variants={listVariants} className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {footerNav.firm.concat(footerNav.work).map((item) => (
            <motion.div key={item.path} variants={itemVariants}>
              <NavLink to={item.path} onClick={onClose} className={linkClass}>
                {item.label}
              </NavLink>
            </motion.div>
          ))}
          <motion.div variants={itemVariants}>
            <NavLink to="/" onClick={onClose} className={linkClass}>
              Home
            </NavLink>
          </motion.div>
        </motion.nav>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={listVariants}
          className="mt-auto flex flex-col gap-6 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <motion.div variants={itemVariants} className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.08em] text-charcoal-dim">
            <SignedOut>
              <NavLink to="/login" onClick={onClose} className="hover:text-brass">
                Login
              </NavLink>
            </SignedOut>
            <SignedIn>
              <NavLink to="/portal" onClick={onClose} className="hover:text-brass">
                Client Portal
              </NavLink>
            </SignedIn>
            <NavLink to="/contact" onClick={onClose} className="hover:text-brass">
              Contact
            </NavLink>
          </motion.div>
          <motion.a variants={itemVariants} href={`mailto:${site.email}`} className="font-mono text-xs uppercase tracking-[0.08em] text-brass hover:text-brass-bright">
            {site.email}
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
