// Instagram carousel builder for the Arpejo .report — the canonical layout,
// confirmed by Bianca on the agosto/26 edition. Reuse this file every month:
// edit only the two sections marked "EDITAR TODO MÊS" below (the CARDS
// content and the cover's month tagline), keep everything else as-is.
//
// This is the authoritative pattern for the carousel going forward — do not
// redesign it from scratch next time; adapt this file. It mirrors the report
// identity deck's own trend-card layout (see references/identity.md):
//   - Cover: lime bg, black plus-grid + globe, big "report↗" logo, tagline
//     with the month — this is the actual cover Bianca's team publishes.
//   - Trend cards: a rounded black panel floating on the trend's accent
//     color (black/lime/coral), a plus-grid + globe "chrome band" in the
//     margin, a two-line title with the second line inside an oval outline,
//     then headline + a short expanding sentence + the data/source line.
//     The photo is either framed inside the panel (bandTop: false) or
//     bleeds to the slide's own edges with the chrome band flipped to the
//     top (bandTop: true) — see the geometry comment further down.
//
// Setup (once per machine/session): `npm install pptxgenjs` in this
// directory (or wherever you run the script from).
//
// Usage:
//   node build-instagram-carousel.js <logo-abs-path> <textures-dir> <photos-dir> [out-path]
//     <logo-abs-path>  = .../arpejo-report-desdobramento/assets/arpejo-report-logo.png
//     <textures-dir>   = .../brand-guidelines/assets/textures
//     <photos-dir>     = directory with that month's extracted trend photos
//       (see scripts/extract_report_photos.py), named however CARDS.photo
//       below references them.
//   A black-recolored logo variant is required for the lime cover — see
//   assets/arpejo-report-logo-all-black.png (already generated; only redo
//   the recolor if the source logo file itself changes).
//
// After generating: embed real fonts with brand-guidelines/scripts/embed_fonts.py
// before delivering — pptxgenjs cannot embed fonts itself, and without this
// step the deck falls back to system fonts wherever it's opened.

const pptxgen = require("pptxgenjs");
const {
  COLORS,
  FONT_TITLE,
  FONT_MONO,
  FONT_BODY,
  setTexturesDir,
  addPlusGrid,
  addCornerArrows,
  addGlobeIcon,
  addArrowIcon,
  addLogo,
  addCoverImage,
} = require("./lib/identity");

const LOGO = process.argv[2];
const TEXTURES_DIR = process.argv[3];
const PHOTOS_DIR = process.argv[4];
if (!LOGO || !TEXTURES_DIR || !PHOTOS_DIR) {
  console.error("usage: node build-instagram-carousel.js <logo-abs-path> <textures-dir> <photos-dir> [out-path]");
  process.exit(1);
}
setTexturesDir(TEXTURES_DIR);
const path = require("path");

// Same asset as LOGO, but fully recolored black (including the arrow,
// which is lime in the source file) — needed on the lime cover, where a
// white wordmark or a lime arrow would both disappear into the background.
const LOGO_BLACK = path.join(path.dirname(LOGO), "arpejo-report-logo-all-black.png");

const pres = new pptxgen();
const W = 9;
const H = 11.25; // 4:5, Instagram feed portrait
pres.defineLayout({ name: "IG", width: W, height: H });
pres.layout = "IG";

// ============================================================
// EDITAR TODO MÊS (1/2): mês da edição, usado só na capa.
// ============================================================
const MONTH_TAGLINE = "As principais tendências\nde agosto, no Report.";

// ---------- Slide 1: Cover ----------
// Matches the actual cover Bianca's team already publishes each month
// (lime bg, black plus-grid + globe, big report↗ logo, tagline) — only the
// month in the tagline changes edition to edition.
{
  const s = pres.addSlide();
  s.background = { color: COLORS.lime };
  addPlusGrid(s, { color: "000000", x0: 1, y0: 1, cols: 5, rows: 8, dx: 1.7, dy: 1.35, size: 12 });
  addGlobeIcon(s, { x: W - 1.35, y: 0.75, size: 0.55, colorName: "black" });
  s.addText("CONSUMER\nTRENDS", {
    x: 0.8,
    y: 0.7,
    w: 6,
    h: 1.6,
    fontFace: FONT_TITLE,
    italic: true,
    bold: true,
    fontSize: 32,
    color: COLORS.black,
    align: "left",
    margin: 0,
  });
  addLogo(s, LOGO_BLACK, { x: 1.55, y: 4.6, w: 5.9 });
  addArrowIcon(s, { x: 0.8, y: H - 1.62, size: 0.32, colorName: "black", corner: "NE" });
  s.addText(MONTH_TAGLINE, {
    x: 1.35,
    y: H - 1.7,
    w: W - 2.2,
    h: 0.9,
    fontFace: FONT_MONO,
    fontSize: 13,
    color: COLORS.black,
    align: "left",
    valign: "top",
    margin: 0,
  });
}

