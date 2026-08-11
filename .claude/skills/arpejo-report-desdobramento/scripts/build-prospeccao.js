// Prospecting deck for the Arpejo .report — 16:9, following
// references/prospeccao.md: market/trends content comes from the monthly
// report styled in the report's own visual identity (rounded black panel,
// chrome band, oval title); the "quem é a Arpejo" section pulls real facts
// from the institutional/commercial deck (assets/apresentacao-institucional-
// arpejo.pdf), restyled into that same identity instead of copying the
// institutional deck's own black-and-white design.
//
// This is the authoritative pattern for the prospecting deck going forward
// — do not redesign it from scratch next time; adapt this file. Sections
// marked "EDITAR TODO MÊS" carry the content that changes edition to
// edition (cover tagline, market stats, trend deep-dive cards, @arpejo
// cases). The institutional section (slides 5-7) only needs to change if
// Bianca sends an updated institutional deck — see references/prospeccao.md.
//
// Setup (once per machine/session): `npm install pptxgenjs` in this
// directory (or wherever you run the script from).
//
// Usage:
//   node build-prospeccao.js <logo-abs-path> <textures-dir> <photos-dir> [out-path]
//     <logo-abs-path>  = .../arpejo-report-desdobramento/assets/arpejo-report-logo.png
//     <textures-dir>   = .../brand-guidelines/assets/textures
//     <photos-dir>     = directory with that month's extracted trend photos
//       (see scripts/extract_report_photos.py)
//
// After generating: embed real fonts with brand-guidelines/scripts/embed_fonts.py
// before delivering — pptxgenjs cannot embed fonts itself.

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
} = require("./lib/identity");

const LOGO = process.argv[2];
const TEXTURES_DIR = process.argv[3];
const PHOTOS_DIR = process.argv[4];
if (!LOGO || !TEXTURES_DIR || !PHOTOS_DIR) {
  console.error("usage: node build-prospeccao.js <logo-abs-path> <textures-dir> <photos-dir> [out-path]");
  process.exit(1);
}
setTexturesDir(TEXTURES_DIR);
const path = require("path");
const LOGO_BLACK = path.join(path.dirname(LOGO), "arpejo-report-logo-all-black.png");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5in, 16:9
const W = 13.333;
const H = 7.5;

const SIDE_MARGIN = 0.6;

// ============================================================
// EDITAR TODO MÊS (1/4): mês/edição da capa.
// ============================================================
const COVER_TAGLINE = "Prospecção _ agosto_26";

// ---------- 1. Capa ----------
// Same cover language as the carousel (lime bg, black plus-grid + globe,
// big report↗ logo) — only the tagline changes to say "prospecção" instead
// of naming a month's trends.
{
  const s = pres.addSlide();
  s.background = { color: COLORS.lime };
  addPlusGrid(s, { color: "000000", x0: 1, y0: 0.9, cols: 8, rows: 5, dx: 1.6, dy: 1.3, size: 12 });
  addGlobeIcon(s, { x: W - 1.2, y: 0.55, size: 0.5, colorName: "black" });
  addLogo(s, LOGO_BLACK, { x: W / 2 - 2.6, y: 2.5, w: 5.2 });
  s.addText(COVER_TAGLINE, {
    x: W / 2 - 3, y: H - 1.5, w: 6, h: 0.5,
    fontFace: FONT_MONO, fontSize: 14, color: COLORS.black, align: "center", margin: 0,
  });
  addArrowIcon(s, { x: W / 2 - 0.15, y: H - 0.95, size: 0.3, colorName: "black", corner: "NE" });
}

function sectionLabel(s, text, color = COLORS.lime) {
  s.addText(text, { x: SIDE_MARGIN, y: 0.45, w: 8, h: 0.4, fontFace: FONT_MONO, fontSize: 12, color, margin: 0 });
}

// ============================================================
// EDITAR TODO MÊS (2/4): 2-3 estatísticas de mercado do report do mês.
// ============================================================
const MARKET_STATS = [
  { n: "200%", d: "de crescimento nas buscas por IA para descobrir produtos em 1 ano." },
  { n: "40%", d: "dos jovens da Geração Z já não diferenciam experiências reais das virtuais." },
  { n: "64%", d: "dos brasileiros declararam não consumir álcool em 2025 — e ainda assim, saem." },
];
const MARKET_SOURCE_LINE = "fonte: Salesforce, Opinion Box, Estadão — .report agosto_26";

