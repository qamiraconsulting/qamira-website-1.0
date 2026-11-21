"""Convert site photos in public/photos to right-sized WebP.

Every photo on the site is shown at most about 600 CSS pixels wide, so a
1200px-wide WebP covers 2x screens with room to spare, at a fraction of
the size of the original 1500-2000px JPEGs.

Run it whenever a new .jpg or .png lands in public/photos:

    pip install Pillow
    python scripts/optimise-photos.py

It writes <name>.webp next to each source, deletes the source, and prints
the saving. The code references the .webp paths, so a new photo must be
converted before it will show. Like make-og-card.py, this is a manual,
run-once tool, deliberately not part of `npm run build`.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PHOTOS = ROOT / "public" / "photos"
MAX_WIDTH = 1200
QUALITY = 80


def main():
    before = after = 0
    for src in sorted(PHOTOS.rglob("*")):
        if src.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        out = src.with_suffix(".webp")
        with Image.open(src) as img:
            img = img.convert("RGB")
            if img.width > MAX_WIDTH:
                img = img.resize((MAX_WIDTH, round(img.height * MAX_WIDTH / img.width)), Image.LANCZOS)
            img.save(out, "WEBP", quality=QUALITY, method=6)
        before += src.stat().st_size
        after += out.stat().st_size
        print(f"{src.relative_to(ROOT)}: {src.stat().st_size // 1024} KB -> {out.stat().st_size // 1024} KB")
        src.unlink()
    if before:
        print(f"total: {before // 1024} KB -> {after // 1024} KB")
    else:
        print("nothing to convert")


if __name__ == "__main__":
    main()
