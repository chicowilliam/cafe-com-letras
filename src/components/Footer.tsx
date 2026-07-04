import type { CSSProperties } from "react";
import { track } from "@vercel/analytics/react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { SpotifyIcon } from "@/components/SpotifyIcon";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  INSTAGRAM_BRAND,
  SPOTIFY_BRAND,
  WHATSAPP_BRAND,
} from "@/lib/brand-icons";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  INSTAGRAM_URL,
  SPOTIFY_URL,
  buildWhatsAppUrl,
} from "@/lib/contact";

/**
 * Aberto todos os dias a partir das 12h. Fecha 22h (dom–qui) ou 23h (sex–sáb).
 * Calculado no carregamento.
 */
function isOpenNow(now = new Date()): boolean {
  const day = now.getDay();
  const hour = now.getHours();
  const isWeekend = day === 5 || day === 6;
  const closingHour = isWeekend ? 23 : 22;
  return hour >= 12 && hour < closingHour;
}

export function Footer() {
  const open = isOpenNow();

  return (
    <footer className="section-canvas section-padding !pb-[max(var(--section-space),env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row md:gap-8">
        <div>
          <p className="font-display text-lg text-foreground">Café com Letras</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            Desde 1996 · Cultura, gastronomia e boa conversa
          </p>

          <div className="mt-4 flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Café com Letras"
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-foreground-muted transition-colors hover:border-[color-mix(in_srgb,var(--brand)_35%,transparent)] hover:text-[var(--brand)]"
              style={
                {
                  "--brand": INSTAGRAM_BRAND,
                } as CSSProperties
              }
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar no WhatsApp"
              onClick={() => track("whatsapp_clicado", { origem: "footer" })}
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-foreground-muted transition-colors hover:border-[color-mix(in_srgb,var(--brand)_35%,transparent)] hover:text-[var(--brand)]"
              style={
                {
                  "--brand": WHATSAPP_BRAND,
                } as CSSProperties
              }
            >
              <WhatsAppIcon size={16} />
            </a>
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify do Café com Letras"
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-foreground-muted transition-colors hover:border-[color-mix(in_srgb,var(--brand)_35%,transparent)] hover:text-[var(--brand)]"
              style={
                {
                  "--brand": SPOTIFY_BRAND,
                } as CSSProperties
              }
            >
              <SpotifyIcon size={16} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-foreground-muted">
          <span className="inline-flex items-center gap-2.5">
            <MapPin size={15} className="text-accent" aria-hidden />
            Rua Antônio de Albuquerque, 781 · Savassi — BH
          </span>
          <span className="inline-flex items-center gap-2.5">
            <Phone size={15} className="text-accent" aria-hidden />
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="focus-ring rounded-sm transition-colors hover:text-accent"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
          </span>
          <a
            href="mailto:contato@cafecomletras.com.br"
            className="inline-flex items-center gap-2.5 text-sm text-foreground-muted transition-colors duration-200 hover:text-accent"
          >
            <Mail size={15} className="text-accent" aria-hidden />
            contato@cafecomletras.com.br
          </a>
        </div>

        <div className="flex flex-col gap-3 text-sm text-foreground-muted">
          <span className="inline-flex items-start gap-2.5">
            <Clock size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
            <span className="flex flex-col gap-0.5">
              <span>Aberto todos os dias</span>
              <span className="text-xs text-foreground-muted/80">
                Dom–Qui · 12h às 22h
              </span>
              <span className="text-xs text-foreground-muted/80">
                Sex–Sáb · 12h às 23h
              </span>
            </span>
          </span>
          <span
            className="inline-flex items-center gap-2 text-xs font-medium"
            aria-live="polite"
          >
            <span
              aria-hidden
              className={`h-2 w-2 rounded-full ${
                open ? "bg-accent-2" : "bg-foreground-muted/50"
              }`}
            />
            <span className={open ? "text-accent-2" : "text-foreground-muted"}>
              {open ? "Aberto agora" : "Fechado agora"}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
