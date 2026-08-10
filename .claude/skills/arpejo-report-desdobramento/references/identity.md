# Identidade visual do .report (Arpejo)

Extraída do template mestre (`assets/report-master-template.pptx`) e da edição de
referência (agosto/26). Use estes tokens em qualquer uma das três peças —
é o que faz o carrossel, a apresentação de prospecção e o material de cliente
serem reconhecíveis como "farinha do mesmo saco" do report, mesmo em formatos
e proporções diferentes.

## Cores

| Papel | Hex | Uso observado |
|---|---|---|
| Preto (base) | `000000` | Fundo de capa, dividers, cards de case/campanha |
| Verde-limão (acento 1) | `DAFF94` | Fundo alternado de card de news/trend, texto de destaque sobre preto, wordmark |
| Coral/laranja (acento 2) | `FF7C51` | Fundo alternado de card de news, contraponto ao limão — nunca usar os dois como fundo no mesmo card |
| Branco | `FFFFFF` | Texto sobre preto, wordmark |

Regra: **um card = um fundo sólido dominante** (preto, limão OU coral). A
paleta nunca vira gradiente nem divide o fundo ao meio — é bloco de cor cheio.
Alterne limão/coral entre cards consecutivos de News para dar ritmo; Trends e
cases usam fundo fotográfico com card flutuante por cima (ver "Cards" abaixo).

## Tipografia

| Papel | Fonte | Fallback seguro (QA) | Uso |
|---|---|---|---|
| Título/nome de tendência ou case | Libre Baskerville, itálico | Cambria itálico | "SLOW-LIVING COMO STATUS DE LUXO", nomes de marca em badge oval |
| Tag de data/edição | Mono (Ubuntu Mono / JetBrains Mono Medium) | Courier New | "agosto_26", legendas técnicas |
| Corpo de texto | Sans (Urbanist / Arial) | Arial | Parágrafos analíticos, bullets |

Títulos sempre em itálico serifado — é a assinatura mais forte da marca, mais
até que a cor. Corpo de texto nunca centralizado (alinhar à esquerda).

## Motivos gráficos (repetir em toda peça)

1. **Badge oval** — elipse sem preenchimento, contorno fino, texto centralizado
   dentro (nome de plataforma, marca ou tendência). É o principal "rótulo" do
   sistema — substitui títulos de slide convencionais.
2. **Setas de canto** (↖ ↗ / ↙ ↘) enquadrando slides de abertura/divisor —
   dão a sensação de "moldura" ou viewfinder.
3. **Seta diagonal única** (↘) no canto inferior direito dos cards de
   conteúdo — assinatura de rodapé, sempre na cor do texto do card.
4. **Grid de cruzes "+"** pontilhado como textura de fundo em slides pretos
   (divisores, capa) — sutil, nunca compete com o texto.
5. **Cards com cantos arredondados flutuando sobre foto** — usado em Trends e
   Insights: fundo é uma fotografia editorial de tela cheia (escurecida), por
   cima um card retangular de canto arredondado (limão para trend, transparente/preto
   para insight) com o texto.
6. **Wordmark** `arpejo` + `report` com seta embutida no "t" — ativo pronto em
   `assets/arpejo-report-logo.png` (fundo transparente). Usar sempre este
   arquivo, não recriar o logotipo.

## Cabeçalho recorrente dos cards de conteúdo

News e Trends do report original trazem um cabeçalho fino no topo do slide:
`report↗` (esquerda) — `arpejo` (centro) — `mês_ano` (direita), em mono/caps
pequeno. Reaproveitar esse cabeçalho ajuda a assinar qualquer card como
"Arpejo Report" mesmo fora do contexto do deck completo (bom para o carrossel,
que circula solto no feed).

## Layouts por tipo de card (fonte: report de agosto/26)

- **Capa**: fundo preto, linhas onduladas finas brancas decorativas no topo,
  wordmark ".report" serifado grande, canto inferior com "+" decorativo.
- **Divisor de seção** (NEWS / TRENDS / INSIGHTS / @arpejo): fundo preto,
  grid de "+", setas de canto, título da seção centralizado em itálico serifado
  limão, ícones pequenos (anéis entrelaçados + globo) no topo central.
- **Card de News**: fundo sólido (limão ou coral), imagem/ícone quadrado à
  esquerda, badge oval com nome da plataforma + ícone de globo à direita dele,
  headline em negrito, parágrafo, opcionalmente bullet list ou "Para as
  marcas:" em negrito como fechamento, seta diagonal no canto inferior direito.
- **Card de Trend**: fundo fotográfico full-bleed escurecido, card limão
  arredondado à esquerda com nome da tendência (itálico, 2 linhas) + subtítulo
  itálico menor, thumbnail da referência dentro do card; parágrafo analítico à
  direita sobre a foto, fechando com "Para as marcas:" em negrito.
- **Card de campanha própria (@arpejo)**: fundo preto com grid de "+", badge
  oval branco com "Cliente - Campanha", sem corpo de texto (é usado como
  divisor/showcase, o case em si é reforçado com screenshot em slide seguinte
  quando necessário).
- **Card de Insight (case de outra marca)**: fundo preto, badge oval branco
  com o nome da marca no topo, imagem/still de vídeo grande abaixo, parágrafo
  explicativo compacto. *Este layout nunca deve ser usado fora do material de
  cliente — ver regra de confidencialidade no SKILL.md.*
- **Fontes**: fundo preto, lista de fontes com ícone de "mão apontando",
  título "FONTES →" à esquerda.
