import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import { CookieConsent } from "@/components/CookieConsent";
import { DeferredModals } from "@/components/DeferredModals";
import { ExperienceCheckoutProvider } from "@/hooks/useExperienceCheckout";
import { ReservationProvider } from "@/hooks/useReservation";
import { useScrollingClass } from "@/hooks/useScrollingClass";
import { CONSENT_EVENT, getStoredConsent, type ConsentValue } from "@/lib/consent";
import { hydrateStoredPalette } from "@/lib/palette-switcher";
import CafeDaTardePage from "@/pages/CafeDaTardePage";
import CardapioPage from "@/pages/CardapioPage";
import ExperienciasPage from "@/pages/ExperienciasPage";
import HappyHourPage from "@/pages/HappyHourPage";
import NoiteDosDatesPage from "@/pages/NoiteDosDatesPage";
import "./index.css";

if (import.meta.env.DEV) {
  hydrateStoredPalette();
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Root() {
  const [consent, setConsent] = useState<ConsentValue | null>(getStoredConsent);
  useScrollingClass();

  useEffect(() => {
    const onChange = (event: Event) => {
      setConsent((event as CustomEvent<ConsentValue>).detail);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return (
    <ReservationProvider>
      <ExperienceCheckoutProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cardapio" element={<CardapioPage />} />
            <Route path="/experiencias" element={<ExperienciasPage />} />
            <Route path="/cafe-da-tarde" element={<CafeDaTardePage />} />
            <Route path="/happy-hour" element={<HappyHourPage />} />
            <Route path="/noite-dos-dates" element={<NoiteDosDatesPage />} />
          </Routes>
        </BrowserRouter>
        <DeferredModals />
        <CookieConsent />
        {consent === "accepted" ? <Analytics /> : null}
      </ExperienceCheckoutProvider>
    </ReservationProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
