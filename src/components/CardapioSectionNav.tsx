import { useEffect, useRef, useState } from "react";
import {
  scrollToCardapioSection,
  type CardapioSection,
} from "@/lib/cardapio-images";
import type { CardapioLang } from "@/lib/cardapio-images";
import { getCardapioChapters } from "@/lib/cardapio-premium";

type CardapioSectionNavProps = {
  sections: CardapioSection[];
  activeId: string;
  variant: "desktop" | "mobile";
  lang: CardapioLang;
};

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? doc.scrollTop / max : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

function NavButton({
  section,
  isActive,
  variant,
}: {
  section: CardapioSection;
  isActive: boolean;
  variant: "desktop" | "mobile";
}) {
  if (variant === "mobile") {
    return (
      <button
        type="button"
        aria-current={isActive ? "true" : undefined}
        onClick={() => scrollToCardapioSection(section.id)}
        className={`cardapio-section-nav__pill focus-ring inline-flex min-h-11 shrink-0 items-center rounded-full border px-3.5 py-2 transition-colors duration-200 motion-reduce:transition-none ${
          isActive ? "is-active" : ""
        }`}
      >
        {section.label}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-current={isActive ? "true" : undefined}
      onClick={() => scrollToCardapioSection(section.id)}
      className={`cardapio-section-nav__link focus-ring block w-full rounded-md border-l-2 py-2 pl-3 pr-2 text-left transition-colors duration-200 motion-reduce:transition-none ${
        isActive ? "is-active" : ""
      }`}
    >
      {section.label}
    </button>
  );
}

export function CardapioSectionNav({
  sections,
  activeId,
  variant,
  lang,
}: CardapioSectionNavProps) {
  const progress = useScrollProgress();
  const navRef = useRef<HTMLElement>(null);
  const chapters = getCardapioChapters(lang);
  const sectionMap = new Map(sections.map((section) => [section.id, section]));

  const chapterBlocks = chapters
    .map((chapter) => ({
      ...chapter,
      sections: chapter.sectionIds
        .map((id) => sectionMap.get(id))
        .filter((section): section is CardapioSection => Boolean(section)),
    }))
    .filter((chapter) => chapter.sections.length > 0);

  useEffect(() => {
    if (variant !== "desktop" || !activeId) return;
    const activeLink = navRef.current?.querySelector<HTMLElement>(
      `[aria-current="true"]`,
    );
    activeLink?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeId, variant]);

  if (variant === "mobile") {
    return (
      <nav
        aria-label="Seções do cardápio"
        className="cardapio-section-nav cardapio-section-nav--mobile"
      >
        <div className="mx-auto flex max-w-[500px] gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chapterBlocks.map((chapter) => (
            <div key={chapter.id} className="flex shrink-0 items-center gap-2">
              <span className="cardapio-section-nav__chapter-pill">{chapter.label}</span>
              {chapter.sections.map((section) => (
                <NavButton
                  key={section.id}
                  section={section}
                  isActive={activeId === section.id}
                  variant="mobile"
                />
              ))}
            </div>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={navRef}
      aria-label="Seções do cardápio"
      className="cardapio-section-nav cardapio-section-nav--desktop"
    >
      <p className="cardapio-section-nav__label section-eyebrow mb-3 !text-[10px]">
        {lang === "pt" ? "Índice" : "Contents"}
      </p>

      <div className="cardapio-section-nav__progress" aria-hidden>
        <span
          className="cardapio-section-nav__progress-fill"
          style={{ transform: `scaleY(${Math.max(progress, 0.02)})` }}
        />
      </div>

      <div className="cardapio-section-nav__chapters">
        {chapterBlocks.map((chapter) => (
          <div key={chapter.id} className="cardapio-section-nav__chapter">
            <p className="cardapio-section-nav__chapter-label">{chapter.label}</p>
            <ul className="flex flex-col gap-0.5">
              {chapter.sections.map((section) => (
                <li key={section.id}>
                  <NavButton
                    section={section}
                    isActive={activeId === section.id}
                    variant="desktop"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
