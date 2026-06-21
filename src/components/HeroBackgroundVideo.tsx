import { memo, useEffect, useRef, useState } from "react";
import { HERO_IMAGE } from "@/lib/hero-image";
import {
  HERO_CLOUDINARY_VIDEO_ID,
  getHeroVideoDelivery,
  heroVideoPoster,
  heroVideoSources,
  type HeroVideoDelivery,
} from "@/lib/hero-video";
import { loadVideoSources } from "@/lib/video-utils";

const videoClassName =
  "hero-bg-video absolute inset-0 h-full w-full scale-[1.06] object-cover object-[50%_62%] md:scale-100 md:object-center";

export const HeroBackgroundVideo = memo(function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [delivery] = useState<HeroVideoDelivery>(() => getHeroVideoDelivery());
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [useFallbackImage, setUseFallbackImage] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || useFallbackImage) return;
    const video = videoRef.current;
    if (!video) return;

    const sources = heroVideoSources(HERO_CLOUDINARY_VIDEO_ID, delivery).map(
      ({ src, type }) => ({ src, type }),
    );

    const cleanupSources = loadVideoSources(video, sources);

    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      cleanupSources();
    };
  }, [delivery, reduceMotion, useFallbackImage]);

  if (useFallbackImage || reduceMotion) {
    return (
      <img
        src={HERO_IMAGE}
        alt="Livraria Contraponto — Café com Letras"
        className={videoClassName}
        fetchPriority="high"
        decoding="async"
      />
    );
  }

  const posterAvif = heroVideoPoster(HERO_CLOUDINARY_VIDEO_ID, "avif", delivery.posterWidth);
  const posterWebp = heroVideoPoster(HERO_CLOUDINARY_VIDEO_ID, "webp", delivery.posterWidth);
  const posterJpg = heroVideoPoster(HERO_CLOUDINARY_VIDEO_ID, "jpg", delivery.posterWidth);

  return (
    <>
      <picture className="absolute inset-0 block">
        <source type="image/avif" srcSet={posterAvif} />
        <source type="image/webp" srcSet={posterWebp} />
        <img
          src={posterJpg}
          alt=""
          aria-hidden
          decoding="async"
          fetchPriority="high"
          className={`${videoClassName} transition-opacity duration-700 motion-reduce:transition-none ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />
      </picture>

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        aria-hidden
        poster={posterJpg}
        onPlaying={() => setVideoReady(true)}
        onError={() => setUseFallbackImage(true)}
        className={`${videoClassName} transition-opacity duration-700 motion-reduce:transition-none ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
});
