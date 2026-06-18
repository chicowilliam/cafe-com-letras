import { useEffect, useRef } from "react";
import { CARDAPIO_IMAGES } from "@/lib/cardapio-images";

export default function CardapioPage() {
  const firstImageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      firstImageRef.current?.scrollIntoView({ behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-hairline bg-background/90 px-5 backdrop-blur-md md:px-8">
        <a
          href="/"
          className="focus-ring inline-flex items-center gap-2 rounded-md py-1 text-sm text-foreground-muted transition-colors hover:text-foreground"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </a>

        <span className="font-display text-sm tracking-tight text-foreground">
          Café com Letras
        </span>

        <span className="w-16" aria-hidden />
      </header>

      <main
        ref={firstImageRef}
        className="mx-auto w-full max-w-[700px] px-4 py-6 md:px-6"
      >
        {CARDAPIO_IMAGES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={index === 0 ? "Cardápio do Café com Letras" : ""}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className="mb-3 w-full last:mb-0"
          />
        ))}
        <p className="mt-6 text-center text-xs text-foreground-muted/60">
          Valores sujeitos a alteração — consulte no café.
        </p>
      </main>
    </>
  );
}
