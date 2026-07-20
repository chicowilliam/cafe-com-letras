# Mapa do Projeto — Café com Letras

Este documento mapeia a estrutura, as páginas, o sistema botânico contínuo, os fluxos de dados e as diretrizes de desenvolvimento do site editorial do Café com Letras (Savassi, Belo Horizonte).

---

## 1. Stack e Entrada

| Peça | Tecnologia |
| :--- | :--- |
| UI | React 19 + TypeScript |
| Build | Vite 7 |
| Estilo | Tailwind CSS v4 + CSS canônico em `src/index.css` |
| Rotas | React Router v7 (`BrowserRouter`) |
| Motion | Framer Motion |
| Deploy | Vercel (`vercel.json`, SPA rewrite, região `gru1`) |

**Entrada:** `src/main.tsx` → providers (reserva, checkout, motion, consent) → `<Route element={<AppShell />}>` → páginas.

**Diretrizes para agentes:** [AGENTS.md](./AGENTS.md) e [.cursor/skills/cafe-design/SKILL.md](./.cursor/skills/cafe-design/SKILL.md).

---

## 2. Arquitetura e Estrutura de Pastas

```
cafe-com-letras/
├── .cursor/skills/cafe-design/SKILL.md   # Design system e copy da marca
├── AGENTS.md                             # Regras para agentes (tokens, perf, scripts)
├── api/                                  # Serverless Vercel (ex.: api/chat.ts)
├── docs/
│   ├── PERFORMANCE.md
│   ├── cardapio-atualizacao.md
│   └── cardapio-traducao-en.md
├── scripts/                              # Imagens, fontes, Cloudinary, cardápio
├── public/                               # Favicon, robots, sitemap, assets estáticos
├── src/
│   ├── assets/                           # Fontes (Gloock, Garamond, Inter) e mídia local
│   ├── components/                       # Seções da Home + UI compartilhada
│   │   ├── cafe-da-tarde/
│   │   ├── cardapio/
│   │   ├── experiencias/
│   │   └── happy-hour/
│   ├── data/
│   │   ├── cardapio/                     # Catálogos JSON (pt/en)
│   │   └── gallery-manifest.json
│   ├── hooks/                            # Scroll, chrome, reservas, PatternSheet, hub perf…
│   ├── lib/                              # Paths botânicos, nav, CTAs, Cloudinary, conteúdo
│   ├── pages/                            # Páginas do roteador
│   ├── styles/                           # Temas, padrões, handoffs, galeria
│   ├── App.tsx                           # Composição da Home (dentro do AppShell)
│   ├── index.css                         # Tokens, .section-canvas, imports de estilos
│   └── main.tsx                          # Router e providers
└── package.json
```

> `tmp/` é artefato local de debug — não faz parte do produto.

---

## 3. Folha Botânica Contínua

O site trata o desenho botânico como **uma folha contínua**, não como ornamentos de canto nem como “janelas” syncadas ao viewport (isso gerava parallax).

### Conceito (Home)

1. **`HomeBotanicalSheet`** — camada `position: absolute; inset: 0` no `.home-shell`, `background-repeat: repeat-y` a partir de `botanicalSheetDataUri` (mesmos paths de `botanicalPaths.ts`). **Uma origem de coordenadas** do Hero ao Footer; rola com a página.
2. **`SiteWallpaper` absolute** no `.home-shell` — trilhos laterais na mesma caixa (não fixed).
3. **Painéis** (`.section-canvas`) com tinta ~88% — a folha atravessa seções e **SectionHandoff** sem costura.
4. **`SurfacePattern` na home** fica desligado (CSS) — evita segundo crop desalinhado nas bordas.
5. **AppShell** não monta `BackgroundPattern`/`SiteWallpaper` fixed na home (evita folha fixed + folha absolute em paralelo).

### Subpáginas

`BackgroundPattern` fixed no AppShell + `SurfacePattern` estático nos painéis sólidos (cardápio, hub, etc.).

**Fonte única de paths:** `src/lib/botanicalPaths.ts` (+ `src/lib/botanicalSheetUri.ts` para o tile CSS da home).

### Arquivos-chave

