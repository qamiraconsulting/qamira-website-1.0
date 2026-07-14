import { Link } from "react-router-dom";
import clsx from "clsx";
import logoMark from "@/assets/logo/qamira-mark-128.png";

export function Logo({ className, large = false }: { className?: string; large?: boolean }) {
  return (
    <Link to="/" aria-label="Qamira Consulting — home" className={clsx("flex items-center gap-3", className)}>
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        width={large ? 92 : 46}
        height={large ? 92 : 46}
        className={clsx("shrink-0", large ? "h-[92px] w-[92px]" : "h-[46px] w-[46px]")}
      />
      <span
        className={clsx(
          "font-display font-medium tracking-tight text-charcoal",
          large ? "text-3xl" : "text-2xl",
        )}
      >
        Qamira Consulting<em className="text-brass not-italic">.</em>
      </span>
    </Link>
  );
}
