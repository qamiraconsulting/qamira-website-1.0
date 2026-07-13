import clsx from "clsx";

export function Eyebrow({ children, center = false, className }: { children: string; center?: boolean; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-brass",
        center && "justify-center",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-[22px] bg-brass" />
      {children}
    </span>
  );
}
