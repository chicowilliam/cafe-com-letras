import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { FadeIn } from "@/components/FadeIn";
import {
  cloudinaryVideoPoster,
  cloudinaryVideoUrl,
  PRATOS_DA_SEMANA,
  type PratoDaSemana,
} from "@/lib/curadoria-semanal";

const VISIBILITY_THRESHOLD = 0.35;
const TWEEN_FACTOR_BASE = 0.52;
const MOBILE_SLIDE_SIZE = "82%";

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduceMotion;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type CuradoriaVideoProps = {
  src: string;
  poster: string;
  label: string;
  active: boolean;
};

const CuradoriaVideo = memo(function CuradoriaVideo({
  src,
  poster,
  label,
  active,
}: CuradoriaVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !active || reduceMotion) return;
    video.play().catch(() => {});
  }, [active, reduceMotion, src]);

  const showPoster = !active || !isPlaying;

  return (
    <div className="absolute inset-0 bg-surface">
      {showPoster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}

      {active && !reduceMotion && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          aria-label={`Vídeo do prato ${label}`}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
});

type CuradoriaCardProps = {
  prato: PratoDaSemana;
  active: boolean;
  className?: string;
  style?: CSSProperties;
  slideLabel?: string;
};

function CuradoriaCard({
  prato,
  active,
  className = "",
  style,
  slideLabel,
}: CuradoriaCardProps) {
  return (
    <article
      className={`group relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-hairline bg-surface will-change-transform motion-reduce:transform-none motion-reduce:opacity-100 md:transition-all md:duration-500 md:hover:scale-[1.015] md:hover:shadow-xl md:motion-reduce:transition-none md:motion-reduce:hover:scale-100${className ? ` ${className}` : ""}`}
      style={style}
      aria-label={slideLabel}
    >
      <CuradoriaVideo
        src={cloudinaryVideoUrl(prato.cloudinaryPublicId)}
        poster={cloudinaryVideoPoster(prato.cloudinaryPublicId)}
        label={prato.nome}
        active={active}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
        <p className="mb-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-accent/90">
          {prato.tag}
        </p>
        <h3 className="font-display text-lg leading-tight tracking-tight text-white md:text-xl">
          {prato.nome}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-stone-300">
          {prato.descricao}
        </p>
      </div>
    </article>
  );
}

function useEmblaSlideTween(
  emblaApi: EmblaCarouselType | undefined,
  reduceMotion: boolean,
) {
  const tweenFactor = useRef(TWEEN_FACTOR_BASE);

  useEffect(() => {
    if (!emblaApi || reduceMotion) return;

    const setTweenFactor = () => {
      tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    };

    const tweenSlides = () => {
      const scrollProgress = emblaApi.scrollProgress();
      const snapList = emblaApi.scrollSnapList();

      emblaApi.slideNodes().forEach((slideNode, slideIndex) => {
        const diffToTarget = snapList[slideIndex] - scrollProgress;
        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = clamp(0.94 + tweenValue * 0.06, 0.94, 1);
        const opacity = clamp(0.72 + tweenValue * 0.28, 0.72, 1);
        slideNode.style.transform = `scale(${scale})`;
        slideNode.style.opacity = `${opacity}`;
      });
    };

    setTweenFactor();
    emblaApi.on("reInit", setTweenFactor);
    emblaApi.on("scroll", tweenSlides);
    emblaApi.on("slideFocus", tweenSlides);
    tweenSlides();

    return () => {
      emblaApi.off("reInit", setTweenFactor);
      emblaApi.off("scroll", tweenSlides);
      emblaApi.off("slideFocus", tweenSlides);
      emblaApi.slideNodes().forEach((node) => {
        node.style.transform = "";
        node.style.opacity = "";
      });
    };
  }, [emblaApi, reduceMotion]);
}

function CuradoriaMobileCarousel() {
  const reduceMotion = usePrefersReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });

  useEmblaSlideTween(emblaApi, reduceMotion);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setScrollProgress(emblaApi.scrollProgress());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, onScroll]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!emblaApi) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      }
    },
    [emblaApi],
  );

  const progressWidth =
    PRATOS_DA_SEMANA.length > 1
      ? `${(scrollProgress / (PRATOS_DA_SEMANA.length - 1)) * 100}%`
      : "100%";

  return (
    <div className="md:hidden">
      <div
        className="focus-ring rounded-xl outline-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Pratos em destaque da curadoria da semana"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div ref={emblaRef} className="overflow-hidden pl-5">
          <div className="flex touch-pan-y">
            {PRATOS_DA_SEMANA.map((prato, index) => (
              <div
                key={prato.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${PRATOS_DA_SEMANA.length}: ${prato.nome}`}
                aria-hidden={selectedIndex !== index}
                className="min-w-0 shrink-0 pr-3 last:pr-5"
                style={{ flex: `0 0 ${MOBILE_SLIDE_SIZE}` }}
              >
                <CuradoriaCard
                  prato={prato}
                  active={selectedIndex === index}
                  slideLabel={`${prato.nome}, ${prato.tag}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-[280px] px-5">
        <div
          className="mb-4 h-px overflow-hidden rounded-full bg-white/10"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ width: progressWidth }}
          />
        </div>

        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Navegação do carrossel de pratos"
        >
          {PRATOS_DA_SEMANA.map((prato, index) => (
            <button
              key={prato.id}
              type="button"
              role="tab"
              aria-selected={selectedIndex === index}
              aria-label={`Ir para ${prato.nome}`}
              onClick={() => scrollTo(index)}
              className="focus-ring rounded-full p-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  selectedIndex === index
                    ? "w-5 bg-accent"
                    : "w-1.5 bg-white/25 hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CuradoriaDesktopGrid() {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  const handleActive = useCallback((id: number) => {
    setActiveVideoId(id);
  }, []);

  return (
    <div className="hidden md:grid md:grid-cols-2 md:justify-items-center md:gap-5 lg:grid-cols-3">
      {PRATOS_DA_SEMANA.map((prato, index) => (
        <FadeIn
          key={prato.id}
          delay={0.08 + index * 0.06}
          rootMargin="0px"
          className="w-full max-w-[260px] lg:max-w-[240px]"
        >
          <DesktopGridCard
            prato={prato}
            canPlay={activeVideoId === prato.id}
            onActive={() => handleActive(prato.id)}
          />
        </FadeIn>
      ))}
    </div>
  );
}

type DesktopGridCardProps = {
  prato: PratoDaSemana;
  canPlay: boolean;
  onActive: () => void;
};

function DesktopGridCard({ prato, canPlay, onActive }: DesktopGridCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const active =
          entry.isIntersecting &&
          entry.intersectionRatio >= VISIBILITY_THRESHOLD;
        setInView(active);
        if (active) onActive();
      },
      { threshold: [0, VISIBILITY_THRESHOLD, 0.6] },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [onActive]);

  return (
    <div ref={containerRef}>
      <CuradoriaCard
        prato={prato}
        active={inView && canPlay}
        className="max-w-none"
      />
    </div>
  );
}

export function CuradoriaSemanal() {
  return (
    <section id="curadoria-da-semana" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-10 text-center md:mb-14 md:text-left">
          <p className="section-eyebrow">Menu em movimento</p>
          <h2 className="section-title">Curadoria da Semana</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground-muted md:mx-0 md:text-base">
            Três escolhas da cozinha e do bar, capturadas em vídeo — uma vitrine
            semanal do que há de mais refinado no Café com Letras.
          </p>
        </FadeIn>

        <CuradoriaMobileCarousel />
        <CuradoriaDesktopGrid />
      </div>
    </section>
  );
}
