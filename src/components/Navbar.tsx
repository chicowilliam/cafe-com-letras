import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavbarVisibility } from "@/hooks/useNavbarVisibility";
import { NAV_LINKS } from "@/lib/constants";

const HERO_INTERSECTION_THRESHOLD = 0.1;

const wordmarkClass =`n  "focus-ring block whitespace-nowrap rounded-md font-display text-sm tracking-tight text-white transition-colors hover:text-white/90 md:text-[0.9375rem]";

const navLinkClass =
  "focus-ring relative rounded-md px-1 py-1 font-sans text-sm font-medium tracking-normal text-white/80 transition-colors hover:text-white";

const navLinkActiveClass =
  "text-white after:absolute after:-bottom-1 after:inset-x-0 after:h-px after:bg-accent after:content-['']";

const ctaClass =
  "btn-primary focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-medium tracking-normal text-ink";

export function Navbar() {
  const visible = useNavbarVisibility();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(NAV_LINKS[0].href);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const probe = scrollY + 120;
      let active: string = NAV_LINKS[0].href;

      for (const link of NAV_LINKS) {
        const section = document.querySelector<HTMLElement>(link.href);
        if (section && section.offsetTop <= probe) {
          active = link.href;
        }
      }

      setActiveHref(active);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <>
      <header
        className={`navbar-slide fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out motion-reduce:transition-none ${
          pastHero
            ? "border-b border-white/10 bg-[#12110f]/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        } ${visible ? "navbar-slide--visible" : "navbar-slide--hidden"}`}
      >
        <nav
          className={`relative mx-auto flex max-w-6xl items-center justify-between px-5 pt-[env(safe-area-inset-top)] transition-[height] duration-300 ease-out motion-reduce:transition-none md:px-8 ${
            pastHero ? "h-14" : "h-16"
          }`}
        >
          <div className={`shrink-0 overflow-hidden transition-[max-width,opacity] duration-300 ease-out motion-reduce:transition-none ${ pastHero ? "max-w-[11rem] opacity-100" : "max-w-0 opacity-0" }`}>
            <a href="#inicio" className={wordmarkClass} aria-hidden={!pastHero} tabIndex={pastHero ? 0 : -1}>
              Café com Letras
            </a>
          </div>

          <ul className="hidden items-center gap-7 md:flex"> className="flex items-center gap-7">
              {NAV_LINKS.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`${navLinkClass}${isActive ? ` ${navLinkActiveClass}` : ""}`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors active:bg-black/55 md:hidden"
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col px-8 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(4.5rem+env(safe-area-inset-top))]">
          <ul className="flex flex-col items-start gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`focus-ring block min-h-11 py-1 font-sans text-lg font-medium tracking-normal text-foreground transition-colors active:text-accent${
                      isActive ? " text-accent" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <button type="button" onClick={handleReserve} className={`${ctaClass} mt-auto w-full max-w-xs`}>
            Reservar
          </button>
        </div>
      </div>
    </>
  );
}
