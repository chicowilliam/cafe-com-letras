import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type CardapioLightboxProps = {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function CardapioLightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: CardapioLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = activeIndex >= 0;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      onNext();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex >= 0 && activeIndex < images.length - 1;
  const current = isOpen ? images[activeIndex] : null;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Visualizar imagem do cardápio"
      onCancel={onClose}
      onClose={onClose}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none bg-black/90 p-0 backdrop:bg-transparent open:flex open:items-center open:justify-center"
    >
      {current ? (
        <div className="relative flex h-full w-full items-center justify-center motion-safe:animate-[programacao-fade_0.2s_ease-out]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="focus-ring absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            <X size={22} strokeWidth={1.5} />
          </button>

          {hasPrev ? (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Imagem anterior"
              className="focus-ring absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 md:left-5"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
          ) : null}

          {hasNext ? (
            <button
              type="button"
              onClick={onNext}
              aria-label="Próxima imagem"
              className="focus-ring absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 md:right-5"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          ) : null}

          <img
            src={current}
            alt="Destaque do cardápio"
            className="max-h-[90dvh] max-w-[90dvw] object-contain"
            decoding="async"
          />
        </div>
      ) : null}
    </dialog>
  );
}
