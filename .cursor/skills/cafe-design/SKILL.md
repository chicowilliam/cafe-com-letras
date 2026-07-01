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

## Copy

- Português BR, caloroso e preciso
- Nomear Savassi, jazz, literatura, mesa quando relevante
- Evitar marketing vazio (“experiência única”, “o melhor da cidade”)

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
