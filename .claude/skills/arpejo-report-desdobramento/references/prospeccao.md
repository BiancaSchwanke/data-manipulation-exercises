# Diretrizes: Apresentação de Prospecção via o `.report`

Este documento define como montar a apresentação de prospecção comercial a
partir do `.report` mensal — confirmado pela Bianca em agosto/26. Não
redesenhe essa estrutura do zero a cada pedido; siga este documento e ajuste
só o conteúdo mês a mês (itens de mercado) ou quando a Bianca pedir uma
mudança pontual.

## A regra central

A apresentação de prospecção tem **duas fontes de conteúdo, uma identidade
visual só**:

1. **Seção de mercado/tendências** → conteúdo vem do `.report` mensal (TRENDS/
   NEWS, nunca Insights — ver regra de confidencialidade no `SKILL.md`).
2. **Seção institucional/metodologia** → conteúdo vem da apresentação
   comercial/institucional da Arpejo, salva em
   `assets/apresentacao-institucional-arpejo.pdf` (anexada pela Bianca em
   agosto/26). **Reaproveite os fatos e frases de posicionamento reais desse
   documento — não invente números, prêmios ou frases de manifesto novas.**

Em ambos os casos, a peça final usa **só a identidade visual do `.report`**
(painel preto arredondado, faixa de plus-grid + globo, título com oval,
paleta preto/limão/coral, Libre Baskerville + JetBrains Mono — ver
`references/identity.md`). O PDF institucional tem um sistema visual
totalmente diferente (preto/branco, textura de ruído, serifada itálica
caixa-alta, ícone de estrela, hambúrguer de menu) — **isso é só a fonte do
conteúdo, nunca copie o design dele.** Ver seção "Tradução visual" abaixo
para o de-para de cada elemento.

## Estrutura da apresentação (16:9)

1. **Capa** — mesmo tratamento do carrossel (fundo limão, grid de "+" preto +
   globo, logo grande "arpejo report↗"), mas a tagline troca de "As
   principais tendências de [mês], no Report" para algo como "Prospecção —
   [mês/ano]" ou o nome do prospect, se for uma apresentação customizada.
2. **Hook de mercado** — 2-3 highlights de TRENDS/NEWS do report do mês,
   no mesmo padrão de card do carrossel (painel preto + oval + chrome band),
   redimensionado pro canvas 16:9. Não recicle as constantes de geometria do
   carrossel (`build-instagram-carousel.js`) direto — elas foram calculadas
   pro canvas vertical 9×11.25in; refaça as proporções pro 16:9.
3. **Quem é a Arpejo (institucional)** — aqui entra o conteúdo do PDF
   institucional, ver "Conteúdo institucional reaproveitável" abaixo.
4. **Prova (cases @arpejo)** — campanhas reais da agência no mês, como já
   documentado no `SKILL.md`.
5. **Como trabalhamos / o que entregamos** — inclui o `.report` mensal como
   diferencial de serviço (mostrar que a agência entrega esse tipo de
   inteligência todo mês é parte do pitch).
6. **CTA / próximos passos**.

## Conteúdo institucional reaproveitável

Extraído de `assets/apresentacao-institucional-arpejo.pdf` (9 slides).
Use estes fatos e frases tal como estão — são posicionamento e dados reais
da agência, não é pra reescrever a mensagem, só redesenhar visualmente:

- **Manifesto/posicionamento**: "A técnica constrói. O improviso
  desconstrói." — texto de apoio: "Somos uma agência de publicidade, que
  através da técnica, estudo e planejamento constrói direcionais sólidos
  para então desconstruí-los através de soluções de comunicação fortes e
  verdadeiras."
- **Assinatura de marca**: "Good skills. Gold feeling." — texto de apoio:
  "Acreditamos que o feeling não é o acaso, mas sim uma combinação de
  experiências, conhecimento, técnica aguçada e intuição. E é assim que
  temos conquistado cada vez mais espaço e nos tornado uma das agências mais
  relevantes do mercado publicitário."