// ---------- 2. O mercado está mudando (stat overview) ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.black };
  sectionLabel(s, "O PONTO DE PARTIDA");
  s.addText("O mercado não para de mudar.\nA sua marca está lendo isso em tempo real?", {
    x: SIDE_MARGIN, y: 1.0, w: W - 2 * SIDE_MARGIN, h: 1.6,
    fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 28, color: COLORS.white, margin: 0,
  });

  const gap = 0.4;
  const cardW = (W - 2 * SIDE_MARGIN - 2 * gap) / 3;
  MARKET_STATS.forEach((st, i) => {
    const x = SIDE_MARGIN + i * (cardW + gap);
    s.addShape("roundRect", { x, y: 3.0, w: cardW, h: 3.3, rectRadius: 0.14, fill: { color: "141414" }, line: { color: "333333", width: 0.75 } });
    s.addText(st.n, { x: x + 0.3, y: 3.3, w: cardW - 0.6, h: 1, fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 40, color: COLORS.lime, margin: 0 });
    s.addText(st.d, { x: x + 0.3, y: 4.35, w: cardW - 0.6, h: 1.8, fontFace: FONT_BODY, fontSize: 13, color: COLORS.white, valign: "top", margin: 0 });
  });
  s.addText(MARKET_SOURCE_LINE, {
    x: SIDE_MARGIN, y: H - 0.55, w: 10, h: 0.4, fontFace: FONT_MONO, fontSize: 9, color: "666666", margin: 0,
  });
}

// ============================================================
// EDITAR TODO MÊS (3/4): 2 tendências em destaque, mesmo tratamento visual
// dos cards do carrossel (ver build-instagram-carousel.js), adaptado pro
// canvas 16:9 como divisão esquerda/direita em vez do empilhamento vertical.
//
// Cada card precisa de: bg, title (2 linhas), headline, detail, stat,
// photo (nome do arquivo em PHOTOS_DIR — confira a regra de procedência de
// imagem no SKILL.md antes de reaproveitar qualquer foto de marca terceira),
// mirror (true inverte texto/foto de lado, pra dar ritmo entre os 2 cards),
// bandBottom (true põe a faixa de plus-grid embaixo, false em cima).
// ============================================================
const TREND_CARDS = [
  {
    bg: COLORS.coral,
    title: "AGENTIC\nSEARCH",
    headline: "Sua marca já apareceu numa resposta de IA hoje?",
    detail: "O uso de buscas por IA como primeiro passo para descobrir produtos cresceu 200% em um ano. Em vez de pesquisar no Google, consumidores estão começando a jornada de compra dentro de uma conversa com um assistente de IA.\n\n86% dos líderes de e-commerce dizem que a IA já elevou a expectativa dos consumidores — mas só 28% das marcas já usam IA agentiva. A adoção ainda está atrás do comportamento.",
    stat: "Buscas por IA para descobrir produtos cresceram 200% em 1 ano.",
    photo: "ig-agentic-search.jpg",
    mirror: false,
    bandBottom: true,
  },
  {
    bg: COLORS.black,
    title: "HIPER-\nREALIDADE",
    headline: "Online ou offline? Pra Geração Z, já não faz diferença.",
    detail: "A cultura digital deixou de existir só nas telas e passou a moldar a vida real. A fronteira entre o que é online e offline está desaparecendo, especialmente pra Geração Z.\n\nMais do que distinguir o que é real ou gerado por IA, o que passa a importar pras marcas é a experiência que elas proporcionam — em qualquer um dos dois lados.",
    stat: "40% dos jovens dizem que “é tudo real”, sem diferenciar o virtual do físico.",
    photo: "prospect-hiper-realidade.jpg",
    mirror: true,
    bandBottom: false,
  },
];

