// Versão personalizada por marca da apresentação de prospecção — parte da
// mesma base do build-prospeccao.js (references/prospeccao.md), mas insere
// uma tela extra dedicada ao segmento de mercado do prospect específico,
// com dados e movimentações de mercado daquele setor (não do .report
// genérico) e fecha o CTA citando a marca pelo nome.
//
// Reaproveita o miolo do deck padrão (mercado geral do report, 2 trend
// cards, institucional, cases @arpejo, diferencial) e só personaliza:
// capa, a nova tela de segmento (slide 3) e o CTA final. Edite o objeto
// CLIENT_DATA para adicionar/trocar um prospect — não redesenhe o layout
// por marca, ajuste só o conteúdo.
//
// Setup: `npm install pptxgenjs` (mesmo diretório do build-prospeccao.js).
//
// Usage:
//   node build-prospeccao-personalizada.js <logo-abs-path> <textures-dir> <photos-dir> <client-key> [out-path]
//     <client-key> = uma chave de CLIENT_DATA abaixo (ex: "toyota")
//
// Depois de gerar: embutir fontes reais com brand-guidelines/scripts/embed_fonts.py.

const pptxgen = require("pptxgenjs");
const path = require("path");
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
const CLIENT_KEY = process.argv[5];

// ============================================================
// EDITAR POR MARCA: um prospect por chave. Cada `movements` precisa ter
// EXATAMENTE 3 itens (o layout da tela personalizada é fixo em 3 blocos).
// `accent` escolhe a cor do painel "Para a [marca]" (lime ou coral).
// ============================================================
const CLIENT_DATA = {
  toyota: {
    name: "Toyota",
    segmentLabel: "mobilidade e automotivo",
    accent: "coral",
    movements: [
      {
        headline: "Híbridos aceleram, chinesas tomam a dianteira",
        stat: "+85%",
        detail: "Vendas de híbridos saltaram 85% no 1º semestre de 2026 vs. 2025 — mas no ranking de híbridos mais vendidos, quem lidera são a GWM Haval H6 e a BYD Song Pro, à frente do Corolla Cross Hybrid. Fonte: ABVE, CNN Brasil.",
      },
      {
        headline: "A decisão já é tomada antes da loja",
        stat: "90%+",
        detail: "Mais de 90% dos brasileiros pesquisam na internet antes de comprar um carro, e 87% já chegam à loja com preço, avaliações e histórico do veículo levantados. Fonte: Fenabrave, Auto Avaliar.",
      },
      {
        headline: "A jornada de compra já passa pela IA",
        stat: "57%",
        detail: "57% dos consumidores brasileiros já usam ferramentas de IA para comparar modelos, specs e custo de manutenção na compra de um carro. Fonte: Google, apresentado no Anfavea Visions 2026.",
      },
    ],
    synthesisHeadline: "Para a Toyota",
    synthesisBody: "A Toyota segue líder em vendas gerais no Brasil, mas no território que ela mesma abriu — o híbrido — quem cresce mais rápido em marketing digital são as chinesas. A decisão de compra hoje se forma antes do showroom, dentro de uma pesquisa online e, cada vez mais, dentro de uma resposta de IA. Defender a liderança em eletrificação passa por disputar esse território de descoberta digital com a mesma agressividade da concorrência.",
    ctaVerb: "essa disputa por híbridos na internet significa",
  },
  "sao-vicente": {
    name: "Grupo São Vicente",
    segmentLabel: "varejo alimentar regional",
    accent: "lime",
    movements: [
      {
        headline: "Regionais crescem mais que os gigantes nacionais",
        stat: "quase 2x",
        detail: "Nos 9 primeiros meses de 2025, redes regionais como o São Vicente cresceram quase o dobro do GPA em vendas mesmas lojas, superando até Assaí e Grupo Mateus. Fonte: Brazil Journal, SA Mais.",
      },
      {
        headline: "O app virou a nova prateleira",
        stat: "75%",
        detail: "75% dos brasileiros acessam apps de supermercado ao menos 1x por mês, e 55% preferem comprar direto pelo app da própria rede a marketplaces terceiros. Fonte: E-Commerce Brasil, 2025.",
      },
      {
        headline: "Fidelidade paga a conta",
        stat: "+20%",
        detail: "82% dos brasileiros já estão em algum programa de fidelidade, e clientes fidelizados compram até 20% a mais que os demais. Fonte: Asserj, SuperHiper, 2025.",
      },
    ],
    synthesisHeadline: "Para o Grupo São Vicente",
    synthesisBody: "Com o atacarejo nacional convertendo hipermercados pra disputar o público de menor renda no mesmo raio de ação do São Vicente, o diferencial que já cresce mais rápido que os gigantes é a proximidade regional. Comunicar bem o app próprio e o clube de vantagens, com uma identidade local que os grandes players não têm, é onde a fidelização vira vantagem competitiva de verdade.",
    ctaVerb: "crescer mais que os gigantes nacionais sem perder a proximidade regional significa",
  },
  agibank: {
    name: "Agibank",
    segmentLabel: "bancos digitais e crédito",
    accent: "coral",
    movements: [
      {
        headline: "O consignado do aposentado agora é lei digital",
        stat: "Lei 15.179/25",
        detail: "Toda operação de crédito consignado passa a ser feita por plataforma digital, com reconhecimento facial exigido pelo INSS contra fraudes — o público 60+ está sendo empurrado pro digital agora. Fonte: Lei 15.179/2025.",
      },
      {
        headline: "Concorrente digital perde a confiança do INSS",
        stat: "R$300 mi",
        detail: "Em 2026 o INSS suspendeu novas concessões de consignado do C6 Bank por irregularidades em contratos com aposentados, obrigando devolução de R$300 milhões — espaço pra quem oferece atendimento humano de verdade. Fonte: Seu Dinheiro, CNBC Brasil.",
      },
      {
        headline: "O modelo phygital está validado",
        stat: "+73%",
        detail: "O Agibank fechou 2025 com lucro de R$1,05-1,1 bi (+31,8%), carteira de crédito +54,3% e 6,7 milhões de clientes ativos (+73%), sustentados por cerca de 1.100 smart hubs físicos. Fonte: Agibank, Finsiders Brasil.",
      },
    ],
    synthesisHeadline: "Para o Agibank",
    synthesisBody: "Num momento em que um concorrente 100% digital perde a confiança do INSS e o público 50+/aposentados é obrigado por lei a migrar pro digital, o Agibank já tem a prova que faltava: resultados recordes sustentados por um modelo que soma app e atendimento humano nos smart hubs. A oportunidade é transformar a crise de confiança da concorrência em uma campanha de educação sobre as novas regras do consignado digital, com o Agibank como a opção segura e humana.",
    ctaVerb: "a crise de confiança no consignado digital significa",
  },
  "unimed-campinas": {
    name: "Unimed Campinas",
    segmentLabel: "saúde suplementar",
    accent: "lime",
    movements: [
      {
        headline: "O setor nunca teve tantos beneficiários",
        stat: "53,2 mi",
        detail: "Os planos de saúde chegaram a 53,2 milhões de beneficiários em dezembro de 2025, o maior patamar da série histórica. Fonte: ANS, dez/2025.",
      },
      {
        headline: "Saúde mental virou prioridade nacional",
        stat: "+143%",
        detail: "54% dos brasileiros apontam saúde mental como o principal problema de saúde do país, e as licenças por afastamento no tema cresceram 143% entre jan-jul/2025 vs. 2024. Fonte: Datafolha, Correio Braziliense.",
      },
      {
        headline: "A decisão de contratar plano já é digital",
        stat: "35,7%",
        detail: "Idosos já representam 35,7% das buscas online por planos de saúde, numa jornada que passa por preço/cobertura, depois carência/coparticipação, e só então reclamação/cancelamento. Fonte: Saúde Digital News, 2026.",
      },
    ],
    synthesisHeadline: "Para a Unimed Campinas",
    synthesisBody: "A Unimed Campinas está investindo R$250 milhões no Núcleo de Oncologia e Saúde e subindo no ranking mundial de melhores hospitais — mas esses investimentos assistenciais só viram vantagem competitiva se chegarem, em linguagem de confiança, à jornada de pesquisa cada vez mais digital e comparativa do beneficiário, especialmente do público 50+ e de quem busca cuidado em saúde mental.",
    ctaVerb: "traduzir investimento assistencial em confiança digital significa",
  },
};

