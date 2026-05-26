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
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#12110f]/90 transition-transform duration-300 ease-out motion-reduce:transition-none ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
          <a
            href="#inicio"
            className="font-serif text-lg tracking-wide text-[#f5f0e6] transition-colors hover:text-accent md:text-xl"
          >
            Café com Letras
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-[0.2em] text-[#f5f0e6]/80 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#inicio"
            className="hidden rounded-full border border-accent/40 px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-accent transition-all hover:border-accent hover:bg-accent/10 md:inline-flex"
          >
            Reservar
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex text-[#f5f0e6] md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#12110f]/95 transition-opacity duration-250 motion-reduce:transition-none md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl text-[#f5f0e6] transition-colors hover:text-accent"
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