// ============================================================
// A partir daqui é o motor do layout dos cards — não precisa editar todo mês.
// ============================================================
const BAND_H = 0.6;
const BAND_GAP = 0.15;
const CARD_TOP_MARGIN = 0.45;
const CARD_BOTTOM_MARGIN = 0.3;
const PANEL_X = SIDE_MARGIN;
const PANEL_W = W - 2 * SIDE_MARGIN;
const TEXT_COL_W = PANEL_W * 0.42;
const COL_GAP = 0.5;
const PHOTO_PAD = 0.3;

TREND_CARDS.forEach((card) => {
  const s = pres.addSlide();
  s.background = { color: card.bg };

  const bandColor = card.bg === COLORS.black ? "333333" : "000000";
  const globeColorName = card.bg === COLORS.black ? "lime" : "black";
  // Title/photo/text always sit on the black panel, not on the card's own
  // background — so the text color is the card's accent hue, never card.bg.
  const fg = card.bg === COLORS.coral ? COLORS.coral : COLORS.lime;

  const bandY = card.bandBottom ? H - CARD_BOTTOM_MARGIN - BAND_H : CARD_TOP_MARGIN;
  const panelY = card.bandBottom ? CARD_TOP_MARGIN : bandY + BAND_H + BAND_GAP;
  const panelBottom = card.bandBottom ? bandY - BAND_GAP : H - CARD_BOTTOM_MARGIN;
  const panelH = panelBottom - panelY;

  addPlusGrid(s, { color: bandColor, x0: SIDE_MARGIN + 0.2, y0: bandY + BAND_H / 2, cols: 6, rows: 1, dx: 1.7, dy: 0, size: 13 });
  addGlobeIcon(s, { x: W - SIDE_MARGIN - 0.5, y: bandY + BAND_H / 2 - 0.25, size: 0.5, colorName: globeColorName });

  s.addShape("roundRect", { x: PANEL_X, y: panelY, w: PANEL_W, h: panelH, rectRadius: 0.2, fill: { color: COLORS.black }, line: { type: "none" } });

  // Text column and photo column swap sides when `mirror` is set, for
  // rhythm between the two cards.
  const textX = card.mirror ? PANEL_X + PANEL_W - TEXT_COL_W - 0.4 : PANEL_X + 0.4;
  const photoX = card.mirror ? PANEL_X + 0.35 : PANEL_X + TEXT_COL_W + COL_GAP + 0.4;
  const photoW = PANEL_W - TEXT_COL_W - COL_GAP - 0.75;

  const [titleLine1, titleLine2] = card.title.split("\n");
  s.addText(titleLine1, {
    x: textX, y: panelY + 0.35, w: TEXT_COL_W, h: 0.5,
    fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 24, color: fg, align: "left", margin: 0,
  });
  const ovalY = panelY + 0.85;
  const ovalH = 0.55;
  s.addShape("ellipse", { x: textX - 0.1, y: ovalY, w: TEXT_COL_W + 0.2, h: ovalH, fill: { type: "none" }, line: { color: fg, width: 1.5 } });
  s.addText(titleLine2, {
    x: textX - 0.1, y: ovalY, w: TEXT_COL_W + 0.2, h: ovalH,
    fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 20, color: fg, align: "center", valign: "middle", margin: 0,
  });

  s.addText(card.headline, {
    x: textX, y: ovalY + ovalH + 0.35, w: TEXT_COL_W, h: 0.9,
    fontFace: FONT_BODY, bold: true, fontSize: 15, color: fg, align: "left", valign: "top", margin: 0,
  });
  s.addText(card.detail, {
    x: textX, y: ovalY + ovalH + 1.3, w: TEXT_COL_W, h: 2.2,
    fontFace: FONT_BODY, fontSize: 11.5, color: fg, align: "left", valign: "top", margin: 0,
  });
  s.addText(card.stat, {
    x: textX, y: panelBottom - 0.7, w: TEXT_COL_W, h: 0.55,
    fontFace: FONT_MONO, fontSize: 10, color: fg, align: "left", valign: "top", margin: 0,
  });

  s.addImage({
    path: path.join(PHOTOS_DIR, card.photo),
    x: photoX, y: panelY + PHOTO_PAD, w: photoW, h: panelH - 2 * PHOTO_PAD,
    sizing: { type: "cover", w: photoW, h: panelH - 2 * PHOTO_PAD },
  });
});

