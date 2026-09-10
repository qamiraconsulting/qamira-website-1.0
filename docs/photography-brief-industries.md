# Photography brief — Industry Accelerator pages

Nine placements, one per `/industries/<slug>` detail page. Each sits beside the hero copy on desktop
(hidden on mobile), currently showing a "Photo pending" placeholder.

**Tool note:** the main brief (`photography-brief.md`) specifies Google AI Studio (Imagen). These prompts are
written for ChatGPT / DALL·E instead, so each one states the aspect ratio *in the prompt text* — DALL·E has no
separate aspect-ratio setting. Ask for **4:3 landscape**; if it returns a square, say "regenerate as 4:3
landscape, same image."

## Style direction

- **Bright, warm, light.** Soft cream and neutral tones as the base, with brass-gold (`#b8863a`) as the signature
  accent. The site is light-themed throughout, so a dark or moody treatment is wrong.
- **High-key natural daylight.** Soft, optimistic, minimal shadow. Never underexposed.
- **People at work, visibly engaged.** These images should feel inhabited. Faces are welcome.
- **Consistency matters more than any single image.** These nine are seen as a set. Same light, same warmth, same
  restraint. Generate all nine in one session if you can, so the model holds the style.

### People — faces welcome

Earlier drafts of this brief said "no people," then "no faces." Both were over-corrections, and the engagement
argument wins: a person mid-task gives the reader somewhere to look and makes the page feel like it is about real
work. Show people doing their jobs.

What actually makes these images good or bad is **craft, not policy**:

- **Candid, not posed.** People absorbed in the task — looking at the work, at a screen, at each other. Not
  looking at the camera, not arranged in a row, not smiling on cue.
- **Two or three people maximum**, genuinely interacting. A crowd reads as stock.
- **Hard no on the stock clichés:** handshakes, thumbs up, high fives, folded arms in a line, a ring of people
  beaming at one laptop. These are what make an image look bought rather than taken.
- **Cast international, and vary it across the set.** Qamira is positioned as an international brand, so the nine
  images together should look it. Say so explicitly in every prompt — image models default hard to White Western
  casting otherwise, and they also drift toward a single ethnicity for everyone in a frame.

  The failure mode to avoid is *diversity by checklist*: one-of-each assembled in every single image, which reads
  as staged and is the oldest stock-photo tell there is. With only two or three people per scene, the honest
  approach is to let **each image be plausible on its own** — a pair of colleagues who happen to be from different
  backgrounds — and let **the set as a whole** carry the range. Each prompt below names a suggested pairing purely
  to stop the model defaulting; shuffle them freely.
- **Check the hands.** Still the most common AI artifact. If hands look wrong, regenerate; everything else can be
  perfect and a six-fingered hand will be the only thing anyone sees.

### Text — welcome where it's natural

`client-tier-growth.jpg` is already full of legible text — *Lean Canvas*, *Customer Journey*, kanban columns — and
reads as entirely professional. Whiteboards, screens, printed diagrams, wayfinding: all fine, and they add
credibility.

**One narrow exception, and it's the only hard rule left in this brief:** don't let an image display *fabricated
performance results presented as Qamira's*. The existing `who-we-are.jpg` shows "15–20% Reduction in Cycle Time,"
"10–15% Improvement in On-Time Delivery" and "20–30% Faster Cash Collection" on what reads as a Qamira deliverable
— while the Case Studies page states there are no publicly citable client results yet.

The distinction is about framing, not about digits:

- **Fine:** numbers as incidental scene furniture — axis values on a chart, a figure on a spreadsheet, a date on a
  schedule. Nobody reads these as a claim.
- **Not fine:** a labelled outcome card — "X% reduction in [metric]" — on a document that looks like something
  Qamira produced. That is a results claim, and it contradicts the rest of the site.

Filenames go in `public/photos/industries/`. Once they land, one line in `src/pages/IndustryDetail.tsx` turns them
on — the comment above `photoDescriptions` says exactly which.

