# Photography brief

Sixteen placements need a real photograph, currently showing a "Photo pending" placeholder (`src/components/brand/PhotoSlot.tsx`) -- the original 7 site placements, plus one per Technology solution detail page (9 pages, replacing the small line-art icon that was there). No image-generation tool is available in this environment. **Tool: Google AI Studio (Imagen)** -- chosen deliberately over Midjourney/DALL-E so the same account and skill also carries Qamira's planned AI content-creation offering (photos here, Veo video for social content later), rather than splitting across tools.

## Style direction (baked into every prompt below)

- **Color treatment:** bright, warm, and light -- soft cream/neutral tones as the base, with brass-gold (`#b8863a`) as the signature accent color popping against the light palette. Matches the site itself, which is light-themed throughout (parchment backgrounds, white cards) -- a dark/moody treatment was the wrong call in an earlier draft of this brief and has been dropped.
- **Lighting:** high-key, natural daylight -- soft, optimistic, energetic. Minimal shadow. Not dark, not moody, not underexposed.
- **Composition:** conceptual and abstract -- hands, screens, documents, objects. **Never a posed "our team" group photo or a specific identifiable person's face** (Qamira doesn't have real team photography yet, and implying a bigger/established team than exists would be misleading).
- **Avoid:** generic corporate-stock clichés (handshakes, forced smiles, thumbs up, people in a circle around a laptop), any visible/legible on-image text or logos, employees, watermarks, dark/gloomy/underexposed results.
- **Aspect ratio:** set as a *generation setting* in AI Studio, not embedded in the prompt text -- Imagen supports `1:1`, `4:3`, `3:4`, `16:9`, `9:16`. All placements below use `4:3`.
- **Prompting style:** Imagen reads best as a full natural-language photographic description (like briefing a photographer), not comma-stacked keywords.

## How to hand the files back

Generate via Google AI Studio, then either upload the files directly in chat, or drop them into `public/photos/` in the repo using the exact filenames below -- I'll wire each one into its `PhotoSlot`'s `src` prop.

---

### 1. Home -- "Who we are" section
**File:** `public/photos/who-we-are.jpg` -- **Aspect:** 4:3

> A bright, professional editorial photograph in 4:3 landscape format, shot close-up from above: a pair of hands annotating a printed business-process flow diagram on a light wooden desk with a gold-barrelled pen. Two or three other printed sheets overlap around it -- a process map and a phased roadmap -- alongside a notebook, a brass pen pot and a small plant at the edge of frame. The documents can carry ordinary generic labels: process stage names, phase headings, simple flow-chart boxes and arrows. **No percentage figures, no performance results, no "X% improvement" or "X% reduction" cards, and no before/after metrics anywhere in the image** -- the papers should read as work in progress, not as a results summary. Soft, warm natural daylight floods in from a window: airy, optimistic, high-key, minimal shadow. Light, warm colour palette of cream and soft neutrals with brass-gold accents. Shallow depth of field, clean and energetic. No face in frame, no logos, no watermark.

**Why this was rewritten (Sept 2026).** The shipped version of this image renders a "Value Impact" card reading
"15–20% Reduction in Cycle Time", "10–15% Improvement in On-Time Delivery" and "20–30% Faster Cash Collection" --
fabricated client results, legible, on the home page, while `/case-studies` states plainly that Qamira is an
early-stage firm without publicly citable client results yet. A prospect who reads both has caught the site
contradicting itself on the one claim that matters most.

Note the original prompt said "no text" and the generator produced a page of it anyway. Blanket bans get ignored;
naming the specific forbidden thing works better, which is why the rule above is about *percentages and outcome
claims* rather than text in general. Generic methodology labels are fine and add credibility -- see
`client-tier-growth.jpg`, which is full of them. The fuller reasoning is in `photography-brief-industries.md`.

### 2-4. Home -- "Client Tiers" (one per tier)
**Files:** `public/photos/client-tier-smb.jpg`, `public/photos/client-tier-growth.jpg`, `public/photos/client-tier-enterprise.jpg` -- **Aspect:** 4:3