// ---------- 5. Institucional: manifesto ----------
// Real copy from assets/apresentacao-institucional-arpejo.pdf — not
// reworded, only restyled into the report's identity (big italic pull-quote
// instead of the institutional deck's own centered serif treatment). Only
// touch this slide if Bianca sends an updated institutional deck — see
// references/prospeccao.md before changing any of these facts.
{
  const s = pres.addSlide();
  s.background = { color: COLORS.black };
  addPlusGrid(s, { color: "333333", x0: 1, y0: 0.9, cols: 8, rows: 5, dx: 1.6, dy: 1.3, size: 12 });
  sectionLabel(s, "QUEM É A ARPEJO");
  s.addText("“A técnica constrói.\nO improviso desconstrói.”", {
    x: SIDE_MARGIN, y: 1.1, w: W - 2 * SIDE_MARGIN, h: 2.0,
    fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 32, color: COLORS.white, margin: 0,
  });
  s.addText(
    "Somos uma agência de publicidade que, através da técnica, estudo e planejamento, constrói direcionais sólidos para então desconstruí-los através de soluções de comunicação fortes e verdadeiras.",
    { x: SIDE_MARGIN, y: 3.15, w: 7.5, h: 1.5, fontFace: FONT_BODY, fontSize: 14, color: "cccccc", valign: "top", margin: 0 }
  );

  s.addShape("roundRect", { x: SIDE_MARGIN, y: 5.0, w: 7.5, h: 1.9, rectRadius: 0.16, fill: { color: "141414" }, line: { color: "333333", width: 0.75 } });
  s.addText("“Good skills. Gold feeling.”", {
    x: SIDE_MARGIN + 0.35, y: 5.25, w: 6.8, h: 0.6, fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 18, color: COLORS.lime, margin: 0,
  });
  s.addText(
    "Acreditamos que o feeling não é o acaso, mas uma combinação de experiências, conhecimento, técnica aguçada e intuição.",
    { x: SIDE_MARGIN + 0.35, y: 5.9, w: 6.8, h: 0.9, fontFace: FONT_BODY, fontSize: 12, color: COLORS.white, valign: "top", margin: 0 }
  );

  s.addShape("roundRect", { x: W - SIDE_MARGIN - 3.6, y: 3.15, w: 3.6, h: 3.75, rectRadius: 0.16, fill: { color: COLORS.lime } });
  s.addText("150+", {
    x: W - SIDE_MARGIN - 3.3, y: 3.5, w: 3, h: 1.4, fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 56, color: COLORS.black, margin: 0,
  });
  s.addText("prêmios e reconhecimentos", {
    x: W - SIDE_MARGIN - 3.3, y: 4.85, w: 3, h: 0.5, fontFace: FONT_BODY, bold: true, fontSize: 13, color: COLORS.black, margin: 0,
  });
  s.addText(
    "Agência do Ano APP Campinas · Festival do Clube de Criação · Profissionais do Ano Rede Globo · FEPI · Mídia Festival APP Campinas · FestVídeo APP Ribeirão Preto · FestDigital · FestGraf APP",
    { x: W - SIDE_MARGIN - 3.3, y: 5.45, w: 3, h: 1.3, fontFace: FONT_MONO, fontSize: 8.5, color: "222222", valign: "top", margin: 0 }
  );
}

// ---------- 6. Institucional: clientes ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.coral };
  sectionLabel(s, "QUEM CONFIA NA GENTE", COLORS.black);
  s.addText("Marcas que já construíram\ndirecionais sólidos com a Arpejo.", {
    x: SIDE_MARGIN, y: 1.0, w: W - 2 * SIDE_MARGIN, h: 1.3,
    fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 24, color: COLORS.black, margin: 0,
  });

  s.addShape("roundRect", { x: SIDE_MARGIN, y: 2.5, w: W - 2 * SIDE_MARGIN, h: 4.4, rectRadius: 0.18, fill: { color: COLORS.black } });
  const CLIENTS = [
    "Santa Massa", "Solito Alimentos", "Equatorial Energia", "Lwart", "Educação Adventista",
    "Unna", "Óttima", "Nutrive", "Performa Natural", "Formica",
    "Grupo Formitex", "Donmario Sementes", "ZF", "Mendorato", "Crokíssimo",
    "Unimed Campinas", "Quallity Pró Saúde", "Delphi", "PagueVeloz by Serasa", "Desktop",
  ];
  const cols = 4;
  const rows = 5;
  const cellW = (W - 2 * SIDE_MARGIN - 0.8) / cols;
  const cellH = 3.8 / rows;
  CLIENTS.forEach((name, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    s.addText(name, {
      x: SIDE_MARGIN + 0.4 + col * cellW, y: 2.8 + row * cellH, w: cellW - 0.2, h: cellH,
      fontFace: FONT_MONO, fontSize: 12, color: COLORS.lime, valign: "middle", margin: 0,
    });
  });
}

