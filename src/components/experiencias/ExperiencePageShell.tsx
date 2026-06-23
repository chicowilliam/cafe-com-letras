import type { ReactNode } from "react";
import { useEffect } from "react";
import { useScrollNavbarVisibility } from "@/hooks/useScrollNavbarVisibility";

type ExperiencePageShellProps = {
  theme?: string;
  title: string;
  /** Linha secundária acima do título (ex.: parceria Blue Moon). */
  navEyebrow?: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
  children: ReactNode;
};

export function ExperiencePageShell({
  theme,
  title,
  navEyebrow,
  backHref = "/experiencias",
  backLabel = "Experiências",
  className = "",
  children,
}: ExperiencePageShellProps) {
  const isScrollAwareNav = theme === "happy-hour";
  const navVisible = useScrollNavbarVisibility({ enabled: isScrollAwareNav });

  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-page-theme", theme);
    return () => {
      document.documentElement.removeAttribute("data-page-theme");
    };
  }, [theme]);

  const headerClassName = isScrollAwareNav
    ? `hh-nav-slide fixed inset-x-0 top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md ${
        navVisible ? "hh-nav-slide--visible" : "hh-nav-slide--hidden"
      }`
    : "sticky top-0 z-50 border-b border-hairline bg-background/90 backdrop-blur-md";

  return (
    <div
      data-page-theme={theme}
      className={`min-h-dvh bg-background text-foreground ${className}`.trim()}
    >
      <header className={headerClassName}>
        <nav className="mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 pt-[env(safe-area-inset-top)] md:px-8">
          <a
            href={backHref}
            aria-label={backLabel}
            className="focus-ring inline-flex min-w-0 items-center gap-2 justify-self-start rounded-md py-1 text-sm text-foreground-muted transition-colors hover:text-foreground"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className={isScrollAwareNav ? "hidden sm:inline" : undefined}>
              {backLabel}
            </span>
          </a>

          <div
            className={`min-w-0 justify-self-center text-center ${
              isScrollAwareNav ? "hh-nav-title" : ""
            }`}
          >
            {navEyebrow ? (
              <>
                <span className="hh-nav-eyebrow block text-[10px] font-medium uppercase tracking-[0.16em] text-accent-2">
                  {navEyebrow}
                </span>
                <span className="font-display text-sm leading-tight tracking-tight text-foreground">
                  {title}
                </span>
              </>
            ) : (
              <span className="font-display text-sm tracking-tight text-foreground">
                {title}
              </span>
            )}
          </div>

          <span className="w-10 justify-self-end sm:w-16" aria-hidden />
        </nav>
      </header>

      {children}
    </div>
  );
}
