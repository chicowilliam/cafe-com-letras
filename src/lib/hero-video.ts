import { CLOUDINARY_CLOUD_NAME, type PosterFormat } from "@/lib/curadoria-semanal";

/** public_id no Cloudinary — vídeo de fundo do hero. */
export const HERO_CLOUDINARY_VIDEO_ID = "cafe modal";

/** Full-bleed hero (~1280px) — q_auto:good como os reels da Curadoria. */
const HERO_DELIVERY_WIDTH = 1280;
const HERO_POSTER_WIDTH = 960;

function encodeCloudinaryPublicId(publicId: string) {
  return publicId.split("/").map(encodeURIComponent).join("/");
}

function cloudinaryVideoBase(publicId: string, transforms: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${transforms}/${encodeCloudinaryPublicId(publicId)}`;
}

export function heroVideoMp4(publicId = HERO_CLOUDINARY_VIDEO_ID) {
  return cloudinaryVideoBase(
    publicId,
    `q_auto:good,w_${HERO_DELIVERY_WIDTH},c_limit,f_mp4`,
  );
}

export function heroVideoWebm(publicId = HERO_CLOUDINARY_VIDEO_ID) {
  return cloudinaryVideoBase(
    publicId,
    `q_auto:good,w_${HERO_DELIVERY_WIDTH},c_limit,f_webm,vc_vp9`,
  );
}

export function heroVideoPoster(
  publicId = HERO_CLOUDINARY_VIDEO_ID,
  format: PosterFormat = "jpg",
) {
  const fmt =
    format === "auto"
      ? "f_auto"
      : format === "jpg"
        ? "f_jpg"
        : `f_${format}`;
  return cloudinaryVideoBase(
    publicId,
    `q_auto,${fmt},w_${HERO_POSTER_WIDTH},c_limit,so_0`,
  );
}
