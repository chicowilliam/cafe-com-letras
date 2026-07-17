/**
 * Tokens do painel de seção — fonte de verdade visual em `src/index.css` (:root).
 * Fundos são 100% sólidos/opacos (sem transparência nem backdrop-blur).
 * BackgroundPattern aparece só nos vazios entre seções (handoffs).
 *
 * Layout: use `className="section-stack"` no `<main>` (já aplicado em App,
 * ProgramacaoPage, ExperienciasPage, CardapioPage).
 */
export const SECTION_PANEL_TOKENS = {
  /** Cor base sólida do painel de seção */
  color: "var(--section-panel-color)",
  /** Intensidade do wash dourado (percentual CSS) */
  washAccent: "var(--section-panel-wash-accent)",
  /** Intensidade do wash oliva (percentual CSS) */
  washOlive: "var(--section-panel-wash-olive)",
} as const;
