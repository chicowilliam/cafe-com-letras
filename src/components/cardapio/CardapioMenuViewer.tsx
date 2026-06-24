import { useCallback, useState } from "react";
import { CardapioMenuPage } from "@/components/cardapio/CardapioMenuPage";
import { CardapioSheetZoom } from "@/components/cardapio/CardapioSheetZoom";
import type { CardapioSection } from "@/lib/cardapio-images";

type CardapioMenuViewerProps = {
  sections: readonly CardapioSection[];
  activeSectionId: string;
  onChangeLang: () => void;
};

export function CardapioMenuViewer({
  sections,
  activeSectionId,
  onChangeLang,
}: CardapioMenuViewerProps) {
  const [zoomSection, setZoomSection] = useState<CardapioSection | null>(null);

  const closeZoom = useCallback(() => setZoomSection(null), []);

  const zoomAlt =
    zoomSection && sections[0]?.id === zoomSection.id
      ? `Cardápio do Café com Letras — ${zoomSection.label}`
      : (zoomSection?.label ?? "");

  return (
    <>
      <div className="cardapio-menu-viewer">
        <div className="cardapio-menu-viewer__stack">
          {sections.map((section, index) => (
            <CardapioMenuPage
              key={section.id}
              section={section}
              index={index}
              isActive={activeSectionId === section.id}
              onOpenZoom={() => setZoomSection(section)}
            />
          ))}
        </div>

        <p className="cardapio-menu-viewer__hint">
          Toque em uma página para ampliar e ler os valores.
        </p>

        <p className="cardapio-menu-viewer__disclaimer">
          Valores sujeitos a alteração — consulte no café.
        </p>

        <div className="cardapio-menu-viewer__footer">
          <button
            type="button"
            onClick={onChangeLang}
            className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md border border-hairline/60 px-5 py-2.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
          >
            Ver outro idioma
          </button>
        </div>
      </div>

      <CardapioSheetZoom
        section={zoomSection}
        alt={zoomAlt}
        onClose={closeZoom}
      />
    </>
  );
}