| Arquivo | Papel |
| :--- | :--- |
| `src/lib/botanicalPaths.ts` | Paths SVG compartilhados |
| `src/lib/botanicalSheetUri.ts` | Data-URI tiled da folha da home |
| `src/components/HomeBotanicalSheet.tsx` | Folha contínua no `.home-shell` |
| `src/hooks/usePatternSheet.tsx` | Contexto de variante/tom por rota |
| `src/components/BackgroundPattern.tsx` | Folha global (subpáginas / fixed) |
| `src/components/SurfacePattern.tsx` | Gravura estática em painéis (subpáginas; off na home) |
| `src/components/PatternedSurface.tsx` | Wrapper `.patterned-surface` |
| `src/components/MaterialCard.tsx` | Card opaco |
| `src/components/SiteWallpaper.tsx` | Cipós laterais (`absolute` na home) |
| `src/styles/site-wallpaper.css` | Home sheet + handoffs translúcidos |
| `src/styles/background-pattern.css` | Tokens / stacking |
| `src/styles/section-ornament.css` | Ornamento absoluto (anti ghost space) |

**Removido:** sync `surface-pattern-sync.ts` (parallax / jank); `CardAccent`.

### AppShell — camadas de fundo

```
PatternSheetProvider
└── AppShellBackground
    ├── home → null (folha no .home-shell)
    ├── cardapio → null (página monta absolute)
    ├── experiencias → BackgroundPattern fixed leaf-cluster
    └── demais → BackgroundPattern fixed branch
└── .site-root → chrome + PageTransition → Outlet
    └── home: .home-shell → HomeBotanicalSheet + SiteWallpaper absolute + seções/handoffs
```

### Regra anti “espaço fantasma”

`.section-ornament` / `.surface-pattern-layer` / `.home-botanical-sheet` fora do fluxo (`absolute` + exclusões de stacking).

### Scroll

- Home: **sem** `translate3d` / rAF de sync — a folha é papel da página.
- Continuidade nas divisas = mesma camada sob handoffs translúcidos, não SurfacePattern por seção.

---

## 4. Páginas e Rotas

Declaradas em `src/main.tsx` sob `AppShell`:

| Rota | Página | Descrição |
| :--- | :--- | :--- |
| `/` | `App.tsx` | Home editorial (ver ordem das seções abaixo) |
| `/programacao` | `ProgramacaoPage.tsx` | Agenda cultural em página dedicada |
| `/cardapio` | `CardapioPage.tsx` | Lista + impresso; padrão botânico próprio (folha clara) |
| `/experiencias` | `ExperienciasPage.tsx` | Hub tríptico (perf via `useExpHubPerfMode`) |
| `/cafe-da-tarde` | `CafeDaTardePage.tsx` | Experiência café da tarde + reserva |
| `/happy-hour` | `HappyHourPage.tsx` | Bebidas e porções |
| `/noite-dos-dates` | `NoiteDosDatesPage.tsx` | Menu fechado de terça + checkout |

### Ordem da Home (`src/App.tsx`)

Dentro de `.home-shell` → `#main.section-stack`:

1. `Hero` → `HomeTodayRibbon`
2. `NoiteDosDates` → `Cardapio` → `Delivery` → `TemporadaFestival` (se ativa) → `CuradoriaSemanal`
3. Capítulo → `Programacao`
4. Capítulo → `About` (História) → `Reconhecimentos` → `Quotes`
5. Capítulo → `ImageMarquee` (galeria) → `Visite` → `Newsletter`
6. `Footer`  
   Chrome flutuante: `ExecutiveLunchFab`, `WhatsAppButton`, `BackToTop` (+ `PaletteSwitcher` em DEV)

Handoffs: `SectionHandoff` (`SectionBridge`) — `breath`, `wash`, `wave`, `chapter`, `accent-band`.  
O padrão botânico **não** é montado no `App`; vive no `AppShell`.

---

## 5. Fontes de Verdade e Fluxo de Dados

### A. Catálogo do Cardápio

- **Arquivos:** `src/data/cardapio/catalog.pt.json` e `catalog.en.json` (+ meta, highlights, badges, info-geral).
- **Validação:** `npm run validate:cardapio`.
- **Lista vs impresso:** JSON alimenta o modo lista; o modo impresso usa folhas WebP (`npm run optimize:cardapio`).

