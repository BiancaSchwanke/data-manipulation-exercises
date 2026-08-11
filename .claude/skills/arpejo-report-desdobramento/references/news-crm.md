# Diretrizes: News de CRM (e-mail)

Este documento define como montar o "News de CRM" — confirmado pela Bianca
em agosto/26. Não redesenhe essa peça do zero a cada pedido; siga este
documento e ajuste só o conteúdo mês a mês.

## O que é

O News de CRM tem **dois formatos de saída**, mesmo conteúdo e mesma
identidade visual, pra dois jeitos diferentes de disparar:

1. **Imagem única e alta** (não é `.pptx`, não é slide deck) pra colar
   direto no corpo de um e-mail já pronto (ex.: e-mail simples do Gmail/
   Outlook, ou quando a ferramenta de CRM só aceita uma imagem). Layout de
   newsletter contínua (rolagem vertical), gerada por
   `scripts/build_news_email.py` + `scripts/capture_news_email.py`.
2. **HTML real de e-mail marketing** (tabelas, estilo inline, sem
   depender de CSS externo) pra colar no editor de HTML de uma ferramenta
   de e-mail marketing (Mailchimp, RD Station, etc.) — cada bloco é texto
   de verdade (selecionável, indexável) e os links reais (@arpejo)
   funcionam de fato, em vez de precisar de hotspot por cima de uma
   imagem. Gerado por `scripts/build_news_email_marketing_html.py`. Ver
   "Formato 2" abaixo pras diferenças e limitações desse modo.

Confirme com a Bianca qual formato ela precisa antes de gerar (ou gere os
dois — o conteúdo é o mesmo, o custo de gerar ambos é baixo).

## Referências usadas (só de estrutura, nunca de identidade visual)

A Bianca mandou dois exemplos reais de e-mail de newsletter como referência
de **conteúdo/organização**, não de design:

- **"the news"** — newsletter diária densa: vários itens curtos, "quick
  takes", "na edição de hoje", texto compacto tipo jornal.
- **WGSN "Future Proof"** — newsletter mensal curada: poucos blocos (3-5),
  cada um com imagem + título + 1-2 parágrafos + link, mais espaçoso e
  editorial.

**Confirmado: seguir o modelo WGSN** (curado, editorial) — fica mais perto
da estética atual do `.report` do que o modelo denso. Nunca copie o sistema
visual desses exemplos (cores, fontes, ícones) — são só referência de como
organizar conteúdo em blocos pra e-mail.

## Conteúdo: mesmo recorte do material de cliente

**Recap completo**, confirmado pela Bianca: News + Trends + cases @arpejo +
Insights condensado + Indicações Arpejers — o mesmo recorte que já vale pra
`build-cliente` (ver `SKILL.md`, seção "Material para clientes"). Como é
peça exclusiva de cliente pagante, **Insights pode entrar** (ver a regra de
confidencialidade no `SKILL.md` — nunca no carrossel/prospecção, mas aqui
sim).

Não recorte o conteúdo de novo do zero todo mês: se já existir um
`build-cliente.js`/script de material de cliente daquele mês com o recorte
pronto (News/Trends/@arpejo/Insights), reaproveite os mesmos itens aqui —
são a mesma curadoria, só em formatos diferentes.

## Estrutura da peça (coluna única, 640px de largura)

1. **Header** (fundo limão): wordmark "report↗" + globo, faixa de plus-grid,
   logo grande, título em 2 linhas (itálico bold), parágrafo de abertura,
   data (mono).
2. **Nesta edição**: lista curta com "→" apontando pra cada seção abaixo —
   ajuda a escanear, já que a peça é longa.
3. **News**: um card por item (painel escuro arredondado, oval badge com o
   nome da plataforma, texto).
4. **Trends**: um bloco por tendência — foto no topo (cover, sem distorcer:
   ver "Detalhes técnicos" abaixo), título itálico bold na cor de destaque
   (alterne limão/coral), subtítulo, corpo, "Para as marcas:".
5. **@arpejo — o que fizemos esse mês**: um painel por case, com badge,
   texto do conceito, e uma linha "▶ assistir ao case" estilizada como link
   (sublinhada, cor de destaque) — é aqui que entra o link de verdade.
6. **Insights — inspirações do mês (exclusivo pra você)**: grid 2 colunas,
   cards menores (badge + texto curto).
7. **Indicações Arpejers**: lista mono, estilo "_ item".
8. **Fontes**: rodapé pequeno, itálico cinza — transparência, não é o foco.
9. **Footer** (fundo limão): logo + "até o mês que vem." + faixa de
   plus-grid.

## Links por título — como funciona

A imagem final **não carrega links nenhum** (é uma imagem estática). O que
o script faz é deixar cada título/linha que devia ser clicável visualmente
marcado como link (cor de destaque, sublinhado no caso do @arpejo) — depois,
no editor da campanha de e-mail, a Bianca (ou quem for montar o disparo)
adiciona a área clicável ("hotspot"/link de imagem) por cima da posição de
cada título, apontando pro destino real.

- **@arpejo**: o script já sabe o link real de cada case (campo `video` em
  `ARPEJO_CASES`, dentro de `build_news_email.py`) e imprime a lista
  "títulos → URL" no final da execução — repasse essa lista pra quem for
  montar a campanha.