---

### 1. Manufacturing
**File:** `public/photos/industries/manufacturing.jpg`

> A bright, professional editorial photograph in 4:3 landscape format on a clean modern factory floor. Two
> technicians in plain hi-vis vests — one East Asian, one White European — stand beside a production line, both
> looking down at a tablet one of them is holding, mid-conversation about what is on the screen — absorbed in the
> task, not looking at the camera.
> Large windows flood the space with warm natural daylight: airy, optimistic, high-key, minimal shadow. Light,
> warm palette of cream and soft neutrals with brass-gold accents on the machinery. Natural candid expressions, no
> posing, no handshakes. No company logos or brand marks, no watermark.

### 2. Logistics & Supply Chain
**File:** `public/photos/industries/logistics-supply-chain.jpg`

> A bright, professional editorial photograph in 4:3 landscape format at a clean distribution-centre loading dock
> in early morning light, open bay doors, neatly stacked unbranded pallets. A Black African warehouse supervisor
> with a clipboard and a Middle Eastern driver stand together checking a delivery manifest, one pointing at the
> sheet — a natural working exchange, neither looking at the camera. Warm daylight streams across the floor: airy, energetic,
> high-key. Light, warm palette of cream and soft neutrals with brass-gold highlights. Candid expressions, no
> posing, no handshake. No company markings on vehicles or crates, no logos, no watermark.

### 3. Construction & Infrastructure
**File:** `public/photos/industries/construction-infrastructure.jpg`

> A bright, professional editorial photograph in 4:3 landscape format on an active construction site, clean
> structural steel framing rising against a bright softly-overcast sky. Two site engineers in hard hats and hi-vis
> — one South Asian, one White European — stand in the foreground reviewing a large printed drawing held between
> them, one gesturing up at the structure — engaged in the work, not facing the camera. Warm natural daylight, optimistic and high-key.
> Light, warm palette of pale sky, cream and soft neutrals with brass-gold warmth on the steel. Architectural and
> clean rather than gritty. Candid, no posing. No signage, no logos, no watermark.

### 4. Retail & E-Commerce
**File:** `public/photos/industries/retail-ecommerce.jpg`

> A bright, professional editorial photograph in 4:3 landscape format inside a calm, minimal retail store or
> fulfilment area with neatly arranged plain unbranded stock. A young Latin American retail associate is arranging
> items on a shelf while an East Asian colleague checks something on a handheld device beside her, the two
> mid-exchange — natural, unposed, neither looking at camera. Warm natural daylight floods in from one side: airy, optimistic, high-key.
> Light, warm palette of cream and soft neutrals with brass-gold accents. No product branding, no logos, no
> watermark.

### 5. Healthcare
**File:** `public/photos/industries/healthcare.jpg`

> A bright, professional editorial photograph in 4:3 landscape format in a calm, modern hospital corridor softly
> lit by large windows. Two clinicians in plain scrubs — one Black African, one South Asian — stand together
> reviewing something on a tablet, mid-discussion — a professional working moment between colleagues. **No patients in frame.** The mood is
> reassuring, clean and high-key, with warm natural daylight and minimal shadow. Light, warm palette of cream,
> soft neutrals and pale wood with restrained brass-gold accents. Serene and architectural, not clinical-cold, not
> sterile-blue. No visible patient records or charts, no logos, no watermark.

*Note: staff only here. A clinician-and-patient scene is standard healthcare marketing, but an AI-generated person
depicted as a patient is a different thing to put on a commercial page — and the accelerator is about how the
operation runs, not about care delivery. Colleagues conferring is the more accurate illustration anyway.*

### 6. Financial Services
**File:** `public/photos/industries/financial-services.jpg`

