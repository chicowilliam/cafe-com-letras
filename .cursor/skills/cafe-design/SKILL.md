---
name: cafe-design
description: >-
  Identidade visual e editorial do Café com Letras (Savassi, BH). Use em qualquer
  trabalho de UI, copy ou layout neste repo — home, subpáginas e componentes.
  Complementa frontend-design com tokens e regras fixas da casa.
---

# Café com Letras — design system editorial

## Essência (não negociável)

Casa cultural e gastronômica na Savassi desde 1996. Tom: escuro, quente, premium, arquivo + presente. Não é landing genérica de restaurante nem template SaaS.

## Tokens (`src/index.css`)

| Token | Valor / uso |
|-------|-------------|
| `--background` | `#15160f` |
| `--surface` | `#1e1f16` |
| `--surface-elevated` | `#26271c` |
| `--accent` | `#d4a373` (dourado café) |
| `--accent-2` | `#8a9a5b` (oliva) |
| `--foreground` | `#f2efe2` |
| `--foreground-muted` | `#b3b09c` |
| `--hairline` | `rgba(255,255,255,0.08)` |

## Tipografia

| Papel | Fonte | Onde |
|-------|-------|------|
| Display | Gloock (`--font-display`) | Títulos de seção, hero |
| Corpo UI | Inter (`--font-sans`) | Prosa, labels, FAQ |
| Editorial | Garamond italic (`--font-garamond`) | Kickers, citações, links discretos |
| Meta | `.section-caption` | Eyebrows, contadores, legendas |

Classes canônicas: `.section-title`, `.section-kicker`, `.section-prose`, `.section-caption`, `.text-lead`, `.story-lead` (capitular História).

## Componentes preferidos

- Headings: `AnimatedSectionHeading` com `editorial`
- Entrada: `SectionReveal` (variants: `editorial`, `line-mask`, `stagger`, `subtle`)
- Handoffs home: `SectionHandoff` (`breath`, `wash`, `wave`, `chapter`, `accent-band`)
- Painéis: `.editorial-inset-panel`, `.section-ribbon`, `.section-lifted-panel`
- CTAs: `.btn-primary`, `.btn-ghost-minimal`, `.focus-ring`

## Motion

- Um gesto forte por seção — não fade em tudo
- `prefers-reduced-motion`: desligar animações decorativas
- Presets: `src/lib/motion-presets.ts`, `section-transitions.css`

## CTAs canônicos

Usar `src/lib/cta-labels.ts` — não inventar variações:

| Verbo | Quando |
|-------|--------|
| **Reservar** | Hero, navbar, popup flutuante, faixa Hoje |
| **Reservar mesa** | Café da Tarde, Happy Hour, cardápio |
| **Garantir experiência** | Noite dos Dates / checkout |
| **Ver agenda** | Programação, eventos culturais |
| **Explorar experiência** | Hub → subpágina |
| **Ver experiências** | Hero secundário, links para o hub |

Hover em botões CTA: máx. `scale(1.01)`.

## Funil de conversão

```
Hero (Reservar) → Hoje na Savassi → Experiências / Programação → Reserva ou checkout
```

- Um `btn-primary` dominante above the fold no Hero
- Faixa Hoje com dados reais (`getHomeTodayItems`)
- Hub + subpáginas repetem reserva nos momentos certos — sem pop-ups agressivos

## Copy

- Português BR, caloroso e preciso
- Nomear Savassi, jazz, literatura, mesa quando relevante
- Evitar marketing vazio (“experiência única”, “o melhor da cidade”)
- Legendas de galeria: só fatos verificáveis; nunca inventar década/evento histórico
- `[LEGENDA PENDENTE]` só em dev para fotos do arquivo sem `caption`

## Performance (budget)

Ver `docs/PERFORMANCE.md`. Resumo:

- LCP home < 2,8s · CLS < 0,1
- Hub/galeria: sem blur runtime fullscreen; hi-res lazy no lightbox
- `useExpHubPerfMode` + `prefers-reduced-motion` respeitados

## Nunca

- Paleta cream/terracotta template, acid green, purple gradients
- Cards numerados 01/02/03 só como decoração
- Stock aesthetic, parallax em massa, lightbox pesado na home
- Duplicar kicker + título + parágrafo com mesma informação
- Trocar Gloock/Inter/Garamond por outras famílias

## Sempre

- Lazy below-fold; galeria: `c_fill,g_auto` no marquee, `c_limit` no viewer
- Hub `/experiencias`: fundo + nav imersivos — ping-pong 2 layers, `opacity` only, sem `filter: blur` / `backdrop-filter`; triptych sem Framer `layout`; `useExpHubPerfMode` em hardware fraco
- Foco visível (`focus-ring`), contraste legível
- Reutilizar tokens — não hardcodar hex solto
