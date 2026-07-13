import { Link } from "react-router-dom";
import clsx from "clsx";
import logoMark from "@/assets/logo/qamira-mark-128.png";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="Qamira Consulting — home" className={clsx("flex items-center gap-3", className)}>
      <img src={logoMark} alt="" aria-hidden="true" width={46} height={46} className="h-[46px] w-[46px] shrink-0" />
      <span className="font-display text-2xl font-medium tracking-tight text-charcoal">
        Qamira<em className="text-brass not-italic">.</em>
      </span>
    </Link>
  );
}