if (!LOGO || !TEXTURES_DIR || !PHOTOS_DIR || !CLIENT_KEY || !CLIENT_DATA[CLIENT_KEY]) {
  console.error("usage: node build-prospeccao-personalizada.js <logo-abs-path> <textures-dir> <photos-dir> <client-key> [out-path]");
  console.error("client-key options: " + Object.keys(CLIENT_DATA).join(", "));
  process.exit(1);
}
const CLIENT = CLIENT_DATA[CLIENT_KEY];
setTexturesDir(TEXTURES_DIR);
const LOGO_BLACK = path.join(path.dirname(LOGO), "arpejo-report-logo-all-black.png");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
const W = 13.333;
const H = 7.5;
const SIDE_MARGIN = 0.6;

function sectionLabel(s, text, color = COLORS.lime) {
  s.addText(text, { x: SIDE_MARGIN, y: 0.45, w: 9, h: 0.4, fontFace: FONT_MONO, fontSize: 12, color, margin: 0 });
}

// ---------- 1. Capa (tagline personalizada) ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.lime };
  addPlusGrid(s, { color: "000000", x0: 1, y0: 0.9, cols: 8, rows: 5, dx: 1.6, dy: 1.3, size: 12 });
  addGlobeIcon(s, { x: W - 1.2, y: 0.55, size: 0.5, colorName: "black" });
  addLogo(s, LOGO_BLACK, { x: W / 2 - 2.6, y: 2.5, w: 5.2 });
  s.addText(`Prospecção _ ${CLIENT.name} _ agosto_26`, {
    x: W / 2 - 3.5, y: H - 1.5, w: 7, h: 0.5,
    fontFace: FONT_MONO, fontSize: 14, color: COLORS.black, align: "center", margin: 0,
  });
  addArrowIcon(s, { x: W / 2 - 0.15, y: H - 0.95, size: 0.3, colorName: "black", corner: "NE" });
}

