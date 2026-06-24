import { useCallback, useState } from "react";

export type CardapioViewMode = "sheet" | "list";

const STORAGE_KEY = "cardapio-view-mode";

function readStoredMode(): CardapioViewMode {
  if (typeof sessionStorage === "undefined") return "sheet";
  const stored = sessionStorage.getItem(STORAGE_KEY);
  return stored === "list" ? "list" : "sheet";
}

export function useCardapioViewMode() {
  const [mode, setModeState] = useState<CardapioViewMode>(readStoredMode);

  const setMode = useCallback((next: CardapioViewMode) => {
    setModeState(next);
    sessionStorage.setItem(STORAGE_KEY, next);
  }, []);

  return [mode, setMode] as const;
}
