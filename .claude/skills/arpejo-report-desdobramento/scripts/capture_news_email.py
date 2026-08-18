"""
Renders the News de CRM HTML (built by build_news_email.py) to a single
tall image — a full-page Playwright screenshot of the #email element,
since this deliverable is one flat image to paste into an email body, not
a slide deck. Also the only reliable rendering path in this environment:
LibreOffice/soffice conversion is broken here (see SKILL.md), but that
never applied to this deliverable anyway since it was never a .pptx.

Usage:
  python3 capture_news_email.py <in.html> <out.png|out.jpg> [width_px] [scale]
    width_px = CSS width of the email column to render (default 640, the
      standard email-body width — must match EMAIL_W in build_news_email.py
      or the capture will crop/pad incorrectly)
    scale    = device_scale_factor for crisper output (default 2 = retina;
      the final image pixel width is width_px * scale)

Output format is inferred from the extension. JPEG is recommended for
delivery (much smaller than PNG for a newsletter-length image with photos,
with no visible quality loss at quality~88-90 — see references/news-crm.md);
PNG is useful for a lossless intermediate before building the scroll GIF.
"""
import sys, pathlib
from playwright.sync_api import sync_playwright

if len(sys.argv) < 3:
    print("usage: python3 capture_news_email.py <in.html> <out.png|out.jpg> [width_px] [scale]", file=sys.stderr)
    sys.exit(1)

html_path = pathlib.Path(sys.argv[1]).resolve()
out_path = pathlib.Path(sys.argv[2])
width = int(sys.argv[3]) if len(sys.argv) > 3 else 640
scale = float(sys.argv[4]) if len(sys.argv) > 4 else 2

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path="/opt/pw-browsers/chromium")
    page = browser.new_page(viewport={"width": width, "height": 800}, device_scale_factor=scale)
    page.goto(html_path.as_uri())
    page.wait_for_timeout(400)
    page.locator("#email").screenshot(path=str(out_path))
    browser.close()

print("wrote", out_path)
