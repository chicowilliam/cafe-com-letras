$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$backup = ".commit-backup"
if (Test-Path $backup) { Remove-Item -Recurse -Force $backup }
New-Item -ItemType Directory -Path $backup | Out-Null

$files = @(
  "docs/cardapio-atualizacao.md",
  "src/App.tsx",
  "src/components/AppShell.tsx",
  "src/components/AppLink.tsx",
  "src/components/Cardapio.tsx",
  "src/components/Hero.tsx",
  "src/components/Navbar.tsx",
  "src/components/NoiteDosDates.tsx",
  "src/components/PageTransition.tsx",
  "src/components/Programacao.tsx",
  "src/components/SiteSubpageHeader.tsx",
  "src/components/cardapio/CardapioPrintContextPanel.tsx",
  "src/components/cardapio/CardapioPrintFooter.tsx",
  "src/components/experiencias/ExperienceHub.tsx",
  "src/components/experiencias/ExperienceHubMobile.tsx",
  "src/components/experiencias/ExperienceHubTriptychPanel.tsx",
  "src/lib/navigation.ts",
  "src/pages/CardapioPage.tsx",
  "src/styles/route-transitions.css"
)

foreach ($f in $files) {
  if (Test-Path $f) {
    $dest = Join-Path $backup $f
    New-Item -ItemType Directory -Path (Split-Path $dest) -Force | Out-Null
    Copy-Item $f $dest -Force
  }
}

git reset --hard HEAD

function Commit([string]$msg, [string[]]$paths) {
  if ($paths) { git add @paths }
  git commit -m $msg
  if ($LASTEXITCODE -ne 0) { throw "commit failed: $msg" }
}

# 1
git rm src/lib/cardapio-home-config.ts
Commit "chore(home): remove cardapio home preview config"

# 2
git rm src/lib/cardapio.ts
Commit "chore(lib): remove deprecated cardapio shim"

# 3 — Cardapio CTA with Link (before AppLink)
@'
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

