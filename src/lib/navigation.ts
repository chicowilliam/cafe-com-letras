import type { NavigateOptions } from "react-router-dom";

export const viewTransitionNavigateOptions = {
  viewTransition: true,
} as const satisfies NavigateOptions;

export type SubpageChromeConfig = {
  title: string;
  backHref?: string;
  backLabel?: string;
  navEyebrow?: string;
  scrollAware?: boolean;
};

export const SUBPAGE_CHROME: Record<string, SubpageChromeConfig> = {
  "/cardapio": {
    title: "Cardápio",
    backHref: "/",
    backLabel: "Voltar",
  },
  "/experiencias": {
    title: "Experiências",
    backHref: "/",
    backLabel: "Voltar",
  },
  "/cafe-da-tarde": {
    title: "Café da Tarde",
    backHref: "/experiencias",
    backLabel: "Experiências",
  },
  "/happy-hour": {
    title: "Blue Moon",
    navEyebrow: "Happy Hour",
    backHref: "/experiencias",
    backLabel: "Experiências",
    scrollAware: true,
  },
  "/noite-dos-dates": {
    title: "Noite dos Dates",
    backHref: "/experiencias",
    backLabel: "Experiências",
  },
};

export function getPageTheme(pathname: string) {
  const themes: Record<string, string> = {
    "/cafe-da-tarde": "cafe-da-tarde",
    "/happy-hour": "happy-hour",
    "/noite-dos-dates": "noite-dos-dates",
  };
  return themes[pathname] ?? null;
}

export function isExperienciasTransitionGroup(pathname: string) {
  return (
    pathname === "/experiencias" ||
    pathname === "/cafe-da-tarde" ||
    pathname === "/happy-hour" ||
    pathname === "/noite-dos-dates"
  );
}
