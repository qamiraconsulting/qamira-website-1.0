import { useState, type FormEvent } from "react";
import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

// Static-site form backend. GitHub Pages can't process submissions
// server-side, so this posts to Formspree. Replace FORMSPREE_ENDPOINT with
// a real form ID from https://formspree.io before going live -- until
// then, submissions will fail with the error state below.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_REAL_FORM_ID";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal transition-colors focus:border-brass focus:outline-none";
const labelClass = "font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Tell us where performance is leaking. We'll tell you plainly where the highest-leverage transformation lies."
      />
      <PageHero
        eyebrow="Start a conversation"
        title="Tell us where performance is leaking."
        lede="A first conversation is a diagnostic, not a pitch. We'll tell you plainly where the highest-leverage transformation lies."
        breadcrumbLabel="Contact"
      />

      <Section tone="white">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="name">
                    Name
                  </label>
                  <input id="name" name="name" type="text" required className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="email">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className={inputClass} />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className={labelClass} htmlFor="company">
                    Company
                  </label>
                  <input id="company" name="company" type="text" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className={labelClass} htmlFor="message">
                    What's going on?
                  </label>
                  <textarea id="message" name="message" required rows={6} className={inputClass} />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-sm border border-brass bg-brass px-6 py-3.5 font-mono text-xs uppercase tracking-[0.08em] text-white transition-all duration-200 ease-signature hover:-translate-y-px hover:border-brass-bright hover:bg-brass-bright disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Send message"}
                  </button>

                  {status === "success" && (
                    <p className="mt-4 font-mono text-sm text-slate-teal" role="status">
                      Thanks -- we'll get back to you directly, usually within one business day.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="mt-4 font-mono text-sm text-[#b5573e]" role="alert">
                      Something went wrong sending that. Please email us directly at{" "}
                      <a href={`mailto:${site.email}`} className="underline">
                        {site.email}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </form>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-8">
              <div>
                <span className={labelClass}>Email</span>
                <p className="mt-2 text-lg text-charcoal">
                  <a href={`mailto:${site.email}`} className="hover:text-brass">
                    {site.email}
                  </a>
                </p>
              </div>
              <div>
                <span className={labelClass}>Response time</span>
                <p className="mt-2 text-charcoal-dim">
                  We reply directly, usually within one business day -- no queue, no sales-team hand-off.
                </p>
              </div>
              <div>
                <span className={labelClass}>Prefer to start smaller?</span>
                <p className="mt-2 text-charcoal-dim">
                  Ask about a Business Discovery workshop -- a one-to-two-day session that's often the lowest-risk
                  way to see how QBPES™ applies to your business.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
