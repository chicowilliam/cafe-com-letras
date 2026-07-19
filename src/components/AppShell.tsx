import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { SiteSubpageHeader } from "@/components/SiteSubpageHeader";
import { SiteWallpaper } from "@/components/SiteWallpaper";
import {
  SubpageChromeProvider,
  useSubpageChromeContext,
} from "@/hooks/useSubpageChrome";
import { PatternSheetProvider, type PatternSheetValue } from "@/hooks/usePatternSheet";
import { RouteScrollProvider } from "@/hooks/useRouteScroll";
import {
  getPageTheme,
  getRouteTransitionGroup,
  SUBPAGE_CHROME,
} from "@/lib/navigation";
import { chromeVariants } from "@/lib/route-motion";
import "@/styles/experiencias-nav-theme.css";

function AppShellChrome() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);
  const reduceMotion = useReducedMotion();
  const { override } = useSubpageChromeContext();
  const isHome = pathname === "/";
  const chrome = SUBPAGE_CHROME[pathname];
  const chromeKey = isHome ? "home-nav" : pathname;

  useEffect(() => {
    const from = prevPathRef.current;
    const to = pathname;
    document.documentElement.setAttribute(
      "data-transition-group",
      getRouteTransitionGroup(from, to),
    );
    prevPathRef.current = to;
  }, [pathname]);

  useEffect(() => {
    const theme = getPageTheme(pathname);
    if (theme) {
      document.documentElement.setAttribute("data-page-theme", theme);
      return;
    }
    document.documentElement.removeAttribute("data-page-theme");
  }, [pathname]);

  if (!isHome && !chrome) return null;

  if (isHome) {
    return (
      <div className="site-chrome-shell">
        <Navbar />
      </div>
    );
  }

  const chromeContent = (
    <SiteSubpageHeader
      title={override?.title ?? chrome!.title}
      backHref={override?.backHref ?? chrome!.backHref}
      backLabel={override?.backLabel ?? chrome!.backLabel}
      navEyebrow={override?.navEyebrow ?? chrome!.navEyebrow}
      onBack={override?.onBack}
      scrollAware={chrome!.scrollAware}
      variant={pathname === "/experiencias" ? "exp-hub" : "default"}
      endAction={override?.endAction ?? chrome!.endAction ?? "brand"}
    />
  );

  if (reduceMotion) {
    return chromeContent;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={chromeKey}
        className="site-chrome-shell"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={chromeVariants}
      >
        {chromeContent}
      </m.div>
    </AnimatePresence>
  );
}

function useRoutePatternSheet(): PatternSheetValue {
  const { pathname } = useLocation();
  const theme = getPageTheme(pathname);

  return useMemo(() => {
    if (theme === "cardapio") {
      return { variant: "leaf-cluster", tone: "light" };
    }
    if (theme === "experiencias") {
      return { variant: "leaf-cluster", tone: "dark" };
    }
    // Home: branch — mesma folha dominante do BackgroundPattern fixed
    return { variant: "branch", tone: "dark" };
  }, [theme]);
}

function AppShellBackground() {
  const { pathname } = useLocation();
  const theme = getPageTheme(pathname);
  const isHome = pathname === "/";
  const sheet = useRoutePatternSheet();

  if (theme === "cardapio") {
    // Padrão fica na própria página (absolute) — fundo claro + stacking do paper.
    return null;
  }

  if (theme === "experiencias") {
    return (
      <BackgroundPattern
        variant={sheet.variant}
        tone={sheet.tone}
        density="sparse"
        className="background-pattern--fixed"
      />
    );
  }

  return (
    <>
      {/* Camada global — branch (+ vine na home); SurfacePattern herda branch via PatternSheet */}
      <BackgroundPattern
        variant="branch"
        tone="dark"
        density={isHome ? "default" : "sparse"}
        className="background-pattern--fixed"
      />
      {isHome ? (
        <>
          <BackgroundPattern
            variant="vine"
            tone="dark"
            density="sparse"
            className="background-pattern--fixed background-pattern--home-vines"
          />
          <SiteWallpaper mode="fixed" />
        </>
      ) : null}
    </>
  );
}

export function AppShell() {
  return (
    <SubpageChromeProvider>
      <RouteScrollProvider>
        <AppShellInner />
      </RouteScrollProvider>
    </SubpageChromeProvider>
  );
}

function AppShellInner() {
  const sheet = useRoutePatternSheet();

  return (
    <PatternSheetProvider value={sheet}>
      <AppShellBackground />
      <div className="site-root">
        <a href="#main" className="skip-to-content focus-ring">
          Pular para o conteúdo
        </a>
        <AppShellChrome />
        <PageTransition />
      </div>
    </PatternSheetProvider>
  );
}
