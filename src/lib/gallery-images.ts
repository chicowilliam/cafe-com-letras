import manifestData from "@/data/gallery-manifest.json";
import {
  cloudinaryImageFitUrl,
  cloudinaryImageUrl,
} from "@/lib/cloudinary-image";
import { MARQUEE_IMAGES as FALLBACK_MARQUEE_IMAGES } from "@/lib/marquee-images";

export type GalleryFolder = "antigas" | "novas";

export type GalleryManifestEntry = {
  publicId: string;
  folder: GalleryFolder;
  width: number | null;
  height: number | null;
  alt: string | null;
  caption?: string | null;
  year?: number | null;
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
    caption?: string | null;
    year?: number | null;
  }>;
};

const manifest = manifestData as GalleryManifest;

export type MarqueeImage = {
  src: string;
  featuredSrc: string;
  previewSrc: string;
  viewerSrc: string;
  alt: string;
  folder?: GalleryFolder;
  /** Rótulo curto no marquee / fallback no lightbox. */
  eraLabel?: string;
  /** Legenda editorial — prioridade sobre eraLabel na UI. */
  caption?: string;
  year?: number;
  width: number;
  height: number;
};

const MARQUEE_WIDTH = 480;
const MARQUEE_HEIGHT = 320;
const MARQUEE_FEATURED_WIDTH = 672;
const MARQUEE_FEATURED_HEIGHT = 448;
const VIEWER_PREVIEW_WIDTH = 720;
const VIEWER_PREVIEW_HEIGHT = 480;
const VIEWER_MAX_WIDTH = 1200;
const VIEWER_MAX_HEIGHT = 800;
const FALLBACK_ASPECT = 4 / 3;

const ERA_LABEL: Record<GalleryFolder, string> = {
  antigas: "Arquivo",
  novas: "Savassi hoje",
};

const ALT_BY_FOLDER: Record<GalleryFolder, string> = {
  antigas: "Café com Letras — arquivo histórico",
  novas: "Café com Letras — Savassi hoje",
};

const DEV_CAPTION_PLACEHOLDER = "[LEGENDA PENDENTE]";

function isGalleryFolder(value: string): value is GalleryFolder {
  return value === "antigas" || value === "novas";
}

function resolveDimensions(entry: GalleryManifestEntry) {
  const width = entry.width && entry.width > 0 ? entry.width : Math.round(4 * 300);
  const height = entry.height && entry.height > 0 ? entry.height : Math.round(3 * 300);
  return { width, height };
}

function resolveCaption(entry: GalleryManifestEntry): string | undefined {
  const caption = entry.caption?.trim();
  if (caption) return caption;
  if (import.meta.env.DEV && entry.folder === "antigas") return DEV_CAPTION_PLACEHOLDER;
  return undefined;
}

function resolveYear(entry: GalleryManifestEntry): number | undefined {
  if (typeof entry.year === "number" && entry.year > 0) return entry.year;
  return undefined;
}

function buildAlt(entry: GalleryManifestEntry, index: number) {
  if (entry.alt?.trim()) return entry.alt.trim();
  const caption = entry.caption?.trim();
  if (caption) return caption;
  return `${ALT_BY_FOLDER[entry.folder]} (${index + 1})`;
}

function buildMarqueeLabel(
  entry: GalleryManifestEntry,
  caption: string | undefined,
  year: number | undefined,
) {
  if (caption && caption !== DEV_CAPTION_PLACEHOLDER) {
    return year ? `${caption} · ${year}` : caption;
  }
  return ERA_LABEL[entry.folder];
}

/** Texto principal no lightbox — legenda ou pasta. */
export function galleryLightboxCaption(image: MarqueeImage) {
  if (image.caption && image.caption !== DEV_CAPTION_PLACEHOLDER) {
    return image.caption;
  }
  if (import.meta.env.DEV && image.caption === DEV_CAPTION_PLACEHOLDER) {
    return DEV_CAPTION_PLACEHOLDER;
  }
  return image.eraLabel ?? null;
}

/** Meta secundária — ano quando há legenda real. */
export function galleryLightboxYear(image: MarqueeImage) {
  if (!image.year) return null;
  if (image.caption && image.caption !== DEV_CAPTION_PLACEHOLDER) {
    return image.year;
  }
  return null;
}

function toMarqueeImage(entry: GalleryManifestEntry, index: number): MarqueeImage {
  const { width, height } = resolveDimensions(entry);
  const caption = resolveCaption(entry);
  const year = resolveYear(entry);

  return {
    src: cloudinaryImageUrl(entry.publicId, {
      width: MARQUEE_WIDTH,
      height: MARQUEE_HEIGHT,
      crop: "fill",
    }),
    featuredSrc: cloudinaryImageUrl(entry.publicId, {
      width: MARQUEE_FEATURED_WIDTH,
      height: MARQUEE_FEATURED_HEIGHT,
      crop: "fill",
    }),
    previewSrc: cloudinaryImageFitUrl(
      entry.publicId,
      VIEWER_PREVIEW_WIDTH,
      VIEWER_PREVIEW_HEIGHT,
      "auto:good",
    ),
    viewerSrc: cloudinaryImageFitUrl(
      entry.publicId,
      VIEWER_MAX_WIDTH,
      VIEWER_MAX_HEIGHT,
      "auto:good",
    ),
    alt: buildAlt(entry, index),
    folder: entry.folder,
    eraLabel: buildMarqueeLabel(entry, caption, year),
    caption,
    year,
    width,
    height,
  };
}

function interleaveByFolder(
  antigas: GalleryManifestEntry[],
  novas: GalleryManifestEntry[],
): GalleryManifestEntry[] {
  const paired: GalleryManifestEntry[] = [];
  const maxPairs = Math.min(antigas.length, novas.length);

  for (let i = 0; i < maxPairs; i += 1) {
    paired.push(antigas[i], novas[i]);
  }

  const leftoverAntigas = antigas.slice(maxPairs);
  if (leftoverAntigas.length === 0) return paired;

  const result = [...paired];
  const interval = Math.max(2, Math.floor(result.length / (leftoverAntigas.length + 1)));
  let insertAt = interval;

  for (const entry of leftoverAntigas) {
    result.splice(Math.min(insertAt, result.length), 0, entry);
    insertAt += interval + 1;
  }

  return result;
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
    featuredSrc: image.src,
    previewSrc: image.src,
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

export function isFeaturedMarqueeIndex(index: number) {
  return index % 6 === 0;
}

const MARQUEE_CARD_HEIGHT = 220;
const MARQUEE_CARD_HEIGHT_MD = 260;
const MARQUEE_MIN_WIDTH = 160;
const MARQUEE_MAX_WIDTH = 420;
const MARQUEE_FEATURED_SCALE = 1.4;

export function marqueeCardWidth(
  image: MarqueeImage,
  featured: boolean,
  height = MARQUEE_CARD_HEIGHT_MD,
) {
  const ratio = galleryImageAspectRatio(image);
  const baseWidth = Math.round(height * ratio);
  const scaled = featured ? baseWidth * MARQUEE_FEATURED_SCALE : baseWidth;
  return Math.min(MARQUEE_MAX_WIDTH, Math.max(MARQUEE_MIN_WIDTH, scaled));
}

export { MARQUEE_CARD_HEIGHT, MARQUEE_CARD_HEIGHT_MD };
