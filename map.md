# Mapa do Projeto — Café com Letras

Este documento mapeia a estrutura, as páginas, o sistema botânico contínuo, os fluxos de dados e as diretrizes de desenvolvimento do site editorial do Café com Letras (Savassi, Belo Horizonte).

---

## Folha Botânica Contínua (Home)

1. `HomeBotanicalSheet` — camada absolute no `.home-shell`, `repeat-y` via `botanicalSheetUri` (mesmos paths de `botanicalPaths.ts`).
2. `SiteWallpaper` absolute no `.home-shell` (não fixed).
3. Painéis `.section-canvas` ~88% opacos — a folha atravessa handoffs.
4. `SurfacePattern` desligado na home (CSS) — evita segundo crop.
5. AppShell não monta BackgroundPattern/SiteWallpaper fixed na home.

**Removido:** `surface-pattern-sync.ts` (parallax / jank).

Fonte de paths: `src/lib/botanicalPaths.ts` + `src/lib/botanicalSheetUri.ts`.

---

(Mapa completo segue nas próximas atualizações.)
