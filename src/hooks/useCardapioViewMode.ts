import { useCallback, useState } from "react";

export type CardapioViewMode = "print" | "sheet";

const STORAGE_KEY = "cardapio-view-mode";

function readStoredMode(): CardapioViewMode {
  if (typeof sessionStorage === "undefined") return "print";
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored === "sheet") return "sheet";
  if (stored === "list") return "print";
  return "print";
}

export function useCardapioViewMode() {
  const [mode, setModeState] = useState<CardapioViewMode>(readStoredMode);

  const setMode = useCallback((next: CardapioViewMode) => {
    setModeState(next);
    sessionStorage.setItem(STORAGE_KEY, next);
  }, []);

  return [mode, setMode] as const;
}
