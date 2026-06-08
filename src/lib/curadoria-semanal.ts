export const CLOUDINARY_CLOUD_NAME = "dmqa0cxay";

/** Largura máxima de exibição do reels ativo (~315px) — entrega Cloudinary dimensionada. */
const REEL_DELIVERY_WIDTH = 720;

function cloudinaryVideoBase(publicId: string, transforms: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${transforms}/${publicId}`;
}

/** MP4 dimensionado — qualidade perceptual mantida no frame ~9:16 do site. */
export function cloudinaryVideoMp4(publicId: string) {
  return cloudinaryVideoBase(
    publicId,
    `q_auto:good,w_${REEL_DELIVERY_WIDTH},c_limit,f_mp4`,
  );
}

/** WebM alternativo (menor em rede quando suportado). */
export function cloudinaryVideoWebm(publicId: string) {
  return cloudinaryVideoBase(
    publicId,
    `q_auto:good,w_${REEL_DELIVERY_WIDTH},c_limit,f_webm,vc_vp9`,
  );
}

/** @deprecated Use cloudinaryVideoMp4 — alias para compatibilidade. */
export function cloudinaryVideoUrl(publicId: string) {
  return cloudinaryVideoMp4(publicId);
}

export function cloudinaryVideoSources(publicId: string) {
  return [
    { src: cloudinaryVideoWebm(publicId), type: "video/webm" },
    { src: cloudinaryVideoMp4(publicId), type: "video/mp4" },
  ] as const;
}

/** Poster leve (primeiro frame) enquanto o vídeo não carrega ou está fora da viewport. */
export function cloudinaryVideoPoster(publicId: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto,w_720,c_limit,so_0/${publicId}.jpg`;
}

export type CaptionPosition = "bottom" | "top";

export type PratoDaSemana = {
  id: number;
  nome: string;
  tag: string;
  descricao: string;
  /** Posição do card de legenda sobre o reels (default: bottom). */
  captionPosition?: CaptionPosition;
  /** public_id no Cloudinary (ex.: CARPACCIO_rvqql0) */
  cloudinaryPublicId: string;
};

/**
 * Atualize semanalmente: escolha 3 vídeos da sua conta Cloudinary.
 * public_ids disponíveis nas pastas: carnes e peixes, Crepes e Sanduiches,
 * Drinks, Grelhados, Massas e risotos, Para compartilhar, sobremesas, Veganos.
 */
export const PRATOS_DA_SEMANA: PratoDaSemana[] = [
  {
    id: 1,
    nome: "Carpaccio",
    tag: "Destaque da Semana",
    descricao:
      "Lâminas finas de carne, parmesão e azeite trufado — entrada clássica da casa, servida com elegância.",
    cloudinaryPublicId: "CARPACCIO_rvqql0",
  },
  {
    id: 2,
    nome: "Fettuccine al Limone",
    tag: "Massas & Risotos",
    descricao:
      "Massa fresca ao limone siciliano, manteiga de ervas e toque cítrico — leve, vibrante e memorável.",
    cloudinaryPublicId: "FETTUCCINE_AL_LIMONE_oazvzg",
  },
  {
    id: 3,
    nome: "Drink Aperol",
    tag: "Bar da Casa",
    descricao:
      "Coquetel de verão com Aperol, prosecco e laranja — refrescante, dourado e perfeito para a Savassi.",
    cloudinaryPublicId: "DRINK_APEROL_ifpbbi",
  },
];