export function Cardapio() {
  return (
    <section id="cardapio" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl text-center">
        <FadeIn className="mb-8 md:mb-10">
          <SectionHeading
            index="02"
            eyebrow="Sabores da casa"
            title="Cardápio"
            kicker="da cozinha mineira ao café autoral"
          />
        </FadeIn>

        <FadeIn className="mx-auto max-w-md">
          <p className="font-garamond text-lg italic leading-relaxed text-foreground-muted">
            Cada prato foi pensado para durar mais do que a refeição. Como um bom livro.
          </p>
          <Link
            to="/cardapio"
            viewTransition
            className="btn-ghost focus-ring mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.01]"
          >
            Ver cardápio completo
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
'@ | Set-Content -Path src/components/Cardapio.tsx -Encoding utf8NoBOM
Commit "refactor(home): replace cardapio grid with editorial CTA" @("src/components/Cardapio.tsx")

# 4
Copy-Item "$backup/docs/cardapio-atualizacao.md" docs/cardapio-atualizacao.md -Force
Commit "docs(cardapio): note home shows invite link only" @("docs/cardapio-atualizacao.md")

# 5
Copy-Item "$backup/src/components/AppLink.tsx" src/components/AppLink.tsx -Force
Commit "feat(nav): add AppLink wrapper with viewTransition" @("src/components/AppLink.tsx")

# 6 — navigation helpers (without route group)
@'
import type { NavigateFunction, NavigateOptions, To } from "react-router-dom";

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

export function supportsViewTransitions(): boolean {
  return (
    typeof document !== "undefined" &&
    typeof document.startViewTransition === "function"
  );
}

export function navigateWithTransition(
  navigate: NavigateFunction,
  to: To,
  options?: NavigateOptions,
) {
  navigate(to, { ...options, viewTransition: true });
}

export function getPageTheme(pathname: string) {
  const themes: Record<string, string> = {
    "/cardapio": "cardapio",
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
'@ | Set-Content -Path src/lib/navigation.ts -Encoding utf8NoBOM
Commit "feat(nav): add view transition support helpers" @("src/lib/navigation.ts")

# 7
Copy-Item "$backup/src/lib/navigation.ts" src/lib/navigation.ts -Force
Commit "feat(nav): add getRouteTransitionGroup for themed transitions" @("src/lib/navigation.ts")

# 8 — CSS global intensified
@'
/* Route transitions — View Transitions API + fallback */

:root {
  --route-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --route-duration-out: 520ms;
  --route-duration-in: 560ms;
  --route-duration-chrome: 500ms;
}

html {
  transition:
    background-color 480ms ease,
    color 480ms ease;
}

::view-transition-old(root) {
  animation: page-fade-out var(--route-duration-out) var(--route-ease) both;
}

::view-transition-new(root) {
  animation: page-fade-in var(--route-duration-in) var(--route-ease) both;
  animation-delay: 80ms;
}

@keyframes page-fade-out {
  to {
    opacity: 0;
    transform: translateY(-12px);
    filter: blur(2px);
  }
}

@keyframes page-fade-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.page-transition-root {
  min-height: inherit;
}

@media (prefers-reduced-motion: reduce) {
  html {
    transition: none;
  }

  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
'@ | Set-Content -Path src/styles/route-transitions.css -Encoding utf8NoBOM
Commit "style(routes): intensify global page fade animations" @("src/styles/route-transitions.css")

# 9 — experiencias group
Add-Content -Path src/styles/route-transitions.css -Encoding utf8NoBOM -Value @'

/* ——— Experiências hub ↔ detalhe (mais rápido) ——— */

html[data-transition-group="experiencias"]::view-transition-old(root) {
  animation-duration: 300ms;
}

html[data-transition-group="experiencias"]::view-transition-new(root) {
  animation-duration: 340ms;
  animation-delay: 40ms;
}
'@
Commit "style(routes): add experiencias transition group timing" @("src/styles/route-transitions.css")

# 10 — cardapio group
Add-Content -Path src/styles/route-transitions.css -Encoding utf8NoBOM -Value @'

/* ——— Home ↔ Cardápio (tema papel) ——— */

html[data-transition-group="cardapio"] {
  transition:
    background-color 650ms ease,
    color 650ms ease;
}

html[data-transition-group="cardapio"]::view-transition-old(root) {
  animation-duration: 580ms;
}

html[data-transition-group="cardapio"]::view-transition-new(root) {
  animation-duration: 620ms;
  animation-delay: 120ms;
}
'@
Commit "style(routes): add cardapio home transition group" @("src/styles/route-transitions.css")

# 11 — site chrome
Add-Content -Path src/styles/route-transitions.css -Encoding utf8NoBOM -Value @'

/* ——— Chrome (navbar ↔ subpage header) ——— */

.site-chrome {
  view-transition-name: site-chrome;
}

::view-transition-old(site-chrome) {
  animation: chrome-fade-out var(--route-duration-chrome) var(--route-ease) both;
}

::view-transition-new(site-chrome) {
  animation: chrome-fade-in calc(var(--route-duration-chrome) + 40ms) var(--route-ease) both;
  animation-delay: 60ms;
}

@keyframes chrome-fade-out {
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@keyframes chrome-fade-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
'@
Commit "style(routes): add site-chrome crossfade animations" @("src/styles/route-transitions.css")

# 12 — fallback + reduced motion chrome
$content = Get-Content src/styles/route-transitions.css -Raw
$content = $content -replace '(?s)@media \(prefers-reduced-motion: reduce\) \{.*\}\s*$', ''
Set-Content -Path src/styles/route-transitions.css -Value $content.TrimEnd() -Encoding utf8NoBOM -NoNewline
Add-Content -Path src/styles/route-transitions.css -Encoding utf8NoBOM -Value @'

/* ——— Fallback sem View Transitions API ——— */

.page-transition-root--fallback-enter {
  animation: page-fade-in var(--route-duration-in) var(--route-ease) both;
  animation-delay: 80ms;
}

html[data-transition-group="experiencias"] .page-transition-root--fallback-enter {
  animation-duration: 340ms;
  animation-delay: 40ms;
}

html[data-transition-group="cardapio"] .page-transition-root--fallback-enter {
  animation-duration: 620ms;
  animation-delay: 120ms;
}

@media (prefers-reduced-motion: reduce) {
  html {
    transition: none;
  }

  ::view-transition-old(root),
  ::view-transition-new(root),
  ::view-transition-old(site-chrome),
  ::view-transition-new(site-chrome) {
    animation: none;
  }

  .page-transition-root--fallback-enter {
    animation: none;
  }

  .site-chrome {
    view-transition-name: none;
  }
}
'@
Commit "feat(routes): add CSS fallback without View Transitions API" @("src/styles/route-transitions.css")

# 13 — remove skip link from App
$app = Get-Content src/App.tsx -Raw
$app = $app -replace '(?s)\s*<a\s+href="#main".*?</a>\s*', "`n      "
Set-Content -Path src/App.tsx -Value $app -Encoding utf8NoBOM -NoNewline
Commit "refactor(app): prepare skip link move to AppShell" @("src/App.tsx")

# 14 — skip link in AppShell
@'
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-surface-elevated focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Pular para o conteúdo
      </a>
      <AppShellChrome />
      <PageTransition />
    </SubpageChromeProvider>
  );
}
'@ | Set-Content -Path src/components/AppShell.tsx -Encoding utf8NoBOM
Commit "refactor(shell): move skip link to AppShell" @("src/components/AppShell.tsx")

# 15 — hoist Navbar to AppShell
$app = Get-Content src/App.tsx -Raw
$app = $app -replace 'import \{ Navbar \} from "@/components/Navbar";\r?\n', ''
$app = $app -replace '\s*<Navbar />\r?\n', ''
Set-Content -Path src/App.tsx -Value $app -Encoding utf8NoBOM -NoNewline

@'
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
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

  if (isHome) {
    return <Navbar />;
  }

  if (!chrome) return null;

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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-surface-elevated focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Pular para o conteúdo
      </a>
      <AppShellChrome />
      <PageTransition />
    </SubpageChromeProvider>
  );
}
'@ | Set-Content -Path src/components/AppShell.tsx -Encoding utf8NoBOM
Commit "refactor(shell): hoist Navbar to AppShell on home route" @("src/App.tsx", "src/components/AppShell.tsx")

# 16 — transition group on html
Copy-Item "$backup/src/components/AppShell.tsx" src/components/AppShell.tsx -Force
Commit "feat(shell): set html data-transition-group on route change" @("src/components/AppShell.tsx")

# 17
Copy-Item "$backup/src/components/PageTransition.tsx" src/components/PageTransition.tsx -Force
Commit "feat(routes): add fallback enter animation in PageTransition" @("src/components/PageTransition.tsx")

# 18
Copy-Item "$backup/src/components/Navbar.tsx" src/components/Navbar.tsx -Force
Commit "refactor(nav): add site-chrome and migrate Navbar to AppLink" @("src/components/Navbar.tsx")

# 19
Copy-Item "$backup/src/components/SiteSubpageHeader.tsx" src/components/SiteSubpageHeader.tsx -Force
Commit "refactor(shell): add site-chrome and AppLink to subpage header" @("src/components/SiteSubpageHeader.tsx")

# 20
Copy-Item "$backup/src/components/Hero.tsx" src/components/Hero.tsx -Force
Copy-Item "$backup/src/components/NoiteDosDates.tsx" src/components/NoiteDosDates.tsx -Force
Copy-Item "$backup/src/components/Programacao.tsx" src/components/Programacao.tsx -Force
Copy-Item "$backup/src/components/Cardapio.tsx" src/components/Cardapio.tsx -Force
Commit "refactor(links): migrate home sections to AppLink" @(
  "src/components/Hero.tsx",
  "src/components/NoiteDosDates.tsx",
  "src/components/Programacao.tsx",
  "src/components/Cardapio.tsx"
)

# 21
Copy-Item "$backup/src/components/cardapio/CardapioPrintContextPanel.tsx" src/components/cardapio/CardapioPrintContextPanel.tsx -Force
Copy-Item "$backup/src/components/cardapio/CardapioPrintFooter.tsx" src/components/cardapio/CardapioPrintFooter.tsx -Force
Copy-Item "$backup/src/components/experiencias/ExperienceHub.tsx" src/components/experiencias/ExperienceHub.tsx -Force
Copy-Item "$backup/src/components/experiencias/ExperienceHubMobile.tsx" src/components/experiencias/ExperienceHubMobile.tsx -Force
Copy-Item "$backup/src/components/experiencias/ExperienceHubTriptychPanel.tsx" src/components/experiencias/ExperienceHubTriptychPanel.tsx -Force
Copy-Item "$backup/src/pages/CardapioPage.tsx" src/pages/CardapioPage.tsx -Force
Commit "refactor(links): migrate cardapio and experiencias routes to AppLink" @(
  "src/components/cardapio/CardapioPrintContextPanel.tsx",
  "src/components/cardapio/CardapioPrintFooter.tsx",
  "src/components/experiencias/ExperienceHub.tsx",
  "src/components/experiencias/ExperienceHubMobile.tsx",
  "src/components/experiencias/ExperienceHubTriptychPanel.tsx",
  "src/pages/CardapioPage.tsx"
)

Remove-Item -Recurse -Force $backup
Write-Host "Done: 21 commits created."
git log -21 --oneline
