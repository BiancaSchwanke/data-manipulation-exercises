#!/usr/bin/env python3
"""Real image enhancement: upscale (Lanczos), sharpen (unsharp mask), and
optionally cover-crop to a target aspect ratio. No fabricated claims — this
only does what classical resampling and sharpening can actually do. It will
not invent detail a low-resolution source doesn't have; for genuinely small
or blurry sources, upscaling makes the image bigger and crisper-looking, not
higher-fidelity.

Usage:
  python enhance.py input.png output.png
  python enhance.py input.png output.png --width 1080 --height 1350
  python enhance.py input.png output.png --sharpen 120 --background 000000
"""
import argparse
import sys
from PIL import Image, ImageFilter


def cover_crop(im, target_w, target_h):
    """Resize+crop im to exactly target_w x target_h, filling the frame
    (like CSS object-fit: cover) instead of squashing or letterboxing."""
    src_ratio = im.width / im.height
    dst_ratio = target_w / target_h
    if src_ratio > dst_ratio:
        # source is wider than target: match height, crop width
        new_h = target_h
        new_w = round(new_h * src_ratio)
    else:
        new_w = target_w
        new_h = round(new_w / src_ratio)
    im = im.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    return im.crop((left, top, left + target_w, top + target_h))


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("input")
    p.add_argument("output")
    p.add_argument("--width", type=int, help="Target width in px. Requires --height. Cover-crops to this exact box.")
    p.add_argument("--height", type=int, help="Target height in px. Requires --width.")
    p.add_argument("--min-long-edge", type=int, default=1600, help="If no --width/--height given, upscale so the longer edge reaches at least this many px (default 1600). No-op if already larger.")
    p.add_argument("--sharpen", type=int, default=110, help="Unsharp mask 'percent' strength (default 110). 0 disables sharpening.")
    p.add_argument("--background", default="000000", help="Hex color (no #) to flatten transparency onto, for images with an alpha/soft mask (default 000000, matches the Arpejo black).")
    args = p.parse_args()

    im = Image.open(args.input)

    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        im = im.convert("RGBA")
        bg_hex = args.background.lstrip("#")
        bg_rgb = tuple(int(bg_hex[i : i + 2], 16) for i in (0, 2, 4))
        flat = Image.new("RGB", im.size, bg_rgb)
        flat.paste(im, mask=im.split()[3])
        im = flat
    else:
        im = im.convert("RGB")

    before = im.size

    if args.width and args.height:
        im = cover_crop(im, args.width, args.height)
    else:
        long_edge = max(im.size)
        if long_edge < args.min_long_edge:
            scale = args.min_long_edge / long_edge
            im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)

    if args.sharpen > 0:
        im = im.filter(ImageFilter.UnsharpMask(radius=2, percent=args.sharpen, threshold=3))

    im.save(args.output, quality=92)
    print(f"{args.input}: {before[0]}x{before[1]} -> {args.output}: {im.width}x{im.height}", file=sys.stderr)


if __name__ == "__main__":
    main()
