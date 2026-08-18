"""
News de CRM — real, sendable HTML for an email-marketing tool (Mailchimp,
RD Station, etc.), as opposed to build_news_email.py's flat-image version
(which is meant to be pasted as a single picture into an email body).
Same content (imports lib/news_email_content.py — edit content there, not
here) and the same .report visual identity, but built the way production
HTML email actually has to be built:

- **Table-based layout, inline styles.** <div>+CSS (used for the flat-image
  preview) is not reliable across real email clients, especially Outlook
  desktop, which renders with Word's engine — no CSS background-image, no
  flexbox, no border-radius. Tables + inline styles are the only layout
  that survives everywhere.
- **Web-safe font fallbacks, not the real brand fonts.** Custom @font-face
  is unreliable in email (Gmail strips it; Outlook desktop ignores it), so
  this uses Georgia/serif standing in for Libre Baskerville's italic voice
  and Courier New/monospace standing in for JetBrains Mono. This is a real
  visual downgrade from the pptx/image deliverables — flag it to Bianca,
  don't silently pretend it's the same.
- **Pre-cropped image files, not CSS `background-size: cover`.** Outlook
  can't crop via CSS, so every trend photo is exported already cropped to
  its exact display box (see export_assets()) instead of relying on
  background-image + cover like the flat-image version does.
- **No base64 images.** Many ESPs/clients strip or block data: URIs, and
  a newsletter-length email inlined as base64 would be enormous anyway.
  Every image ships as a real file in <out-dir>/assets/ with a placeholder
  `src="assets/<filename>"` (works for local preview, not a real host) —
  upload each file to the email tool's image host, then swap that `src`
  for the URL it gives you. Each <img> has an HTML comment right above it
  naming the asset file, so the find/replace is mechanical.
- **Real <a href> only where a real URL exists.** That's just the @arpejo
  cases (their video links are known). News/Trends titles are left as
  plain styled text — do NOT invent a link destination for those; ask
  Bianca first (see references/news-crm.md).

Usage:
  python3 build_news_email_marketing_html.py <report-assets-dir> <brand-assets-dir> <photos-dir> <out-dir>
    (same directory args as build_news_email.py — see that script's usage)

Writes <out-dir>/email.html and <out-dir>/assets/*.
"""
import pathlib, sys
from PIL import Image

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from lib.news_email_content import (
    LIME, CORAL, BLACK, WHITE, EMAIL_W,
    COVER_TAGLINE_LINES, COVER_INTRO, COVER_DATE, CLOSING_LINE,
    NEWS, TRENDS, ARPEJO_CASES, INSIGHTS, RECS, FONTES,
)

if len(sys.argv) < 5:
    print("usage: python3 build_news_email_marketing_html.py <report-assets-dir> <brand-assets-dir> <photos-dir> <out-dir>", file=sys.stderr)
    sys.exit(1)

REPORT_ASSETS = pathlib.Path(sys.argv[1])
BRAND_ASSETS = pathlib.Path(sys.argv[2])
PHOTOS = pathlib.Path(sys.argv[3])
OUT_DIR = pathlib.Path(sys.argv[4])
ASSETS_OUT = OUT_DIR / "assets"
ASSETS_OUT.mkdir(parents=True, exist_ok=True)

SERIF = "Georgia, 'Times New Roman', serif"
MONO = "'Courier New', Courier, monospace"
SANS = "Arial, Helvetica, sans-serif"

TREND_PHOTO_W, TREND_PHOTO_H = 1280, 440  # 2x retina, matches the 640x220 display box


def export_assets():
    """Copy/crop every image this email needs into ASSETS_OUT, pre-cropped
    to its exact display size (no CSS cover-crop in real email HTML)."""
    (ASSETS_OUT / "logo-preto.png").write_bytes((REPORT_ASSETS / "arpejo-report-logo-all-black.png").read_bytes())
    (ASSETS_OUT / "globo-preto.png").write_bytes((BRAND_ASSETS / "textures/globe-black.png").read_bytes())

    for t in TRENDS:
        src = Image.open(PHOTOS / t["photo"]).convert("RGB")
        sw, sh = src.size
        target_ratio = TREND_PHOTO_W / TREND_PHOTO_H
        src_ratio = sw / sh
        if src_ratio > target_ratio:
            new_w = int(sh * target_ratio)
            x0 = (sw - new_w) // 2
            box = (x0, 0, x0 + new_w, sh)
        else:
            new_h = int(sw / target_ratio)
            y0 = (sh - new_h) // 2
            box = (0, y0, sw, y0 + new_h)
        cropped = src.crop(box).resize((TREND_PHOTO_W, TREND_PHOTO_H), Image.LANCZOS)
        out_name = pathlib.Path(t["photo"]).stem + f"-{TREND_PHOTO_W}x{TREND_PHOTO_H}.jpg"
        cropped.save(ASSETS_OUT / out_name, quality=88, optimize=True)
        t["_export_name"] = out_name


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def oval_badge(text, accent):
    return (
        f'<span style="display:inline-block;border:1.5px solid {accent};border-radius:999px;'
        f'padding:6px 16px;font-family:{SERIF};font-style:italic;font-weight:bold;'
        f'color:{accent};font-size:14px;">{esc(text)}</span>'
    )


