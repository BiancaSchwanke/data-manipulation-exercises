---
name: brand-guidelines
description: >
  Applies Arpejo's official brand colors, typography, and visual motifs to
  any artifact — slide deck, carousel, one-pager, document, chart, or web
  page — created for or by the agency. Use it whenever a deliverable is
  being made for Arpejo or one of the ".report" spin-offs, whenever brand
  colors, typography, or visual identity are mentioned, and proactively any
  time you're about to design something for Bianca/Arpejo even if she
  doesn't explicitly ask for "the brand guidelines" — a plain, generic-looking
  deck for this agency is a miss, not a neutral default.
---

# Identidade visual da Arpejo

Extraída do template mestre do `.report` e da edição de referência
(agosto/26). É o sistema de identidade padrão da agência — use estes tokens
em qualquer peça, não só nos desdobramentos do report mensal (para esse fluxo
específico, ver também a skill `arpejo-report-desdobramento`, que reusa estes
mesmos tokens com recortes de layout próprios do report).

## Cores

| Papel | Hex | Uso |
|---|---|---|
| Preto (base) | `000000` | Fundo de capa, dividers, cards de destaque |
| Verde-limão (acento 1) | `DAFF94` | Fundo alternado de card, texto/ícone de destaque sobre preto, wordmark |
| Coral/laranja (acento 2) | `FF7C51` | Fundo alternado de card — nunca combinar com o limão no mesmo bloco |
| Branco | `FFFFFF` | Texto sobre preto, wordmark |

Regra: **um bloco = uma cor sólida dominante** (preto, limão OU coral). Nunca
gradiente, nunca fundo dividido ao meio. Se houver mais de um card na mesma
peça, alterne limão/coral entre eles para dar ritmo.

## Tipografia

Confirmado direto nas fontes embutidas no PDF do report (via `pdffonts`, ver
`arpejo-report-desdobramento`) — o sistema tipográfico real é mais rico do que
parecia à primeira vista:

| Papel | Fonte | Arquivo real bundlado | Fallback se a fonte não estiver instalada | Uso |
|---|---|---|---|---|
| Título / destaque | Libre Baskerville (Italic, Bold, Regular, BoldItalic) | `assets/fonts/LibreBaskerville-Regular.ttf` | Cambria itálico | Nomes de tendência, títulos de seção, headlines |
| Display de capa | DM Serif Display Regular | *(não bundlado)* | Cambria | Wordmark ".report" e títulos de capa |
| Tag técnica | JetBrains Mono Medium | `assets/fonts/JetBrainsMono-Regular.ttf` / `-Bold.ttf` | Courier New | Datas, legendas, badges de dado |
| Tag técnica (variante) | Ubuntu Mono (Regular/Bold/BoldItalic) | *(não bundlado)* | Courier New | Parágrafos analíticos em alguns cards de Trend |
| Ênfase pontual | Red Hat Display BoldItalic | *(não bundlado)* | Arial Bold Italic | Destaques bold dentro de parágrafo |
| Corpo de texto | Urbanist (BoldItalic confirmado) | *(não bundlado)* | Arial | Parágrafos, bullets |

As fontes "não bundladas" existem no PDF apenas como subconjunto (só os
caracteres já usados) — dá pra extrair com `pdffonts`/`mutool`, mas não
cobrem letras novas que você venha a escrever. Se precisar delas completas,
peça pra Bianca exportar os `.ttf` de onde o report é montado (parece Canva,
pelos nomes de fonte e pelos assets de textura abaixo) ou baixá-los do Google
Fonts — o acesso à internet deste ambiente não alcança fonts.google.com.

Títulos sempre em itálico serifado — é a assinatura mais reconhecível da
marca, mais até que a cor. Corpo de texto alinhado à esquerda, nunca
centralizado.

