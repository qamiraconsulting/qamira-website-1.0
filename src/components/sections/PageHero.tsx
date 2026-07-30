import { Link, useLocation } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { NeuronField } from "@/components/brand/NeuronField";
import { PhotoSlot } from "@/components/brand/PhotoSlot";
import { site } from "@/data/site";

export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumbLabel,
  photo,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  breadcrumbLabel: string;
  /** Optional supporting photograph, rendered beside the copy on larger screens. */
  photo?: { label: string; alt: string; src?: string };
}) {
  const { pathname } = useLocation();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: breadcrumbLabel, item: `${site.url}${pathname}` },
    ],
  };

  const copy = (
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">
        <Link to="/" className="hover:text-brass">
          Home
        </Link>{" "}
        / {breadcrumbLabel}
      </p>
      <div className="mt-5">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h1 className="mt-4 max-w-[22ch] text-charcoal">{title}</h1>
      {lede && <p className="mt-5 max-w-[56ch] text-base text-charcoal-dim sm:text-lg">{lede}</p>}
    </Reveal>
  );

  return (
    <section className="relative overflow-hidden bg-hero-glow pb-16 pt-36 sm:pb-20 sm:pt-44">
      <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      <div className="absolute inset-0">
        <NeuronField className="h-full w-full" density={40} />
      </div>
      <Container className="relative z-10">
        {photo ? (
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
            {copy}
            <PhotoSlot src={photo.src} label={photo.label} alt={photo.alt} className="hidden lg:block" />
          </div>
        ) : (
          copy
        )}
      </Container>
    </section>
  );
}
