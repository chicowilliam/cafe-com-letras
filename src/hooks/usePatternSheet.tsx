import { createContext, useContext, type ReactNode } from "react";
import type { BotanicalVariant } from "@/lib/botanicalPaths";

export type PatternSheetTone = "dark" | "light";

export type PatternSheetValue = {
  /** Variante da folha global da rota atual */
  variant: BotanicalVariant;
  tone: PatternSheetTone;
};

const DEFAULT_SHEET: PatternSheetValue = {
  variant: "branch",
  tone: "dark",
};

const PatternSheetContext = createContext<PatternSheetValue>(DEFAULT_SHEET);

export function PatternSheetProvider({
  value,
  children,
}: {
  value: PatternSheetValue;
  children: ReactNode;
}) {
  return (
    <PatternSheetContext.Provider value={value}>{children}</PatternSheetContext.Provider>
  );
}

export function usePatternSheet(): PatternSheetValue {
  return useContext(PatternSheetContext);
}