// ---------- 7. Institucional: estrutura, liderança, time ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.black };
  sectionLabel(s, "COMO A GENTE É ORGANIZADA");

  const blocks = [
    {
      title: "Estrutura",
      body: "Sede em Campinas/SP — o escritório Open House, pensado desde a planta pra criatividade fluir — e uma base estratégica em São Luís/MA.",
    },
    {
      title: "Sócios na liderança",
      body: "Quadro societário composto por posições de liderança nas principais áreas da agência. Isso mantém a essência estratégica, técnica e criativa independente dos movimentos do mercado.",
    },
    {
      title: "+90 pessoas, 8 estados",
      body: "Um time plural, presente em DF, MA, MG, PR, PE, RS, RN e SP.",
    },
  ];
  const gap = 0.4;
  const cardW = (W - 2 * SIDE_MARGIN - 2 * gap) / 3;
  blocks.forEach((b, i) => {
    const x = SIDE_MARGIN + i * (cardW + gap);
    s.addShape("roundRect", { x, y: 1.3, w: cardW, h: 5.4, rectRadius: 0.16, fill: { color: "141414" }, line: { color: "333333", width: 0.75 } });
    s.addText(b.title, {
      x: x + 0.3, y: 1.6, w: cardW - 0.6, h: 0.9, fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 18, color: COLORS.lime, valign: "top", margin: 0,
    });
    s.addText(b.body, {
      x: x + 0.3, y: 2.6, w: cardW - 0.6, h: 3.8, fontFace: FONT_BODY, fontSize: 12.5, color: COLORS.white, valign: "top", margin: 0,
    });
  });
}

// ============================================================
// EDITAR TODO MÊS (4/4): cases @arpejo executados no mês.
// ============================================================
const CASES = [
  {
    badge: "PagueVeloz — Dia dos Pais",
    color: COLORS.white,
    concept: "“O nome por trás do meu nome”: transformamos fachadas de comércio em homenagens aos pais que apoiaram o sonho de três empreendedores em São Paulo e Campinas.",
    video: "https://www.youtube.com/watch?v=pF-eyFpkQ5I",
  },
  {
    badge: "Grupo Equatorial — Dia dos Pais",
    color: COLORS.lime,
    concept: "Espelhos apagados em locais de grande circulação só acendem uma palavra quando a pessoa termina de contar o que herdou do pai — não na aparência, na atitude.",
    video: "https://www.youtube.com/watch?v=Qu7DKe6zZfE",
  },
];

// ---------- 8. Prova — cases @arpejo ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.black };
  addPlusGrid(s, { color: "333333", x0: 1, y0: 0.9, cols: 8, rows: 5, dx: 1.6, dy: 1.3, size: 12 });
  sectionLabel(s, "PROVA — O QUE FIZEMOS ESSE MÊS");
  const gap = 0.4;
  const cardW = (W - 2 * SIDE_MARGIN - gap) / 2;
  CASES.forEach((c, i) => {
    const x = SIDE_MARGIN + i * (cardW + gap);
    s.addShape("ellipse", { x, y: 1.3, w: cardW, h: 0.75, fill: { type: "none" }, line: { color: c.color, width: 1.5 } });
    s.addText(c.badge, {
      x, y: 1.3, w: cardW, h: 0.75, fontFace: FONT_TITLE, italic: true, fontSize: 14, color: c.color, align: "center", valign: "middle", margin: 0,
    });
    s.addText(c.concept, { x, y: 2.4, w: cardW, h: 2.5, fontFace: FONT_BODY, fontSize: 13, color: COLORS.white, valign: "top", margin: 0 });
    s.addText("▶ assistir ao case", {
      x, y: 5.0, w: cardW, h: 0.4, fontFace: FONT_MONO, bold: true, fontSize: 12, color: c.color, margin: 0,
      hyperlink: { url: c.video },
    });
  });
  s.addText("Campanhas de Dia dos Pais assinadas pela Arpejo em agosto/26.", {
    x: SIDE_MARGIN, y: 5.9, w: 10, h: 0.5, fontFace: FONT_MONO, fontSize: 11, color: "999999", margin: 0,
  });
}

