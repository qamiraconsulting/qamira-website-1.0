import type { ReactNode } from "react";
import clsx from "clsx";

type Tone = "parchment" | "white" | "navy" | "surface";

const toneClasses: Record<Tone, string> = {
  parchment: "bg-parchment text-charcoal-dim",
  white: "bg-white text-charcoal-dim",
  surface: "bg-parchment-2 text-charcoal-dim",
  navy: "bg-navy text-cream-dim",
};

export function Section({
  children,
  tone = "parchment",
  bordered = false,
  className,
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  bordered?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "py-16 sm:py-20 lg:py-28",
        toneClasses[tone],
        bordered && (tone === "navy" ? "border-t border-cream/10" : "border-t border-charcoal/10"),
        className,
      )}
    >
      {children}
    </section>
  );
}
