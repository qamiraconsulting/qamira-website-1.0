import { useUser, UserButton } from "@clerk/clerk-react";
import { Seo } from "@/lib/Seo";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { clerkAppearance } from "@/lib/clerkAppearance";

export function Portal() {
  const { user } = useUser();

  return (
    <>
      <Seo title="Client Portal" path="/portal" description="Your Qamira engagement workspace." />
      <Section tone="white" className="pt-40 sm:pt-48">
        <Container>
          <Reveal className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <Eyebrow>Client access</Eyebrow>
              <h1 className="mt-4 text-charcoal">Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.</h1>
              <p className="mt-4 max-w-[52ch] text-charcoal-dim">
                Engagement materials, reports, and shared documents will appear here as your work with Qamira
                progresses. This workspace is being built out alongside your engagement.
              </p>
            </div>
            <UserButton appearance={clerkAppearance} afterSignOutUrl="/" />
          </Reveal>

          <Reveal delay={0.1} className="mt-14 border border-charcoal/10 bg-white p-8">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-brass">In development</span>
            <h3 className="mt-3 text-charcoal">Nothing here yet</h3>
            <p className="mt-3 max-w-[52ch] text-sm text-charcoal-dim">
              Once your engagement is underway, this is where you'll find current-state assessments, KPI
              dashboards, and delivery milestones. Reach out to your Qamira consultant if you're expecting to see
              something here.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
