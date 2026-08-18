"""
News de CRM for the Arpejo .report — a single tall image (not a .pptx) meant
to be pasted straight into the body of a client email/CRM campaign. Confirmed
by Bianca (agosto/26): recap completo (News + Trends + @arpejo + Insights +
Indicações), same content scope as material de cliente, but laid out as a
narrow single-column newsletter (curated/editorial style, closer to WGSN's
"Future Proof" reference than a dense daily like "the news" — see
references/news-crm.md), restyled into the .report visual identity.

This is the authoritative pattern going forward — do not redesign it from
scratch next time; edit only `lib/news_email_content.py` (cover
tagline/date, NEWS, TRENDS, ARPEJO_CASES, INSIGHTS, RECS, FONTES) — that
module is shared with build_news_email_marketing_html.py so the flat-image
preview and the real sendable HTML never drift apart. Everything in this
file is the engine — don't edit unless the layout itself needs to change.

pptxgenjs/PowerPoint aren't used here on purpose: this deliverable is a flat
image, not a slide deck, so a plain HTML/CSS render + full-page screenshot is
simpler and avoids every pptxgenjs quirk documented in SKILL.md. Real fonts
are embedded as base64 @font-face (only regular weights exist as plain .ttf
in brand-guidelines/assets/fonts — italic/bold are the browser's own faux
synthesis, same approach as the carousel's interactive HTML preview).

Usage:
  python3 build_news_email.py <report-assets-dir> <brand-assets-dir> <photos-dir> [out-html]
    <report-assets-dir> = .../arpejo-report-desdobramento/assets
    <brand-assets-dir>  = .../brand-guidelines/assets
    <photos-dir>        = directory with that month's extracted trend/case photos
      (see scripts/extract_report_photos.py)

Then render the actual image with capture_news_email.py (Playwright
full-page screenshot) — see that script's usage for width/format options.
"""
import base64, pathlib, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from lib.news_email_content import (
    LIME, CORAL, BLACK, WHITE, EMAIL_W,
    COVER_TAGLINE_LINES, COVER_INTRO, COVER_DATE, CLOSING_LINE,
    NEWS, TRENDS, ARPEJO_CASES, INSIGHTS, RECS, FONTES,
)

if len(sys.argv) < 4:
    print("usage: python3 build_news_email.py <report-assets-dir> <brand-assets-dir> <photos-dir> [out-html]", file=sys.stderr)
    sys.exit(1)

REPORT_ASSETS = pathlib.Path(sys.argv[1])
BRAND_ASSETS = pathlib.Path(sys.argv[2])
PHOTOS = pathlib.Path(sys.argv[3])
OUT_HTML = pathlib.Path(sys.argv[4]) if len(sys.argv) > 4 else pathlib.Path("out/news-email.html")


def b64(p):
    return base64.b64encode(pathlib.Path(p).read_bytes()).decode()


def img_uri(p, mime="image/png"):
    return f"data:{mime};base64,{b64(p)}"


def photo_uri(name):
    return img_uri(PHOTOS / name, mime="image/jpeg")


LOGO_BLACK = img_uri(REPORT_ASSETS / "arpejo-report-logo-all-black.png")
GLOBE_BLACK = img_uri(BRAND_ASSETS / "textures/globe-black.png")

FONT_LIBRE = b64(BRAND_ASSETS / "fonts/LibreBaskerville-Regular.ttf")
FONT_MONO_REG = b64(BRAND_ASSETS / "fonts/JetBrainsMono-Regular.ttf")
FONT_MONO_BOLD = b64(BRAND_ASSETS / "fonts/JetBrainsMono-Bold.ttf")


def plus_row(color, n=9):
    spans = "".join('<span style="margin-right:22px;">+</span>' for _ in range(n))
    return f'<div style="font-family:\'JetBrains Mono\',monospace;color:{color};font-size:13px;opacity:.55;white-space:nowrap;overflow:hidden;">{spans}</div>'


def oval_badge(text, accent, size="14px"):
    return (
        f'<span style="display:inline-block;border:1.3px solid {accent};border-radius:999px;'
        f'padding:6px 18px;font-family:\'Libre Baskerville\',serif;font-style:italic;font-weight:700;'
        f'color:{accent};font-size:{size};">{text}</span>'
    )


