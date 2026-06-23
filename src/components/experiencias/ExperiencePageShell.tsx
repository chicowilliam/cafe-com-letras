import type { ReactNode } from "react";
import { useEffect } from "react";

type ExperiencePageShellProps = {
  theme?: string;
  title: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
  children: ReactNode;
};

export function ExperiencePageShell({
  theme,
  title,
  backHref = "/experiencias",
  backLabel = "Experiências",
  className = "",
  children,
}: ExperiencePageShellProps) {
  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-page-theme", theme);
    return () => {
      document.documentElement.removeAttribute("data-page-theme");
    };
  }, [theme]);

  return (
    <div
      data-page-theme={theme}
      className={`min-h-dvh bg-background text-foreground ${className}`.trim()}
    >
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-hairline bg-background/90 px-5 backdrop-blur-md md:px-8">
        <a
          href={backHref}
          className="focus-ring inline-flex items-center gap-2 rounded-md py-1 text-sm text-foreground-muted transition-colors hover:text-foreground"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </a>

        <span className="font-display text-sm tracking-tight text-foreground">
          {title}
        </span>

        <span className="w-16" aria-hidden />
      </header>

      {children}
    </div>
  );
}
