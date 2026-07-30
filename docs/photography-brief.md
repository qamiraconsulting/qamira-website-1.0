# Photography brief

Seven placements need a real photograph, currently showing a "Photo pending" placeholder (`src/components/brand/PhotoSlot.tsx`). No image-generation tool is available in this environment. **Tool: Google AI Studio (Imagen)** -- chosen deliberately over Midjourney/DALL-E so the same account and skill also carries Qamira's planned AI content-creation offering (photos here, Veo video for social content later), rather than splitting across tools.

## Style direction (baked into every prompt below)

- **Color treatment:** bright, warm, and light -- soft cream/neutral tones as the base, with brass-gold (`#b8863a`) as the signature accent color popping against the light palette. Matches the site itself, which is light-themed throughout (parchment backgrounds, white cards) -- a dark/moody treatment was the wrong call in an earlier draft of this brief and has been dropped.
- **Lighting:** high-key, natural daylight -- soft, optimistic, energetic. Minimal shadow. Not dark, not moody, not underexposed.
- **Composition:** conceptual and abstract -- hands, screens, documents, objects. **Never a posed "our team" group photo or a specific identifiable person's face** (Qamira doesn't have real team photography yet, and implying a bigger/established team than exists would be misleading).
- **Avoid:** generic corporate-stock clichés (handshakes, forced smiles, thumbs up, people in a circle around a laptop), any visible/legible on-image text or logos, employees, watermarks, dark/gloomy/underexposed results.
- **Aspect ratio:** set as a *generation setting* in AI Studio, not embedded in the prompt text -- Imagen supports `1:1`, `4:3`, `3:4`, `16:9`, `9:16`. All seven below use `4:3`.
- **Prompting style:** Imagen reads best as a full natural-language photographic description (like briefing a photographer), not comma-stacked keywords.

## How to hand the files back

Generate via Google AI Studio, then either upload the files directly in chat, or drop them into `public/photos/` in the repo using the exact filenames below -- I'll wire each one into its `PhotoSlot`'s `src` prop.

---

### 1. Home -- "Who we are" section
**File:** `public/photos/who-we-are.jpg` -- **Aspect:** 4:3

> A bright, professional editorial photograph, close-up shot, of a pair of hands annotating a printed business-process diagram on a light wooden desk with a pen. Papers overlap slightly. Soft, warm natural daylight floods in from a window, creating an airy, optimistic mood with minimal shadow. Light, warm color palette -- soft neutral tones with brass-gold as an accent color. High-key lighting, shallow depth of field, clean and energetic. No visible face, no text, no logos, no watermark.

### 2-4. Home -- "Client Tiers" (one per tier)
**Files:** `public/photos/client-tier-smb.jpg`, `public/photos/client-tier-growth.jpg`, `public/photos/client-tier-enterprise.jpg` -- **Aspect:** 4:3

> **SMB tier:** A bright, professional editorial photograph of a small, focused office workspace: a single desk with a laptop and neatly organized papers, bathed in warm natural window light, airy and energetic. Light, warm color palette with brass-gold accents, high-key lighting, minimal shadow. No visible faces, no text, no logos, no watermark.
>
> **Growth-stage tier:** A bright, professional editorial photograph of a lean startup workspace: an open-plan area filled with natural daylight, a whiteboard covered in sticky notes and diagrams visible in the background, a sense of energy and forward motion. Light, warm color palette with brass-gold accents, high-key lighting. No visible faces, no text, no logos, no watermark.
>
> **Enterprise tier:** A bright, professional editorial photograph of a large, structured office setting: a glass-walled meeting room or long conference table, filled with natural daylight, spacious and optimistic. Light, warm color palette with brass-gold accents, high-key lighting. No visible faces, no text, no logos, no watermark.

### 5. Home -- "Technology Preview" section
**File:** `public/photos/technology-preview.jpg` -- **Aspect:** 4:3

> A bright, professional editorial close-up photograph of a laptop or monitor screen on a sunlit desk, displaying an abstract dashboard interface with chart shapes and workflow-diagram nodes -- generic, non-branded UI elements only, no legible text or numbers, not a real product screenshot. Natural daylight floods the scene from a nearby window, warm and energetic. Light, warm color palette with brass-gold accent highlights in the interface. Shallow depth of field, high-key lighting. No visible faces, no logos, no watermark.

### 6. Services page hero
**File:** `public/photos/services-hero.jpg` -- **Aspect:** 4:3 (shown beside the hero copy on desktop only)

> A bright, professional editorial photograph of a whiteboard mid-strategy-session in a sunlit room, covered in process-flow diagrams and arrows sketched in dark marker -- abstract shapes and arrows only, no legible words -- with a hand caught mid-gesture pointing at one section, subtle motion blur suggesting movement. Warm natural daylight, energetic and optimistic mood, light color palette with brass-gold accents. No visible face, no logos, no watermark.

### 7. Technology page hero
**File:** `public/photos/technology-hero.jpg` -- **Aspect:** 4:3

> A clean, bright, professional product-style photograph of a laptop screen on a minimal, sunlit desk, displaying a generic chatbot conversation interface or CRM dashboard mockup -- abstract UI elements and chart shapes only, no legible text. Natural daylight, warm and energetic, light color palette with brass-gold accent highlights in the interface. Shallow depth of field. No visible face, no logos, no watermark. This one can read more literally than the others since it's illustrating real software capability, not an abstract concept.

---

## Also worth sourcing eventually (not blocking, flagged for later)

- A proper 1200x630 branded Open Graph card image for social sharing (currently falling back to the small 180x180 `apple-touch-icon.png` so links don't 404 -- functional but not a real social-share card). Google AI Studio can generate this too once the seven above are done.
- Confirmed LinkedIn/social profile URLs, to add as `sameAs` entries on the Organization schema (skipped rather than guessed at, since a wrong URL there is worse than an absent one).
