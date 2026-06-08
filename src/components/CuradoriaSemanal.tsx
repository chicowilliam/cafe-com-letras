import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { FadeIn } from "@/components/FadeIn";
import {
  cloudinaryVideoPoster,
  cloudinaryVideoSources,
  PRATOS_DA_SEMANA,
  REEL_POSTER_HEIGHT,
  REEL_POSTER_WIDTH,
  type PratoDaSemana,
} from "@/lib/curadoria-semanal";
import { loadVideoSources } from "@/lib/video-utils";

const PREMIUM_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const TWEEN_FACTOR_BASE = 0.52;
const REEL_ASPECT = 9 / 16;
const TRIPTYCH_HEIGHT = "clamp(420px, 60vh, 560px)";
const INACTIVE_PANEL_PX = 52;
const SECTION_IO_ROOT_MARGIN = "240px 0px";
const CURADORIA_TOTAL = PRATOS_DA_SEMANA.length;

function padIndex(value: number) {
  return String(value).padStart(2, "0");
}

type CuradoriaControlPanelProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  reduceMotion: boolean;
  className?: string;
};

function CuradoriaControlPanel({
  activeIndex,
  onSelect,
  onPrev,
  onNext,
  reduceMotion,
  className = "",
}: CuradoriaControlPanelProps) {
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === CURADORIA_TOTAL - 1;

  return (
    <div className={`mt-8 lg:mt-10 ${className}`}>
      <div className="flex items-end justify-between gap-4">
        <p
          className="font-display text-4xl leading-none tracking-tight text-foreground tabular-nums lg:text-[2.75rem]"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            key={activeIndex}
            className={`inline-block text-accent ${
              reduceMotion
                ? ""
                : "motion-safe:animate-[curadoria-counter_0.45s_cubic-bezier(0.22,1,0.36,1)_both]"
            }`}
          >
            {padIndex(activeIndex + 1)}
          </span>
          <span className="mx-2 text-2xl text-foreground-muted/45 lg:text-[1.75rem]">
            —
          </span>
          <span className="text-2xl text-foreground-muted/55 lg:text-[1.75rem]">
            {padIndex(CURADORIA_TOTAL)}
          </span>
          <span className="sr-only">
            {" "}
            — reels {activeIndex + 1} de {CURADORIA_TOTAL}:{" "}
            {PRATOS_DA_SEMANA[activeIndex].nome}
          </span>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={atStart}
            aria-label="Reels anterior"
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-foreground transition-[color,border-color,background-color,transform] duration-300 hover:border-accent/35 hover:bg-accent/10 hover:text-accent disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none"
            style={{ transitionTimingFunction: PREMIUM_EASE }}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={atEnd}
            aria-label="Próximo reels"
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-foreground transition-[color,border-color,background-color,transform] duration-300 hover:border-accent/35 hover:bg-accent/10 hover:text-accent disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none"
            style={{ transitionTimingFunction: PREMIUM_EASE }}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      <div
        className="mt-5 flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Seleção de reels da curadoria"
      >
        {PRATOS_DA_SEMANA.map((prato, index) => (
          <button
            key={prato.id}
            type="button"
            role="tab"
            id={`curadoria-control-tab-${prato.id}`}
            aria-selected={activeIndex === index}
            aria-controls={`curadoria-panel-${prato.id}`}
            aria-label={`Ir para ${prato.nome}`}
            onClick={() => onSelect(index)}
            className="focus-ring rounded-full p-2 transition-transform duration-300 motion-reduce:transition-none"
            style={{ transitionTimingFunction: PREMIUM_EASE }}
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                activeIndex === index
                  ? "w-5 bg-accent"
                  : "w-1.5 bg-white/25 hover:bg-white/40"
              }`}
              style={{ transitionTimingFunction: PREMIUM_EASE }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function useTriptychMetrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeReelWidth, setActiveReelWidth] = useState(270);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const update = () => {
      const height = node.getBoundingClientRect().height;
      if (height > 0) setActiveReelWidth(height * REEL_ASPECT);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { containerRef, activeReelWidth };
}

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

function useSectionInView(rootMargin = SECTION_IO_ROOT_MARGIN) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type ReelPosterProps = {
  publicId: string;
  visible: boolean;
  parallax?: boolean;
  active?: boolean;
  reduceMotion: boolean;
};

const ReelPoster = memo(function ReelPoster({
  publicId,
  visible,
  parallax = false,
  active = false,
  reduceMotion,
}: ReelPosterProps) {
  if (!visible) return null;

  const avif = cloudinaryVideoPoster(publicId, "avif");
  const webp = cloudinaryVideoPoster(publicId, "webp");
  const jpg = cloudinaryVideoPoster(publicId, "jpg");

  return (
    <picture
      className={`absolute inset-0 block transition-transform duration-700 motion-reduce:transition-none motion-reduce:transform-none ${
        parallax && active && !reduceMotion ? "scale-[1.03]" : "scale-100"
      }`}
      style={{ transitionTimingFunction: PREMIUM_EASE }}
    >
      <source type="image/avif" srcSet={avif} />
      <source type="image/webp" srcSet={webp} />
      <img
        src={jpg}
        alt=""
        aria-hidden
        width={REEL_POSTER_WIDTH}
        height={REEL_POSTER_HEIGHT}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </picture>
  );
});

type CuradoriaVideoProps = {
  publicId: string;
  label: string;
  /** Único painel autorizado a decodificar vídeo (seção visível + reels ativo). */
  shouldPlay: boolean;
  reduceMotion: boolean;
  parallax?: boolean;
  onProgress?: (progress: number) => void;
};

const CuradoriaVideo = memo(function CuradoriaVideo({
  publicId,
  label,
  shouldPlay,
  reduceMotion,
  parallax = false,
  onProgress,
}: CuradoriaVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldPlay) return;

    const cleanup = loadVideoSources(
      video,
      cloudinaryVideoSources(publicId).map(({ src, type }) => ({ src, type })),
    );
    video.play().catch(() => {});

    return () => {
      cleanup();
      setIsPlaying(false);
    };
  }, [shouldPlay, publicId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldPlay || !onProgress) return;

    const handleTimeUpdate = () => {
      if (video.duration > 0) {
        onProgress(video.currentTime / video.duration);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [shouldPlay, onProgress]);

  const showPoster = !shouldPlay || !isPlaying;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <ReelPoster
        publicId={publicId}
        visible={showPoster}
        parallax={parallax}
        active={shouldPlay}
        reduceMotion={reduceMotion}
      />

      {shouldPlay && (
        <video
          ref={videoRef}
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
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 motion-reduce:transition-none motion-reduce:transform-none ${
            isPlaying ? "opacity-100" : "opacity-0"
          } ${parallax && isPlaying ? "scale-[1.03]" : "scale-100"}`}
          style={{ transitionTimingFunction: PREMIUM_EASE }}
        />
      )}
    </div>
  );
});