def eyebrow(text, color=LIME):
    return (
        f'<p style="font-family:\'JetBrains Mono\',monospace;font-weight:700;color:{color};'
        f'font-size:13px;letter-spacing:.06em;text-transform:uppercase;margin:0 0 16px;">{text}</p>'
    )


def news_card(item):
    return f"""
    <div style="background:#141414;border:1px solid #2a2a2a;border-radius:14px;padding:20px 22px;margin-bottom:14px;">
      {oval_badge(item['badge'], LIME, '13px')}
      <p style="margin:14px 0 0;color:{WHITE};font-family:Arial,sans-serif;font-size:14.5px;line-height:1.5;">{item['body']}</p>
    </div>"""


def trend_block(item):
    return f"""
    <div style="background:{BLACK};border-radius:16px;overflow:hidden;margin-bottom:22px;border:1px solid #262626;">
      <div style="width:100%;height:220px;background-image:url('{photo_uri(item['photo'])}');background-size:cover;background-position:center;"></div>
      <div style="padding:22px 24px 26px;">
        <p style="margin:0 0 6px;font-family:'Libre Baskerville',serif;font-style:italic;font-weight:700;color:{item['accent']};font-size:19px;">{item['title']}</p>
        <p style="margin:0 0 14px;font-family:'Libre Baskerville',serif;font-style:italic;color:{WHITE};font-size:13.5px;">{item['sub']}</p>
        <p style="margin:0 0 14px;font-family:Arial,sans-serif;color:{WHITE};font-size:14px;line-height:1.55;">{item['body']}</p>
        <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-weight:700;color:{item['accent']};font-size:13px;">Para as marcas:</p>
        <p style="margin:0;font-family:Arial,sans-serif;color:{WHITE};font-size:14px;line-height:1.55;">{item['for_brands']}</p>
      </div>
    </div>"""


def arpejo_case(item):
    return f"""
    <div style="background:#141414;border:1px solid #2a2a2a;border-radius:14px;padding:22px 24px;margin-bottom:16px;">
      {oval_badge(item['badge'], item['accent'], '14px')}
      <p style="margin:16px 0 16px;color:{WHITE};font-family:Arial,sans-serif;font-size:14px;line-height:1.55;">{item['concept']}</p>
      <p style="margin:0;font-family:'JetBrains Mono',monospace;font-weight:700;color:{item['accent']};font-size:13.5px;text-decoration:underline;">&#9654; assistir ao case</p>
    </div>"""


def insight_card(item):
    return f"""
    <div style="background:#141414;border:1px solid #2a2a2a;border-radius:12px;padding:16px 18px;">
      {oval_badge(item['badge'], LIME, '12px')}
      <p style="margin:12px 0 0;color:{WHITE};font-family:Arial,sans-serif;font-size:12.5px;line-height:1.5;">{item['body']}</p>
    </div>"""


insights_grid = "".join(
    f'<div style="width:47.5%;{"margin-right:5%;" if i % 2 == 0 else ""}display:inline-block;vertical-align:top;margin-bottom:14px;">{insight_card(it)}</div>'
    for i, it in enumerate(INSIGHTS)
)

news_html = "".join(news_card(n) for n in NEWS)
trends_html = "".join(trend_block(t) for t in TRENDS)
cases_html = "".join(arpejo_case(c) for c in ARPEJO_CASES)
recs_html = "".join(f'<p style="margin:0 0 10px;font-family:\'JetBrains Mono\',monospace;color:{LIME};font-size:14px;">_ {r}</p>' for r in RECS)
fontes_html = "".join(f'<p style="margin:0 0 6px;font-family:Arial,sans-serif;color:#888;font-size:11px;font-style:italic;">{f}</p>' for f in FONTES)
tagline_html = "<br>".join(COVER_TAGLINE_LINES)