// ---------- 2. O mercado está mudando (stat overview geral do report) ----------
const MARKET_STATS = [
  { n: "200%", d: "de crescimento nas buscas por IA para descobrir produtos em 1 ano." },
  { n: "40%", d: "dos jovens da Geração Z já não diferenciam experiências reais das virtuais." },
  { n: "64%", d: "dos brasileiros declararam não consumir álcool em 2025 — e ainda assim, saem." },
];
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
  s.addText("fonte: Salesforce, Opinion Box, Estadão — .report agosto_26", {
    x: SIDE_MARGIN, y: H - 0.55, w: 10, h: 0.4, fontFace: FONT_MONO, fontSize: 9, color: "666666", margin: 0,
  });
}

// ---------- 3. NOVA — Tela personalizada: panorama do segmento do prospect ----------
// Coluna esquerda: 3 blocos de movimentação de mercado do setor específico.
// Coluna direita: painel de destaque "Para a [marca]" com a leitura aplicada.
{
  const s = pres.addSlide();
  s.background = { color: COLORS.black };
  addPlusGrid(s, { color: "333333", x0: 1, y0: 0.9, cols: 8, rows: 5, dx: 1.6, dy: 1.3, size: 12 });
  sectionLabel(s, `PROSPECÇÃO — ${CLIENT.name.toUpperCase()}`);
  s.addText(`O mercado de ${CLIENT.segmentLabel}, agora.`, {
    x: SIDE_MARGIN, y: 1.0, w: W - 2 * SIDE_MARGIN, h: 1.0,
    fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 26, color: COLORS.white, margin: 0,
  });

  const gap = 0.4;
  const leftW = (W - 2 * SIDE_MARGIN - gap) * 0.58;
  const rightX = SIDE_MARGIN + leftW + gap;
  const rightW = W - SIDE_MARGIN - rightX;
  const bodyTop = 2.15;
  const bodyBottom = H - 0.5;
  const cardGap = 0.25;
  const cardH = (bodyBottom - bodyTop - 2 * cardGap) / 3;

  CLIENT.movements.forEach((m, i) => {
    const y = bodyTop + i * (cardH + cardGap);
    s.addShape("roundRect", { x: SIDE_MARGIN, y, w: leftW, h: cardH, rectRadius: 0.12, fill: { color: "141414" }, line: { color: "333333", width: 0.75 } });
    s.addText(m.headline, {
      x: SIDE_MARGIN + 0.3, y: y + 0.16, w: leftW - 1.7, h: 0.5,
      fontFace: FONT_BODY, bold: true, fontSize: 13.5, color: COLORS.lime, valign: "top", margin: 0,
    });
    s.addText(m.stat, {
      x: SIDE_MARGIN + leftW - 1.55, y: y + 0.14, w: 1.35, h: 0.5,
      fontFace: FONT_MONO, bold: true, fontSize: 15, color: COLORS.white, align: "right", valign: "top", margin: 0,
    });
    s.addText(m.detail, {
      x: SIDE_MARGIN + 0.3, y: y + 0.62, w: leftW - 0.6, h: cardH - 0.75,
      fontFace: FONT_BODY, fontSize: 10.5, color: "cccccc", valign: "top", margin: 0,
    });
  });

  const accentColor = CLIENT.accent === "coral" ? COLORS.coral : COLORS.lime;
  s.addShape("roundRect", { x: rightX, y: bodyTop, w: rightW, h: bodyBottom - bodyTop, rectRadius: 0.16, fill: { color: accentColor } });
  s.addText(`“${CLIENT.synthesisHeadline}”`, {
    x: rightX + 0.35, y: bodyTop + 0.4, w: rightW - 0.7, h: 1.1,
    fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 20, color: COLORS.black, valign: "top", margin: 0,
  });
  s.addText(CLIENT.synthesisBody, {
    x: rightX + 0.35, y: bodyTop + 1.5, w: rightW - 0.7, h: bodyBottom - bodyTop - 1.9,
    fontFace: FONT_BODY, fontSize: 12.5, color: COLORS.black, valign: "top", margin: 0,
  });
}

