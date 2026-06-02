export const CLOUDINARY_CLOUD_NAME = "dmqa0cxay";

export function cloudinaryVideoUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_mp4/${publicId}`;
}
/** Poster leve (primeiro frame) enquanto o video nao carrega ou esta fora da viewport. */
export function cloudinaryVideoPoster(publicId: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto,w_720,c_limit,so_0/${publicId}.jpg`;
}