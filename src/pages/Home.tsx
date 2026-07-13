import { Seo } from "@/lib/Seo";
import { site } from "@/data/site";
import { Hero } from "@/components/sections/home/Hero";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { WhoWeAre } from "@/components/sections/home/WhoWeAre";
import { Philosophy } from "@/components/sections/home/Philosophy";
import { MethodologyPreview } from "@/components/sections/home/MethodologyPreview";
import { ClientTiers } from "@/components/sections/home/ClientTiers";
import { CTABand } from "@/components/sections/home/CTABand";

export function Home() {
  return (
    <>
      <Seo
        title="Home"
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: site.name,
          description: site.description,
          url: site.url,
          areaServed: "Global",
        }}
      />
      <Hero />
      <StatsStrip />
      <WhoWeAre />
      <Philosophy />
      <MethodologyPreview />
      <ClientTiers />
      <CTABand />
    </>
  );
}
