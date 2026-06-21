import { CLOUDINARY_CLOUD_NAME, type PosterFormat } from "@/lib/curadoria-semanal";

/**
 * public_id no Cloudinary — vídeo cinematográfico do hero.
 * (Não há asset "cafe modal" na conta; este é o reel de ambiente disponível.)
 */
export const HERO_CLOUDINARY_VIDEO_ID = "Filme_Mágico_2_dfuvcx";

type HeroQuality = "good" | "best";

export type HeroVideoDelivery = {
  width: number;
  quality: HeroQuality;
  posterWidth: number;
};

function encodeCloudinaryPublicId(publicId: string) {
  return publicId.split("/").map(encodeURIComponent).join("/");
}

function cloudinaryVideoBase(publicId: string, transforms: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${transforms}/${encodeCloudinaryPublicId(publicId)}`;
}

/** Largura/qualidade conforme viewport — evita 1280px upscaled em telas grandes/retina. */
export function getHeroVideoDelivery(
  viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1280,
  devicePixelRatio = typeof window !== "undefined" ? window.devicePixelRatio : 1,
): HeroVideoDelivery {
  const effectiveWidth = Math.round(viewportWidth * devicePixelRatio);

  if (effectiveWidth >= 2560 || viewportWidth >= 1536) {
    return { width: 2560, quality: "best", posterWidth: 1920 };
  }

  if (effectiveWidth >= 1680 || viewportWidth >= 1024) {
    return { width: 1920, quality: "best", posterWidth: 1440 };
  }

  return { width: 1280, quality: "good", posterWidth: 960 };
}

function videoTransform(width: number, quality: HeroQuality, format: "mp4" | "webm") {
  const base = `q_auto:${quality},w_${width},c_limit`;
  if (format === "webm") {
    return `${base},f_webm,vc_vp9`;
  }
  return `${base},f_mp4`;
}

export function heroVideoMp4(
  publicId = HERO_CLOUDINARY_VIDEO_ID,
  delivery: HeroVideoDelivery = getHeroVideoDelivery(),
) {
  return cloudinaryVideoBase(publicId, videoTransform(delivery.width, delivery.quality, "mp4"));
}

export function heroVideoWebm(
  publicId = HERO_CLOUDINARY_VIDEO_ID,
  delivery: HeroVideoDelivery = getHeroVideoDelivery(),
) {
  return cloudinaryVideoBase(publicId, videoTransform(delivery.width, delivery.quality, "webm"));
}

export function heroVideoPoster(
  publicId = HERO_CLOUDINARY_VIDEO_ID,
  format: PosterFormat = "jpg",
  posterWidth = getHeroVideoDelivery().posterWidth,
) {
  const fmt =
    format === "auto"
      ? "f_auto"
      : format === "jpg"
        ? "f_jpg"
        : `f_${format}`;
  return cloudinaryVideoBase(
    publicId,
    `q_auto:best,${fmt},w_${posterWidth},c_limit,so_0`,
  );
}

/** MP4 primeiro (Safari/iOS); WebM como alternativa leve. */
export function heroVideoSources(
  publicId = HERO_CLOUDINARY_VIDEO_ID,
  delivery: HeroVideoDelivery = getHeroVideoDelivery(),
) {
  return [
    { src: heroVideoMp4(publicId, delivery), type: "video/mp4" },
    { src: heroVideoWebm(publicId, delivery), type: "video/webm" },
  ] as const;
}
