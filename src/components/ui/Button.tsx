import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  arrow?: boolean;
  onClick?: () => void;
  className?: string;
};

const base =
  "group inline-flex items-center gap-2.5 whitespace-nowrap rounded-sm border px-6 py-3.5 font-mono text-xs uppercase tracking-[0.08em] transition-all duration-200 ease-signature hover:-translate-y-px";

const variantClasses: Record<Variant, string> = {
  primary: "border-brass bg-brass text-white hover:border-brass-bright hover:bg-brass-bright",
  ghost: "border-charcoal/20 text-charcoal hover:border-brass hover:text-brass",
};

export function Button({ children, to, href, variant = "primary", arrow = true, onClick, className }: ButtonProps) {
  const classes = clsx(base, variantClasses[variant], className);
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-200 ease-signature group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
