import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavbarVisibility } from "@/hooks/useNavbarVisibility";
import { NAV_LINKS } from "@/lib/constants";

const SCROLL_THRESHOLD = 24;

const wordmarkClass =
  "focus-ring rounded-md font-display text-sm tracking-tight text-white transition-colors hover:text-white/90 md:text-[0.9375rem]";

const navLinkClass =
  "focus-ring rounded-md px-1 py-1 font-sans text-sm font-medium tracking-normal text-white/80 transition-colors hover:text-white";

export function Navbar() {
  const visible = useNavbarVisibility();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`navbar-slide fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out motion-reduce:transition-none ${ scrolled ? "border-b border-white/10 bg-[#12110f]/70 backdrop-blur-md" : "border-b border-transparent bg-transparent" } ${
          visible ? "navbar-slide--visible" : "navbar-slide--hidden"
        }`}
      >
        <nav className="relative mx-auto flex max-w-6xl transition-[height] duration-300 ease-out motion-reduce:transition-none ${ scrolled ? "h-14" : "h-16" } max-w-6xl items-center justify-between px-5 pt-[env(safe-area-inset-top)] md:px-8">
          <a href="#inicio" className={wordmarkClass}>
            Café com Letras
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={navLinkClass}>
                  {link.label}
                </a>
              </li>
            ))}
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
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-8 px-6 pb-[env(safe-area-inset-bottom)]">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="focus-ring block min-h-11 py-2 font-sans text-base font-medium tracking-tight text-foreground transition-colors active:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}