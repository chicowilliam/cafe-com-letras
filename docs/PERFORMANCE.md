# Performance budget — Café com Letras

Orçamento orientativo para mobile em 4G simulado (Lighthouse / DevTools).

## Metas

| Métrica | Meta | Notas |
|---------|------|--------|
| **LCP** | < 2,8 s | Hero com poster AVIF/WebP; vídeo após paint |
| **INP** | < 200 ms | Hub sem `layout` Framer; hover debounced |
| **CLS** | < 0,1 | Dimensões explícitas em imagens críticas |
| **Long tasks** | evitar > 50 ms no hub | `useExpHubPerfMode` em hardware fraco |

## Rotas de auditoria

1. `/` — home (hero vídeo + faixa Hoje)
2. `/experiencias` — hub imersivo (triptych / mobile)
3. `/#galeria` — marquee + lightbox sob demanda

## Como medir (local)

```bash
npm run build
npm run preview
```

Em outro terminal (Chrome Lighthouse CLI):

```bash
npx lighthouse http://localhost:4173/ --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --output=html --output-path=./lighthouse-home.html

npx lighthouse http://localhost:4173/experiencias --only-categories=performance --form-factor=mobile --output=html --output-path=./lighthouse-experiencias.html
```

Ou: DevTools → Lighthouse → Mobile → Performance.

## Checklist técnico (implementado no repo)

- [x] Hub: ping-pong 2 layers, crossfade por `opacity` — sem `backdrop-filter` / `filter: blur` fullscreen
- [x] Hub: triptych sem Framer `layout`; `useExpHubPerfMode` encurta transições e oculta grão
- [x] Galeria: marquee `c_fill`; lightbox carrega hi-res só no slide ativo + vizinhos (`PRELOAD_RADIUS`)
- [x] Galeria: placeholder sem `filter: blur` CSS (preview Cloudinary)
- [x] Hero: poster antes do vídeo; `preload="metadata"` no `<video>`
- [x] Home below-fold: lazy + Suspense por seção
- [x] `prefers-reduced-motion`: animações decorativas desligadas (hub, marquee, faixa Hoje)

## Evitar em novas PRs

- `backdrop-filter` / `filter: blur()` em overlays fullscreen (hub, galeria, hero)
- Framer `layout` no hub
- Carregar todas as hi-res da galeria no mount
- Hover scale > `1.01` em CTAs (`.btn-primary`, `.btn-ghost-minimal`)
- Novas animações hero/hub/galeria sem revisão de perf
