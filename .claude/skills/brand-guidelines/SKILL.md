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

Confirmado com a fonte mais confiável possível: o próprio
`arpejo.report_1.pptx` (o master do report) embute as quatro famílias
completas — Regular/Bold/Italic/BoldItalic de cada — como fontes reais do
PowerPoint (`ppt/fonts/*.fntdata`, ver "Fontes embutidas" abaixo).

| Papel | Fonte | Uso |
|---|---|---|
| Título / destaque | Libre Baskerville | Nomes de tendência, títulos de seção, headlines — sempre no corte itálico |
| Corpo de texto | Urbanist | Parágrafos, bullets |
| Tag técnica | JetBrains Mono Medium | Datas, legendas, badges de dado |
| Tag técnica (variante) | Ubuntu Mono | Parágrafos analíticos em alguns cards de Trend |

O PDF de uma edição específica (agosto/26) também trouxe glifos de DM Serif
Display Regular e Red Hat Display BoldItalic em alguns pontos pontuais (ex.
o wordmark ".report" da capa) — mas só como subconjunto dentro do PDF, sem
arquivo de fonte completo disponível; não bundlados.

Títulos sempre em itálico serifado — é a assinatura mais reconhecível da
marca, mais até que a cor. Corpo de texto alinhado à esquerda, nunca
centralizado.

**Usando as fontes reais:** `assets/fonts/*.ttf` (Libre Baskerville e
JetBrains Mono, licença OFL) servem pra referência rápida e pré-visualização,
mas para o arquivo final use `assets/fonts/embed/*.fntdata` — são as quatro
famílias completas (16 arquivos, incluindo Urbanist e Ubuntu Mono) tal como
o próprio report as embute, copiadas byte a byte do `arpejo.report_1.pptx`.

## Fontes embutidas (`.pptx` renderiza certo em qualquer computador)

`pptxgenjs` não tem como embutir fonte no arquivo que gera — sem isso, quem
abre o `.pptx` num computador sem essas fontes instaladas vê um substituto.
Em vez de depender de instalação local ou do "Inserir fontes no arquivo" do
PowerPoint, rode o script depois de gerar o arquivo:

```bash
python scripts/embed_fonts.py caminho/do/deck.pptx
```

Ele copia os 16 arquivos `.fntdata` pra dentro do `.pptx` e cuida de toda a
parte de metadados (`[Content_Types].xml`, relações, `embeddedFontLst` em
`presentation.xml`) — sem precisar entender o formato de ofuscação de fonte
do PowerPoint, só copia os blobs e liga as referências, exatamente como o
report original faz. **Sempre rode esse script como último passo, depois do
`pptxgenjs` e de qualquer edição de XML, e valide com
`scripts/office/validate.py` em seguida.**

Não há um corte itálico verdadeiro de Libre Baskerville nos `.ttf` soltos em
`assets/fonts/` (só o Regular) — mas os `.fntdata` em `assets/fonts/embed/`
têm os quatro cortes completos, então prefira sempre embutir em vez de contar
com o itálico sintético do fallback.

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
