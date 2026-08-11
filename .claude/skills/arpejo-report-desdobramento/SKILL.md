---
name: arpejo-report-desdobramento
description: >
  Use this skill whenever Bianca (Arpejo) shares the agency's monthly ".report"
  trends deck — the recurring report covering platform news, consumer trends,
  the agency's own campaigns, and inspirational case studies — and asks to
  "desdobrar", split, repurpose, or turn it into other pieces. Also trigger
  proactively any time a new monthly report file (PDF or PPTX, sections like
  NEWS / TRENDS / @arpejo / INSIGHTS / INDICAÇÕES ARPEJERS / FONTES) is
  uploaded, even without an explicit instruction, since this is a recurring
  monthly workflow. Produces four derivative deliverables from one source
  report: (1) an Instagram carousel post for @arpejo, (2) a market-prospecting
  presentation, (3) a client-facing recap (pptx), (4) a "News de CRM" — a
  single tall image, in the report's visual identity, for pasting into a
  client email/CRM campaign. Always enforce the confidentiality rule
  described in this skill — the Insights chapter is client-only and must
  never appear in the Instagram carousel or the prospecting deck (it may
  appear in the client recap and the News de CRM, both client-only pieces).
---

# Desdobramento do .report mensal da Arpejo

Todo mês a Arpejo produz um relatório de tendências (o `.report`) com estas
seções, sempre sinalizadas por um slide divisor (fundo preto, título grande
itálico centralizado, setas de canto — ver `references/identity.md`):

1. **Capa + edição** (mês_ano)
2. **NEWS** — novidades de plataformas/mercado publicitário (Reddit, IA,
   WhatsApp, LinkedIn...). Conteúdo público, factual.
3. **TRENDS** — tendências de consumo e comportamento. Conteúdo público,
   analítico, com leitura de "Para as marcas".
4. **@arpejo** — campanhas que a própria agência realizou para clientes no mês.
   Portfólio real, prova de trabalho.
5. **INSIGHTS** — campanhas de *outras* marcas usadas como inspiração
   (Itaú, Coca-Cola, Burger King etc.). **Capítulo exclusivo para clientes
   pagantes** — é curadoria/análise competitiva que a Arpejo faz para quem já
   é cliente, não material de vitrine.
6. **INDICAÇÕES ARPEJERS** — conteúdos (artigos, textos) recomendados pelo
   time.
7. **FONTES** — referências usadas na apuração.

A ordem e a quantidade de itens por seção variam a cada edição — identifique
as seções pelos slides divisores, não por número de página fixo.

## Regra inegociável: confidencialidade do capítulo INSIGHTS

O capítulo Insights existe porque é um benefício exclusivo de quem contrata a
Arpejo: ver como marcas de peso estão se movendo, com leitura estratégica
aplicada. Se esse conteúdo aparecer num post público do Instagram ou numa
apresentação de prospecção, dois problemas acontecem: (a) o "benefício
exclusivo" deixa de ser exclusivo, esvaziando o motivo de alguém virar
cliente; (b) a Arpejo passa a divulgar publicamente uma leitura estratégica
sobre marcas de terceiros, o que pode ser lido como oportunismo ou vazar
inteligência competitiva que o cliente esperava receber em particular.

Por isso: **Insights nunca entra no carrossel do Instagram nem na
apresentação de prospecção.** Ele só aparece na peça de cliente (item 3
abaixo), e mesmo lá, mantenha a atribuição de marca e a leitura tal como no
report original — não é para reescrever a análise, só para recortá-la.

Se um item de Insights parecer "bom demais para não usar" em prospecção,
resista: proponha em vez disso usar um item de NEWS ou TRENDS equivalente, ou
citar o caso de forma genérica sem atribuir a marca. Se estiver em dúvida
sobre um item de fronteira, pergunte à Bianca em vez de decidir sozinho.

## Regra inegociável: procedência das fotos de Trends/News

