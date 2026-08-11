"""
News de CRM for the Arpejo .report — a single tall image (not a .pptx) meant
to be pasted straight into the body of a client email/CRM campaign. Confirmed
by Bianca (agosto/26): recap completo (News + Trends + @arpejo + Insights +
Indicações), same content scope as material de cliente, but laid out as a
narrow single-column newsletter (curated/editorial style, closer to WGSN's
"Future Proof" reference than a dense daily like "the news" — see
references/news-crm.md), restyled into the .report visual identity.

This is the authoritative pattern going forward — do not redesign it from
scratch next time; edit only the content block below, marked "EDITAR TODO
MÊS" (cover tagline/date, NEWS, TRENDS, ARPEJO_CASES, INSIGHTS, RECS,
FONTES). Everything below that block is the engine — don't edit unless the
layout itself needs to change.

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

LIME = "#DAFF94"
CORAL = "#FF7C51"
BLACK = "#0A0A0A"
WHITE = "#FFFFFF"

EMAIL_W = 640  # standard email-body width in CSS px

# ============================== EDITAR TODO MÊS ==============================

COVER_TAGLINE_LINES = ["resumo do mês,", "feito pra você."]
COVER_INTRO = (
    "as principais tendências, novidades de plataforma e conquistas que a "
    "Arpejo separou pra você em agosto — direto do nosso .report mensal."
)
COVER_DATE = "AGOSTO_26"
CLOSING_LINE = "até o mês que vem."

# NEWS: novidades de plataforma (mesmo recorte do carrossel/prospecção)
NEWS = [
    {"badge": "Reddit", "body": "Ultrapassou meio bilhão de usuários semanais; receita publicitária cresceu 64% no 2º tri de 2026."},
    {"badge": "IA", "body": "Buscas por IA (Agentic Search) para descobrir produtos cresceram 200% em 1 ano."},
    {"badge": "WhatsApp", "body": "75% dos brasileiros já compraram produtos direto pelo app; 77% usam para falar com empresas."},
]

# TRENDS: alterne accent entre LIME e CORAL para dar ritmo, igual ao carrossel.
# photo = arquivo dentro de <photos-dir> (mesmas fotos do material de cliente).
TRENDS = [
    {"accent": LIME, "title": "HIPER-REALIDADE", "sub": "Online ou offline, o que conta é a experiência.",
     "body": "40% dos jovens da Geração Z afirmam que “é tudo real”, sem diferenciar experiências virtuais das físicas.",
     "for_brands": "o que importa é a experiência que a marca proporciona, real ou gerada por IA.",
     "photo": "trend-hiper-realidade.jpg"},
    {"accent": CORAL, "title": "EXPERIÊNCIAS TRANSFORMADORAS", "sub": "Catalisadoras de transformação pessoal.",
     "body": "88% das pessoas querem vivências significativas; 87% dizem que as melhores experiências são as que as transformam de alguma forma.",
     "for_brands": "quanto mais a marca contribuir para a evolução pessoal do cliente, maior a fidelização.",
     "photo": "client-experiencias-transformadoras.jpg"},
    {"accent": LIME, "title": "NEW-WAVE SPORT FANDOM", "sub": "Uma nova geração de fãs redesenha o esporte.",
     "body": "3 em cada 4 novos fãs de Fórmula 1 são mulheres; o esporte vira território de moda, beleza e lifestyle.",
     "for_brands": "esporte deixou de ser só competição — virou cultura, entretenimento e estilo de vida.",
     "photo": "trend-sport-fandom.jpg"},
    {"accent": CORAL, "title": "GERAÇÃO SEM RESSACA", "sub": "Menos álcool, mais intenção no consumo.",
     "body": "64% dos brasileiros declararam não consumir álcool em 2025, contra 55% em 2023.",
     "for_brands": "oportunidade de tirar o álcool do centro da experiência sem tirar a experiência do centro.",
     "photo": "client-sem-ressaca.jpg"},
]

# @ARPEJO: cases reais do mês. "video" é a URL real usada pra avisar a Bianca
# de onde ligar o link no editor de campanha (ver references/news-crm.md) —
# a imagem final NÃO carrega o link sozinha.
ARPEJO_CASES = [
    {"accent": WHITE, "badge": "PagueVeloz — Dia dos Pais",
     "concept": "“O nome por trás do meu nome”: fachadas de comércio em São Paulo e Campinas viram homenagens aos pais que apoiaram o sonho de três empreendedores. Desdobra em pílulas de conteúdo dinâmico nas redes.",
     "video": "https://www.youtube.com/watch?v=pF-eyFpkQ5I"},
    {"accent": LIME, "badge": "Grupo Equatorial — Dia dos Pais",
     "concept": "Espelhos apagados em locais de grande circulação: um entrevistador pergunta em que a pessoa se parece com o pai — não fisicamente. Ao terminar de contar, uma palavra se acende no reflexo.",
     "video": "https://www.youtube.com/watch?v=Qu7DKe6zZfE"},
]

# INSIGHTS: exclusivo clientes — ok usar aqui, ver regra de confidencialidade no SKILL.md.
INSIGHTS = [
    {"badge": "Itaú", "body": "Campanha “IA.i”: nova IA do banco, estética artesanal em película, trocadilho entre “IA.I” e “e aí?” para aproximar a tecnologia das pessoas."},
    {"badge": "Coca-Cola", "body": "“O Mundo Pode Esperar” (Dia dos Pais): convida a família a se desconectar das telas, com filmes, influenciadores e participação numa novela da Globo."},
    {"badge": "Reserva", "body": "“Quem cuida, ama” (Dia dos Pais): parceria com Safety 1st, linha “Tal Pai, Tal Filho”, protagonizada por Rodrigo Santoro."},
    {"badge": "Burger King", "body": "“Baby Burgers”: simulou um teste de gravidez positivo nas redes para revelar o lançamento de versões menores do Whopper."},
    {"badge": "Chevrolet + iFood", "body": "Aproveitou a promessa do iFood de entregar tudo durante a Copa para lançar o Novo Sonic dentro do próprio app de delivery."},
    {"badge": "Burger King", "body": "“King Cheese”: brinca com o ditado “mineiro come quieto”, com desconto ativado por frase-senha no drive-thru."},
]

RECS = ["Slow-living como status de luxo", "“O perigo de estar lúcida” — Rosa Monteiro"]

FONTES = [
    "Remio — Reddit supera previsões de receita",
    "Opinion Box — Pesquisa WhatsApp no Brasil 2026",
    "Sales Force — Shopping's New First Step",
    "LinkedIn — How to Maximize AI Visibility",
    "Estadão — Menos álcool nas mesas",
]

# ============================ FIM EDITAR TODO MÊS =============================


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