**Usando as fontes reais (não o fallback):** `assets/fonts/` tem os `.ttf` de
Libre Baskerville e JetBrains Mono (licença OFL, redistribuição livre — ver os
`.txt` ao lado de cada fonte). Ao gerar um `.pptx`, use `fontFace: "Libre
Baskerville"` / `"JetBrains Mono"` diretamente em vez do fallback — só caia
para Cambria/Courier New se o objetivo for a pré-visualização de QA neste
ambiente (que substitui fontes não instaladas e pode não refletir a largura
real do texto). Como o pptxgenjs não embute a fonte dentro do arquivo:
- Para a Bianca ver a fonte certa localmente, instale os `.ttf` de
  `assets/fonts/` no sistema, ou
- Antes de compartilhar o arquivo final, ative "Inserir fontes no arquivo"
  no PowerPoint (Arquivo > Opções > Salvar) para o `.pptx` carregar as fontes
  certas em qualquer computador.

Não há um corte itálico verdadeiro de Libre Baskerville bundlado — apenas o
Regular. Usar `italic: true` no pptxgenjs aplica um itálico sintético/oblíquo
sobre o Regular, o que é uma aproximação aceitável, mas não é o mesmo desenho
de um itálico desenhado à mão. Se a fidelidade tipográfica for crítica (ex.:
material impresso), vale localizar um corte itálico real da fonte antes de
finalizar.

## Motivos gráficos (repetir sempre que possível)

Os motivos abaixo não são aproximação — são os assets reais extraídos direto
do PDF do report (`pdfimages`, ver `arpejo-report-desdobramento/scripts/`),
não fontes gráficas que compõem o texto: são raster com transparência,
recolorido por script quando o motivo aparece em mais de uma cor. Todos em
`assets/textures/`:

1. **Badge oval** — elipse sem preenchimento, contorno fino, texto
   centralizado dentro, com o ícone de globo (`globe-lime.png` /
   `globe-black.png` / `globe-white.png`) encostado à direita do texto. É o
   "rótulo" padrão do sistema — usar no lugar de títulos de slide
   convencionais sempre que fizer sentido.
2. **Seta "7"** (`arrow-lime.png` / `arrow-black.png` / `arrow-white.png`) —
   usada de dois jeitos: girada nos 4 cantos de slides de abertura/divisor
   (0°/90°/180°/270°, a mesma imagem author aponta nordeste por padrão), e
   sozinha no canto inferior direito de cards de conteúdo como assinatura de
   rodapé.
3. **Grid de cruzes "+"** — `plus-grid-on-black.png`, textura pronta em
   1920×1080 (16:9) para colar como fundo cheio de slide; só serve para
   canvas 16:9, num canvas de outra proporção (ex. carrossel 4:5) as cruzes
   ficam ovais esticadas — nesse caso gere o grid com texto/glifo em vez de
   usar a imagem.
4. **Anéis entrelaçados** (`rings-lime.png`) — ícone decorativo que acompanha
   o globo no cabeçalho de slides divisores.
5. **Ondas da capa** (`wavy-lines-white.png`) e **marca "✳"** de canto
   (`sparkle-white.png`) — usados só na capa do report original; a orientação
   exata (o asset é um recorte vertical, usado rotacionado ~90° na página
   original) ainda não foi confirmada visualmente neste ambiente — confirme
   ao abrir o arquivo antes de dar como certo.
6. **Cantos arredondados** em cards que flutuam sobre fundo cheio ou foto.
7. **Wordmark** — usar sempre o arquivo `assets/arpejo-logo.png` (fundo
   transparente), nunca recriar o logotipo como texto.

## Como aplicar

- Ao gerar um `.pptx`, use a skill `pptx` **e os assets reais de
  `assets/textures/`** em vez de recriar os motivos com glifos de texto —
  `addImage` com `rotate` pros 4 cantos da seta, `addImage` esticado pro
  grid de "+" em canvas 16:9. Só use glifo/texto como aproximação quando o
  asset real não serve na proporção do canvas (ex. carrossel vertical).
- Ao gerar HTML/artifact, web page ou documento, traduza os mesmos tokens:
  paleta de cor, itálico serifado em títulos, mono em legendas, badge oval
  com globo, grid de "+" como textura de fundo.
- Nunca aplique a paleta padrão azul/genérica de um template — se a peça é da
  Arpejo, ela carrega limão/coral/preto e a tipografia serifada itálica.
