import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import { CookieConsent } from "@/components/CookieConsent";
import { DeferredModals } from "@/components/DeferredModals";
import { ExperienceCheckoutProvider } from "@/hooks/useExperienceCheckout";
import { ReservationProvider } from "@/hooks/useReservation";
import { CONSENT_EVENT, getStoredConsent, type ConsentValue } from "@/lib/consent";
import { hydrateStoredPalette } from "@/lib/palette-switcher";
import CardapioPage from "@/pages/CardapioPage";
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

function HappyHourRedirect() {
  useEffect(() => {
    window.location.replace("/#programacao");
  }, []);
  return null;
}

function Root() {
  const [consent, setConsent] = useState<ConsentValue | null>(getStoredConsent);

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
            <Route path="/noite-dos-dates" element={<NoiteDosDatesPage />} />
            <Route path="/happy-hour" element={<HappyHourRedirect />} />
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
