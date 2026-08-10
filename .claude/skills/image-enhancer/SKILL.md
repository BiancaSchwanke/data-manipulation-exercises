---
name: image-enhancer
description: >
  Improves real resolution and sharpness of images before they're embedded
  into a deliverable — slide decks, carousels, one-pagers — using genuine
  Pillow-based upscaling (Lanczos resampling) and unsharp-mask sharpening.
  Use this any time an image being incorporated into a deck or artifact is
  low-resolution, a compressed screenshot, or needs to be cropped to a
  specific aspect ratio (e.g. a 4:5 Instagram card) without distortion.
  Also use it to pull higher-quality source images out of a PDF (via
  pdfimages) instead of screenshotting a rendered page — a screenshot of a
  screenshot compounds compression loss, while the PDF's embedded image is
  the highest-quality copy actually available.
---

# Melhoria real de imagem

Existe uma skill homônima circulando por aí que promete "upscale
inteligente" e "redução de artefatos" só na descrição, sem nenhum script por
trás — na prática isso levaria a inventar números de resolução numa resposta
bonita sem processar nada de verdade. Esta versão só faz o que
redimensionamento e nitidez de verdade conseguem fazer: deixar a imagem
maior e mais nítida, sem fingir recuperar detalhe que a fonte não tem. Se a
imagem de origem é genuinamente de baixa qualidade, seja honesto sobre isso
em vez de vender o resultado como "4K perfeito".

## Quando a fonte é um PDF (ex.: o `.report` mensal)

Uma captura de tela de uma página do PDF perde qualidade duas vezes: a
rasterização da página e depois a compressão do print. Em vez disso, extraia
a imagem original embutida no PDF com `pdfimages`, que pega o arquivo JPEG/PNG
tal como foi inserido, na resolução real de origem — sempre melhor que
printar a página renderizada.

```bash
pdfimages -f <primeira_página> -l <última_página> -list arquivo.pdf   # lista imagens por página, com resolução
pdfimages -f <página> -l <página> -png arquivo.pdf saida              # extrai como PNG
```

Cuidado: imagens com transparência (soft mask / `smask` na listagem) saem
como **dois arquivos separados** — a imagem base (RGB) e a máscara (escala de
cinza, mesma dimensão, mesmo prefixo numérico consecutivo). Combine os dois
antes de usar (`enhance.py` já faz isso automaticamance quando recebe um PNG
com canal alpha; para separar base+máscara em RGBA primeiro, use
`Image.new("RGBA", ...)`, cole a base e defina o canal alpha a partir da
máscara em escala de cinza).

Para o fluxo específico do `.report` da Arpejo (extrair as fotos de fundo de
cada card de Trend/News), ver `scripts/extract_report_photos.py` na skill
`arpejo-report-desdobramento` — ele já resolve esse pareamento base+máscara.

## Aplicando a melhoria

```bash
python scripts/enhance.py entrada.png saida.jpg --width 1080 --height 1350
```

- Sem `--width`/`--height`: só garante que o lado maior chegue a pelo menos
  `--min-long-edge` (padrão 1600px), fazendo upscale com reamostragem Lanczos
  se a imagem for menor que isso.
- Com `--width`/`--height`: recorta a imagem para preencher exatamente essa
  proporção (como `object-fit: cover` em CSS) — redimensiona pela maior
  dimensão e corta o excesso centralizado, sem distorcer.
- `--sharpen` controla a força do unsharp mask (padrão 110; 0 desliga).
- `--background` (hex sem `#`, padrão `000000`) é a cor usada para
  "achatar" transparência — mantenha `000000` para fotos que vão atrás de
  cards no fundo preto da identidade Arpejo (ver skill `brand-guidelines`).

Sempre reporte, em texto, a resolução antes/depois real (o script já imprime
isso em stderr) — nunca declare uma melhoria de qualidade sem mostrar os
números de verdade.
