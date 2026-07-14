import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
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

function AppShellBackground() {
  const { pathname } = useLocation();
  const theme = getPageTheme(pathname);
  const isHome = pathname === "/";

  if (theme === "cardapio") {
    // Padrão fica na própria página (absolute) — fundo claro + stacking do paper.
    return null;
  }

  if (theme === "experiencias") {
    return (
      <BackgroundPattern
        variant="constellation"
        opacity={0.38}
        color="var(--accent)"
        mode="fixed"
        parallax
      />
    );
  }

  return (
    <>
      {/* Camada global — fora do PageTransition (translateZ) para permanecer no viewport */}
      <BackgroundPattern
        variant="constellation"
        opacity={isHome ? 0.42 : 0.5}
        color="var(--accent)"
        mode="fixed"
        parallax
      />
      {isHome ? (
        <>
          <BackgroundPattern
            variant="vines"
            mode="fixed"
            opacity={0.3}
            color="var(--accent)"
            parallax
            className="background-pattern--home-vines"
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
        <AppShellBackground />
        <div className="site-root">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-surface-elevated focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Pular para o conteúdo
          </a>
          <AppShellChrome />
          <PageTransition />
        </div>
      </RouteScrollProvider>
    </SubpageChromeProvider>
  );
}
