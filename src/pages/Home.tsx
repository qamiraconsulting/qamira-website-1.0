import { Seo } from "@/lib/Seo";
import { Hero } from "@/components/sections/home/Hero";
import { Practices } from "@/components/sections/home/Practices";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { WhoWeAre } from "@/components/sections/home/WhoWeAre";
import { MethodologyPreview } from "@/components/sections/home/MethodologyPreview";
import { TechnologyPreview } from "@/components/sections/home/TechnologyPreview";
import { ClientTiers } from "@/components/sections/home/ClientTiers";
import { IndustriesPreview } from "@/components/sections/home/IndustriesPreview";
import { CaseStudiesPreview } from "@/components/sections/home/CaseStudiesPreview";
import { CTABand } from "@/components/sections/home/CTABand";

export function Home() {
  return (
    <>
      {/* The organization schema is added by Seo on every page. */}
      <Seo title="Home" fullTitle="Business Advisory & Technology Services | Qamira Consulting" path="/" />
      <Hero />
      <Practices />
      <StatsStrip />
      <WhoWeAre />
      <MethodologyPreview />
      <TechnologyPreview />
      <CaseStudiesPreview />
      <ClientTiers />
      <IndustriesPreview />
      <CTABand />
    </>
  );
}
