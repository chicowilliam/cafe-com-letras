import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export type HappyHourDishLightboxSlide = {
  src: string;
  alt: string;
  title: string;
  caption?: string;
};

type HappyHourDishLightboxProps = {
  slide: HappyHourDishLightboxSlide | null;
  onClose: () => void;
};

export function HappyHourDishLightbox({
  slide,
  onClose,
}: HappyHourDishLightboxProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
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
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !slide || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      className="hh-dish-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      onClick={onClose}
    >
      {/* Fixo no viewport — não depende da proporção da foto */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Fechar ampliação"
        className="hh-dish-lightbox__close focus-ring"
      >
        <X size={17} strokeWidth={1.5} aria-hidden />
      </button>

      <div
        className="hh-dish-lightbox__panel"
        onClick={(event) => event.stopPropagation()}
      >
        <p id={titleId} className="hh-dish-lightbox__title">
          {slide.title}
        </p>

        <div className="hh-dish-lightbox__stage">
          <img
            src={slide.src}
            alt={slide.alt}
            decoding="async"
            className="hh-dish-lightbox__img"
          />
        </div>

        {slide.caption ? (
          <p className="hh-dish-lightbox__caption">{slide.caption}</p>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
