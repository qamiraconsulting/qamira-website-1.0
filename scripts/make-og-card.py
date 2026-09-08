"""Generate the 1200x630 social card at public/og/qamira-og.png.

This is a manual, run-once tool -- deliberately NOT part of `npm run
build`. It needs Pillow and system fonts, and wiring an environment
dependency into the build is exactly what broke prerendering before
(Puppeteer couldn't launch Chromium on Vercel, so the step silently
skipped on every deploy). The generated PNG is committed instead, so a
deploy never depends on this script running.

Re-run it only when the card's wording, the brand palette, or the logo
changes, then commit the regenerated PNG.

    pip install Pillow
    python scripts/make-og-card.py

Typography follows the site's own declared fallback stacks, so this is
on-brand rather than an arbitrary substitute:

    font-display: Fraunces, Iowan Old Style, Georgia, serif
    font-body:    IBM Plex Sans, -apple-system, Segoe UI, sans-serif

The real Fraunces and IBM Plex faces can't be used here -- @fontsource
ships woff2/woff only, which Pillow cannot read -- so the script resolves
the next face down each stack for the platform it runs on.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

# --- Brand tokens, mirroring tailwind.config.ts -------------------------
PARCHMENT = (251, 250, 247)  # parchment.DEFAULT #fbfaf7
PARCHMENT_2 = (243, 240, 232)  # parchment.2       #f3f0e8
RULE = (222, 216, 200)
CHARCOAL = (20, 24, 42)  # charcoal.DEFAULT  #14182a
CHARCOAL_DIM = (75, 79, 96)  # charcoal.dim      #4b4f60
BRASS = (184, 134, 58)  # brass.DEFAULT     #b8863a

WIDTH, HEIGHT = 1200, 630
PAD = 92
DIVIDER_Y = 430

# --- Copy ---------------------------------------------------------------
EYEBROW = "BUSINESS PERFORMANCE EXCELLENCE"
HEADLINE = ["We solve the business problem.", "The technology comes after."]
SUPPORTING = [
    "Diagnose what's constraining growth. Redesign the process beneath it.",
    "Then deploy AI-native execution to make the fix permanent.",
]

# --- Font resolution, in fallback-stack order per platform --------------
DISPLAY_SERIF = [
    "C:/Windows/Fonts/georgia.ttf",
    "/System/Library/Fonts/Supplemental/Iowan Old Style.ttc",
    "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
]
BODY_SANS = [
    "C:/Windows/Fonts/segoeui.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]
BODY_SANS_SEMIBOLD = [
    "C:/Windows/Fonts/seguisb.ttf",
    "C:/Windows/Fonts/segoeuib.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og" / "qamira-og.png"
LOGO = ROOT / "public" / "logo" / "apple-touch-icon.png"


def font(candidates, size):
    """First installed face from a fallback stack, at the given size."""
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    raise SystemExit(
        f"No usable font found. Tried:\n  " + "\n  ".join(candidates) + "\n"
        "Install one, or add your platform's equivalent to the list above."
    )


def tracked_text(draw, xy, text, face, fill, tracking):
    """Draw text with letter-spacing, which Pillow has no native support
    for. Used for the eyebrow, which the site sets at 0.18em."""
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=face, fill=fill)
        x += draw.textlength(char, font=face) + tracking


def main():
    img = Image.new("RGB", (WIDTH, HEIGHT), PARCHMENT)
    d = ImageDraw.Draw(img)

    # Brass edge and the lower parchment block, echoing the site's
    # section banding rather than a gradient.
    d.rectangle([0, 0, 10, HEIGHT], fill=BRASS)
    d.rectangle([0, DIVIDER_Y, WIDTH, HEIGHT], fill=PARCHMENT_2)
    d.line([(0, DIVIDER_Y), (WIDTH, DIVIDER_Y)], fill=RULE, width=1)

    # Wordmark: logo, name, and the brass full stop the site renders.
    if LOGO.exists():
        mark = Image.open(LOGO).convert("RGBA").resize((84, 84), Image.LANCZOS)
        img.paste(mark, (PAD, 74), mark)
    else:
        print(f"warning: {LOGO} missing, drawing without the logo mark")

    f_word = font(DISPLAY_SERIF, 44)
    d.text((PAD + 104, 92), "Qamira Consulting", font=f_word, fill=CHARCOAL)
    name_width = d.textlength("Qamira Consulting", font=f_word)
    d.text((PAD + 104 + name_width + 3, 92), ".", font=f_word, fill=BRASS)

    # Eyebrow: short rule then spaced caps.
    eyebrow_y = 212
    d.line([(PAD, eyebrow_y + 9), (PAD + 26, eyebrow_y + 9)], fill=BRASS, width=2)
    tracked_text(d, (PAD + 40, eyebrow_y), EYEBROW, font(BODY_SANS_SEMIBOLD, 17), BRASS, 2.6)

    f_head = font(DISPLAY_SERIF, 62)
    for i, line in enumerate(HEADLINE):
        d.text((PAD, 264 + i * 76), line, font=f_head, fill=CHARCOAL)

    f_body = font(BODY_SANS, 25)
    for i, line in enumerate(SUPPORTING):
        d.text((PAD, 474 + i * 36), line, font=f_body, fill=CHARCOAL_DIM)

    f_meta = font(BODY_SANS_SEMIBOLD, 19)
    d.text((PAD, 566), "QBPES\u2122", font=f_meta, fill=BRASS)
    meta_width = d.textlength("QBPES\u2122", font=f_meta)
    d.text((PAD + meta_width + 14, 566), "\u00b7  qamiraconsulting.com", font=f_meta, fill=CHARCOAL_DIM)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB, {WIDTH}x{HEIGHT})")


if __name__ == "__main__":
    main()
