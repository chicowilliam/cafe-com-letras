import { ArrowLeft, Home } from "lucide-react";
import { AppLink } from "@/components/AppLink";
import { ExperienceHubNavAmbient } from "@/components/experiencias/ExperienceHubNavAmbient";
import { useScrollNavbarVisibility } from "@/hooks/useScrollNavbarVisibility";

type SiteSubpageHeaderProps = {
  title: string;
  backHref?: string;
  backLabel?: string;
  navEyebrow?: string;
  onBack?: () => void;
  scrollAware?: boolean;
  variant?: "default" | "exp-hub";
  /** Right slot: brand name (default), discreet home, or empty. */
  endAction?: "brand" | "home" | "none";
};

export function SiteSubpageHeader({
  title,
  backHref = "/",
  backLabel = "Voltar",
  navEyebrow,
  onBack,
  scrollAware = false,
  variant = "default",
  endAction = "brand",
}: SiteSubpageHeaderProps) {
  const navVisible = useScrollNavbarVisibility({ enabled: scrollAware });
  const isExpHub = variant === "exp-hub";

  const headerClassName = isExpHub
    ? "site-subpage-header site-subpage-header--exp-hub"
    : scrollAware
      ? `site-subpage-header hh-nav-slide fixed inset-x-0 top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md ${
          navVisible ? "hh-nav-slide--visible" : "hh-nav-slide--hidden"
        }`
      : "site-subpage-header sticky top-0 z-50 border-b border-hairline bg-background/90 backdrop-blur-md";

  const backClassName = isExpHub
    ? "site-subpage-header__link focus-ring inline-flex min-w-0 items-center gap-2 justify-self-start rounded-md py-1 text-sm"
    : "focus-ring inline-flex min-w-0 items-center gap-2 justify-self-start rounded-md py-1 text-sm text-foreground-muted transition-colors hover:text-foreground";

  const brandClassName = isExpHub
    ? "site-subpage-header__link focus-ring justify-self-end font-display text-xs tracking-tight sm:text-sm"
    : "focus-ring justify-self-end font-display text-xs tracking-tight text-foreground-muted transition-colors hover:text-foreground sm:text-sm";

  const homeClassName =
    "focus-ring inline-flex size-9 items-center justify-center justify-self-end rounded-md text-foreground-muted transition-colors hover:text-foreground";

  const backContent = (
    <>
      <ArrowLeft size={16} strokeWidth={1.75} aria-hidden className="shrink-0" />
      <span className={scrollAware && !isExpHub ? "hidden sm:inline" : undefined}>{backLabel}</span>
    </>
  );

  return (
    <header className={headerClassName}>
      {isExpHub ? <ExperienceHubNavAmbient /> : null}

      <nav className="site-subpage-header__nav mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 pt-[env(safe-area-inset-top)] md:px-8">
        {onBack ? (
          <button type="button" onClick={onBack} aria-label={backLabel} className={backClassName}>
            {backContent}
          </button>
        ) : (
          <AppLink to={backHref} aria-label={backLabel} className={backClassName}>
            {backContent}
          </AppLink>
        )}

        <div
          className={`min-w-0 justify-self-center text-center ${
            scrollAware && !isExpHub ? "hh-nav-title" : ""
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
          ) : isExpHub ? (
            <span className="site-subpage-header__title font-display text-sm tracking-tight">
              <span className="site-subpage-header__title-dot" aria-hidden />
              {title}
            </span>
          ) : (
            <span className="font-display text-sm tracking-tight text-foreground">{title}</span>
          )}
        </div>

        {endAction === "home" ? (
          <AppLink to="/" aria-label="Ir para a página inicial" className={homeClassName}>
            <Home size={16} strokeWidth={1.6} aria-hidden />
          </AppLink>
        ) : endAction === "brand" ? (
          <AppLink to="/" className={brandClassName}>
            Café com Letras
          </AppLink>
        ) : (
          <span aria-hidden className="justify-self-end" />
        )}
      </nav>
    </header>
  );
}