def eyebrow(text, color=LIME):
    return (
        f'<p style="margin:0 0 16px;font-family:{MONO};font-weight:bold;color:{color};'
        f'font-size:13px;letter-spacing:1px;text-transform:uppercase;">{esc(text)}</p>'
    )


def row(inner_html, bg=BLACK, pad="32px", align="left", border_bottom=False):
    tr_style = "border-bottom:1px solid #222222;" if border_bottom else ""
    td_style = f"background:{bg};padding:{pad};text-align:{align};"
    return f'<tr style="{tr_style}"><td style="{td_style}" bgcolor="{bg}">{inner_html}</td></tr>'


def news_card(item):
    return f"""
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
      <tr><td style="background:#141414;border:1px solid #2a2a2a;border-radius:14px;padding:20px 22px;" bgcolor="#141414">
        {oval_badge(item['badge'], LIME)}
        <p style="margin:14px 0 0;color:{WHITE};font-family:{SANS};font-size:14.5px;line-height:1.5;">{esc(item['body'])}</p>
      </td></tr>
    </table>"""


def trend_block(item):
    img_name = item["_export_name"]
    for_brands_html = (
        f'<p style="margin:0 0 4px;font-family:{SANS};font-weight:bold;color:{item["accent"]};font-size:13px;">Para as marcas:</p>'
        f'<p style="margin:0;font-family:{SANS};color:{WHITE};font-size:14px;line-height:1.55;">{esc(item["for_brands"])}</p>'
    )
    title_html = (
        f'<a href="{item["link"]}" style="color:{item["accent"]};text-decoration:none;">{esc(item["title"])}</a>'
        if item.get("link") else esc(item["title"])
    )
    return f"""
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">
      <tr><td style="background:{BLACK};border:1px solid #262626;border-radius:16px;" bgcolor="{BLACK}">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="line-height:0;font-size:0;">
            <!-- ASSET: {img_name} -->
            <img src="assets/{img_name}" width="{TREND_PHOTO_W // 2}" alt="{esc(item['title'])}"
                 style="display:block;width:100%;max-width:100%;height:auto;border-radius:16px 16px 0 0;">
          </td></tr>
          <tr><td style="padding:22px 24px 26px;">
            <p style="margin:0 0 6px;font-family:{SERIF};font-style:italic;font-weight:bold;color:{item['accent']};font-size:19px;">{title_html}</p>
            <p style="margin:0 0 14px;font-family:{SERIF};font-style:italic;color:{WHITE};font-size:13.5px;">{esc(item['sub'])}</p>
            <p style="margin:0 0 14px;font-family:{SANS};color:{WHITE};font-size:14px;line-height:1.55;">{esc(item['body'])}</p>
            {for_brands_html}
          </td></tr>
        </table>
      </td></tr>
    </table>"""


def arpejo_case(item):
    return f"""
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr><td style="background:#141414;border:1px solid #2a2a2a;border-radius:14px;padding:22px 24px;" bgcolor="#141414">
        {oval_badge(item['badge'], item['accent'])}
        <p style="margin:16px 0 16px;color:{WHITE};font-family:{SANS};font-size:14px;line-height:1.55;">{esc(item['concept'])}</p>
        <a href="{item['video']}" style="font-family:{MONO};font-weight:bold;color:{item['accent']};font-size:13.5px;text-decoration:underline;">&#9654; assistir ao case</a>
      </td></tr>
    </table>"""


def insight_card(item):
    return f"""
    <td width="50%" valign="top" style="padding:0 7px 14px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="background:#141414;border:1px solid #2a2a2a;border-radius:12px;padding:16px 18px;" bgcolor="#141414">
          {oval_badge(item['badge'], LIME)}
          <p style="margin:12px 0 0;color:{WHITE};font-family:{SANS};font-size:12.5px;line-height:1.5;">{esc(item['body'])}</p>
        </td></tr>
      </table>
    </td>"""


def insights_grid():
    rows = []
    for i in range(0, len(INSIGHTS), 2):
        pair = INSIGHTS[i:i + 2]
        cells = "".join(insight_card(it) for it in pair)
        if len(pair) == 1:
            cells += '<td width="50%"></td>'
        rows.append(f"<tr>{cells}</tr>")
    return f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0">{"".join(rows)}</table>'


