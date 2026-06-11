/**
 * PREVIEW ONLY — utilitário de comparação de paletas.
 * Remover: delete este arquivo, remova hydrateStoredPalette() de main.tsx
 * e <PaletteSwitcher /> de App.tsx.
 */
import { Check, Palette, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  DARK_PALETTES,
  LIGHT_PALETTES,
  applyPalette,
  getPaletteById,
  readStoredPaletteId,
  resetPaletteOverrides,
  type PaletteDefinition,
  type PaletteId,
} from "@/lib/palette-switcher";

const SWATCH_KEYS = [
  { key: "--background", label: "Fundo" },
  { key: "--accent", label: "Accent" },
  { key: "--accent-foreground", label: "Texto accent" },
  { key: "--accent-2", label: "Accent 2" },
] as const;

function SwatchRow({ tokens }: { tokens: Record<string, string> }) {
  return (
    <div className="flex gap-1" aria-hidden>
      {SWATCH_KEYS.map(({ key }) => (
        <span
          key={key}
          className="h-3.5 w-3.5 rounded-full border border-hairline shadow-sm"
          style={{ backgroundColor: tokens[key] }}
        />
      ))}
    </div>
  );
}

type PaletteOptionProps = {
  palette: PaletteDefinition;
  activeId: PaletteId;
  onSelect: (id: PaletteId) => void;
};

function PaletteOption({ palette, activeId, onSelect }: PaletteOptionProps) {
  return (
    <li>
      <button
        type="button"
        role="option"
        aria-selected={activeId === palette.id}
        onClick={() => onSelect(palette.id)}
        className="focus-ring flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-white/[0.04]"
      >
        <div className="min-w-0">
          <p className="truncate text-sm text-foreground">{palette.name}</p>
          <div className="mt-1.5">
            <SwatchRow tokens={palette.tokens} />
          </div>
        </div>
        {activeId === palette.id ? (
          <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        ) : null}
      </button>
    </li>
  );
}

export function PaletteSwitcher() {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<PaletteId>(() =>
    typeof window !== "undefined" ? readStoredPaletteId() : "default",
  );

  const selectPalette = useCallback((id: PaletteId) => {
    applyPalette(id);
    setActiveId(id);
  }, []);

  const handleReset = useCallback(() => {
    resetPaletteOverrides();
    try {
      localStorage.removeItem("cl-palette");
    } catch {
      /* ignore */
    }
    setActiveId("default");
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const activePalette = getPaletteById(activeId);

  return (
    <div
      ref={rootRef}
      className="fixed z-[60] bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))]"
    >
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Seletor de paletas de cores"
          className="mb-3 w-[min(18rem,calc(100vw-2.5rem))] overflow-hidden rounded-[var(--radius-md)] border border-hairline bg-surface-elevated shadow-[0_12px_40px_rgba(0,0,0,0.45)] motion-safe:animate-[programacao-fade_0.35s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
        >
          <div className="flex items-center justify-between border-b border-hairline px-3.5 py-2.5">
            <p className="text-xs font-medium tracking-wide text-foreground">
              Paletas (preview)
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar seletor de paletas"
              className="focus-ring rounded-full p-1 text-foreground-muted transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <ul className="max-h-[min(18rem,50dvh)] overflow-y-auto p-2" role="listbox">
            <li>
              <button
                type="button"
                role="option"
                aria-selected={activeId === "default"}
                onClick={() => selectPalette("default")}
                className="focus-ring flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-white/[0.04]"
              >
                <div>
                  <p className="text-sm text-foreground">Padrão (Original)</p>
                  <p className="text-[11px] text-foreground-muted">Valores do index.css</p>
                </div>
                {activeId === "default" ? (
                  <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                ) : null}
              </button>
            </li>

            <li className="px-2.5 pb-1 pt-2">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-foreground-muted">
                Escuras
              </p>
            </li>
            {DARK_PALETTES.map((palette) => (
              <PaletteOption
                key={palette.id}
                palette={palette}
                activeId={activeId}
                onSelect={selectPalette}
              />
            ))}

            <li className="px-2.5 pb-1 pt-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-foreground-muted">
                Claras
              </p>
            </li>
            {LIGHT_PALETTES.map((palette) => (
              <PaletteOption
                key={palette.id}
                palette={palette}
                activeId={activeId}
                onSelect={selectPalette}
              />
            ))}
          </ul>

          <div className="border-t border-hairline p-2">
            <button
              type="button"
              onClick={handleReset}
              className="focus-ring flex w-full items-center justify-center gap-2 rounded-md border border-hairline bg-white/[0.03] px-3 py-2 text-xs font-medium text-foreground-muted transition-colors hover:border-accent/30 hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              Resetar
            </button>
            {activePalette ? (
              <p className="mt-2 px-1 text-center text-[10px] text-foreground-muted/80">
                Ativa: {activePalette.name}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Abrir seletor de paletas de cores"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
        className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-surface-elevated text-foreground shadow-lg shadow-black/35 transition-[transform,opacity,background-color] duration-300 hover:border-accent/35 hover:text-accent motion-reduce:transition-none active:scale-[0.97]"
      >
        <Palette className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}
