import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { CardapioSection } from "@/lib/cardapio-images";

type CardapioSheetZoomProps = {
  section: CardapioSection | null;
  alt: string;
  onClose: () => void;
};

export function CardapioSheetZoom({
  section,
  alt,
  onClose,
}: CardapioSheetZoomProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = section !== null;

  useFocusTrap(dialogRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !section) return null;

  return (
    <div
      className="cardapio-sheet-zoom"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="cardapio-sheet-zoom__panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cardapio-sheet-zoom__header">
          <p id={titleId} className="cardapio-sheet-zoom__title">
            {section.label}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar ampliação"
            className="cardapio-sheet-zoom__close focus-ring"
          >
            <X size={20} strokeWidth={1.75} aria-hidden />
          </button>
        </div>

        <div className="cardapio-sheet-zoom__scroll">
          <img
            src={section.src}
            alt={alt}
            decoding="async"
            className="cardapio-sheet-zoom__image"
          />
        </div>
      </div>
    </div>
  );
}
