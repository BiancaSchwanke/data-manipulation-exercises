#!/usr/bin/env python3
"""Extract the full-bleed background photo behind a Trends or News card of
the Arpejo .report PDF, for reuse in derivative pieces (e.g. real photography
in the Instagram carousel instead of a flat color card).

Each Trends/News page embeds its background photo as an RGB image
immediately followed by its grayscale soft mask (same dimensions) — that's
how the darkened/vignetted look in the report is produced. This script pairs
the two, composites the mask as alpha over a solid background (default
Arpejo black), and writes one PNG per page.

Usage:
  python extract_report_photos.py report.pdf 14 15 16 17 --out-dir photos/
"""
import argparse
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image


def images_on_page(pdf_path, page, workdir):
    prefix = workdir / f"p{page}"
    subprocess.run(
        ["pdfimages", "-f", str(page), "-l", str(page), "-png", str(pdf_path), str(prefix)],
        check=True,
        capture_output=True,
    )
    return sorted(prefix.parent.glob(f"{prefix.name}-*.png"))


def find_background_pair(files):
    """The background photo is the first RGB image on the page whose very
    next extracted image is a same-size grayscale mask. Small recurring
    icons (logos, globe/ring marks) are RGB+mask pairs too, so pick the
    pair with the largest pixel area — the full-bleed photo is always
    bigger than a decorative icon."""
    best = None
    for i in range(len(files) - 1):
        with Image.open(files[i]) as a, Image.open(files[i + 1]) as b:
            if a.mode == "RGB" and b.mode == "L" and a.size == b.size:
                area = a.size[0] * a.size[1]
                if best is None or area > best[0]:
                    best = (area, files[i], files[i + 1])
    if best is None:
        return None
    return best[1], best[2]


def composite(base_path, mask_path, background_hex):
    bg_rgb = tuple(int(background_hex[i : i + 2], 16) for i in (0, 2, 4))
    base = Image.open(base_path).convert("RGB")
    mask = Image.open(mask_path).convert("L")
    flat = Image.new("RGB", base.size, bg_rgb)
    flat.paste(base, mask=mask)
    return flat


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("pdf")
    p.add_argument("pages", nargs="+", type=int, help="1-indexed page numbers to extract from (one photo per page)")
    p.add_argument("--out-dir", default=".")
    p.add_argument("--background", default="000000")
    args = p.parse_args()

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as tmp:
        workdir = Path(tmp)
        for page in args.pages:
            files = images_on_page(args.pdf, page, workdir)
            pair = find_background_pair(files)
            if not pair:
                print(f"page {page}: no background+mask pair found, skipping", file=sys.stderr)
                continue
            base_path, mask_path = pair
            result = composite(base_path, mask_path, args.background)
            out_path = out_dir / f"page{page}-background.png"
            result.save(out_path)
            print(f"page {page}: {base_path.name} + {mask_path.name} ({result.width}x{result.height}) -> {out_path}", file=sys.stderr)


if __name__ == "__main__":
    main()