// ============================================================
// EDITAR TODO MÊS (2/2): as tendências desse mês.
//
// Cada card precisa de:
//   bg        — cor de fundo do card: COLORS.black / COLORS.lime / COLORS.coral
//               (alterne as cores entre os cards para variar o ritmo visual)
//   title     — DUAS linhas separadas por "\n". A 1ª linha é texto simples;
//               a 2ª entra dentro do oval — evite mais de ~12 caracteres na
//               2ª linha ou o oval fica apertado (o fontSize já se ajusta
//               sozinho, mas há um limite de legibilidade)
//   headline  — 1 frase de impacto (o "Para as marcas" do report, resumido)
//   detail    — 1-2 frases explicando a tendência com mais contexto
//   stat      — o dado + leitura, sempre com número/fonte real do report
//               (nunca invente estatística — se o report não tiver um
//               número claro pra essa tendência, resuma a fonte em texto)
//   photo     — nome do arquivo dentro de PHOTOS_DIR. Confira a regra de
//               procedência de imagem no SKILL.md antes de reaproveitar
//               qualquer foto de marca terceira.
//   bandTop   — false: foto emoldurada dentro do painel (título → foto →
//               texto), faixa de plus-grid embaixo. true: texto logo abaixo
//               do título, foto sangrando até a borda do slide, faixa de
//               plus-grid em cima. Alterne entre os cards para dar ritmo —
//               mas o card com a foto/citação mais "quadrada" costuma
//               funcionar melhor em bandTop:false (foto emoldurada).
// ============================================================
const CARDS = [
  {
    bg: COLORS.black,
    tag: "TRENDS",
    title: "HIPER-\nREALIDADE",
    headline: "Online ou offline? Pra Geração Z, já não faz diferença.",
    detail: "Filtros, avatares e IA generativa já fazem parte de como essa geração se relaciona, compra e se expressa — sem hierarquia entre o que é “real” e o que é digital.",
    stat: "40% dos jovens dizem que “é tudo real”, sem diferenciar o virtual do físico.",
    photo: "ig-hiper-realidade.jpg",
    bandTop: false,
  },
  {
    bg: COLORS.coral,
    tag: "NEWS",
    title: "AGENTIC\nSEARCH",
    headline: "Sua marca já apareceu numa resposta de IA hoje?",
    detail: "Ferramentas como ChatGPT e Perplexity viraram ponto de partida de pesquisa antes da compra — estar bem descrito nelas já pesa tanto quanto estar bem posicionado no Google.",
    stat: "Buscas por IA para descobrir produtos cresceram 200% em 1 ano.",
    photo: "ig-agentic-search.jpg",
    bandTop: false,
  },
  {
    bg: COLORS.lime,
    tag: "TRENDS",
    title: "GERAÇÃO\nSEM RESSACA",
    headline: "Beber menos virou parte da experiência — não o fim dela.",
    detail: "Drinks sem álcool, cervejas 0% e rótulos funcionais deixaram de ser exceção em bares e festas pra virar parte do cardápio padrão.",
    stat: "64% dos brasileiros declararam não consumir álcool em 2025.",
    photo: "ig-sem-ressaca.jpg",
    bandTop: false,
  },
  {
    bg: COLORS.black,
    tag: "TRENDS",
    title: "NEW-WAVE\nSPORT FANDOM",
    headline: "O esporte tem uma nova torcida: jovem, feminina e apaixonada por estilo.",
    detail: "Ela chega pela moda, pelos bastidores e pelas redes — e está redesenhando como marcas de esporte se comunicam e com quem.",
    stat: "3 em cada 4 novos fãs de Fórmula 1 são mulheres.",
    photo: "ig-sport-fandom.jpg",
    bandTop: true,
  },
  {
    bg: COLORS.coral,
    tag: "TRENDS",
    title: "EXPERIÊNCIAS\nTRANSFORMADORAS",
    headline: "Marcas não vendem mais momentos. Vendem transformação.",
    detail: "Retiros, jornadas de autoconhecimento e produtos com propósito de virada de chave ganham espaço à frente do consumo só por status.",
    stat: "88% das pessoas buscam hoje vivências com propósito.",
    photo: "ig-experiencias-transformadoras.jpg",
    bandTop: false,
  },
];

