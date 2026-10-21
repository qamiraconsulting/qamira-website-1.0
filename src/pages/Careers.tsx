import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { careersHero, whatWeLookFor, howYouGrow } from "@/data/content/careers";
import { openJobs } from "@/data/content/jobs";

export function Careers() {
  return (
    <>
      <Seo
        title="Careers"
        path="/careers"
        description="We hire for diagnostic judgment first, technical skill second -- careers at a boutique consultancy built for the AI era."
      />
      <PageHero
        eyebrow={careersHero.eyebrow}
        title={careersHero.title}
        lede={careersHero.lede}
        breadcrumbLabel="Careers"
      />

      {openJobs.length > 0 && (
        <Section tone="white">
          <Container>
            <Reveal className="max-w-[46rem]">
              <Eyebrow>Open roles</Eyebrow>
            </Reveal>

            <RevealGroup className="mt-10 flex flex-col divide-y divide-charcoal/10 border-y border-charcoal/10">
              {openJobs.map((job) => (
                <RevealItem key={job.slug}>
                  <Link
                    to={`/careers/${job.slug}`}
                    className="group grid grid-cols-1 gap-3 py-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
                  >
                    <div>
                      <h3 className="text-charcoal transition-colors group-hover:text-brass">{job.title}</h3>
                      <p className="mt-2 text-sm text-charcoal-dim sm:text-base">{job.summary}</p>
                      <p className="mt-3 font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim">
                        {job.listLine}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-brass">
                      View and apply
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <Section tone={openJobs.length > 0 ? "surface" : "white"} bordered={openJobs.length > 0}>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>What we look for</Eyebrow>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
            {whatWeLookFor.map((item) => (
              <RevealItem key={item.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-charcoal">{item.title}</h3>
                  <p className="mt-3 text-sm text-charcoal-dim">{item.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone={openJobs.length > 0 ? "white" : "surface"} bordered={openJobs.length === 0}>
        <Container>
          <Reveal className="max-w-[46rem]">
            <Eyebrow>How you grow here</Eyebrow>
          </Reveal>

          <RevealGroup className="mt-10 flex flex-col divide-y divide-charcoal/10 border-y border-charcoal/10">
            {howYouGrow.map((item) => (
              <RevealItem key={item.title} className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-[1fr_1.6fr] sm:gap-8">
                <h3 className="text-charcoal">{item.title}</h3>
                <p className="text-sm text-charcoal-dim sm:text-base">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="white" className="text-center">
        <Container>
          <Reveal className="mx-auto max-w-[42rem]">
            <h2 className="text-charcoal">
              {openJobs.length > 0 ? "Not the right role? Reach out anyway." : "No open roles listed right now -- reach out anyway."}
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-charcoal-dim">
              We're a small, early-stage firm. If the description above sounds like you, tell us -- we'd rather hear
              from you before we have a formal opening than miss you after.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Get in touch</Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
