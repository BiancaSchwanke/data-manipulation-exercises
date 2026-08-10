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
  monthly workflow. Produces three derivative deliverables from one source
  report: (1) an Instagram carousel post for @arpejo, (2) a market-prospecting
  presentation, (3) a client-facing recap. Always enforce the confidentiality
  rule described in this skill — the Insights chapter is client-only and must
  never appear in the Instagram carousel or the prospecting deck.
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

## As três peças

### 1. Carrossel Instagram (@arpejo)

- **Fonte de conteúdo**: TRENDS em primeiro lugar (é o conteúdo mais
  "compartilhável" — comportamento, cultura), NEWS como segunda opção.
  @arpejo pode aparecer só como card final de fechamento ("quem faz esse
  report é a gente" / CTA), nunca misturado entre os cards de conteúdo.
- **Formato**: canvas vertical 1080×1350px (proporção 4:5, padrão de feed).
  Estrutura: capa (edição do mês) → 3 a 6 cards, um conceito por card → card
  de fechamento com CTA (ex.: "relatório completo com a gente" / @arpejo).
- **Tom**: uma ideia por card, texto reduzido ao essencial — quem rola o feed
  não vai ler um parágrafo de 4 linhas. Condense o "Para as marcas" do report
  original numa frase de impacto, mantendo o significado.
- Escolha os itens mais visuais e universais (que não dependem de contexto de
  categoria de cliente específico) — se não estiver óbvio quais, liste as
  opções para a Bianca escolher em vez de decidir por conta própria.

### 2. Apresentação de prospecção

- **Fonte de conteúdo**: 2-3 highlights curados de TRENDS/NEWS como gancho
  ("o mercado está mudando, e é assim") + campanhas de @arpejo como prova de
  execução (portfólio) + o próprio `.report` mensal citado como diferencial de
  serviço (mostrar que a agência entrega esse tipo de inteligência todo mês é
  parte do pitch).
- **Nunca usar Insights** — não é trabalho da agência, e é benefício de
  cliente, não isca de venda.
- **Formato**: 16:9, ~10-14 slides. Estrutura narrativa: capa → "o mercado
  está mudando" (hook com trends/news) → posicionamento da Arpejo → prova
  (cases @arpejo) → como trabalhamos / o que entregamos (incluindo o report
  mensal como diferencial) → CTA/próximos passos.

### 3. Material para clientes

- **Fonte de conteúdo**: a mais completa das três — pode e deve incluir
  Insights, além de um recorte curado de News, Trends e @arpejo. É um recap
  de valor para quem já paga, não uma peça de venda.
- **Formato**: 16:9, ~8-12 slides, no espírito de "melhores momentos do mês"
  do report completo — mantém a estrutura por seção (News → Trends → @arpejo
  → Insights) só que condensada.

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
   qualquer slide). Prefira escrever um script `pptxgenjs` do zero para cada
   peça — os formatos (vertical 4:5 para Instagram, 16:9 para as outras) não
   batem com o canvas customizado do template original, então recriar os
   componentes visuais (card colorido, badge oval, grid de "+", setas de
   canto) como funções reutilizáveis é mais confiável do que tentar clonar
   slides do arquivo-fonte. Use os tokens de `references/identity.md` para
   cor, fonte e motivos gráficos, e o arquivo
   `assets/arpejo-report-logo.png` para o wordmark sempre que a peça precisar
   assinar como Arpejo.
4. **QA obrigatório**: rode a validação e a conversão para imagem da skill
   `pptx` e confira visualmente cada slide antes de entregar — texto cortado,
   contraste ruim (texto escuro sobre preto, etc.) e alinhamento são os erros
   mais comuns ao recriar um sistema visual do zero.
5. **Entregue os três arquivos junto com um resumo curto** de quais itens do
   report foram usados em cada peça e por quê (isso também facilita a Bianca
   pedir ajuste pontual em vez de regenerar tudo).

Se a Bianca pedir só uma das três peças isoladamente num outro momento (ex.:
"faz só o carrossel desse mês"), siga as mesmas regras de conteúdo e
identidade acima — não é preciso gerar as três de uma vez sempre que essa
skill for usada.