Nem toda foto usada como evidência de tendência é banco de imagens genérico —
às vezes é still de uma campanha publicitária real de uma marca terceira (ex.:
na edição de agosto/26, os 4 fundos de Trends eram creative de Loewe,
Heineken, Charlotte Tilbury/F1 e Skol). Reaproveitar isso como plano de fundo
decorativo do carrossel público ou da prospecção passa a impressão de
afiliação com aquela marca e usa a criação publicitária de terceiros sem
autorização — o mesmo tipo de risco do Insights, mas de direito de imagem/marca
em vez de confidencialidade.

Antes de reaproveitar qualquer foto do report num material novo, verifique a
procedência: se é fotografia de banco genérica (sem logotipo, marca ou produto
identificável de terceiros), pode ir para qualquer peça, inclusive o carrossel
público; se é still de campanha/produto de uma marca terceira, trate como
Insights — só na peça de cliente. Use
`scripts/extract_report_photos.py` para extrair a foto de fundo direto do PDF
(evita a perda de qualidade de um print da página renderizada) e a skill
`image-enhancer` para melhorar resolução/nitidez antes de embutir — nunca
declare uma imagem "melhorada" sem ter rodado o processamento de verdade.

## As três peças

### 1. Carrossel Instagram (@arpejo)

- **Fonte de conteúdo**: TRENDS em primeiro lugar (é o conteúdo mais
  "compartilhável" — comportamento, cultura), NEWS como segunda opção.
  @arpejo pode aparecer só como card final de fechamento ("quem faz esse
  report é a gente" / CTA), nunca misturado entre os cards de conteúdo.
- **Formato**: canvas vertical 9×11.25in (proporção 4:5, padrão de feed).
  Estrutura: capa (edição do mês) → 3 a 6 cards, um conceito por card → card
  de fechamento com CTA (ex.: "relatório completo com a gente" / @arpejo).
- **Layout: use sempre `scripts/build-instagram-carousel.js`** — é o padrão
  confirmado pela Bianca (agosto/26), puxado diretamente do próprio
  report identity: painel preto arredondado sobre o fundo de cor do card,
  faixa de plus-grid + globo, título em duas linhas com a 2ª dentro de um
  oval, headline + frase de detalhe + dado/fonte. Ver a descrição completa
  em `references/identity.md` ("Card de Trend"). **Não redesenhe esse
  layout do zero** — edite só o conteúdo (`CARDS` e a tagline do mês) no
  topo do script, marcado com comentários "EDITAR TODO MÊS".
- Cada card tem: título (2 linhas), headline (1 frase de impacto, o "Para as
  marcas" do report resumido), uma frase de detalhe com mais contexto sobre
  a tendência, e o dado/fonte. Nunca invente estatística — se o report não
  trouxer um número claro pra aquela tendência, resuma a fonte em texto.
- **Legenda**: tom pessoal, conversacional, primeira pessoa do plural — sem
  jargão técnico/de marketing (nada de "dado, fonte", ".report mensal",
  hashtags em inglês). Valide com
  `running-marketing-campaigns/scripts/brand_checker.py check` antes de
  entregar. Ver exemplo aprovado em `references/identity.md`.
- Escolha os itens mais visuais e universais (que não dependem de contexto de
  categoria de cliente específico) — se não estiver óbvio quais, liste as
  opções para a Bianca escolher em vez de decidir por conta própria.
- Se a Bianca pedir uma prévia interativa (mockup do feed) ou um GIF do
  carrossel, gere um HTML autocontido espelhando a mesma geometria do
  script (mesmos valores em polegadas, convertidos para `%`/`cqw` do
  container) e capture screenshots com Playwright
  (`/opt/pw-browsers/chromium`) — não tente renderizar o `.pptx` via
  LibreOffice/`soffice` neste ambiente, a conversão está quebrada.

### 2. Apresentação de prospecção

- **Ver `references/prospeccao.md` para as diretrizes completas** (confirmado
  pela Bianca em agosto/26) — não redesenhe essa peça do zero, siga esse
  documento.
- **Duas fontes de conteúdo, uma identidade visual só**: a seção de
  mercado/tendências vem do `.report` mensal (TRENDS/NEWS, nunca Insights);
  a seção institucional/metodologia vem da apresentação comercial real da
  agência, salva em `assets/apresentacao-institucional-arpejo.pdf`
  (manifesto "A técnica constrói...", "Good skills, Gold feeling", prêmios,
  clientes, estrutura, liderança, tamanho do time — reaproveite esses fatos
  reais, não invente). Toda a peça usa só a identidade visual do `.report`
  (painel preto, chrome band, título com oval) — o PDF institucional tem um
  sistema visual próprio (preto/branco, textura de ruído) que serve só como
  fonte de conteúdo, nunca como referência de design.
- **Formato**: 16:9, ~10-14 slides. Estrutura narrativa: capa → "o mercado
  está mudando" (hook com trends/news, no padrão de card do report) → quem é
  a Arpejo (institucional, ver acima) → prova (cases @arpejo) → como
  trabalhamos / o que entregamos (incluindo o report mensal como
  diferencial) → CTA/próximos passos.

### 3. Material para clientes

- **Fonte de conteúdo**: a mais completa das três — pode e deve incluir
  Insights, além de um recorte curado de News, Trends e @arpejo. É um recap
  de valor para quem já paga, não uma peça de venda.
- **Formato**: 16:9, ~8-12 slides, no espírito de "melhores momentos do mês"
  do report completo — mantém a estrutura por seção (News → Trends → @arpejo
  → Insights) só que condensada.

### 4. News de CRM (e-mail)

- **Ver `references/news-crm.md` para as diretrizes completas** (confirmado
  pela Bianca em agosto/26) — não redesenhe essa peça do zero, siga esse
  documento.
- **Não é um `.pptx`** — é uma **imagem única e alta**, pra colar direto no
  corpo de um e-mail/campanha de CRM. Gerada via HTML/CSS autocontido +
  screenshot de página inteira (Playwright), não via pptxgenjs.
- **Fonte de conteúdo**: mesmo recorte do material de cliente (item 3) —
  News + Trends + @arpejo + Insights + Indicações, o mesmo recap completo,
  só que organizado como newsletter de coluna única em vez de slides.
  Insights pode entrar (peça exclusiva de cliente).
- **Formato**: coluna única de 640px de largura, altura variável (a peça
  inteira, tipicamente vários milhares de px de altura). Estrutura editorial
  curada (poucos blocos, cada um com imagem/badge + título + corpo + link),
  inspirada na organização de referências reais de newsletter que a Bianca
  mandou (ver `references/news-crm.md`) — nunca copie o sistema visual
  dessas referências, só a organização em blocos.
- **Links**: a imagem final não carrega links — cada título/linha
  clicável só fica marcado visualmente (cor de destaque, sublinhado). Quem
  monta a campanha adiciona a área clicável por cima depois. Repasse a lista
  de "título → URL real" que o script imprime pros cases @arpejo; para
  News/Trends sem URL de origem conhecida, pergunte à Bianca o destino antes
  de fechar a campanha.

## Como gerar as peças

1. **Leia o report de origem.** PDF: use `Read` com `pages` em blocos de até
   20 páginas. PPTX: use `markitdown` para o texto e
   `scripts/thumbnail.py` (skill `pptx`) para a grade visual. Identifique os
   slides divisores para mapear onde cada seção começa e termina, e liste os
   itens de cada seção com um resumo de uma linha.
2. **Proponha o recorte** quando não for óbvio quais itens usar no carrossel
   e na prospecção (normalmente 3-6 itens cada) — confirme com a Bianca antes
   de montar o design, é mais barato ajustar a lista do que redesenhar slides.
3. **Gere os arquivos com a skill `pptx`** (carregue-a antes de montar
   qualquer slide), **e também a skill `brand-guidelines`** para os tokens de
   cor/tipografia/motivos — este skill não duplica mais essa informação, só
   documenta em `references/identity.md` os layouts específicos de cada tipo
   de card do report. Para o **carrossel do Instagram, reutilize
   `scripts/build-instagram-carousel.js`**, e para a **prospecção,
   `scripts/build-prospeccao.js`** (só edite o conteúdo do mês, ver os
   comentários "EDITAR TODO MÊS" nos arquivos) em vez de redesenhar o layout
   do zero — são os padrões confirmados pela Bianca (agosto/26, incluindo o
   corte de foto corrigido — ver `addCoverImage` abaixo). Para material de
   cliente (16:9, sem template persistido ainda), prefira escrever um script
   `pptxgenjs` do zero — os formatos não batem com o canvas customizado do
   arquivo-fonte, então recriar os componentes visuais como funções
   reutilizáveis é mais confiável do que tentar clonar slides direto do
   report. Use o arquivo `assets/arpejo-report-logo.png` (ou a variante
   `arpejo-report-logo-all-black.png` sobre fundo limão) para o wordmark
   sempre que a peça precisar assinar como Arpejo. Para o **News de CRM**,
   que não é slide deck, use `scripts/build_news_email.py` +
   `scripts/capture_news_email.py` (só edite o bloco "EDITAR TODO MÊS" do
   primeiro) — é HTML/CSS autocontido capturado com Playwright, não
   pptxgenjs, ver `references/news-crm.md`.

   **Duas pegadinhas do pptxgenjs a evitar em qualquer script novo (o
   carrossel e a prospecção já usam essas correções, mantenha-as se
   editar):**
   - **Foto cortada pra caber numa caixa** (`sizing: { type: "cover" }`):
     nunca chame `s.addImage` direto com isso — o cálculo de corte do
     pptxgenjs (4.0.1) usa o tamanho da própria caixa de destino em vez do
     tamanho real da imagem, o que sempre resulta em corte zero (a foto
     esticada, distorcida, em vez de cortada). Use `addCoverImage(slide, {
     path, x, y, w, h })` de `lib/identity.js` em vez disso — ele lê as
     dimensões reais do arquivo e contorna o bug.
   - **Foto num painel de cantos arredondados**: se o painel usa um
     contorno `roundRect` desenhado por cima da foto pra simular o
     enquadramento (em vez de inserir a foto com margem para dentro do
     painel), a foto quadrada vaza pelos cantos arredondados do contorno —
     o `addImage` do pptxgenjs só recorta em retângulo reto ou elipse.
     Depois de gerar o `.pptx`, rode
     `brand-guidelines/scripts/clip_pictures_to_roundrect.py` nele — copia
     a geometria `roundRect` do contorno pra própria imagem direto no XML,
     sem precisar mexer no pptxgenjs.

   Depois de gerar qualquer `.pptx`, rode
   `brand-guidelines/scripts/embed_fonts.py` nele — pptxgenjs não embute
   fontes sozinho.
4. **QA obrigatório**: pras três peças em `.pptx`, rode a validação de
   schema da skill `pptx` (`python-pptx` consegue abrir o arquivo, XML
   válido) antes de entregar. **A conversão `.pptx`→imagem via
   LibreOffice/`soffice` está quebrada neste ambiente** (falha mesmo em
   arquivos triviais) — não perca tempo tentando. Para conferir o layout
   visualmente antes de entregar, gere uma prévia HTML autocontida com a
   mesma geometria do script e capture screenshots com Playwright
   (`/opt/pw-browsers/chromium`, veja o padrão usado na prévia interativa do
   carrossel) em vez de confiar só nos cálculos de posição. Pro **News de
   CRM**, o próprio `capture_news_email.py` já É a renderização final (não
   uma prévia aproximada) — confira o resultado em pedaços (a imagem é
   muito alta pra caber numa checagem só) antes de entregar.
5. **Entregue os quatro arquivos junto com um resumo curto** de quais itens
   do report foram usados em cada peça e por quê (isso também facilita a
   Bianca pedir ajuste pontual em vez de regenerar tudo). No News de CRM,
   inclua a lista de "título → URL real" dos links que o script conhece
   (cases @arpejo) e avise quais títulos ainda precisam de um destino
   definido pela Bianca.

Se a Bianca pedir só uma das quatro peças isoladamente num outro momento
(ex.: "faz só o carrossel desse mês"), siga as mesmas regras de conteúdo e
identidade acima — não é preciso gerar as quatro de uma vez sempre que essa
skill for usada.
