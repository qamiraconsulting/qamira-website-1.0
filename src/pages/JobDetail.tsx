import { useState, type FormEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { NotFound } from "@/pages/NotFound";
import { site } from "@/data/site";
import { findOpenJob, type Job } from "@/data/content/jobs";

// Mirrored from MAX_RESUME_BYTES in api/apply.ts, so an oversized file is
// caught before a multi-megabyte upload is wasted on a 413.
const MAX_RESUME_BYTES = 3 * 1024 * 1024;

// Mirrored from MIN_ANSWER_LENGTH / MAX_ANSWER_LENGTH in api/apply.ts.
const MIN_ANSWER_LENGTH = 30;
const MAX_ANSWER_LENGTH = 2000;

// Where the candidate saw the role. Each channel's post links to this page
// with ?src=<key>, which preselects the matching option -- the candidate
// can still change it, and both values are stored.
const SOURCES: { key: string; label: string }[] = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "naukri", label: "Naukri" },
  { key: "workindia", label: "WorkIndia" },
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "whatsapp", label: "WhatsApp group" },
  { key: "referral", label: "Referred by someone" },
  { key: "google", label: "Google search" },
  { key: "other", label: "Somewhere else" },
];

const NOTICE = ["Immediate", "15 days", "30 days", "60 days", "90 days"];

type Status = "idle" | "submitting" | "success" | "notice" | "error";

const inputClass =
  "border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal transition-colors focus:border-brass focus:outline-none";