> **SMB tier:** A bright, professional editorial photograph in 4:3 landscape format of a small, focused office workspace: a single sunlit wooden desk with an open laptop showing a clean, generic business dashboard, and two printed sheets laid out in front of it -- a phased "Process Improvement Roadmap" and a "Process Map". A notebook, brass pen pot and small plant sit alongside; a few sticky notes on the wall behind carry short phrases like "Process Efficiency" and "Customer Value". Warm natural window light, airy and energetic, high-key with minimal shadow. Light, warm colour palette with brass-gold accents. The documents may carry phase names, process stage labels and metric *names*. **No percentage figures anywhere, and specifically no "Expected Outcomes" or results summary block** -- nothing on any sheet or screen may state an efficiency, cost, time or satisfaction improvement. No faces, no logos, no watermark.
>
> **Growth-stage tier:** A bright, professional editorial photograph of a lean startup workspace: an open-plan area filled with natural daylight, a whiteboard covered in sticky notes and diagrams visible in the background, a sense of energy and forward motion. Light, warm color palette with brass-gold accents, high-key lighting. No visible faces, no text, no logos, no watermark.
>
> **Enterprise tier:** A bright, professional editorial photograph in 4:3 landscape format of a large, structured boardroom: a long sunlit conference table with leather chairs, city windows behind, and two open leather folders in the foreground holding printed documents -- a phased "Process Improvement Roadmap" and a "Business Performance Overview" with simple bar and line charts. A brass pen and water glass alongside. Spacious, optimistic, high-key with warm natural daylight. Light, warm colour palette with brass-gold accents. Documents may carry phase names and chart axes. **No percentage figures anywhere, and specifically no "Expected Outcomes" or results summary block** -- nothing may state an efficiency, cost, time or satisfaction improvement. No faces, no logos, no watermark.

**Why the SMB and Enterprise prompts were rewritten (Sept 2026).** Both shipped images render an "Expected
Outcomes" card reading "15–25% Increase in Efficiency", "20–30% Cost Optimization" and "10–20% Faster Time to
Market" on what is plainly a Qamira "Process Improvement Roadmap" -- the same fabricated-results problem as the
original `who-we-are.jpg`, and on the same page. The growth-tier image is unaffected and should be kept as is.

### 5. Home -- "Technology Preview" section
**File:** `public/photos/technology-preview.jpg` -- **Aspect:** 4:3

> A bright, professional editorial close-up photograph of a laptop or monitor screen on a sunlit desk, displaying an abstract dashboard interface with chart shapes and workflow-diagram nodes -- generic, non-branded UI elements only, no legible text or numbers, not a real product screenshot. Natural daylight floods the scene from a nearby window, warm and energetic. Light, warm color palette with brass-gold accent highlights in the interface. Shallow depth of field, high-key lighting. No visible faces, no logos, no watermark.

### 6. Services page hero
**File:** `public/photos/services-hero.jpg` -- **Aspect:** 4:3 (shown beside the hero copy on desktop only)

> A bright, professional editorial photograph of a whiteboard mid-strategy-session in a sunlit room, covered in process-flow diagrams and arrows sketched in dark marker -- abstract shapes and arrows only, no legible words -- with a hand caught mid-gesture pointing at one section, subtle motion blur suggesting movement. Warm natural daylight, energetic and optimistic mood, light color palette with brass-gold accents. No visible face, no logos, no watermark.

### 7. Technology page hero
**File:** `public/photos/technology-hero.jpg` -- **Aspect:** 4:3

> A clean, bright, professional product-style photograph in 4:3 landscape format of a laptop screen on a minimal, sunlit desk, displaying a generic AI customer-assistant interface: a conversation thread on the left, and side panels showing conversation status, contact details and quick actions. Realistic placeholder content throughout -- a demo contact name, an `@example.com` address, a `(555)` phone number, ordinary statuses like "In Progress" and "High". **No panel may present a results or impact claim** -- specifically nothing along the lines of "Potential Impact: increase efficiency by up to X%", and no percentage breakdown of improvement areas. Ordinary product metrics such as response times or counts are fine. Natural daylight, warm and energetic, light colour palette with brass-gold accent highlights in the interface. Shallow depth of field. No logos, no watermark. This one can read more literally than the others since it's illustrating real software capability.

**Why this was rewritten (Sept 2026).** The shipped image's bottom-right "Smart Insights" panel reads "Potential
Impact: Increase efficiency by up to 35%" above a 45/30/15/10% breakdown -- a performance claim rendered legibly
on the Technology page hero. Demo data inside a product mockup is fine and every other technology image uses it
without issue; a stated improvement percentage is not, because it reads as something Qamira is promising. The
same image also carries minor duplicated-text artifacts ("Customer Assistant / Assistant", "Topic / Topic")
worth fixing in the same pass.

---

## Technology solution detail pages (one photo per page, replacing the icon)

Each of these sits beside the hero copy on `/technology/<slug>`, same treatment as the Technology page hero above (literal, product-style, since these illustrate real software capability rather than an abstract concept). Filenames go in a subfolder to keep them grouped separately from the seven general site photos above.

### 8. Custom SaaS Applications & AI Chatbots
**File:** `public/photos/technology/custom-saas-chatbots.jpg` -- **Aspect:** 4:3

