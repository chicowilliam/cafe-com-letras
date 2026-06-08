/**
 * Audita tamanho em rede dos reels da Curadoria (HEAD request).
 * Uso: node scripts/audit-cloudinary-videos.mjs
 */
const CLOUD = "dmqa0cxay";

const REELS = [
  { name: "Carpaccio", id: "CARPACCIO_rvqql0" },
  { name: "Fettuccine al Limone", id: "FETTUCCINE_AL_LIMONE_oazvzg" },
  { name: "Drink Aperol", id: "DRINK_APEROL_ifpbbi" },
];

const VARIANTS = [
  {
    label: "original mp4 (f_mp4)",
    path: (id) => `f_mp4/${id}`,
  },
  {
    label: "delivery mp4 720w (q_auto:good)",
    path: (id) => `q_auto:good,w_720,c_limit,f_mp4/${id}`,
  },
  {
    label: "delivery webm 720w (vp9)",
    path: (id) => `q_auto:good,w_720,c_limit,f_webm,vc_vp9/${id}`,
  },
  {
    label: "poster 480w (f_auto)",
    path: (id) => `q_auto,f_auto,w_480,c_limit,so_0/${id}.jpg`,
  },
];

function url(path) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${path}`;
}

async function headSize(label, href) {
  try {
    const res = await fetch(href, { method: "HEAD" });
    const bytes = Number(res.headers.get("content-length") ?? 0);
    const kb = bytes > 0 ? Math.round(bytes / 1024) : "?";
    console.log(`  ${label}: ${kb} KB (${res.status})`);
    return bytes;
  } catch (err) {
    console.log(`  ${label}: error — ${err.message}`);
    return 0;
  }
}

console.log("Cloudinary reel audit — cafe-com-letras\n");

for (const reel of REELS) {
  console.log(`▸ ${reel.name} (${reel.id})`);
  let original = 0;
  let optimized = 0;
  for (const variant of VARIANTS) {
    const href = url(variant.path(reel.id));
    const size = await headSize(variant.label, href);
    if (variant.label.startsWith("original")) original = size;
    if (variant.label.startsWith("delivery mp4")) optimized = size;
  }
  if (original > 0 && optimized > 0) {
    const saved = Math.round((1 - optimized / original) * 100);
    console.log(`  → mp4 delivery saves ~${saved}% vs original\n`);
  } else {
    console.log("");
  }
}

console.log(
  "Recomendação: manter originais no Cloudinary; servir w_720 + q_auto:good no site.",
);
console.log(
  "Specs alvo: 720×1280 max, H.264 ~2–4 Mbps ou WebM VP9, sem faixa de áudio.",
);