HTML = f"""<!doctype html>
<meta charset="utf-8">
<style>
@font-face {{ font-family: "Libre Baskerville"; src: url(data:font/ttf;base64,{FONT_LIBRE}) format("truetype"); }}
@font-face {{ font-family: "JetBrains Mono"; font-weight: 400; src: url(data:font/ttf;base64,{FONT_MONO_REG}) format("truetype"); }}
@font-face {{ font-family: "JetBrains Mono"; font-weight: 700; src: url(data:font/ttf;base64,{FONT_MONO_BOLD}) format("truetype"); }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; background: #999; }}
#email {{ width: {EMAIL_W}px; margin: 0 auto; background: {BLACK}; }}
</style>
<body>
<div id="email">

  <div style="background:{LIME};padding:32px 32px 30px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:26px;">
      <span style="font-family:'JetBrains Mono',monospace;font-weight:700;color:{BLACK};font-size:13px;">report&#8599;</span>
      <img src="{GLOBE_BLACK}" style="width:26px;height:26px;">
    </div>
    {plus_row(BLACK)}
    <div style="height:22px;"></div>
    <img src="{LOGO_BLACK}" style="width:220px;display:block;margin:0 0 22px;">
    <p style="margin:0 0 14px;font-family:'Libre Baskerville',serif;font-style:italic;font-weight:700;color:{BLACK};font-size:26px;line-height:1.25;">{tagline_html}</p>
    <p style="margin:0;font-family:Arial,sans-serif;color:#1a1a1a;font-size:14.5px;line-height:1.6;">{COVER_INTRO}</p>
    <p style="margin:22px 0 0;font-family:'JetBrains Mono',monospace;color:#333;font-size:12px;letter-spacing:.05em;">{COVER_DATE}</p>
  </div>

  <div style="background:{BLACK};padding:26px 32px;border-bottom:1px solid #222;">
    {eyebrow("Nesta edição")}
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;color:{WHITE};font-size:13.5px;">&#8594; News: o que mudou nas plataformas</p>
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;color:{WHITE};font-size:13.5px;">&#8594; Trends: os comportamentos que vêm aí</p>
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;color:{WHITE};font-size:13.5px;">&#8594; @arpejo: o que a gente fez esse mês</p>
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;color:{WHITE};font-size:13.5px;">&#8594; Insights: cases que inspiram (exclusivo pra você)</p>
    <p style="margin:0;font-family:Arial,sans-serif;color:{WHITE};font-size:13.5px;">&#8594; Indicações do time</p>
  </div>

  <div style="background:{BLACK};padding:32px 32px 8px;">
    {eyebrow("News")}
    {news_html}
  </div>

  <div style="background:{BLACK};padding:8px 32px 8px;">
    {eyebrow("Trends")}
    {trends_html}
  </div>

  <div style="background:{BLACK};padding:8px 32px 8px;">
    {eyebrow("@arpejo — o que fizemos esse mês")}
    {cases_html}
  </div>

  <div style="background:{BLACK};padding:8px 32px 32px;">
    {eyebrow("Insights — inspirações do mês (exclusivo pra você)")}
    <div style="font-size:0;">{insights_grid}</div>
  </div>

  <div style="background:{BLACK};padding:0 32px 32px;">
    {eyebrow("Indicações Arpejers")}
    {recs_html}
  </div>

  <div style="background:{BLACK};padding:0 32px 26px;border-bottom:1px solid #222;">
    {fontes_html}
  </div>

  <div style="background:{LIME};padding:36px 32px;text-align:center;">
    <img src="{LOGO_BLACK}" style="width:150px;display:inline-block;margin-bottom:16px;">
    <p style="margin:0 0 18px;font-family:'Libre Baskerville',serif;font-style:italic;color:{BLACK};font-size:15px;">{CLOSING_LINE}</p>
    {plus_row(BLACK)}
  </div>

</div>
</body>
"""

OUT_HTML.parent.mkdir(parents=True, exist_ok=True)
OUT_HTML.write_text(HTML, encoding="utf-8")
print("wrote", OUT_HTML, len(HTML), "bytes")

if ARPEJO_CASES:
    print("\nlinks reais pra ligar na campanha (ver references/news-crm.md):")
    for c in ARPEJO_CASES:
        print(f"  {c['badge']} -> {c['video']}")