// ============================================================
// A partir daqui é o motor do layout — não precisa editar todo mês.
// ============================================================

// Pulled from the report identity deck's own trend-card pattern — a rounded
// black panel floating on the trend's accent color, a plus-grid + globe
// "chrome band" in the margin around it, and a two-line title where the
// second line sits inside an oval outline. The panel's internal order
// alternates: photo framed *inside* the panel (between title and body text)
// when bandTop is false, or body text right under the title with the photo
// bleeding to the panel/slide edges when bandTop is true — the band sits on
// whichever margin the photo isn't bleeding into.
const SIDE_MARGIN = 0.45;
const BAND_H = 1.05;
const BAND_GAP = 0.18;
const TOP_MARGIN = 0.4;
const BOTTOM_MARGIN = 0.35;
const PANEL_X = SIDE_MARGIN;
const PANEL_W = W - 2 * SIDE_MARGIN;
const PHOTO_H_INSET = 4.5;
const PHOTO_PAD = 0.35;
const TEXT_BLOCK_H = 2.5; // headline + detail + stat, from textY to panel bottom

CARDS.forEach((card, i) => {
  const s = pres.addSlide();
  s.background = { color: card.bg };

  const bandTop = card.bandTop;
  const bandColor = card.bg === COLORS.black ? "333333" : "000000";
  const globeColorName = card.bg === COLORS.black ? "lime" : "black";
  // Title/photo/text always sit on the black panel, not on the card's own
  // background — so the text color is the card's accent hue (lime for the
  // black and lime cards, coral for the coral cards), never card.bg itself.
  const fg = card.bg === COLORS.coral ? COLORS.coral : COLORS.lime;
  const photoPath = path.join(PHOTOS_DIR, card.photo);
  const [titleLine1, titleLine2] = card.title.split("\n");
  const ovalFontSize = titleLine2.length > 12 ? 17 : titleLine2.length > 8 ? 20 : 24;

  // ---- geometry, worked out top-to-bottom before anything is drawn, so the
  // panel shape (which must be added first, underneath the title) already
  // knows its final height. ----
  const bandY = bandTop ? 0.35 : H - BOTTOM_MARGIN - BAND_H;
  const panelY = bandTop ? bandY + BAND_H + BAND_GAP : TOP_MARGIN;
  const ovalY = panelY + 0.85;
  const ovalH = 0.62;
  const contentTop = ovalY + ovalH + 0.25;
  const textY = contentTop + (bandTop ? 0 : PHOTO_H_INSET + 0.3);
  const panelH = textY + TEXT_BLOCK_H - panelY;
  const photoY = bandTop ? panelY + panelH - 0.05 : contentTop;

  // ---- chrome band: plus-grid + globe, in the margin the photo doesn't
  // bleed into. ----
  addPlusGrid(s, { color: bandColor, x0: SIDE_MARGIN + 0.15, y0: bandY + BAND_H / 2, cols: 4, rows: 1, dx: 1.75, dy: 0, size: 13 });
  addGlobeIcon(s, { x: W - SIDE_MARGIN - 0.55, y: bandY + BAND_H / 2 - 0.275, size: 0.55, colorName: globeColorName });

  // ---- black panel, drawn first so title/photo/text render on top of it. ----
  s.addShape("roundRect", { x: PANEL_X, y: panelY, w: PANEL_W, h: panelH, rectRadius: 0.25, fill: { color: COLORS.black }, line: { type: "none" } });

  // ---- title: plain line + second line inside an oval outline. ----
  s.addText(titleLine1, {
    x: PANEL_X + 0.35, y: panelY + 0.3, w: PANEL_W - 0.7, h: 0.55,
    fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 26, color: fg, align: "left", margin: 0,
  });
  s.addShape("ellipse", {
    x: PANEL_X + 0.15, y: ovalY, w: PANEL_W - 0.3, h: ovalH,
    fill: { type: "none" }, line: { color: fg, width: 1.5 },
  });
  s.addText(titleLine2, {
    x: PANEL_X + 0.15, y: ovalY, w: PANEL_W - 0.3, h: ovalH,
    fontFace: FONT_TITLE, italic: true, bold: true, fontSize: ovalFontSize, color: fg, align: "center", valign: "middle", margin: 0,
  });

  if (!bandTop) {
    // Photo framed inside the panel, between title and body text.
    addCoverImage(s, {
      path: photoPath, x: PANEL_X + PHOTO_PAD, y: photoY, w: PANEL_W - 2 * PHOTO_PAD, h: PHOTO_H_INSET,
    });
    s.addText(card.headline, { x: PANEL_X + 0.35, y: textY, w: PANEL_W - 0.7, h: 0.8, fontFace: FONT_BODY, bold: true, fontSize: 14, color: fg, align: "left", valign: "top", margin: 0 });
    s.addText(card.detail, { x: PANEL_X + 0.35, y: textY + 0.8, w: PANEL_W - 0.7, h: 1.0, fontFace: FONT_BODY, fontSize: 11, color: fg, align: "left", valign: "top", margin: 0 });
    s.addText(card.stat, { x: PANEL_X + 0.35, y: textY + 1.8, w: PANEL_W - 0.7, h: 0.6, fontFace: FONT_MONO, fontSize: 10, color: fg, align: "left", valign: "top", margin: 0 });
  } else {
    // Body text right under the title; the photo bleeds past the panel to
    // the slide's own edges, same as the report's own "band on top" cards.
    s.addText(card.headline, { x: PANEL_X + 0.35, y: textY, w: PANEL_W - 0.7, h: 0.8, fontFace: FONT_BODY, bold: true, fontSize: 14, color: fg, align: "left", valign: "top", margin: 0 });
    s.addText(card.detail, { x: PANEL_X + 0.35, y: textY + 0.8, w: PANEL_W - 0.7, h: 1.0, fontFace: FONT_BODY, fontSize: 11, color: fg, align: "left", valign: "top", margin: 0 });
    s.addText(card.stat, { x: PANEL_X + 0.35, y: textY + 1.8, w: PANEL_W - 0.7, h: 0.6, fontFace: FONT_MONO, fontSize: 10, color: fg, align: "left", valign: "top", margin: 0 });
    addCoverImage(s, { path: photoPath, x: 0, y: photoY, w: W, h: H - photoY });
  }
});