### B. Galeria (Cloudinary)

- **Arquivo:** `src/data/gallery-manifest.json`.
- **Sync:** `npm run sync:gallery` — atualiza dimensões e preserva `alt` / `caption` / `year` manuais.

### C. Temporadas / festivais

Edições gastronômicas com início e fim (ex.: Festival de hambúrguer).  
Fonte: `src/lib/temporadas.ts` · bloco Home: `TemporadaFestival` (após Delivery) · some fora de `startsAt`/`endsAt`.  
Não misturar com hub `/experiencias` nem com agenda cultural.

### D. Conteúdo editorial (lib)

Exemplos: `src/lib/programacao.ts`, `home-today.ts`, `curadoria-semanal.ts`, `experiencias.ts`, `cta-labels.ts`, `date-experience.ts`.

---

## 6. Scripts npm

| Comando | Uso |
| :--- | :--- |
| `npm run dev` | Servidor Vite |
| `npm run build` | `tsc -b` + bundle de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | ESLint |
| `npm run validate:cardapio` | Valida JSON do cardápio |
| `npm run sync:gallery` | Sync Cloudinary → manifest |
| `npm run optimize:images` | Otimiza assets locais |
| `npm run optimize:cardapio` | Otimiza folhas do cardápio impresso |
| `npm run extract:cardapio` | Extrai texto do cardápio |
| `npm run build:cardapio-catalog` / `-en` | Gera catálogos |
| `npm run slice:cardapio-headers` | Recorta headers das folhas |
| `npm run subset:fonts` | Subconjuntos de fontes |
| `npm run audit:videos` | Auditoria de vídeos Cloudinary |
| `npm run cloudinary:onboard` | Onboarding Cloudinary |

---

## 7. Tokens e Identidade Visual

Declarados em `src/index.css` (`:root`):

| Token | Valor / uso |
| :--- | :--- |
| `--background` | `#15160f` |
| `--surface` | `#1e1f16` |
| `--surface-elevated` | `#26271c` |
| `--accent` | `#d4a373` (dourado café) |
| `--accent-2` | `#8a9a5b` (oliva) |
| `--foreground` | `#f2efe2` |
| Display | Gloock (`--font-display`) |
| UI | Inter (`--font-sans`) |
| Editorial | EB Garamond (`--font-garamond`) |

Seções da home: `.section-canvas` (grain + washes). Variantes: `--surface`, `--shift`.  
Cards: `.material-card` / `--material-card-*`.  
CTAs canônicos: `src/lib/cta-labels.ts`.

### Orçamento de performance (resumo)

- LCP &lt; 2,8s · INP &lt; 200ms · CLS &lt; 0,1 (mobile 4G)
- Evitar `backdrop-filter` / blur em tela cheia
- Hub `/experiencias`: respeitar `useExpHubPerfMode` e `prefers-reduced-motion`
- Detalhes: `docs/PERFORMANCE.md` e `AGENTS.md`

---

## 8. Onde Editar (atalhos)

| Pedido | Onde |
| :--- | :--- |
| Preços / pratos | `src/data/cardapio/catalog.pt.json` + `catalog.en.json` |
| Reserva / checkout | `ReservationModal.tsx`, `ExperienceCheckoutModal.tsx` |
| Home / seções | `App.tsx` + `src/components/` |
| Rotas / chrome | `main.tsx`, `AppShell.tsx`, `src/lib/navigation.ts` |
| Folha botânica | `botanicalPaths.ts`, `BackgroundPattern`, `SurfacePattern`, `background-pattern.css` |
| Papel lateral home | `SiteWallpaper.tsx`, `site-wallpaper.css` |

---

## 9. Checklist de Finalização

- [ ] Preencher `alt` / `caption` / `year` pendentes em `gallery-manifest.json`
- [ ] Rodar `npm run validate:cardapio`
- [ ] Auditoria Lighthouse na Home e em `/experiencias` (`build` + `preview`)
- [ ] Testar `ReservationModal` e `ExperienceCheckoutModal` em viewport ~360px
- [ ] Conferir CTAs canônicos (`cta-labels.ts`)
- [ ] Confirmar subconjuntos de fontes (`npm run subset:fonts`)