> A bright, professional product-style photograph of a laptop screen on a sunlit desk, displaying a generic customer-service chat interface with a friendly AI assistant conversation bubble -- abstract UI elements only, no legible text. Natural daylight, warm and energetic, light color palette with brass-gold accent highlights in the interface. Shallow depth of field. No visible face, no logos, no watermark.

### 9. CRM Build & Configuration
**File:** `public/photos/technology/crm-build-configuration.jpg` -- **Aspect:** 4:3

> A bright, professional product-style photograph of a laptop screen on a sunlit desk, displaying a generic CRM pipeline view with sales-stage columns and contact cards -- abstract UI elements only, no legible text. Natural daylight, warm and energetic, light color palette with brass-gold accent highlights in the interface. Shallow depth of field. No visible face, no logos, no watermark.

### 10. AI Voice & Call Automation
**File:** `public/photos/technology/ai-voice-call-automation.jpg` -- **Aspect:** 4:3

> A bright, professional editorial photograph of a modern office desk with a sleek headset resting beside a laptop showing a generic call-log interface with a soft waveform graphic, bathed in warm natural daylight. Light, warm color palette with brass-gold accents, high-key lighting, minimal shadow. No visible face, no legible text, no logos, no watermark.

### 11. AI Video Creation
**File:** `public/photos/technology/ai-video-creation.jpg` -- **Aspect:** 4:3

> A bright, professional product-style photograph of a laptop screen on a sunlit desk, displaying a generic video-editing timeline interface with a preview frame and waveform track -- abstract UI elements only, no legible text. Natural daylight, warm and energetic, light color palette with brass-gold accent highlights. Shallow depth of field. No visible face, no logos, no watermark.

### 12. Content Creation & Scheduled Auto-Publishing
**File:** `public/photos/technology/content-scheduling-automation.jpg` -- **Aspect:** 4:3

> A bright, professional product-style photograph of a laptop screen on a sunlit desk, displaying a generic social-media content calendar with scheduled post tiles across a week grid -- abstract UI elements only, no legible text. Natural daylight, warm and energetic, light color palette with brass-gold accent highlights. Shallow depth of field. No visible face, no logos, no watermark.

### 13. Marketing Automation & Lead Scoring
**File:** `public/photos/technology/marketing-automation-lead-scoring.jpg` -- **Aspect:** 4:3

> A bright, professional product-style photograph of a laptop screen on a sunlit desk, displaying a generic marketing funnel dashboard with a lead-scoring gauge and a contact list -- abstract UI elements only, no legible text. Natural daylight, warm and energetic, light color palette with brass-gold accent highlights. Shallow depth of field. No visible face, no logos, no watermark.

### 14. Workflow & Systems Integration Automation
**File:** `public/photos/technology/workflow-systems-integration.jpg` -- **Aspect:** 4:3

> A bright, professional editorial photograph of a laptop screen on a sunlit desk, displaying a generic node-and-line workflow diagram connecting several abstract app icons -- no legible text. Natural daylight, warm and energetic, light color palette with brass-gold accent highlights in the connecting lines. Shallow depth of field. No visible face, no logos, no watermark.

### 15. Internal Knowledge & Document Q&A Agents
**File:** `public/photos/technology/internal-knowledge-agents.jpg` -- **Aspect:** 4:3

> A bright, professional product-style photograph of a laptop screen on a sunlit desk, displaying a generic internal knowledge-base search interface with a question typed into a search bar and a document-citation card below -- abstract UI elements only, no legible text. Natural daylight, warm and energetic, light color palette with brass-gold accent highlights. Shallow depth of field. No visible face, no logos, no watermark.

### 16. Document & Data Extraction Automation
**File:** `public/photos/technology/document-data-extraction.jpg` -- **Aspect:** 4:3

> A bright, professional editorial photograph of a sunlit desk with a printed invoice or form beside an open laptop displaying a generic data-extraction interface highlighting a few fields -- abstract UI elements only, no legible text. Natural daylight, warm and energetic, light color palette with brass-gold accent highlights. Shallow depth of field. No visible face, no logos, no watermark.

---

## Also worth sourcing eventually (not blocking, flagged for later)

- A proper 1200x630 branded Open Graph card image for social sharing (currently falling back to the small 180x180 `apple-touch-icon.png` so links don't 404 -- functional but not a real social-share card). Google AI Studio can generate this too once the seven above are done.
- Confirmed LinkedIn/social profile URLs, to add as `sameAs` entries on the Organization schema (skipped rather than guessed at, since a wrong URL there is worse than an absent one).