// ============================================================
// A partir daqui, mesmo conteúdo do deck padrão (trend cards do report,
// institucional, cases @arpejo, diferencial) — ver build-prospeccao.js /
// references/prospeccao.md. Só o CTA final muda, citando a marca.
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
  const fg = card.bg === COLORS.coral ? COLORS.coral : COLORS.lime;

  const bandY = card.bandBottom ? H - CARD_BOTTOM_MARGIN - BAND_H : CARD_TOP_MARGIN;
  const panelY = card.bandBottom ? CARD_TOP_MARGIN : bandY + BAND_H + BAND_GAP;
  const panelBottom = card.bandBottom ? bandY - BAND_GAP : H - CARD_BOTTOM_MARGIN;
  const panelH = panelBottom - panelY;

  addPlusGrid(s, { color: bandColor, x0: SIDE_MARGIN + 0.2, y0: bandY + BAND_H / 2, cols: 6, rows: 1, dx: 1.7, dy: 0, size: 13 });
  addGlobeIcon(s, { x: W - SIDE_MARGIN - 0.5, y: bandY + BAND_H / 2 - 0.25, size: 0.5, colorName: globeColorName });

  s.addShape("roundRect", { x: PANEL_X, y: panelY, w: PANEL_W, h: panelH, rectRadius: 0.2, fill: { color: COLORS.black }, line: { type: "none" } });

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
  addCoverImage(s, {
    path: path.join(PHOTOS_DIR, card.photo),
    x: photoX, y: panelY + PHOTO_PAD, w: photoW, h: panelH - 2 * PHOTO_PAD,
  });
});

