#!/usr/bin/env python3
"""One-time extraction of the Arpejo .report's static brand icons/textures
(corner arrow, globe, interlocking rings, plus-grid, cover wavy lines, corner
sparkle mark) straight out of a report PDF, instead of approximating them
with text glyphs.

These are brand-wide assets, not month-specific content — unlike
extract_report_photos.py (which pulls that month's Trends photography), you
should only need to run this once, whenever the report's design template
changes. Page numbers below match the agosto_26 edition; if a future
redesign moves things around, use `pdfimages -list` to find the new pages
before re-running.

Usage:
  python extract_texture_assets.py report.pdf --out-dir textures/
"""
import argparse
import subprocess
import tempfile
from pathlib import Path

from PIL import Image


def extract_page(pdf_path, page, workdir):
    prefix = workdir / f"p{page}"
    subprocess.run(
        ["pdfimages", "-f", str(page), "-l", str(page), "-png", str(pdf_path), str(prefix)],
        check=True,
        capture_output=True,
    )
    return sorted(prefix.parent.glob(f"{prefix.name}-*.png"))


def alpha_mask(mask_path):
    """The mask file's luminance, usable as an alpha channel regardless of
    the paired base image's own color."""
    return Image.open(mask_path).convert("L")


def save_recolored(mask_img, hex_color, out_path):
    rgb = tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))
    solid = Image.new("RGBA", mask_img.size, rgb + (255,))
    solid.putalpha(mask_img)
    solid.save(out_path)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("pdf")
    p.add_argument("--out-dir", default=".")
    p.add_argument("--cover-page", type=int, default=1, help="page with the wavy-lines + sparkle cover art")
    p.add_argument("--grid-page", type=int, default=3, help="black-bg page with the full-slide plus-grid texture")
    p.add_argument("--arrow-page", type=int, default=4, help="black-bg divider page with the corner arrow / rings icons")
    p.add_argument("--colored-card-page", type=int, default=6, help="a lime/coral News card page, where the globe/arrow render black")
    args = p.parse_args()

    out = Path(args.out_dir)
    out.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as tmp:
        workdir = Path(tmp)

        files = extract_page(args.pdf, args.cover_page, workdir)
        save_recolored(alpha_mask(files[1]), "FFFFFF", out / "wavy-lines-white.png")
        save_recolored(alpha_mask(files[5]), "FFFFFF", out / "sparkle-white.png")

        files = extract_page(args.pdf, args.grid_page, workdir)
        grid_rgba = Image.open(files[0]).convert("RGB").convert("RGBA")
        grid_rgba.putalpha(alpha_mask(files[1]))
        black_bg = Image.new("RGB", grid_rgba.size, (0, 0, 0))
        black_bg.paste(grid_rgba, mask=grid_rgba.split()[3])
        black_bg.save(out / "plus-grid-on-black.png")

        files = extract_page(args.pdf, args.arrow_page, workdir)
        arrow_mask = alpha_mask(files[1])
        save_recolored(arrow_mask, "DAFF94", out / "arrow-lime.png")
        save_recolored(arrow_mask, "000000", out / "arrow-black.png")
        save_recolored(arrow_mask, "FFFFFF", out / "arrow-white.png")
        save_recolored(alpha_mask(files[11]), "DAFF94", out / "rings-lime.png")

        files = extract_page(args.pdf, args.colored_card_page, workdir)
        globe_mask = alpha_mask(files[6])
        save_recolored(globe_mask, "000000", out / "globe-black.png")
        save_recolored(globe_mask, "DAFF94", out / "globe-lime.png")
        save_recolored(globe_mask, "FFFFFF", out / "globe-white.png")

    print("wrote:", sorted(f.name for f in out.glob("*.png")))


if __name__ == "__main__":
    main()
