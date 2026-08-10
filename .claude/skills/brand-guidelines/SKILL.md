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

| Papel | Fonte | Fallback seguro | Uso |
|---|---|---|---|
| Título / destaque | Libre Baskerville, itálico | Cambria itálico | Nomes de tendência, títulos de seção, headlines |
| Tag técnica | Mono (Ubuntu Mono / JetBrains Mono Medium) | Courier New | Datas, legendas, badges de dado |
| Corpo de texto | Sans (Urbanist) | Arial | Parágrafos, bullets |

Títulos sempre em itálico serifado — é a assinatura mais reconhecível da
marca, mais até que a cor. Corpo de texto alinhado à esquerda, nunca
centralizado.

## Motivos gráficos (repetir sempre que possível)

1. **Badge oval** — elipse sem preenchimento, contorno fino, texto
   centralizado dentro. É o "rótulo" padrão do sistema — usar no lugar de
   títulos de slide convencionais sempre que fizer sentido.
2. **Setas de canto** (↖ ↗ / ↙ ↘) enquadrando slides de abertura/divisor,
   como uma moldura de viewfinder.
3. **Seta diagonal única** (↘) no canto inferior direito de cards de
   conteúdo, na cor do texto do card — assinatura de rodapé.
4. **Grid de cruzes "+"** pontilhado como textura de fundo em blocos pretos.
5. **Cantos arredondados** em cards que flutuam sobre fundo cheio ou foto.
6. **Wordmark** — usar sempre o arquivo `assets/arpejo-logo.png` (fundo
   transparente), nunca recriar o logotipo como texto.

## Como aplicar

- Ao gerar um `.pptx`, use a skill `pptx` e recrie estes componentes como
  funções reutilizáveis (cor sólida de fundo, `addShape("ellipse", ...)` sem
  preenchimento para o badge, texto com os glifos de seta para os cantos) —
  não existe um asset vetorial pronto para esses motivos além do logo.
- Ao gerar HTML/artifact, web page ou documento, traduza os mesmos tokens:
  paleta de cor, itálico serifado em títulos, mono em legendas, badge oval,
  grid de "+" como textura de fundo.
- Nunca aplique a paleta padrão azul/genérica de um template — se a peça é da
  Arpejo, ela carrega limão/coral/preto e a tipografia serifada itálica.