type ReelFrostedCaptionProps = {
  prato: PratoDaSemana;
  visible: boolean;
  reduceMotion: boolean;
  videoProgress: number;
};

function ReelFrostedCaption({
  prato,
  visible,
  reduceMotion,
  videoProgress,
}: ReelFrostedCaptionProps) {
  const anchor = prato.captionPosition ?? "bottom";
  const isBottom = anchor === "bottom";

  const stagger = (delayMs: number) =>
    reduceMotion
      ? undefined
      : {
          transitionTimingFunction: PREMIUM_EASE,
          transitionDelay: visible ? `${delayMs}ms` : "0ms",
        };

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-10 ${isBottom ? "bottom-0" : "top-0"}`}
      aria-hidden={!visible}
    >
      <div
        aria-hidden
        className={`absolute inset-x-0 ${
          isBottom
            ? "bottom-0 h-[48%] bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            : "top-0 h-[42%] bg-gradient-to-b from-black/70 via-black/30 to-transparent"
        }`}
      />

      <div
        className={`relative max-w-[88%] rounded-[var(--radius-md)] border border-white/12 bg-[rgba(18,17,15,0.55)] p-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.28)] backdrop-blur-md motion-reduce:transition-none ${
          isBottom ? "mb-3 ml-3" : "ml-3 mt-3"
        } ${
          reduceMotion
            ? visible
              ? "opacity-100"
              : "opacity-0"
            : visible
              ? "-translate-y-1 opacity-100"
              : "translate-y-4 opacity-0"
        } transition-[opacity,transform,box-shadow] duration-700 ${
          visible && !reduceMotion
            ? "shadow-[0_10px_36px_rgba(0,0,0,0.42)]"
            : ""
        }`}
        style={reduceMotion ? undefined : { transitionTimingFunction: PREMIUM_EASE }}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden rounded-b-[var(--radius-md)] bg-white/10"
        >
          <div
            className="h-full origin-left bg-accent transition-[width] duration-150 motion-reduce:transition-none"
            style={{
              width: `${clamp(videoProgress, 0, 1) * 100}%`,
              transitionTimingFunction: PREMIUM_EASE,
            }}
          />
        </div>

        <p
          className={`section-eyebrow mb-0 !text-accent transition-opacity duration-500 motion-reduce:transition-none ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={stagger(60)}
        >
          {prato.tag}
        </p>

        <span
          aria-hidden
          className={`mt-2 mb-2 block h-px w-7 bg-accent/80 transition-opacity duration-500 motion-reduce:transition-none ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={stagger(120)}
        />

        <h3
          className={`font-display text-base leading-tight tracking-tight text-white transition-opacity duration-500 motion-reduce:transition-none md:text-lg ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={stagger(160)}
        >
          {prato.nome}
        </h3>

        <p
          className={`mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-stone-300 transition-opacity duration-500 motion-reduce:transition-none ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={stagger(220)}
        >
          {prato.descricao}
        </p>
      </div>
    </div>
  );
}

type TriptychPanelProps = {
  prato: PratoDaSemana;
  index: number;
  isActive: boolean;
  reduceMotion: boolean;
  sectionInView: boolean;
  showDivider: boolean;
  activeReelWidth: number;
  onActivate: () => void;
};

const TriptychPanel = memo(function TriptychPanel({
  prato,
  index,
  isActive,
  reduceMotion,
  sectionInView,
  showDivider,
  activeReelWidth,
  onActivate,
}: TriptychPanelProps) {
  const showExpanded = reduceMotion || isActive;
  const shouldPlay = sectionInView && isActive && !reduceMotion;
  const panelWidth = isActive ? activeReelWidth : INACTIVE_PANEL_PX;
  const [videoProgress, setVideoProgress] = useState(0);
  const [prevShouldPlay, setPrevShouldPlay] = useState(shouldPlay);

  if (prevShouldPlay !== shouldPlay) {
    setPrevShouldPlay(shouldPlay);
    if (!shouldPlay) setVideoProgress(0);
  }

  const handleProgress = useCallback((progress: number) => {
    setVideoProgress(progress);
  }, []);

  return (
    <button
      type="button"
      role="tab"
      id={`curadoria-tab-${prato.id}`}
      aria-selected={isActive}
      aria-controls={`curadoria-panel-${prato.id}`}
      aria-label={`${prato.nome} — ${prato.tag}`}
      onMouseEnter={reduceMotion ? undefined : onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className="focus-ring group/panel relative h-full shrink-0 cursor-pointer overflow-hidden border-0 bg-black text-left outline-none motion-reduce:transition-none"
      style={{
        width: panelWidth,
        transition: reduceMotion ? undefined : `width 700ms ${PREMIUM_EASE}`,
      }}
    >
      <div
        id={`curadoria-panel-${prato.id}`}
        role="tabpanel"
        aria-labelledby={`curadoria-tab-${prato.id}`}
        className={`relative h-full w-full ${
          reduceMotion
            ? isActive
              ? "brightness-100 saturate-100"
              : "brightness-[0.85] saturate-90"
            : `transition-[filter] duration-700 motion-reduce:transition-none ${
                isActive ? "brightness-100 saturate-100" : "brightness-[0.55] saturate-[0.65]"
              }`
        }`}
        style={reduceMotion ? undefined : { transitionTimingFunction: PREMIUM_EASE }}
      >
        {shouldPlay ? (
          <CuradoriaVideo
            publicId={prato.cloudinaryPublicId}
            label={prato.nome}
            shouldPlay
            reduceMotion={reduceMotion}
            parallax={isActive}
            onProgress={handleProgress}
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden bg-black">
            <ReelPoster
              publicId={prato.cloudinaryPublicId}
              visible
              reduceMotion={reduceMotion}
            />
          </div>
        )}

        {!isActive && (
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/55" />
        )}

        {/* Collapsed — vertical category + compact title */}
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-between px-1.5 py-3 md:py-4 ${
            showExpanded
              ? "pointer-events-none opacity-0"
              : "opacity-100 motion-reduce:opacity-0"
          } ${reduceMotion ? "hidden" : "transition-opacity duration-500 motion-reduce:transition-none"}`}
          aria-hidden={showExpanded}
        >
          <span
            className="font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-accent/80 [writing-mode:vertical-rl] rotate-180"
          >
            {prato.tag}
          </span>
          <span className="font-display max-w-[3.75rem] text-center text-[10px] leading-tight tracking-tight text-white/90 [writing-mode:vertical-rl] rotate-180 lg:text-[11px]">
            {prato.nome}
          </span>
        </div>

        <ReelFrostedCaption
          prato={prato}
          visible={showExpanded}
          reduceMotion={reduceMotion}
          videoProgress={shouldPlay ? videoProgress : 0}
        />
      </div>

      {/* Active accent indicator */}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 z-20 h-[2px] origin-left bg-accent transition-transform duration-700 motion-reduce:transition-none ${
          isActive ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ transitionTimingFunction: PREMIUM_EASE }}
      />

      {showDivider && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-30 w-px bg-white/10"
        />
      )}

      <span className="sr-only">
        Painel {index + 1}: {prato.nome}
      </span>
    </button>
  );
});

