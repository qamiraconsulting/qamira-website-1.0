import type { ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "h-full border p-8 transition-all duration-200 ease-signature hover:-translate-y-1",
        tone === "light"
          ? "border-charcoal/10 bg-white hover:border-charcoal/20 hover:shadow-card"
          : "border-cream/10 hover:border-cream/20",
        className,
      )}
    >
      {children}
    </div>
  );
}
