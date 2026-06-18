/** Telefone oficial do Café com Letras, unificado em todos os canais. */
export const CONTACT_PHONE_DISPLAY = "(31) 99842-4285";
export const CONTACT_PHONE_TEL = "+5531998424285";

/** Número usado nos links wa.me (apenas dígitos, com DDI). */
export const WHATSAPP_NUMBER = "5531998424285";

export const INSTAGRAM_URL = "https://www.instagram.com/cafe_com_letras/";

export const SPOTIFY_URL =
  "https://open.spotify.com/user/31yy7b5iokv7lutg23wlofk4rdku";

/** Monta um link wa.me com mensagem opcional pré-preenchida. */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
