import { CLOUDINARY_CLOUD_NAME } from "@/lib/curadoria-semanal";

export type CloudinaryImageCrop = "fill" | "limit";

export type CloudinaryImageOptions = {
  width?: number;
  height?: number;
  crop?: CloudinaryImageCrop;
  quality?: "auto" | "auto:good" | "auto:best" | "auto:low";
  progressive?: boolean;
};

function encodeCloudinaryPublicId(publicId: string) {
  return publicId.split("/").map(encodeURIComponent).join("/");
}

/** URL de entrega otimizada para imagens estáticas (galeria, etc.). */
export function cloudinaryImageUrl(
  publicId: string,
  {
    width = 448,
    height,
    crop = "fill",
    quality = "auto:good",
    progressive = true,
  }: CloudinaryImageOptions = {},
) {
  const transforms = [
    `q_${quality}`,
    "f_auto",
    progressive ? "fl_progressive" : null,
    `w_${width}`,
    height ? `h_${height}` : null,
    crop === "fill" ? `c_fill,g_auto` : "c_limit",
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${encodeCloudinaryPublicId(publicId)}`;
}

/** URL com desfoque server-side (evita filter: blur em runtime). */
export function cloudinaryImageBlurUrl(
  publicId: string,
  width = 640,
  height = 400,
  quality: CloudinaryImageOptions["quality"] = "auto:low",
) {
  const transforms = [
    `q_${quality}`,
    "f_auto",
    `w_${width}`,
    `h_${height}`,
    "c_fill,g_auto",
    "e_blur:1200",
  ].join(",");

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${encodeCloudinaryPublicId(publicId)}`;
}

/** Encaixa a imagem inteira dentro de uma caixa máxima, sem recorte. */
export function cloudinaryImageFitUrl(
  publicId: string,
  maxWidth: number,
  maxHeight: number,
  quality: CloudinaryImageOptions["quality"] = "auto:good",
) {
  return cloudinaryImageUrl(publicId, {
    width: maxWidth,
    height: maxHeight,
    crop: "limit",
    quality,
  });
}