// ---------- Closing / CTA ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.black };
  addPlusGrid(s, { color: "333333", x0: 1, y0: 1, cols: 6, rows: 8, dx: 1.2, dy: 1.2, size: 10 });
  addCornerArrows(s, { colorName: "lime", slideW: W, slideH: H, size: 0.32 });

  s.addText("Esse é só um recorte\ndo nosso .report mensal.", {
    x: 0.8,
    y: 3.8,
    w: W - 1.6,
    h: 2.4,
    fontFace: FONT_TITLE,
    italic: true,
    bold: true,
    fontSize: 30,
    color: COLORS.white,
    align: "left",
    margin: 0,
  });

  s.addText("Quer receber a análise completa de tendências,\nnovidades de plataformas e comportamento do consumidor,\ntodo mês?", {
    x: 0.8,
    y: 6.0,
    w: W - 1.6,
    h: 1.8,
    fontFace: FONT_BODY,
    fontSize: 15,
    color: COLORS.lime,
    align: "left",
    margin: 0,
  });

  s.addText("Fala com a gente → @arpejo", {
    x: 0.8,
    y: 8.0,
    w: W - 1.6,
    h: 0.6,
    fontFace: FONT_MONO,
    bold: true,
    fontSize: 16,
    color: COLORS.white,
    margin: 0,
  });

  addLogo(s, LOGO, { x: 0.8, y: H - 1.5, w: 2.6 });
}

const outPath = process.argv[5] || "out/carrossel-instagram.pptx";
pres.writeFile({ fileName: outPath }).then(() => console.log("wrote", outPath));
