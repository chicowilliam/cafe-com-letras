import { MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="section-padding border-t border-hairline bg-background !pb-[max(var(--section-space),env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div>
          <p className="font-display text-lg text-foreground">Café com Letras</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            Desde 1996 · Cultura, gastronomia e boa conversa
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-foreground-muted">
          <span className="inline-flex items-center gap-2.5">
            <MapPin size={15} className="text-accent" />
            Rua Antônio de Albuquerque, Savassi — BH
          </span>
          <span className="inline-flex items-center gap-2.5">
            <Phone size={15} className="text-accent" />
            (31) 3214-8900
          </span>
        </div>
      </div>
    </footer>
  );
}