- **Prêmios e reconhecimento**: 150+ prêmios/reconhecimentos. Festivais:
  Agência do Ano APP Campinas, Festival do Clube de Criação, Profissionais
  do Ano Rede Globo, FEPI Festival de la Publicidad Independiente, Mídia
  Festival APP Campinas, FestVídeo APP Ribeirão Preto, FestDigital, FestGraf
  APP.
- **Clientes** (grid de logos, use como prova social): Santa Massa, Solito
  Alimentos, Equatorial Energia, Lwart, Educação Adventista, Unna, Óttima,
  Nutrive, Performa Natural, Formica, Grupo Formitex, Donmario Sementes, ZF,
  Mendorato, Crokíssimo, Unimed Campinas, Quallity Pró Saúde, Delphi,
  PagueVeloz by Serasa, Desktop.
- **Estrutura**: sede em Campinas/SP (escritório "Open House", pensado para
  fluxo de criatividade) + base estratégica em São Luís/MA.
- **Liderança**: "Sócios na liderança" — quadro societário composto por
  posições de liderança nas principais áreas da agência, o que mantém a
  essência estratégica/técnica/criativa independente de movimentos de
  mercado. *Antes de reutilizar a foto do time de sócios numa peça nova de
  prospecção, confirme com a Bianca — é foto real de pessoas identificáveis,
  mesmo sendo material já usado publicamente pela agência.*
- **Time**: "Um time plural com +90 pessoas singulares", presença em 8
  estados (Distrito Federal, Maranhão, Minas Gerais, Paraná, Pernambuco, Rio
  Grande do Sul, Rio Grande do Norte, São Paulo).

Se a apresentação institucional for atualizada no futuro (nova versão
enviada pela Bianca), substitua o PDF em `assets/` e revise os fatos acima —
não misture dados de versões diferentes.

## Tradução visual (institucional → identidade do `.report`)

| Elemento no PDF institucional | Como fica na identidade do report |
|---|---|
| Título serifado itálico caixa-alta em 2-3 linhas (ex. "A TÉCNICA CONSTRÓI. O IMPROVISO DESCONSTRÓI.") | Mesmo tratamento dos cards de tendência: 1ª linha em itálico bold simples, a linha/palavra de fechamento dentro do oval outline. |
| Número de destaque (150 prêmios, +90 pessoas) | Tratar como o "stat" mono do card de tendência — número grande ou em destaque, fonte JetBrains Mono. |
| Grid de logos de clientes (branco sobre preto) | Card dedicado dentro do painel preto arredondado, grid de logos simples — sem tentar clonar o layout branco-puro original, manter o painel + faixa de plus-grid do report. |
| Fotos do escritório/equipe | Podem ir dentro do painel (foto emoldurada) ou sangrando, seguindo a mesma alternância de variante `bandTop` usada no carrossel. São fotos próprias da Arpejo — seguras quanto a procedência de imagem, mas confirme uso de foto de pessoas identificáveis com a Bianca. |
| Ícone de estrela/sparkle, textura de ruído, menu hambúrguer | Não reaproveitar — são elementos do sistema visual institucional, não do `.report`. Use os ícones do report (globo, seta, grid de "+") no lugar. |

## O script

`scripts/build-prospeccao.js` é o padrão persistido (confirmado pela Bianca
em agosto/26) — reutilize-o todo mês em vez de redesenhar do zero. Edite só
os quatro blocos marcados "EDITAR TODO MÊS": a tagline da capa, as
estatísticas de mercado, os dois cards de tendência em destaque (mesmo
motor de layout dos cards do carrossel — painel preto, oval, chrome band —
adaptado pro canvas 16:9 como divisão esquerda/direita em vez do
empilhamento vertical) e os cases @arpejo do mês. Os slides institucionais
(5-7: manifesto, clientes, estrutura/liderança/time) só devem mudar se a
Bianca enviar uma versão atualizada da apresentação institucional — nesse
caso, revise também os fatos listados na seção anterior deste documento.
