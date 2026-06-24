import { useLocation } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { SiteSubpageHeader } from "@/components/SiteSubpageHeader";
import {
  SubpageChromeProvider,
  useSubpageChromeContext,
} from "@/hooks/useSubpageChrome";
import { useRouteScroll } from "@/hooks/useRouteScroll";
import { getPageTheme, SUBPAGE_CHROME } from "@/lib/navigation";
import { useEffect } from "react";

function AppShellChrome() {
  const { pathname } = useLocation();
  const { override } = useSubpageChromeContext();
  const isHome = pathname === "/";
  const chrome = SUBPAGE_CHROME[pathname];

  useRouteScroll();

  useEffect(() => {
    const theme = getPageTheme(pathname);
    if (theme) {
      document.documentElement.setAttribute("data-page-theme", theme);
      return;
    }
    document.documentElement.removeAttribute("data-page-theme");
  }, [pathname]);

  if (isHome || !chrome) return null;

  return (
    <SiteSubpageHeader
      title={override?.title ?? chrome.title}
      backHref={override?.backHref ?? chrome.backHref}
      backLabel={override?.backLabel ?? chrome.backLabel}
      navEyebrow={override?.navEyebrow ?? chrome.navEyebrow}
      onBack={override?.onBack}
      scrollAware={chrome.scrollAware}
    />
  );
}

export function AppShell() {
  return (
    <SubpageChromeProvider>
      <AppShellChrome />
      <PageTransition />
    </SubpageChromeProvider>
  );
}
