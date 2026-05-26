"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 64) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 4) {
        setVisible(false);
      } else if (currentY < lastScrollY.current - 4) {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: visible ? 0 : "-100%" }}
        transition={{
          duration: visible ? 0.18 : 0.4,
          ease: visible ? [0.25, 0.1, 0.25, 1] : [0.4, 0, 0.2, 1],
        }}
        style={{ willChange: "transform" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#12110f]/75 backdrop-blur-xl"
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
      </motion.header>

      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 bg-[#12110f]/95 backdrop-blur-md md:hidden"
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
      </motion.div>
    </>
  );
}
