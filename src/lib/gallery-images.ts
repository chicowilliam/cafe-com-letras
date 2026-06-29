import manifestData from "@/data/gallery-manifest.json";
import {
  cloudinaryImageFitUrl,
} from "@/lib/cloudinary-image";
import { MARQUEE_IMAGES as FALLBACK_MARQUEE_IMAGES } from "@/lib/marquee-images";

export type GalleryFolder = "antigas" | "novas";

export type GalleryManifestEntry = {
  publicId: string;
  folder: GalleryFolder;
  width: number | null;
  height: number | null;
  alt: string | null;
};

type GalleryManifest = {
  syncedAt: string | null;
  cloudName: string;
  images: Array<{
    publicId: string;
    folder: string;
    width: number | null;
    height: number | null;
    alt: string | null;
  }>;
};

const manifest = manifestData as GalleryManifest;

export type MarqueeImage = {
  src: string;
  viewerSrc: string;
  alt: string;
  folder?: GalleryFolder;
  width: number;
  height: number;
};

const MARQUEE_MAX_WIDTH = 560;
const MARQUEE_MAX_HEIGHT = 440;
const VIEWER_MAX_WIDTH = 1400;
const VIEWER_MAX_HEIGHT = 960;
const FALLBACK_ASPECT = 4 / 3;

const ALT_BY_FOLDER: Record<GalleryFolder, string> = {
  antigas: "Café com Letras — arquivo histórico",
  novas: "Café com Letras — Savassi hoje",
};

function isGalleryFolder(value: string): value is GalleryFolder {
  return value === "antigas" || value === "novas";
}

function resolveDimensions(entry: GalleryManifestEntry) {
  const width = entry.width && entry.width > 0 ? entry.width : Math.round(4 * 300);
  const height = entry.height && entry.height > 0 ? entry.height : Math.round(3 * 300);
  return { width, height };
}

function buildAlt(entry: GalleryManifestEntry, index: number) {
  if (entry.alt?.trim()) return entry.alt.trim();
  return `${ALT_BY_FOLDER[entry.folder]} (${index + 1})`;
}

function toMarqueeImage(entry: GalleryManifestEntry, index: number): MarqueeImage {
  const { width, height } = resolveDimensions(entry);

  return {
    src: cloudinaryImageFitUrl(
      entry.publicId,
      MARQUEE_MAX_WIDTH,
      MARQUEE_MAX_HEIGHT,
    ),
    viewerSrc: cloudinaryImageFitUrl(
      entry.publicId,
      VIEWER_MAX_WIDTH,
      VIEWER_MAX_HEIGHT,
      "auto:best",
    ),
    alt: buildAlt(entry, index),
    folder: entry.folder,
    width,
    height,
  };
}

function interleaveByFolder(
  antigas: GalleryManifestEntry[],
  novas: GalleryManifestEntry[],
): GalleryManifestEntry[] {
  const merged: GalleryManifestEntry[] = [];
  const max = Math.max(antigas.length, novas.length);

  for (let i = 0; i < max; i += 1) {
    if (i < antigas.length) merged.push(antigas[i]);
    if (i < novas.length) merged.push(novas[i]);
  }

  return merged;
}

function parseManifestEntries(): GalleryManifestEntry[] {
  return (manifest.images ?? []).filter(
    (entry): entry is GalleryManifestEntry =>
      Boolean(entry?.publicId) && isGalleryFolder(entry.folder),
  );
}

function buildCloudinaryMarquee(): MarqueeImage[] {
  const entries = parseManifestEntries();
  if (entries.length === 0) return [];

  const antigas = entries.filter((entry) => entry.folder === "antigas");
  const novas = entries.filter((entry) => entry.folder === "novas");
  const ordered = interleaveByFolder(antigas, novas);

  return ordered.map((entry, index) => toMarqueeImage(entry, index));
}

/** Imagens do carrossel — Cloudinary intercalado ou fallback local. */
export const GALLERY_MARQUEE_IMAGES: MarqueeImage[] = (() => {
  const fromCloud = buildCloudinaryMarquee();
  if (fromCloud.length > 0) return fromCloud;

  return FALLBACK_MARQUEE_IMAGES.map((image) => ({
    ...image,
    viewerSrc: image.src,
    width: 4,
    height: 3,
  }));
})();

export const GALLERY_USES_CLOUDINARY = parseManifestEntries().length > 0;

export function galleryImageAspectRatio(image: MarqueeImage) {
  if (image.width > 0 && image.height > 0) {
    return image.width / image.height;
  }
  return FALLBACK_ASPECT;
}
