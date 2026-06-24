import { Link } from "react-router-dom";
import { useScrollNavbarVisibility } from "@/hooks/useScrollNavbarVisibility";

type SiteSubpageHeaderProps = {
  title: string;
  backHref?: string;
  backLabel?: string;
  navEyebrow?: string;
  onBack?: () => void;
  scrollAware?: boolean;
};

export function SiteSubpageHeader({
  title,
  backHref = "/",
  backLabel = "Voltar",
  navEyebrow,
  onBack,
  scrollAware = false,
}: SiteSubpageHeaderProps) {
  const navVisible = useScrollNavbarVisibility({ enabled: scrollAware });

  const headerClassName = scrollAware
    ? `site-subpage-header hh-nav-slide fixed inset-x-0 top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md ${
        navVisible ? "hh-nav-slide--visible" : "hh-nav-slide--hidden"
      }`
    : "site-subpage-header sticky top-0 z-50 border-b border-hairline bg-background/90 backdrop-blur-md";

  const backClassName =
    "focus-ring inline-flex min-w-0 items-center gap-2 justify-self-start rounded-md py-1 text-sm text-foreground-muted transition-colors hover:text-foreground";

  const backContent = (
    <>
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
      <span className={scrollAware ? "hidden sm:inline" : undefined}>{backLabel}</span>
    </>
  );

  return (
    <header className={headerClassName}>
      <nav className="site-subpage-header__nav mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 pt-[env(safe-area-inset-top)] md:px-8">
        {onBack ? (
          <button type="button" onClick={onBack} aria-label={backLabel} className={backClassName}>
            {backContent}
          </button>
        ) : (
          <Link to={backHref} viewTransition aria-label={backLabel} className={backClassName}>
            {backContent}
          </Link>
        )}

        <div
          className={`min-w-0 justify-self-center text-center ${
            scrollAware ? "hh-nav-title" : ""
          }`}
        >
          {navEyebrow ? (
            <>
              <span className="hh-nav-eyebrow block text-[10px] font-medium uppercase tracking-[0.16em] text-accent-2">
                {navEyebrow}
              </span>
              <span className="hh-nav-brand font-display leading-tight tracking-tight text-foreground">
                {title}
              </span>
            </>
          ) : (
            <span className="font-display text-sm tracking-tight text-foreground">{title}</span>
          )}
        </div>

        <Link
          to="/"
          viewTransition
          className="focus-ring justify-self-end font-display text-xs tracking-tight text-foreground-muted transition-colors hover:text-foreground sm:text-sm"
        >
          Café com Letras
        </Link>
      </nav>
    </header>
  );
}