> A bright, professional editorial photograph in 4:3 landscape format in a sunlit modern office. A White European
> analyst sits at a desk explaining something on their monitor to an East Asian colleague leaning in beside them,
> both looking at the screen — absorbed, mid-explanation, neither facing the camera. The monitor shows a clean generic
> reporting dashboard with chart shapes and ordinary axis values, nothing formatted as a headline result claim.
> Warm natural daylight from a nearby window: airy, optimistic, high-key, shallow depth of field. Light, warm
> palette of cream and soft neutrals with brass-gold accents in the interface. No logos, no watermark.

### 7. Professional Services
**File:** `public/photos/industries/professional-services.jpg`

> A bright, professional editorial photograph in 4:3 landscape format around a sunlit meeting table. Three
> colleagues of clearly different ethnic backgrounds — for example South Asian, Black African and White European —
> are mid-working-session over printed documents showing process-flow diagrams and charts — one annotating with a pen, another gesturing at a page, the third
> listening. Genuinely engaged in the discussion, none looking at the camera, no posing, no handshakes. Warm
> natural daylight, airy and energetic, high-key with minimal shadow. Light, warm palette with brass-gold accents.
> Diagram labels can be legible; no outcome percentages or result claims on the documents. No logos, no watermark.

*Note: this one and #8 are the two that could be misread as "the Qamira team" rather than a client scene, since
consultants and their clients look alike in a meeting room. If that bothers you, ask for the room to read as a
client's own office — a nameplate-free reception glimpse, a factory or warehouse visible through a window.*

### 8. Growing Startups & Tech
**File:** `public/photos/industries/startups-tech.jpg`

> A bright, professional editorial photograph in 4:3 landscape format in a small, energetic startup workspace.
> Three young founders and engineers of mixed backgrounds — for example East Asian, Latin American and White
> European — stand at a glass wall covered in sticky notes and hand-drawn diagrams, mid-discussion — one mapping something out with a marker, the others watching the board and
> responding. Animated, candid, none looking at the camera. Open laptops on a shared desk in the foreground. Warm
> natural daylight fills the room: airy, forward-moving, high-key. Light, warm palette of cream and soft neutrals
> with brass-gold accents. Sticky notes and sketches can be legible as ordinary planning notes. No logos, no
> watermark.

### 9. Public Sector & Education
**File:** `public/photos/industries/public-sector-education.jpg`

> A bright, professional editorial photograph in 4:3 landscape format in the daylit atrium or entrance hall of a
> civic or university building — clean columns, glass and pale stone. An administrator behind a service counter is
> helping a member of the public with a form — the administrator Black African, the visitor South Asian — engaged
> in the exchange and not facing the camera; a few other people of visibly varied backgrounds move through the
> space in the background, motion-blurred. Warm low-angle natural daylight:
> open, orderly, optimistic, high-key with soft shadow. Light, warm palette of cream and pale stone with
> brass-gold warmth. Generic institution, not a recognisable real landmark. Wayfinding signage may be visible but
> should carry no real institution's name or crest. No logos, no watermark.

---

## If a generation comes back wrong

In order of likelihood:

1. **Too dark / moody.** "Regenerate much brighter and warmer — high-key natural daylight, cream and neutral
   tones, minimal shadow."
2. **Hand or finger artifacts.** "Regenerate — the hands are malformed." Check every image for this before
   accepting it; it is the giveaway that survives everything else looking right.
3. **Everyone is smiling at the camera.** "Regenerate with the people absorbed in the task, looking at the work
   rather than at the camera — candid, not posed."
4. **Everyone in the frame is the same ethnicity**, or the whole set has drifted White Western. "Regenerate with
   the two people from visibly different ethnic backgrounds — [name them]." Check the nine as a set at the end,
   not one at a time; that is the only way to see whether the range actually landed.
5. **A labelled result claim appears** on a document or screen — "22% cost reduction" and the like. "Regenerate
   with no performance percentages or outcome claims on any document or screen."
6. **A logo or brand mark appears** on a vehicle, box or building. "Regenerate with no branding or company
   markings of any kind."
