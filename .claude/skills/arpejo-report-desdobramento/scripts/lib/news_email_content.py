"""
Shared monthly content for the News de CRM — imported by both
build_news_email.py (flat-image preview, for pasting into an email body)
and build_news_email_marketing_html.py (real HTML for an email-marketing
tool). Keep this the single source of truth so the two outputs never drift.

EDITAR TODO MÊS: everything in this file changes edition to edition. See
references/news-crm.md for the content rule (same recorte as material de
cliente: News + Trends + @arpejo + Insights + Indicações).
"""

LIME = "#DAFF94"
CORAL = "#FF7C51"
BLACK = "#0A0A0A"
WHITE = "#FFFFFF"

EMAIL_W = 640  # standard email-body width in px

COVER_TAGLINE_LINES = ["resumo do mês,", "feito pra você."]
COVER_INTRO = (
    "as principais tendências, novidades de plataforma e conquistas que a "
    "Arpejo separou pra você em agosto — direto do nosso .report mensal."
)
COVER_DATE = "AGOSTO_26"
CLOSING_LINE = "até o mês que vem."

# NEWS: novidades de plataforma (mesmo recorte do carrossel/prospecção)
NEWS = [
    {"badge": "Reddit", "body": "Ultrapassou meio bilhão de usuários semanais; receita publicitária cresceu 64% no 2º tri de 2026."},
    {"badge": "IA", "body": "Buscas por IA (Agentic Search) para descobrir produtos cresceram 200% em 1 ano."},
    {"badge": "WhatsApp", "body": "75% dos brasileiros já compraram produtos direto pelo app; 77% usam para falar com empresas."},
]

# TRENDS: alterne accent entre LIME e CORAL para dar ritmo, igual ao carrossel.
# photo = arquivo dentro de <photos-dir> (mesmas fotos do material de cliente).
# link = URL real se souber (senão None — ver a regra de link no
# references/news-crm.md, não invente destino).
TRENDS = [
    {"accent": LIME, "title": "HIPER-REALIDADE", "sub": "Online ou offline, o que conta é a experiência.",
     "body": "40% dos jovens da Geração Z afirmam que “é tudo real”, sem diferenciar experiências virtuais das físicas.",
     "for_brands": "o que importa é a experiência que a marca proporciona, real ou gerada por IA.",
     "photo": "trend-hiper-realidade.jpg", "link": None},
    {"accent": CORAL, "title": "EXPERIÊNCIAS TRANSFORMADORAS", "sub": "Catalisadoras de transformação pessoal.",
     "body": "88% das pessoas querem vivências significativas; 87% dizem que as melhores experiências são as que as transformam de alguma forma.",
     "for_brands": "quanto mais a marca contribuir para a evolução pessoal do cliente, maior a fidelização.",
     "photo": "client-experiencias-transformadoras.jpg", "link": None},
    {"accent": LIME, "title": "NEW-WAVE SPORT FANDOM", "sub": "Uma nova geração de fãs redesenha o esporte.",
     "body": "3 em cada 4 novos fãs de Fórmula 1 são mulheres; o esporte vira território de moda, beleza e lifestyle.",
     "for_brands": "esporte deixou de ser só competição — virou cultura, entretenimento e estilo de vida.",
     "photo": "trend-sport-fandom.jpg", "link": None},
    {"accent": CORAL, "title": "GERAÇÃO SEM RESSACA", "sub": "Menos álcool, mais intenção no consumo.",
     "body": "64% dos brasileiros declararam não consumir álcool em 2025, contra 55% em 2023.",
     "for_brands": "oportunidade de tirar o álcool do centro da experiência sem tirar a experiência do centro.",
     "photo": "client-sem-ressaca.jpg", "link": None},
]

# @ARPEJO: cases reais do mês, com o link de verdade — é o único bloco que
# entra com <a href> real na versão HTML, porque é a única fonte com URL
# confirmada.
ARPEJO_CASES = [
    {"accent": WHITE, "badge": "PagueVeloz — Dia dos Pais",
     "concept": "“O nome por trás do meu nome”: fachadas de comércio em São Paulo e Campinas viram homenagens aos pais que apoiaram o sonho de três empreendedores. Desdobra em pílulas de conteúdo dinâmico nas redes.",
     "video": "https://www.youtube.com/watch?v=pF-eyFpkQ5I"},
    {"accent": LIME, "badge": "Grupo Equatorial — Dia dos Pais",
     "concept": "Espelhos apagados em locais de grande circulação: um entrevistador pergunta em que a pessoa se parece com o pai — não fisicamente. Ao terminar de contar, uma palavra se acende no reflexo.",
     "video": "https://www.youtube.com/watch?v=Qu7DKe6zZfE"},
]

# INSIGHTS: exclusivo clientes — ok usar aqui, ver regra de confidencialidade no SKILL.md.
INSIGHTS = [
    {"badge": "Itaú", "body": "Campanha “IA.i”: nova IA do banco, estética artesanal em película, trocadilho entre “IA.I” e “e aí?” para aproximar a tecnologia das pessoas."},
    {"badge": "Coca-Cola", "body": "“O Mundo Pode Esperar” (Dia dos Pais): convida a família a se desconectar das telas, com filmes, influenciadores e participação numa novela da Globo."},
    {"badge": "Reserva", "body": "“Quem cuida, ama” (Dia dos Pais): parceria com Safety 1st, linha “Tal Pai, Tal Filho”, protagonizada por Rodrigo Santoro."},
    {"badge": "Burger King", "body": "“Baby Burgers”: simulou um teste de gravidez positivo nas redes para revelar o lançamento de versões menores do Whopper."},
    {"badge": "Chevrolet + iFood", "body": "Aproveitou a promessa do iFood de entregar tudo durante a Copa para lançar o Novo Sonic dentro do próprio app de delivery."},
    {"badge": "Burger King", "body": "“King Cheese”: brinca com o ditado “mineiro come quieto”, com desconto ativado por frase-senha no drive-thru."},
]

RECS = ["Slow-living como status de luxo", "“O perigo de estar lúcida” — Rosa Monteiro"]

FONTES = [
    "Remio — Reddit supera previsões de receita",
    "Opinion Box — Pesquisa WhatsApp no Brasil 2026",
    "Sales Force — Shopping's New First Step",
    "LinkedIn — How to Maximize AI Visibility",
    "Estadão — Menos álcool nas mesas",
]
