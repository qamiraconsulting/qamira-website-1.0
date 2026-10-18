-- Job applications from /careers/<slug>, written by api/apply.ts.
--
-- Run once against the Neon database (Neon console -> SQL Editor, or
-- `node scripts/db-apply.mjs` with DATABASE_URL set). Safe to re-run.
--
-- The résumé file lives in its own table so that browsing applicants
-- (SELECT * FROM applicants) never drags megabytes of file data along.
-- The same file is also attached to the notification email sent to the
-- careers inbox, so day-to-day screening never needs to read it from here.

CREATE TABLE IF NOT EXISTS applicants (
  id               BIGSERIAL PRIMARY KEY,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  role_slug        TEXT NOT NULL,
  full_name        TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT NOT NULL,
  pune_area        TEXT NOT NULL,
  total_experience TEXT NOT NULL,
  voice_experience TEXT NOT NULL,
  current_job      TEXT NOT NULL,
  -- Salary in lakh per year (LPA), numeric so it can be sorted and filtered.
  current_ctc_lpa  NUMERIC(5,2),
  expected_ctc_lpa NUMERIC(5,2) NOT NULL,
  notice_period    TEXT NOT NULL,
  shift_ok         BOOLEAN NOT NULL,
  setup_ok         BOOLEAN NOT NULL,
  linkedin_url     TEXT,
  note             TEXT,
  -- Where the candidate says they saw the role, plus the tracking link it
  -- actually came through (?src= / utm_*). Both are kept because they
  -- disagree often enough to be worth knowing.
  source           TEXT NOT NULL,
  src_param        TEXT,
  utm_medium       TEXT,
  utm_campaign     TEXT,
  -- Screening pipeline, updated by hand from the Neon console for now.
  status           TEXT NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new', 'screening', 'interview', 'offer', 'hired', 'rejected', 'withdrawn')),
  status_note      TEXT,
  -- Applications are deleted after 12 months, per the privacy policy.
  delete_after     DATE NOT NULL DEFAULT (now() + INTERVAL '12 months')::date
);

CREATE INDEX IF NOT EXISTS applicants_role_created_idx ON applicants (role_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS applicants_email_idx ON applicants (lower(email));

CREATE TABLE IF NOT EXISTS applicant_resumes (
  applicant_id BIGINT PRIMARY KEY REFERENCES applicants (id) ON DELETE CASCADE,
  filename     TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size_bytes   INTEGER NOT NULL,
  data         BYTEA NOT NULL
);

-- The screening view: one row per applicant, best-fit first. Open it in the
-- Neon console (Tables -> shortlist) or query it in the SQL editor, e.g.
--   SELECT * FROM shortlist WHERE can_do_shift AND expected_ctc_lpa <= 4.5;
-- "Best fit" is a plain ordering, not a score: people who can do the shift
-- first, then more international voice experience, then newest.
CREATE OR REPLACE VIEW shortlist AS
SELECT
  a.id,
  a.created_at::date AS applied_on,
  a.status,
  a.full_name,
  a.phone,
  a.email,
  a.pune_area,
  a.total_experience,
  a.voice_experience,
  a.current_job,
  a.current_ctc_lpa,
  a.expected_ctc_lpa,
  a.notice_period,
  a.shift_ok AS can_do_shift,
  a.setup_ok AS has_setup,
  a.source,
  a.linkedin_url,
  a.note,
  a.status_note,
  r.filename AS resume_file
FROM applicants a
LEFT JOIN applicant_resumes r ON r.applicant_id = a.id
ORDER BY
  a.shift_ok DESC,
  CASE a.voice_experience
    WHEN '3+ years' THEN 4 WHEN '2-3 years' THEN 3 WHEN '1-2 years' THEN 2
    WHEN 'Less than 1 year' THEN 1 ELSE 0 END DESC,
  a.created_at DESC;
