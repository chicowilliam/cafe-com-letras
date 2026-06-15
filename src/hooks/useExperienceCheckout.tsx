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

type ExperienceCheckoutContextValue = {
  isOpen: boolean;
  selectedPackage: DatePackageId | null;
  open: () => void;
  openWithPackage: (pkg: DatePackageId) => void;
  close: () => void;
  setSelectedPackage: (pkg: DatePackageId) => void;
};

const ExperienceCheckoutContext =
  createContext<ExperienceCheckoutContextValue | null>(null);

export function ExperienceCheckoutProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<DatePackageId | null>(null);

  const open = useCallback(() => {
    track("noite_dates_aberta");
    setSelectedPackage(null);
    setIsOpen(true);
  }, []);

  const openWithPackage = useCallback((pkg: DatePackageId) => {
    track("noite_dates_aberta", { pacote: pkg });
    setSelectedPackage(pkg);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedPackage(null);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      selectedPackage,
      open,
      openWithPackage,
      close,
      setSelectedPackage,
    }),
    [isOpen, selectedPackage, open, openWithPackage, close],
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