const labelClass = "font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim";
const optional = <span className="normal-case tracking-normal text-charcoal-dim/70"> (optional)</span>;

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function jobPostingSchema(job: Job) {
  const description = job.sections
    .map((section) => {
      const paragraphs = (section.paragraphs ?? []).map((p) => `<p>${p}</p>`).join("");
      const bullets = section.bullets ? `<ul>${section.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : "";
      const note = section.note ? `<p>${section.note}</p>` : "";
      return `<h3>${section.heading}</h3>${paragraphs}${bullets}${note}`;
    })
    .join("");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    datePosted: job.schema.datePosted,
    validThrough: `${job.schema.validThrough}T23:59:59+05:30`,
    employmentType: job.schema.employmentType,
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
      logo: `${site.url}/logo/apple-touch-icon.png`,
    },
    // Listed as a Pune job, not TELECOMMUTE: Google only accepts a whole
    // country as the remote applicant area, and the hire must live in Pune
    // (or relocate). The description says it's work from home.
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.schema.addressLocality,
        addressRegion: job.schema.addressRegion,
        addressCountry: job.schema.addressCountry,
      },
    },
    experienceRequirements: {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: job.schema.minMonthsExperience,
    },
  };
}

export function JobDetail() {
  const { slug } = useParams();
  const job = findOpenJob(slug);
  if (!job) return <NotFound />;
  return <JobPage job={job} />;
}

function JobPage({ job }: { job: Job }) {
  const [searchParams] = useSearchParams();
  const srcParam = (searchParams.get("src") ?? searchParams.get("utm_source") ?? "").toLowerCase();
  const presetSource = SOURCES.find((s) => s.key === srcParam)?.label ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("resume");
    setMessage("");

    if (!(file instanceof File) || file.size === 0) {
      setMessage("Please attach your résumé.");
      setStatus("error");
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setMessage("That résumé is over 3 MB. Please attach a smaller PDF or Word file.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const answers: Record<string, string> = {};
      for (const q of job.form.questions ?? []) answers[q.id] = String(data.get(`answer-${q.id}`) ?? "");
      const fields = Object.fromEntries(
        [...data.entries()].filter(([key]) => key !== "resume" && !key.startsWith("answer-"))
      );
      const payload = {
        ...fields,
        answers,
        roleSlug: job.slug,
        srcParam,
        utmMedium: searchParams.get("utm_medium") ?? "",
        utmCampaign: searchParams.get("utm_campaign") ?? "",
        resume: { name: file.name, data: await readAsBase64(file) },
      };
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
      } else if (res.status === 429) {
        setMessage(body.error ?? "We already have your application.");
        setStatus("notice");
      } else {
        setMessage(body.error ?? "Something went wrong sending that.");
        setStatus("error");
      }
    } catch {
      setMessage("Something went wrong reaching our server.");
      setStatus("error");
    }
  }

  return (
    <>
      <Seo title={job.title} path={`/careers/${job.slug}`} description={job.summary} jsonLd={jobPostingSchema(job)} />
      <PageHero eyebrow="Open role" title={job.title} lede={job.summary} breadcrumbLabel={job.title} />

      <Section tone="white">
        <Container>
          <dl className="grid grid-cols-2 gap-6 border-y border-charcoal/10 py-6 sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]">
            {job.facts.map((fact) => (
              <div key={fact.label}>
                <dt className={labelClass}>{fact.label}</dt>
                <dd className="mt-1.5 text-charcoal">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <a
              href="#apply"
              className="inline-flex items-center gap-2.5 rounded-sm border border-brass bg-brass px-6 py-3.5 font-mono text-xs uppercase tracking-[0.08em] text-white transition-all duration-200 ease-signature hover:-translate-y-px hover:border-brass-bright hover:bg-brass-bright"
            >
              Apply now
            </a>
          </div>

          <div className="mt-14 flex max-w-[46rem] flex-col gap-12">
            {job.sections.map((section) => (
              <Reveal key={section.heading}>
                <h2 className="text-charcoal">{section.heading}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-4 text-charcoal-dim">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 flex list-disc flex-col gap-2.5 pl-5 text-charcoal-dim marker:text-brass">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {section.note && <p className="mt-4 text-charcoal-dim">{section.note}</p>}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <div id="apply" className="max-w-[46rem] scroll-mt-28">
            <Eyebrow>Apply</Eyebrow>
            <h2 className="mt-4 text-charcoal">Apply for this role</h2>
            <p className="mt-3 text-charcoal-dim">
              {job.form.applyIntro ?? "Takes about three minutes. Keep your résumé handy as a PDF or Word file, up to 3 MB."}
            </p>

            {status === "success" || status === "notice" ? (
              <div className="mt-8 border border-charcoal/15 bg-white px-6 py-8" role="status">
                <p className="font-mono text-xs uppercase tracking-[0.06em] text-slate-teal">
                  {status === "success" ? "Application received" : "Already received"}
                </p>
                <p className="mt-3 text-lg text-charcoal">
                  {status === "success"
                    ? "Thank you. We've sent a confirmation to your email."
                    : message}
                </p>
                <p className="mt-3 text-charcoal-dim">
                  If your profile is a match, we'll contact you on WhatsApp or by phone for a short screening call,
                  usually within a week.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Honeypot -- hidden from people and screen readers, filled by bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="fullName">
                    Full name
                  </label>
                  <input id="fullName" name="fullName" type="text" required minLength={2} autoComplete="name" className={inputClass} />
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
                    autoComplete="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Enter a valid email address, e.g. name@gmail.com"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="phone">
                    Mobile / WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91 98XXX XXXXX"
                    pattern="[+0-9 ()-]{10,20}"
                    title="Enter a 10-digit mobile number, with or without +91"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="puneArea">
                    Where do you live now?
                  </label>
                  <input
                    id="puneArea"
                    name="puneArea"
                    type="text"
                    required
                    placeholder="Your area in Pune, or your city"
                    className={inputClass}
                  />
                  <span className="text-xs text-charcoal-dim">Outside Pune? You can apply if you'll move to Pune before you join.</span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="totalExperience">
                    {job.form.experienceLabel}
                  </label>
                  <select id="totalExperience" name="totalExperience" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Select
                    </option>
                    {job.form.experienceOptions.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                {job.form.voiceExperience && (
                  <div className="flex flex-col gap-2">
                    <label className={labelClass} htmlFor="voiceExperience">
                      {job.form.voiceExperience.label}
                    </label>
                    <select id="voiceExperience" name="voiceExperience" required defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        Select
                      </option>
                      {job.form.voiceExperience.options.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className={labelClass} htmlFor="currentRole">
                    Current or last role
                  </label>
                  <input
                    id="currentRole"
                    name="currentRole"
                    type="text"
                    required
                    placeholder={job.form.currentRolePlaceholder}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="currentCtc">
                    Current salary, lakh per year{optional}
                  </label>
                  <input
                    id="currentCtc"
                    name="currentCtc"
                    type="number"
                    inputMode="decimal"
                    min="0.1"
                    max="99"
                    step="0.1"
                    placeholder="e.g. 3.2"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="expectedCtc">
                    Expected salary, lakh per year
                  </label>
                  <input
                    id="expectedCtc"
                    name="expectedCtc"
                    type="number"
                    inputMode="decimal"
                    required
                    min="0.1"
                    max="99"
                    step="0.1"
                    placeholder="e.g. 4.5"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="noticePeriod">
                    Notice period
                  </label>
                  <select id="noticePeriod" name="noticePeriod" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Select
                    </option>
                    {NOTICE.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="source">
                    Where did you see this role?
                  </label>
                  <select id="source" name="source" required defaultValue={presetSource} className={inputClass}>
                    <option value="" disabled>
                      Select
                    </option>
                    {SOURCES.map((s) => (
                      <option key={s.key}>{s.label}</option>
                    ))}
                  </select>
                </div>

                {job.form.shiftQuestion && (
                  <fieldset className="flex flex-col gap-3 sm:col-span-2">
                    <legend className={labelClass}>{job.form.shiftQuestion}</legend>
                    <div className="mt-2 flex gap-6 text-sm text-charcoal">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="shiftOk" value="yes" required className="accent-brass" /> Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="shiftOk" value="no" className="accent-brass" /> No
                      </label>
                    </div>
                  </fieldset>
                )}

                {job.form.askSetup && (
                  <label className="flex items-start gap-3 text-sm text-charcoal sm:col-span-2">
                    <input type="checkbox" name="setupOk" value="yes" required className="mt-1 accent-brass" />
                    I have reliable broadband and a quiet place to work from home.
                  </label>
                )}

                {(job.form.questions ?? []).map((q, i) => (
                  <div key={q.id} className="flex flex-col gap-2 sm:col-span-2">
                    <label className={labelClass} htmlFor={`answer-${q.id}`}>
                      {i + 1}. {q.label}
                    </label>
                    <textarea
                      id={`answer-${q.id}`}
                      name={`answer-${q.id}`}
                      rows={5}
                      required
                      minLength={MIN_ANSWER_LENGTH}
                      maxLength={MAX_ANSWER_LENGTH}
                      aria-describedby={q.hint ? `answer-${q.id}-hint` : undefined}
                      className={inputClass}
                    />
                    {q.hint && (
                      <span id={`answer-${q.id}-hint`} className="text-xs text-charcoal-dim">
                        {q.hint}
                      </span>
                    )}
                  </div>
                ))}

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className={labelClass} htmlFor="linkedinUrl">
                    LinkedIn profile{optional}
                  </label>
                  <input id="linkedinUrl" name="linkedinUrl" type="text" placeholder="linkedin.com/in/..." className={inputClass} />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className={labelClass} htmlFor="resume">
                    Résumé (PDF or Word, up to 3 MB)
                  </label>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="border border-dashed border-charcoal/25 bg-white px-4 py-3 text-sm text-charcoal file:mr-4 file:rounded-sm file:border-0 file:bg-charcoal/5 file:px-3 file:py-1.5 file:font-mono file:text-xs file:uppercase file:tracking-[0.06em] file:text-charcoal"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className={labelClass} htmlFor="note">
                    Anything you'd like us to know{optional}
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    rows={4}
                    maxLength={2000}
                    placeholder={job.form.notePlaceholder}
                    className={inputClass}
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-charcoal-dim sm:col-span-2">
                  <input type="checkbox" name="consent" value="yes" required className="mt-1 accent-brass" />
                  <span>
                    Qamira Consulting may keep my application and résumé for up to 12 months to consider me for this and
                    similar roles, as described in the{" "}
                    <Link to="/privacy" className="text-brass underline hover:text-brass-bright">
                      privacy policy
                    </Link>
                    .
                  </span>
                </label>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-sm border border-brass bg-brass px-6 py-3.5 font-mono text-xs uppercase tracking-[0.08em] text-white transition-all duration-200 ease-signature hover:-translate-y-px hover:border-brass-bright hover:bg-brass-bright disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Submit application"}
                  </button>

                  {status === "error" && (
                    <p className="mt-4 font-mono text-sm text-[#b5573e]" role="alert">
                      {message || "Something went wrong sending that."} If it keeps happening, email your résumé
                      to{" "}
                      <a href={`mailto:${site.careersEmail}`} className="underline">
                        {site.careersEmail}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
