# Mapa do Projeto — Café com Letras

Este documento mapeia a estrutura, as páginas, o sistema botânico contínuo, os fluxos de dados e as diretrizes de desenvolvimento do site editorial do Café com Letras (Savassi, Belo Horizonte).

---

## Folha Botânica Contínua (Home)

1. `HomeBotanicalSheet` — camada absolute no `.home-shell`, `repeat-y` via `botanicalSheetUri`.
2. `SiteWallpaper` absolute no `.home-shell`.
3. Painéis ~88% opacos; `SurfacePattern` off na home; AppShell sem fixed na home.
4. Removido: `surface-pattern-sync.ts`.

---

## Temporadas / festivais

Camada separada de experiências (hub) e agenda cultural.
Fonte: `src/lib/temporadas.ts` · UI: `TemporadaFestival` (+ lightbox) após Delivery · prioridade na faixa Hoje.
Não misturar com `/experiencias` nem com programação cultural.

Ordem Home (trecho): Delivery → TemporadaFestival (se ativa) → CuradoriaSemanal.

---

(Mapa completo na próxima atualização.)
