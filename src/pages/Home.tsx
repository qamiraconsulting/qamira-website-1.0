import { Seo } from "@/lib/Seo";
import { organizationSchema } from "@/data/site";
import { Hero } from "@/components/sections/home/Hero";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { WhoWeAre } from "@/components/sections/home/WhoWeAre";
import { Philosophy } from "@/components/sections/home/Philosophy";
import { GapFixBanner } from "@/components/sections/home/GapFixBanner";
import { MethodologyPreview } from "@/components/sections/home/MethodologyPreview";
import { TechnologyPreview } from "@/components/sections/home/TechnologyPreview";
import { ClientTiers } from "@/components/sections/home/ClientTiers";
import { IndustriesPreview } from "@/components/sections/home/IndustriesPreview";
import { CaseStudiesPreview } from "@/components/sections/home/CaseStudiesPreview";
import { CTABand } from "@/components/sections/home/CTABand";

export function Home() {
  return (
    <>
      <Seo
        title="Home"
        path="/"
        jsonLd={organizationSchema}
      />
      <Hero />
      <GapFixBanner />
      <StatsStrip />
      <WhoWeAre />
      <Philosophy />
      <MethodologyPreview />
      <TechnologyPreview />
      <CaseStudiesPreview />
      <ClientTiers />
      <IndustriesPreview />
      <CTABand />
    </>
  );
}
