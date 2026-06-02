export const CLOUDINARY_CLOUD_NAME = "dmqa0cxay";

export function cloudinaryVideoUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_mp4/${publicId}`;
}