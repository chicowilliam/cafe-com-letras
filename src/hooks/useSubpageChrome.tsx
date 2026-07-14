import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SubpageChromeOverride = {
  backLabel?: string;
  backHref?: string;
  onBack?: () => void;
  title?: string;
  navEyebrow?: string;
  endAction?: "brand" | "home" | "none";
};

type SubpageChromeContextValue = {
  override: SubpageChromeOverride | null;
  setOverride: (override: SubpageChromeOverride | null) => void;
};

const SubpageChromeContext = createContext<SubpageChromeContextValue | null>(null);

export function SubpageChromeProvider({ children }: { children: ReactNode }) {
  const [override, setOverrideState] = useState<SubpageChromeOverride | null>(null);

  const setOverride = useCallback((next: SubpageChromeOverride | null) => {
    setOverrideState(next);
  }, []);

  const value = useMemo(
    () => ({ override, setOverride }),
    [override, setOverride],
  );

  return (
    <SubpageChromeContext.Provider value={value}>
      {children}
    </SubpageChromeContext.Provider>
  );
}

export function useSubpageChrome(override?: SubpageChromeOverride | null) {
  const context = useContext(SubpageChromeContext);

  if (!context) {
    throw new Error("useSubpageChrome must be used within SubpageChromeProvider");
  }

  const { setOverride } = context;

  useEffect(() => {
    if (override === undefined) return;
    setOverride(override);
    return () => setOverride(null);
  }, [override, setOverride]);

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSubpageChromeContext() {
  const context = useContext(SubpageChromeContext);
  if (!context) {
    throw new Error("useSubpageChromeContext must be used within SubpageChromeProvider");
  }
  return context;
}