// ---------- 9. Diferencial: o .report mensal ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.lime };
  addGlobeIcon(s, { x: W - 1.1, y: 0.5, size: 0.45, colorName: "black" });
  s.addText("report↗", { x: SIDE_MARGIN, y: 0.5, w: 2, h: 0.4, fontFace: FONT_MONO, bold: true, fontSize: 12, color: COLORS.black, margin: 0 });
  s.addText("O nosso diferencial: inteligência de mercado, todo mês.", {
    x: SIDE_MARGIN, y: 1.5, w: W - 2 * SIDE_MARGIN, h: 1.2, fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 26, color: COLORS.black, margin: 0,
  });
  s.addText(
    "Isso que você viu até agora — leitura de tendências de consumo, novidades de plataformas e cases que inspiram — é o nosso .report: um relatório proprietário que produzimos todo mês pra orientar as decisões dos nossos clientes.\n\nQuem fecha com a Arpejo não recebe só campanha. Recebe visão de mercado aplicada, com frequência mensal.",
    { x: SIDE_MARGIN, y: 2.8, w: W - 2 * SIDE_MARGIN, h: 2.6, fontFace: FONT_BODY, fontSize: 15, color: "222222", valign: "top", margin: 0 }
  );
  addArrowIcon(s, { x: W - 1, y: H - 1, size: 0.32, colorName: "black", corner: "SE" });
}

// ---------- 10. Como trabalhamos ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.black };
  sectionLabel(s, "COMO TRABALHAMOS");
  const steps = ["Diagnóstico", "Estratégia", "Criação & mídia", ".report mensal contínuo"];
  const gap = 0.4;
  const cardW = (W - 2 * SIDE_MARGIN - 3 * gap) / 4;
  steps.forEach((st, i) => {
    const x = SIDE_MARGIN + i * (cardW + gap);
    s.addShape("roundRect", { x, y: 2.8, w: cardW, h: 2.0, rectRadius: 0.14, fill: { color: "141414" }, line: { color: COLORS.lime, width: 0.75 } });
    s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.25, y: 3.0, w: cardW - 0.5, h: 0.6, fontFace: FONT_MONO, fontSize: 15, color: COLORS.lime, margin: 0 });
    s.addText(st, { x: x + 0.25, y: 3.55, w: cardW - 0.5, h: 1.1, fontFace: FONT_BODY, bold: true, fontSize: 14, color: COLORS.white, valign: "top", margin: 0 });
  });
}

// ---------- 11. CTA ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.black };
  addPlusGrid(s, { color: "333333", x0: 1, y0: 0.9, cols: 8, rows: 5, dx: 1.6, dy: 1.3, size: 12 });
  addCornerArrows(s, { colorName: "lime", slideW: W, slideH: H, size: 0.32 });
  s.addText("Vamos conversar sobre o que\nessas tendências significam\npra sua marca?", {
    x: 0.8, y: 2.2, w: W - 1.6, h: 2.6, fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 30, color: COLORS.white, margin: 0,
  });
  s.addText("fala com a gente → @arpejo", {
    x: 0.8, y: 5.2, w: 8, h: 0.5, fontFace: FONT_MONO, fontSize: 13, color: COLORS.lime, margin: 0,
  });
  addLogo(s, LOGO, { x: 0.8, y: H - 1.3, w: 2.4 });
}

const outPath = process.argv[5] || "out/apresentacao-prospeccao.pptx";
pres.writeFile({ fileName: outPath }).then(() => console.log("wrote", outPath));