// ---------- Institucional: manifesto ----------
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

// ---------- Prova — cases @arpejo ----------
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

// ---------- Diferencial: o .report mensal ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.lime };
  addGlobeIcon(s, { x: W - 1.1, y: 0.5, size: 0.45, colorName: "black" });
  s.addText("report↗", { x: SIDE_MARGIN, y: 0.5, w: 2, h: 0.4, fontFace: FONT_MONO, bold: true, fontSize: 12, color: COLORS.black, margin: 0 });
  const panelY = 1.25;
  const panelH = H - panelY - 0.5;
  s.addShape("roundRect", { x: PANEL_X, y: panelY, w: PANEL_W, h: panelH, rectRadius: 0.2, fill: { color: COLORS.black }, line: { type: "none" } });
  const diffTextColW = PANEL_W * 0.5;
  const diffTextX = PANEL_X + 0.45;
  const diffPhotoX = PANEL_X + diffTextColW + 0.4;
  const diffPhotoW = PANEL_X + PANEL_W - diffPhotoX - 0.35;
  s.addText("O nosso diferencial: inteligência de mercado, todo mês.", {
    x: diffTextX, y: panelY + 0.4, w: diffTextColW - 0.5, h: 1.5,
    fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 22, color: COLORS.lime, valign: "top", margin: 0,
  });
  s.addText(
    "Isso que você viu até agora — leitura de tendências de consumo, novidades de plataformas e cases que inspiram — é o nosso .report: um relatório proprietário que produzimos todo mês pra orientar as decisões dos nossos clientes.\n\nQuem fecha com a Arpejo não recebe só campanha. Recebe visão de mercado aplicada, com frequência mensal.",
    { x: diffTextX, y: panelY + 2.0, w: diffTextColW - 0.5, h: 3.0, fontFace: FONT_BODY, fontSize: 13.5, color: COLORS.white, valign: "top", margin: 0 }
  );
  addCoverImage(s, {
    path: path.join(PHOTOS_DIR, "prospect-diferencial.jpg"),
    x: diffPhotoX, y: panelY + 0.35, w: diffPhotoW, h: panelH - 0.7,
  });
  addArrowIcon(s, { x: W - 1, y: H - 1, size: 0.32, colorName: "black", corner: "SE" });
}

// ---------- CTA (personalizado com o nome da marca) ----------
{
  const s = pres.addSlide();
  s.background = { color: COLORS.black };
  addPlusGrid(s, { color: "333333", x0: 1, y0: 0.9, cols: 8, rows: 5, dx: 1.6, dy: 1.3, size: 12 });
  addCornerArrows(s, { colorName: "lime", slideW: W, slideH: H, size: 0.32 });
  s.addText(`Vamos conversar sobre o que\n${CLIENT.ctaVerb}\npra ${CLIENT.name}?`, {
    x: 0.8, y: 2.2, w: W - 1.6, h: 2.6, fontFace: FONT_TITLE, italic: true, bold: true, fontSize: 30, color: COLORS.white, margin: 0,
  });
  s.addText("fala com a gente → @arpejo", {
    x: 0.8, y: 5.2, w: 8, h: 0.5, fontFace: FONT_MONO, fontSize: 13, color: COLORS.lime, margin: 0,
  });
  addLogo(s, LOGO, { x: 0.8, y: H - 1.3, w: 2.4 });
}

const outPath = process.argv[6] || `out/apresentacao-prospeccao-${CLIENT_KEY}-agosto26.pptx`;
pres.writeFile({ fileName: outPath }).then(() => console.log("wrote", outPath));
