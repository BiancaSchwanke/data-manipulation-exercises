"""
Turns the tall News de CRM PNG (from capture_news_email.py) into a scrolling
preview GIF — a phone-sized window panning from top to bottom, since the
deliverable is one continuous image and a slide-by-slide GIF (like the
carousel/prospecção ones) doesn't apply here. Confirmed pacing with Bianca
in agosto/26: ~110ms/frame reads as a comfortable, unhurried scroll (60ms
felt rushed).

Usage: python3 build_news_email_scroll_gif.py <in.png> <out.gif> [out_width]
"""
import sys
from PIL import Image

if len(sys.argv) < 3:
    print("usage: python3 build_news_email_scroll_gif.py <in.png> <out.gif> [out_width]", file=sys.stderr)
    sys.exit(1)

src_path, out_path = sys.argv[1], sys.argv[2]
out_w = int(sys.argv[3]) if len(sys.argv) > 3 else 480

im = Image.open(src_path).convert("RGB")
W, H = im.size

VIEWPORT_H = int(W * 1.35)  # phone-ish preview window, in source-image px
OUT_H = int(out_w * VIEWPORT_H / W)

N_SCROLL = 46
HOLD_START, HOLD_END = 6, 8
DURATION_MS = 110

scroll_range = H - VIEWPORT_H
ys = [int(i / (N_SCROLL - 1) * scroll_range) for i in range(N_SCROLL)]

frames = [
    im.crop((0, y, W, y + VIEWPORT_H)).resize((out_w, OUT_H), Image.LANCZOS)
    for y in ys
]
sequence = [frames[0]] * HOLD_START + frames + [frames[-1]] * HOLD_END
frames_p = [f.convert("P", palette=Image.ADAPTIVE, colors=128) for f in sequence]

frames_p[0].save(
    out_path,
    save_all=True,
    append_images=frames_p[1:],
    duration=DURATION_MS,
    loop=0,
    optimize=True,
)
print("wrote", out_path, "frames:", len(frames_p), "size:", (out_w, OUT_H))