def build():
    export_assets()

    news_html = "".join(news_card(n) for n in NEWS)
    trends_html = "".join(trend_block(t) for t in TRENDS)
    cases_html = "".join(arpejo_case(c) for c in ARPEJO_CASES)
    recs_html = "".join(f'<p style="margin:0 0 10px;font-family:{MONO};color:{LIME};font-size:14px;">_ {esc(r)}</p>' for r in RECS)
    fontes_html = "".join(f'<p style="margin:0 0 6px;font-family:{SANS};color:#888888;font-size:11px;font-style:italic;">{esc(f)}</p>' for f in FONTES)
    tagline_html = "<br>".join(esc(l) for l in COVER_TAGLINE_LINES)
    nesta_edicao_items = [
        "News: o que mudou nas plataformas",
        "Trends: os comportamentos que vêm aí",
        "@arpejo: o que a gente fez esse mês",
        "Insights: cases que inspiram (exclusivo pra você)",
        "Indicações do time",
    ]
    nesta_edicao_html = "".join(
        f'<p style="margin:0 0 8px;font-family:{SANS};color:{WHITE};font-size:13.5px;">&#8594; {esc(t)}</p>'
        for t in nesta_edicao_items
    )

    header_html = f"""
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-family:{MONO};font-weight:bold;color:{BLACK};font-size:13px;" align="left">report&#8599;</td>
          <td align="right">
            <!-- ASSET: globo-preto.png -->
            <img src="assets/globo-preto.png" width="26" height="26" alt="" style="display:inline-block;">
          </td>
        </tr>
      </table>
      <div style="height:22px;"></div>
      <!-- ASSET: logo-preto.png -->
      <img src="assets/logo-preto.png" width="220" alt="arpejo report" style="display:block;width:220px;max-width:60%;height:auto;margin:0 0 22px;">
      <p style="margin:0 0 14px;font-family:{SERIF};font-style:italic;font-weight:bold;color:{BLACK};font-size:26px;line-height:1.25;">{tagline_html}</p>
      <p style="margin:0;font-family:{SANS};color:#1a1a1a;font-size:14.5px;line-height:1.6;">{esc(COVER_INTRO)}</p>
      <p style="margin:22px 0 0;font-family:{MONO};color:#333333;font-size:12px;letter-spacing:1px;">{esc(COVER_DATE)}</p>
    """

    footer_html = f"""
      <!-- ASSET: logo-preto.png -->
      <img src="assets/logo-preto.png" width="150" alt="arpejo report" style="display:inline-block;width:150px;max-width:50%;height:auto;margin-bottom:16px;">
      <p style="margin:0;font-family:{SERIF};font-style:italic;color:{BLACK};font-size:15px;">{esc(CLOSING_LINE)}</p>
    """

    body_rows = "".join([
        row(header_html, bg=LIME, pad="32px 32px 30px"),
        row(nesta_edicao_html, bg=BLACK, pad="26px 32px", border_bottom=True),
        row(eyebrow("News") + news_html, bg=BLACK, pad="32px 32px 8px"),
        row(eyebrow("Trends") + trends_html, bg=BLACK, pad="8px 32px 8px"),
        row(eyebrow("@arpejo — o que fizemos esse mês") + cases_html, bg=BLACK, pad="8px 32px 8px"),
        row(eyebrow("Insights — inspirações do mês (exclusivo pra você)") + insights_grid(), bg=BLACK, pad="8px 32px 32px"),
        row(eyebrow("Indicações Arpejers") + recs_html, bg=BLACK, pad="0 32px 32px"),
        row(fontes_html, bg=BLACK, pad="0 32px 26px", border_bottom=True),
        row(footer_html, bg=LIME, pad="36px 32px", align="center"),
    ])

    preheader = esc(COVER_INTRO)[:140]

    html = f"""<!doctype html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>.report — News de CRM</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
  body, table, td {{ font-family: {SANS}; }}
  img {{ -ms-interpolation-mode: bicubic; border: 0; }}
  a {{ text-decoration: none; }}
  @media only screen and (max-width: {EMAIL_W}px) {{
    .email-container {{ width: 100% !important; }}
  }}
</style>
</head>
<body style="margin:0;padding:0;background:#999999;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">{preheader}</div>
  <center>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#999999;">
    <tr><td align="center" style="padding:24px 12px;">
      <!--[if mso]>
      <table role="presentation" width="{EMAIL_W}" cellpadding="0" cellspacing="0" align="center"><tr><td>
      <![endif]-->
      <table role="presentation" width="{EMAIL_W}" cellpadding="0" cellspacing="0" align="center" class="email-container" style="width:{EMAIL_W}px;max-width:{EMAIL_W}px;background:{BLACK};">
        {body_rows}
      </table>
      <!--[if mso]>
      </td></tr></table>
      <![endif]-->
    </td></tr>
  </table>
  </center>
</body>
</html>
"""

    out_html = OUT_DIR / "email.html"
    out_html.write_text(html, encoding="utf-8")
    print("wrote", out_html)
    print("wrote assets to", ASSETS_OUT)
    print("\nlinks reais já embutidos (@arpejo):")
    for c in ARPEJO_CASES:
        print(f"  {c['badge']} -> {c['video']}")
    print("\nlembrete: suba cada arquivo de assets/ no host de imagens da ferramenta de e-mail")
    print("marketing e troque o `src` correspondente no HTML pela URL que ela gerar.")


if __name__ == "__main__":
    build()
