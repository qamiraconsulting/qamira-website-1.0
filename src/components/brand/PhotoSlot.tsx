import clsx from "clsx";

// A placeholder for a real, AI-generated photograph pending from the user
// (see the photography brief). Renders the real image once `src` is
// supplied -- until then, a clearly-labeled placeholder so the layout
// reads as intentional, not broken.
export function PhotoSlot({
  src,
  alt,
  label,
  className,
  aspect = "aspect-[4/3]",
}: {
  src?: string;
  alt: string;
  label: string;
  className?: string;
  aspect?: string;
}) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={clsx(aspect, "w-full object-cover", className)} />;
  }

  return (
    <div
      className={clsx(
        aspect,
        "flex items-center justify-center border border-dashed border-charcoal/20 bg-parchment-2 text-center",
        className,
      )}
    >
      <div className="px-6">
        <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-charcoal-dim/60">
          Photo pending
        </span>
        <span className="mt-1 block text-xs text-charcoal-dim/50">{label}</span>
      </div>
    </div>
  );
}
