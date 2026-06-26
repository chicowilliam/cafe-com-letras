import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { SiteSubpageHeader } from "@/components/SiteSubpageHeader";
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

export function AppShell() {
  return (
    <SubpageChromeProvider>
      <RouteScrollProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-surface-elevated focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Pular para o conteúdo
        </a>
        <AppShellChrome />
        <PageTransition />
      </RouteScrollProvider>
    </SubpageChromeProvider>
  );
}
