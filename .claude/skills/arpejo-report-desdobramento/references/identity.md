# Layouts de card do .report

Para paleta de cores, tipografia e motivos gráficos (badge oval, setas de
canto, grid de "+", logo), ver a skill `brand-guidelines` — é a mesma
identidade em todas as peças da Arpejo, não só no report. Este arquivo cobre
só os layouts específicos de cada tipo de card observados no report de
referência (agosto/26), úteis quando for reconstruir/adaptar um card
existente.

## Cabeçalho recorrente dos cards de conteúdo

News e Trends do report original trazem um cabeçalho fino no topo do slide:
`report↗` (esquerda) — `arpejo` (centro) — `mês_ano` (direita), em mono/caps
pequeno. Reaproveitar esse cabeçalho ajuda a assinar qualquer card como
"Arpejo Report" mesmo fora do contexto do deck completo (bom para o
carrossel, que circula solto no feed).

## Layouts por tipo de card

- **Capa**: fundo preto, linhas onduladas finas brancas decorativas no topo,
  wordmark ".report" serifado grande, canto inferior com "+" decorativo.
- **Divisor de seção** (NEWS / TRENDS / INSIGHTS / @arpejo): fundo preto,
  grid de "+", setas de canto, título da seção centralizado em itálico
  serifado limão, ícones pequenos (anéis entrelaçados + globo) no topo
  central.
- **Card de News**: fundo sólido (limão ou coral), imagem/ícone quadrado à
  esquerda, badge oval com nome da plataforma + ícone de globo à direita
  dele, headline em negrito, parágrafo, opcionalmente bullet list ou "Para as
  marcas:" em negrito como fechamento, seta diagonal no canto inferior
  direito.
- **Card de Trend (carrossel Instagram) — padrão oficial, confirmado pela
  Bianca em agosto/26**: NÃO usar o tratamento antigo de foto full-bleed com
  scrim escuro. O padrão atual é gerado por
  `scripts/build-instagram-carousel.js` (reutilize esse arquivo todo mês,
  só editando os dois blocos marcados "EDITAR TODO MÊS" — não redesenhe do
  zero). Estrutura de cada card:
  - Fundo do slide inteiro na cor de destaque da tendência (preto, limão ou
    coral, alternando entre os cards).
  - Um painel preto arredondado ("rounded rectangle") flutuando com margem
    lateral sobre esse fundo — mesmo quando o fundo já é preto (o painel só
    fica "invisível" nesse caso, o que é esperado, não um bug).
  - Uma "faixa" (chrome band) com grid de "+" e ícone de globo na margem que
    sobrou (embaixo do painel, ou em cima dele — ver `bandTop` abaixo),
    sempre fora do painel preto.
  - Título em duas linhas: a 1ª linha é texto itálico simples; a 2ª linha
    fica dentro de um oval com contorno (não é mais um badge de categoria
    pequeno, é o próprio nome da tendência estilizado).
  - Corpo de texto dentro do painel: headline em negrito (1 frase de
    impacto) → uma frase de detalhe (mais contexto sobre a tendência) → o
    dado/fonte em mono. Cor do texto = a cor de destaque do card (limão para
    fundo preto/limão, coral para fundo coral) — nunca a cor do próprio
    fundo, porque o texto sempre está sobre o painel preto, não sobre o
    fundo do slide.
  - A foto de cada card segue uma de duas variantes, escolhida pelo campo
    `bandTop` do card: `bandTop: false` emoldura a foto dentro do painel
    (título → foto → texto), com a faixa de plus-grid embaixo; `bandTop:
    true` põe o texto logo abaixo do título e deixa a foto sangrar até a
    borda do slide, com a faixa de plus-grid em cima. Alterne entre as
    variantes pra dar ritmo ao carrossel. Sempre coloque a foto com
    `addCoverImage()` de `lib/identity.js`, nunca com `s.addImage` +
    `sizing: { type: "cover" }` direto — ver a explicação do bug em
    `SKILL.md` ("Duas pegadinhas do pptxgenjs").

  Ver a regra de procedência de imagem no SKILL.md antes de reaproveitar
  qualquer foto: still de campanha de marca terceira (ex. o Loewe da
  Hiper-realidade, o F1/Charlotte Tilbury do Sport Fandom, o ChatGPT/OpenAI
  do Agentic Search) só entra no carrossel/prospecção com autorização
  explícita da Bianca — ela liberou esses especificamente em agosto/26
  ("usar as mesmas imagens em todos os materiais"). Para Experiências
  Transformadoras e Geração Sem Ressaca, a Bianca mandou fotos de banco
  genérico dela mesma (sem marca de terceiro), que são sempre seguras pra
  qualquer peça.

  A capa do carrossel também é fixa (mesmo script): fundo limão, grid de "+"
  preto + globo, o logo grande "arpejo report↗" (versão 100% preta —
  `assets/arpejo-report-logo-all-black.png` — porque a versão original tem
  seta limão que some no fundo limão), e uma tagline com o mês
  ("As principais tendências de [mês], no Report."). Isso é a capa real que
  a Bianca já publica, não uma reinterpretação — não redesenhar.

  **Legenda do post**: tom pessoal e conversacional, primeira pessoa do
  plural ("a gente"), nada de jargão técnico ou de marketing — evite frases
  como "dado, fonte", ".report mensal", "versão completa", hashtags em
  inglês. Rode `running-marketing-campaigns/scripts/brand_checker.py check`
  antes de entregar (a config de legibilidade já está calibrada pra PT-BR).
  Exemplo real aprovado (agosto/26):

  > Reparamos numa coisa esse mês: parece que todo mundo tá vivendo várias
  > tendências ao mesmo tempo. A linha entre online e offline sumiu. A
  > galera tá bebendo menos, buscando mais transformação e torcendo
  > diferente pelo esporte.
  >
  > Separamos 5 delas pra te contar aqui, do jeito que a gente vê no dia a
  > dia com as marcas.
  >
  > Passa pro lado e dá uma olhada. Se curtir, chama a gente.
  >
  > #arpejo #tendencias2026

  Uma prévia interativa (mockup do feed do Instagram, HTML autocontido) pode
  ser gerada em paralelo ao `.pptx` — screenshot cada slide com Playwright
  (`/opt/pw-browsers/chromium`) e monte um GIF com Pillow se a Bianca pedir
  algo pra colar numa apresentação ou visualizar a passagem entre os cards.
- **Card de campanha própria (@arpejo)**: fundo preto com grid de "+", badge
  oval branco com "Cliente - Campanha", geralmente sem corpo de texto (é
  usado como divisor/showcase).
- **Card de Insight (case de outra marca)**: fundo preto, badge oval branco
  com o nome da marca no topo, imagem/still de vídeo grande abaixo, parágrafo
  explicativo compacto. *Este layout nunca deve ser usado fora do material de
  cliente — ver regra de confidencialidade no SKILL.md.*
- **Fontes**: fundo preto, lista de fontes com ícone de "mão apontando",
  título "FONTES →" à esquerda.