- **News/Trends**: o `.report` normalmente não guarda a URL da matéria
  original (só cita a fonte, ver seção "Fontes"). Sem uma URL real, não
  invente um link — pergunte à Bianca o destino (site da Arpejo, LP do
  report completo, ou sem link mesmo) antes de fechar a campanha.

## Detalhes técnicos — Formato 1 (imagem única)

- **Não é pptxgenjs**: como a peça final é uma imagem só (não um slide
  deck), o script gera HTML/CSS autocontido (fontes e fotos em base64) e
  captura com Playwright (`capture_news_email.py`) — mais simples e evita
  todas as pegadinhas do pptxgenjs documentadas no `SKILL.md`, porque elas
  nem se aplicam aqui.
- **Fotos**: usam `background-image` + `background-size: cover` em CSS puro
  — isso já faz o corte proporcional certo por padrão (é o próprio bug do
  pptxgenjs, `addCoverImage`, que existe pra compensar a falta desse
  comportamento nativo; em CSS ele já vem de graça).
- **Fontes reais**: só existem `.ttf` de peso regular pra Libre Baskerville
  e JetBrains Mono em `brand-guidelines/assets/fonts/` (as variantes
  itálico/bold do arquivo `.pptx` são `.fntdata` ofuscados, não dá pra usar
  em `@font-face`). Itálico/bold saem do "faux style" do próprio navegador
  — mesma abordagem já usada na prévia interativa do carrossel, funciona
  bem o suficiente pra uma prévia/imagem final.
- **Tamanho do arquivo**: a imagem final é bem alta (~9000px em 2x/retina).
  Entregue em **JPEG** (qualidade ~88-90) — reduz o arquivo em mais de 50%
  sem perda visível de nitidez no texto, testado em agosto/26. Envios de
  imagem muito alta (~2x, 1280px de largura) podem falhar no upload; prefira
  entregar a versão 1x (640px de largura) por padrão e gerar a versão maior
  só se pedirem.
- **GIF de prévia**: se a Bianca pedir uma prévia em GIF, não dá pra fazer
  slide a slide (é uma imagem só) — use
  `scripts/build_news_email_scroll_gif.py`, que rola uma janela por cima da
  imagem de cima a baixo. Pacing confirmado: 110ms por frame (60ms ficou
  rápido demais).

## Detalhes técnicos — Formato 2 (HTML de e-mail marketing)

`scripts/build_news_email_marketing_html.py` gera o HTML de verdade,
pronto pra colar no editor de HTML de uma ferramenta de e-mail marketing.
É um código diferente do Formato 1 (não é o mesmo HTML/CSS reaproveitado)
porque as regras de e-mail HTML são bem mais restritas que uma página web
qualquer:

- **Tabelas + estilo inline, não `<div>`/CSS**: Outlook desktop renderiza
  com o motor do Word — sem flexbox, sem `background-image` em CSS, sem
  `border-radius` garantido. `<table>` com `style=""` inline em cada `<td>`
  é o único layout que sobrevive em todo cliente de e-mail.
- **Fontes com fallback web-safe, não as fontes reais da marca**: fonte
  customizada via `@font-face` não é confiável em e-mail (Gmail remove,
  Outlook desktop ignora). Esse formato usa Georgia/serif no lugar da
  Libre Baskerville itálica e Courier New/monospace no lugar da JetBrains
  Mono — é uma perda visual real em relação ao `.pptx`/imagem, avise a
  Bianca em vez de fingir que é a mesma fonte.
- **Fotos pré-cortadas em arquivo, não `background-size: cover`**: Outlook
  não corta via CSS, então cada foto de trend já sai cortada no tamanho
  exato da caixa (`export_assets()` no script, usando Pillow) em vez de
  depender do corte automático do CSS como no Formato 1.
- **Sem imagem em base64**: muitas ferramentas de e-mail bloqueiam ou
  removem `data:` URIs, e um e-mail desse tamanho em base64 ficaria enorme.
  Toda imagem sai como arquivo de verdade em `assets/`, com um `src`
  provisório (`assets/<nome-do-arquivo>`) — depois de gerar, **suba cada
  arquivo no host de imagens da ferramenta de e-mail marketing e troque o
  `src` pela URL que ela devolver**. Cada `<img>` tem um comentário HTML
  em cima avisando qual arquivo é.
- **Link real só onde existe URL real**: os cases @arpejo já saem com
  `<a href>` de verdade (o script conhece a URL). Título de News/Trends
  sem URL de origem conhecida fica como texto normal, sem link — não
  invente destino, é a mesma regra do Formato 1.

## Os scripts

- `lib/news_email_content.py` — o conteúdo do mês (tagline da capa, News,
  Trends, @arpejo, Insights, Indicações, Fontes). **Edite só aqui** — os
  dois formatos de saída importam desse mesmo arquivo, então editar uma vez
  atualiza os dois.
- `scripts/build_news_email.py` — Formato 1: gera o HTML autocontido
  (fontes/fotos em base64).
- `scripts/capture_news_email.py` — renderiza o HTML do Formato 1 pra
  imagem final (PNG/JPEG) via Playwright.
- `scripts/build_news_email_scroll_gif.py` — gera a prévia em GIF do
  Formato 1 (opcional, só se pedirem).
- `scripts/build_news_email_marketing_html.py` — Formato 2: gera o HTML de
  e-mail marketing (tabelas, estilo inline) + os arquivos de imagem
  pré-cortados em `assets/`.