function CuradoriaDesktopTriptych({
  reduceMotion,
  sectionInView,
  activeIndex,
  onActiveIndexChange,
}: {
  reduceMotion: boolean;
  sectionInView: boolean;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
}) {
  const { containerRef, activeReelWidth } = useTriptychMetrics();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onActiveIndexChange(Math.max(0, activeIndex - 1));
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onActiveIndexChange(Math.min(CURADORIA_TOTAL - 1, activeIndex + 1));
      }
      if (event.key === "Home") {
        event.preventDefault();
        onActiveIndexChange(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        onActiveIndexChange(CURADORIA_TOTAL - 1);
      }
    },
    [activeIndex, onActiveIndexChange],
  );

  return (
    <div
      className="hidden md:flex md:justify-center lg:justify-end"
      role="tablist"
      aria-label="Curadoria da semana — tríptico interativo"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={containerRef}
        className="mx-auto flex w-fit overflow-hidden rounded-xl border border-hairline bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_36px_rgba(0,0,0,0.4)] lg:mx-0"
        style={{ height: TRIPTYCH_HEIGHT }}
      >
        {PRATOS_DA_SEMANA.map((prato, index) => (
          <TriptychPanel
            key={prato.id}
            prato={prato}
            index={index}
            isActive={activeIndex === index}
            reduceMotion={reduceMotion}
            sectionInView={sectionInView}
            showDivider={index < PRATOS_DA_SEMANA.length - 1}
            activeReelWidth={activeReelWidth}
            onActivate={() => onActiveIndexChange(index)}
          />
        ))}
      </div>
    </div>
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
        const scale = clamp(0.96 + tweenValue * 0.04, 0.96, 1);
        const opacity = clamp(0.78 + tweenValue * 0.22, 0.78, 1);
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

type MobileSlideProps = {
  prato: PratoDaSemana;
  isActive: boolean;
  reduceMotion: boolean;
  sectionInView: boolean;
  index: number;
  total: number;
};

const MobileTriptychSlide = memo(function MobileTriptychSlide({
  prato,
  isActive,
  reduceMotion,
  sectionInView,
  index,
  total,
}: MobileSlideProps) {
  const shouldPlay = sectionInView && isActive && !reduceMotion;
  const [videoProgress, setVideoProgress] = useState(0);
  const [prevShouldPlay, setPrevShouldPlay] = useState(shouldPlay);

  if (prevShouldPlay !== shouldPlay) {
    setPrevShouldPlay(shouldPlay);
    if (!shouldPlay) setVideoProgress(0);
  }

  const handleProgress = useCallback((progress: number) => {
    setVideoProgress(progress);
  }, []);

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} de ${total}: ${prato.nome}`}
      aria-hidden={!isActive}
      className="relative aspect-[9/16] w-[min(78vw,300px)] shrink-0 overflow-hidden bg-black"
    >
      <div
        className={`relative h-full w-full transition-[filter] duration-500 ${
          isActive ? "brightness-100" : "brightness-90"
        }`}
      >
        {shouldPlay ? (
          <CuradoriaVideo
            publicId={prato.cloudinaryPublicId}
            label={prato.nome}
            shouldPlay
            reduceMotion={reduceMotion}
            parallax={isActive}
            onProgress={handleProgress}
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden bg-black">
            <ReelPoster
              publicId={prato.cloudinaryPublicId}
              visible
              reduceMotion={reduceMotion}
            />
          </div>
        )}
        <ReelFrostedCaption
          prato={prato}
          visible={isActive}
          reduceMotion={reduceMotion}
          videoProgress={shouldPlay ? videoProgress : 0}
        />
      </div>
    </div>
  );
});

function CuradoriaMobileTriptych({
  reduceMotion,
  sectionInView,
  activeIndex,
  onActiveIndexChange,
}: {
  reduceMotion: boolean;
  sectionInView: boolean;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
}) {
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
    onActiveIndexChange(emblaApi.selectedScrollSnap());
  }, [emblaApi, onActiveIndexChange]);

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

  useEffect(() => {
    if (!emblaApi) return;
    if (emblaApi.selectedScrollSnap() !== activeIndex) {
      emblaApi.scrollTo(activeIndex);
    }
  }, [emblaApi, activeIndex]);

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
    CURADORIA_TOTAL > 1
      ? `${(scrollProgress / (CURADORIA_TOTAL - 1)) * 100}%`
      : "100%";

  return (
    <div className="md:hidden">
      <div
        className="focus-ring mx-auto w-fit overflow-hidden rounded-xl border border-hairline bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_10px_28px_rgba(0,0,0,0.35)] outline-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Curadoria da semana — tríptico deslizante"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {PRATOS_DA_SEMANA.map((prato, index) => (
              <div key={prato.id} className="shrink-0 pl-4 last:pr-4">
                <MobileTriptychSlide
                  prato={prato}
                  index={index}
                  total={CURADORIA_TOTAL}
                  isActive={activeIndex === index}
                  reduceMotion={reduceMotion}
                  sectionInView={sectionInView}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-[240px] px-4" aria-hidden>
        <div className="h-px overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-150 motion-reduce:transition-none"
            style={{
              width: progressWidth,
              transitionTimingFunction: PREMIUM_EASE,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function CuradoriaSemanal() {
  const reduceMotion = usePrefersReducedMotion();
  const { ref: triptychRef, inView: sectionInView } = useSectionInView();
  const [activeIndex, setActiveIndex] = useState(0);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(clamp(index, 0, CURADORIA_TOTAL - 1));
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => Math.min(CURADORIA_TOTAL - 1, current + 1));
  }, []);

  return (
    <section id="curadoria-da-semana" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start lg:gap-x-12 xl:gap-x-16">
          <aside className="relative mb-10 text-center lg:sticky lg:top-24 lg:mb-0 lg:self-start lg:pr-8 lg:text-left xl:pr-10">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-0 top-6 bottom-6 hidden w-px bg-accent/35 lg:block xl:-right-2"
            />

            <FadeIn>
              <p className="section-eyebrow">Menu em movimento</p>
              <h2 className="section-title">Curadoria da Semana</h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground-muted lg:mx-0 lg:max-w-sm lg:text-base">
                Três escolhas da cozinha e do bar, capturadas em vídeo — uma vitrine
                semanal do que há de mais refinado no Café com Letras.
              </p>
            </FadeIn>

            <CuradoriaControlPanel
              activeIndex={activeIndex}
              onSelect={goToIndex}
              onPrev={goPrev}
              onNext={goNext}
              reduceMotion={reduceMotion}
              className="mx-auto max-w-md lg:mx-0"
            />

            <p className="section-eyebrow mt-8 hidden !text-[10px] !tracking-[0.14em] text-foreground-muted/60 lg:block">
              Atualizado semanalmente
            </p>
          </aside>

          <div ref={triptychRef} className="min-w-0">
            <CuradoriaMobileTriptych
              reduceMotion={reduceMotion}
              sectionInView={sectionInView}
              activeIndex={activeIndex}
              onActiveIndexChange={goToIndex}
            />
            <CuradoriaDesktopTriptych
              reduceMotion={reduceMotion}
              sectionInView={sectionInView}
              activeIndex={activeIndex}
              onActiveIndexChange={goToIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
