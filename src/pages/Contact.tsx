import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { catalogueByCode } from "@/data/content/serviceCatalogue";
import { useShortlist } from "@/lib/shortlist";
import { newEventId, track } from "@/lib/metaPixel";
import { trackGoogleLead } from "@/lib/googleTag";

// "notice" is the server throttling a repeat or rapid-fire submission --
// the enquiry is already in hand, so it reads as reassurance rather than a
// failure, and must not offer the "email us directly" fallback an "error"
// does.
type Status = "idle" | "submitting" | "success" | "notice" | "error";

// Kept in sync with MIN_MESSAGE_LENGTH in api/contact.ts, so the browser
// catches a two-word message before it costs a round trip.
const MIN_MESSAGE_LENGTH = 30;

const inputClass =
  "border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal transition-colors focus:border-brass focus:outline-none";
const labelClass = "font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [noticeMessage, setNoticeMessage] = useState("");
  // Services the visitor shortlisted on /services. Sent as one
  // "QC-302 Custom AI Chatbot" line each, so the enquiry email lists them.
  const shortlist = useShortlist();
  const shortlistLines = shortlist.codes
    .filter((code) => catalogueByCode[code])
    .map((code) => `${code} ${catalogueByCode[code].name}`);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setErrorMessage("");
    setNoticeMessage("");

    try {
      // Shared with the Conversions API copy of this conversion so Meta
      // deduplicates the two into one. Generated before the POST because
      // both sides have to carry the same value.
      const eventId = newEventId();
      const payload = { ...Object.fromEntries(new FormData(form)), eventId };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        track("Contact", { content_name: "Contact form" }, eventId);
        trackGoogleLead("Contact form");
        form.reset();
        shortlist.clear();
      } else {
        const data = await res.json().catch(() => ({}));
        if (res.status === 429) {
          // Already received -- not a failure, and retrying would only add
          // another copy of something we have.
          setNoticeMessage(data.error ?? "We've already got that one.");
          setStatus("notice");
        } else {
          setErrorMessage(data.error ?? "Something went wrong sending that.");
          setStatus("error");
        }
      }
    } catch {
      setErrorMessage("Something went wrong reaching the contact service.");
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
              {status === "success" || status === "notice" ? (
                // The form is replaced rather than reset, so a sent enquiry
                // can't be fired off again by someone who didn't notice the
                // confirmation.
                <div className="border border-charcoal/15 bg-parchment-2 px-6 py-8" role="status">
                  <p className="font-mono text-xs uppercase tracking-[0.06em] text-slate-teal">
                    {status === "success" ? "Message sent" : "Already received"}
                  </p>
                  <p className="mt-3 text-lg text-charcoal">
                    {status === "success"
                      ? "Thanks -- we'll get back to you directly, usually within one business day."
                      : noticeMessage}
                  </p>
                  <p className="mt-3 text-charcoal-dim">
                    No need to send it again. If something urgent comes up in the meantime, email us at{" "}
                    <a href={`mailto:${site.email}`} className="underline hover:text-brass">
                      {site.email}
                    </a>
                    .
                  </p>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {shortlistLines.length > 0 && (
                  <div className="border border-brass/40 bg-parchment-2 p-5 sm:col-span-2">
                    <input type="hidden" name="services" value={shortlistLines.join("\n")} />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className={labelClass}>Your shortlist ({shortlistLines.length})</p>
                      <Link to="/services#find-a-service" className="text-sm text-brass-dim underline underline-offset-4 hover:text-charcoal">
                        Add more
                      </Link>
                    </div>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {shortlist.codes.map((code) => {
                        const svc = catalogueByCode[code];
                        if (!svc) return null;
                        return (
                          <li key={code} className="flex items-center gap-3 bg-white py-1 pl-3 pr-1">
                            <span className="font-mono text-[11px] text-brass-dim">{code}</span>
                            <span className="min-w-0 flex-1 text-sm text-charcoal">{svc.name}</span>
                            <button
                              type="button"
                              onClick={() => shortlist.remove(code)}
                              aria-label={`Remove ${svc.name} from shortlist`}
                              className="flex h-11 w-11 flex-none items-center justify-center text-charcoal-dim hover:text-charcoal"
                            >
                              <X aria-hidden="true" className="h-4 w-4" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="name">
                    Name
                  </label>
                  <input id="name" name="name" type="text" required minLength={2} className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Enter a valid email address, e.g. name@company.com"
                    className={inputClass}
                  />
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
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={MIN_MESSAGE_LENGTH}
                    rows={6}
                    aria-describedby="message-hint"
                    placeholder={
                      shortlistLines.length
                        ? "A sentence or two on your business: team size, systems you use, any deadline."
                        : "A sentence or two on your business and where performance is leaking."
                    }
                    className={inputClass}
                  />
                  <p id="message-hint" className="text-xs text-charcoal-dim">
                    A sentence or two is plenty -- enough for us to come back with something useful.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-sm border border-brass bg-brass px-6 py-3.5 font-mono text-xs uppercase tracking-[0.08em] text-white transition-all duration-200 ease-signature hover:-translate-y-px hover:border-brass-bright hover:bg-brass-bright disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Send message"}
                  </button>

                  {status === "error" && (
                    <p className="mt-4 font-mono text-sm text-[#b5573e]" role="alert">
                      {errorMessage || "Something went wrong sending that."} Please email us directly at{" "}
                      <a href={`mailto:${site.email}`} className="underline">
                        {site.email}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </form>
              )}
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
                <span className={labelClass}>Team Qamira</span>
                <p className="mt-2 text-lg text-charcoal">
                  <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="hover:text-brass">
                    {site.phone}
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
              <div>
                <span className={labelClass}>Not ready to talk yet?</span>
                <p className="mt-2 text-charcoal-dim">
                  Take our free{" "}
                  <Link to="/assessment" className="text-brass hover:text-brass-bright">
                    AI Business Assessment
                  </Link>{" "}
                  first -- five minutes for an instant, personalized report you can review before reaching out.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
