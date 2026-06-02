import { memo, useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import {
  cloudinaryVideoPoster,
  cloudinaryVideoUrl,
  PRATOS_DA_SEMANA,
} from "@/lib/curadoria-semanal";

// Only decode videos when cards enter the viewport.
 = 0.35;
const OBSERVER_ROOT_MARGIN = "120px 0px";

type CuradoriaVideoProps = {
  src: string;
  poster: string;
  label: string;
};

const CuradoriaVideo = memo(function CuradoriaVideo({
  src,
  poster,
  label,
}: CuradoriaVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearViewport(entry.isIntersecting);
        setIsPlaying(
          entry.isIntersecting &&
            entry.intersectionRatio >= VISIBILITY_THRESHOLD,
        );
      },
      {
        rootMargin: OBSERVER_ROOT_MARGIN,
        threshold: [0, VISIBILITY_THRESHOLD, 0.6],
      },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !nearViewport || reduceMotion) return;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying, nearViewport, reduceMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-surface">
      <img
        src={poster}
        alt=""
        aria-hidden
        decoding="async"
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isPlaying && nearViewport && !reduceMotion ? "opacity-0" : "opacity-100"
        }`}
      />

      {nearViewport && !reduceMotion && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          disablePictureInPicture
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          aria-label={`Vídeo do prato ${label}`}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
});

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

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRATOS_DA_SEMANA.map((prato, index) => (
            <FadeIn
              key={prato.id}
              delay={0.08 + index * 0.06}
              className="w-full max-w-[280px] sm:max-w-[260px] lg:max-w-[240px]"
            >
              <article className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-hairline bg-surface transition-all duration-500 hover:scale-[1.015] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:scale-100">
                <CuradoriaVideo
                  src={cloudinaryVideoUrl(prato.cloudinaryPublicId)}
                  poster={cloudinaryVideoPoster(prato.cloudinaryPublicId)}
                  label={prato.nome}
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
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
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
