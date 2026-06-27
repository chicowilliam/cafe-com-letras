import { execSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const backup = join(root, ".commit-backup");

function writeUtf8(relPath, content) {
  const full = join(root, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, "utf8");
}

function commit(msg, paths = []) {
  if (paths.length) execSync(`git add ${paths.map((p) => `"${p}"`).join(" ")}`, { cwd: root });
  execSync(`git commit -m "${msg.replace(/"/g, '\\"')}"`, { cwd: root, stdio: "inherit" });
}

function copyBackup(relPath) {
  copyFileSync(join(backup, relPath), join(root, relPath));
}

const cardapioCtaLink = `import { Link } from "react-router-dom";
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
`;

const navigationHelpers = readFileSync(join(backup, "src/lib/navigation.ts"), "utf8").replace(
  /export type RouteTransitionGroup[\s\S]*$/,
  "",
).trimEnd() + "\n";

const cssGlobal = `/* Route transitions — View Transitions API + fallback */

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
`;

const cssExperiencias = `

/* ——— Experiências hub ↔ detalhe (mais rápido) ——— */

html[data-transition-group="experiencias"]::view-transition-old(root) {
  animation-duration: 300ms;
}

html[data-transition-group="experiencias"]::view-transition-new(root) {
  animation-duration: 340ms;
  animation-delay: 40ms;
}
`;

const cssCardapio = `

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
`;

const cssChrome = `

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

@media (prefers-reduced-motion: reduce) {
  html {
    transition: none;
  }

  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
`;

const cssFallback = `

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
`;

const appShellSkipOnly = `import { useLocation } from "react-router-dom";
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
`;

const appShellNavbar = `import { useLocation } from "react-router-dom";
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
`;

if (!existsSync(backup)) {
  console.error("Missing .commit-backup");
  process.exit(1);
}

const steps = [
  () => {
    writeUtf8("src/components/Cardapio.tsx", cardapioCtaLink);
    commit("refactor(home): replace cardapio grid with editorial CTA", ["src/components/Cardapio.tsx"]);
  },
  () => {
    copyBackup("docs/cardapio-atualizacao.md");
    commit("docs(cardapio): note home shows invite link only", ["docs/cardapio-atualizacao.md"]);
  },
  () => {
    copyBackup("src/components/AppLink.tsx");
    commit("feat(nav): add AppLink wrapper with viewTransition", ["src/components/AppLink.tsx"]);
  },
  () => {
    writeUtf8("src/lib/navigation.ts", navigationHelpers);
    commit("feat(nav): add view transition support helpers", ["src/lib/navigation.ts"]);
  },
  () => {
    copyBackup("src/lib/navigation.ts");
    commit("feat(nav): add getRouteTransitionGroup for themed transitions", ["src/lib/navigation.ts"]);
  },
  () => {
    writeUtf8("src/styles/route-transitions.css", cssGlobal);
    commit("style(routes): intensify global page fade animations", ["src/styles/route-transitions.css"]);
  },
  () => {
    writeUtf8("src/styles/route-transitions.css", cssGlobal + cssExperiencias);
    commit("style(routes): add experiencias transition group timing", ["src/styles/route-transitions.css"]);
  },
  () => {
    writeUtf8("src/styles/route-transitions.css", cssGlobal + cssExperiencias + cssCardapio);
    commit("style(routes): add cardapio home transition group", ["src/styles/route-transitions.css"]);
  },
  () => {
    writeUtf8("src/styles/route-transitions.css", cssGlobal + cssExperiencias + cssCardapio + cssChrome);
    commit("style(routes): add site-chrome crossfade animations", ["src/styles/route-transitions.css"]);
  },
  () => {
    writeUtf8(
      "src/styles/route-transitions.css",
      cssGlobal + cssExperiencias + cssCardapio + cssChrome.replace(/@media[\s\S]*$/, "") + cssFallback,
    );
    commit("feat(routes): add CSS fallback without View Transitions API", ["src/styles/route-transitions.css"]);
  },
  () => {
    let app = readFileSync(join(root, "src/App.tsx"), "utf8");
    app = app.replace(/\s*<a\s+href="#main"[\s\S]*?<\/a>\s*/m, "\n      ");
    writeUtf8("src/App.tsx", app.trimEnd() + "\n");
    commit("refactor(app): prepare skip link move to AppShell", ["src/App.tsx"]);
  },
  () => {
    writeUtf8("src/components/AppShell.tsx", appShellSkipOnly);
    commit("refactor(shell): move skip link to AppShell", ["src/components/AppShell.tsx"]);
  },
  () => {
    let app = readFileSync(join(root, "src/App.tsx"), "utf8");
    app = app.replace(/import \{ Navbar \} from "@\/components\/Navbar";\r?\n/, "");
    app = app.replace(/\s*<Navbar \/>\r?\n/, "");
    writeUtf8("src/App.tsx", app.trimEnd() + "\n");
    writeUtf8("src/components/AppShell.tsx", appShellNavbar);
    commit("refactor(shell): hoist Navbar to AppShell on home route", ["src/App.tsx", "src/components/AppShell.tsx"]);
  },
  () => {
    copyBackup("src/components/AppShell.tsx");
    commit("feat(shell): set html data-transition-group on route change", ["src/components/AppShell.tsx"]);
  },
  () => {
    copyBackup("src/components/PageTransition.tsx");
    commit("feat(routes): add fallback enter animation in PageTransition", ["src/components/PageTransition.tsx"]);
  },
  () => {
    copyBackup("src/components/Navbar.tsx");
    commit("refactor(nav): add site-chrome and migrate Navbar to AppLink", ["src/components/Navbar.tsx"]);
  },
  () => {
    copyBackup("src/components/SiteSubpageHeader.tsx");
    commit("refactor(shell): add site-chrome and AppLink to subpage header", ["src/components/SiteSubpageHeader.tsx"]);
  },
  () => {
    for (const f of [
      "src/components/Hero.tsx",
      "src/components/NoiteDosDates.tsx",
      "src/components/Programacao.tsx",
      "src/components/Cardapio.tsx",
    ]) {
      copyBackup(f);
    }
    commit("refactor(links): migrate home sections to AppLink", [
      "src/components/Hero.tsx",
      "src/components/NoiteDosDates.tsx",
      "src/components/Programacao.tsx",
      "src/components/Cardapio.tsx",
    ]);
  },
  () => {
    for (const f of [
      "src/components/cardapio/CardapioPrintContextPanel.tsx",
      "src/components/cardapio/CardapioPrintFooter.tsx",
      "src/components/experiencias/ExperienceHub.tsx",
      "src/components/experiencias/ExperienceHubMobile.tsx",
      "src/components/experiencias/ExperienceHubTriptychPanel.tsx",
      "src/pages/CardapioPage.tsx",
    ]) {
      copyBackup(f);
    }
    commit("refactor(links): migrate cardapio and experiencias routes to AppLink", [
      "src/components/cardapio/CardapioPrintContextPanel.tsx",
      "src/components/cardapio/CardapioPrintFooter.tsx",
      "src/components/experiencias/ExperienceHub.tsx",
      "src/components/experiencias/ExperienceHubMobile.tsx",
      "src/components/experiencias/ExperienceHubTriptychPanel.tsx",
      "src/pages/CardapioPage.tsx",
    ]);
  },
];

for (const step of steps) step();

rmSync(backup, { recursive: true, force: true });
console.log("\nCommits 3-21 done.\n");
execSync("git log -21 --oneline", { cwd: root, stdio: "inherit" });
