import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavbarVisibility } from "@/hooks/useNavbarVisibility";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const visible = useNavbarVisibility();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`navbar-slide fixed inset-x-0 top-0 z-50 bg-transparent motion-reduce:transition-none ${
          visible ? "navbar-slide--visible" : "navbar-slide--hidden"
        }`}
      >
        <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-end px-5 pt-[env(safe-area-inset-top)] md:h-16 md:justify-center md:px-8">
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="label-caps text-white/80 transition-colors hover:text-white"
                >
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
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors active:bg-black/50 md:hidden"
          >
            {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#12110f]/95 transition-opacity duration-300 motion-reduce:transition-none md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-10 px-6 pb-[env(safe-area-inset-bottom)]">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block min-h-11 py-2 font-serif text-3xl text-[#f5f0e6] transition-colors active:text-accent"
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
