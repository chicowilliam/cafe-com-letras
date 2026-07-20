import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export type TemporadaLightboxSlide = {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
};

type TemporadaLightboxProps = {
  slide: TemporadaLightboxSlide | null;
  onClose: () => void;
};

export function TemporadaLightbox({ slide, onClose }: TemporadaLightboxProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = slide !== null;

  useFocusTrap(dialogRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !slide || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="temporada-lightbox"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="temporada-lightbox__panel"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="temporada-lightbox__toolbar">
          <p id={titleId} className="temporada-lightbox__title">
            {slide.title ?? "Temporada"}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar ampliação"
            className="temporada-lightbox__close focus-ring"
          >
            <X size={20} strokeWidth={1.75} aria-hidden />
          </button>
        </div>

        <div className="temporada-lightbox__stage">
          <img
            src={slide.src}
            alt={slide.alt}
            decoding="async"
            className="temporada-lightbox__img"
          />
        </div>

        {slide.caption ? (
          <p className="temporada-lightbox__caption">{slide.caption}</p>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
