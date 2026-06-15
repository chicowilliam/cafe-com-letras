/** Telefone oficial do Café com Letras, unificado em todos os canais. */
export const CONTACT_PHONE_DISPLAY = "(31) 3214-8900";
export const CONTACT_PHONE_TEL = "+553132148900";

/** Número usado nos links wa.me (apenas dígitos, com DDI). */
export const WHATSAPP_NUMBER = "553132148900";

export const INSTAGRAM_URL = "https://www.instagram.com/cafe_com_letras/";

/** Monta um link wa.me com mensagem opcional pré-preenchida. */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
