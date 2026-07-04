import presentImage from "@/assets/images/livraria/grs-0209.jpg";
import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

export type AboutHistoryPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

const ARCHIVE_PUBLIC_ID = "historia_1_y1xsvq";
const ARCHIVE_SECONDARY_IDS = ["historia_2_ovbb9t", "historia_3_lootxd"] as const;
const PRESENT_SECONDARY_ID = "127-DSC05881_ivdxce";

function buildCloudinaryPhoto(
  publicId: string,
  {
    alt,
    caption,
    width,
    height,
    deliveryWidth = 640,
    deliveryHeight = 480,
  }: {
    alt: string;
    caption: string;
    width: number;
    height: number;
    deliveryWidth?: number;
    deliveryHeight?: number;
  },
): AboutHistoryPhoto {
  return {
    src: cloudinaryImageUrl(publicId, {
      width: deliveryWidth,
      height: deliveryHeight,
      crop: "fill",
      quality: "auto:good",
    }),
    alt,
    caption,
    width,
    height,
  };
}

/** Arquivo — foto histórica do Cloudinary (manifesto galeria). */
export const ABOUT_HISTORY_ARCHIVE: AboutHistoryPhoto = buildCloudinaryPhoto(
  ARCHIVE_PUBLIC_ID,
  {
    alt: "Arquivo histórico do Café com Letras",
    caption: "Arquivo histórico da casa",
    width: 775,
    height: 590,
    deliveryWidth: 960,
    deliveryHeight: 720,
  },
);

/** Presente — ambiente atual da livraria na Savassi. */
export const ABOUT_HISTORY_PRESENT: AboutHistoryPhoto = {
  src: presentImage,
  alt: "Interior do Café com Letras — mesas, estantes e ambiente acolhedor",
  caption: "Savassi hoje",
  width: 4,
  height: 3,
};

/** Par secundário abaixo do diptych — preenche a coluna visual. */
export const ABOUT_HISTORY_SECONDARY: readonly AboutHistoryPhoto[] = [
  buildCloudinaryPhoto(ARCHIVE_SECONDARY_IDS[0], {
    alt: "Arquivo histórico do Café com Letras",
    caption: "Arquivo histórico da casa",
    width: 772,
    height: 825,
    deliveryWidth: 560,
    deliveryHeight: 420,
  }),
  buildCloudinaryPhoto(PRESENT_SECONDARY_ID, {
    alt: "Café com Letras — ambiente na Savassi",
    caption: "Savassi hoje",
    width: 3999,
    height: 6000,
    deliveryWidth: 560,
    deliveryHeight: 420,
  }),
];

export const ABOUT_HISTORY_PHOTOS = [
  ABOUT_HISTORY_ARCHIVE,
  ABOUT_HISTORY_PRESENT,
  ...ABOUT_HISTORY_SECONDARY,
] as const;
