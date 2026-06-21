import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { track } from "@vercel/analytics/react";
import type { DatePackageId } from "@/lib/date-experience";

export type CheckoutTheme = "default" | "dates";

type OpenOptions = {
  theme?: CheckoutTheme;
};

type ExperienceCheckoutContextValue = {
  isOpen: boolean;
  selectedPackage: DatePackageId | null;
  checkoutTheme: CheckoutTheme;
  open: (options?: OpenOptions) => void;
  openWithPackage: (pkg: DatePackageId, options?: OpenOptions) => void;
  close: () => void;
  setSelectedPackage: (pkg: DatePackageId) => void;
};

const ExperienceCheckoutContext =
  createContext<ExperienceCheckoutContextValue | null>(null);

export function ExperienceCheckoutProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<DatePackageId | null>(null);
  const [checkoutTheme, setCheckoutTheme] = useState<CheckoutTheme>("default");

  const open = useCallback((options?: OpenOptions) => {
    track("noite_dates_aberta");
    setCheckoutTheme(options?.theme ?? "default");
    setSelectedPackage(null);
    setIsOpen(true);
  }, []);

  const openWithPackage = useCallback((pkg: DatePackageId, options?: OpenOptions) => {
    track("noite_dates_aberta", { pacote: pkg });
    setCheckoutTheme(options?.theme ?? "default");
    setSelectedPackage(pkg);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedPackage(null);
    setCheckoutTheme("default");
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      selectedPackage,
      checkoutTheme,
      open,
      openWithPackage,
      close,
      setSelectedPackage,
    }),
    [isOpen, selectedPackage, checkoutTheme, open, openWithPackage, close],
  );

  return (
    <ExperienceCheckoutContext.Provider value={value}>
      {children}
    </ExperienceCheckoutContext.Provider>
  );
}

export function useExperienceCheckout() {
  const context = useContext(ExperienceCheckoutContext);
  if (!context) {
    throw new Error(
      "useExperienceCheckout must be used within ExperienceCheckoutProvider",
    );
  }
  return context;
}
