import { MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#12110f] px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="font-serif text-xl text-[#f5f0e6]">Café com Letras</p>
          <p className="mt-2 text-sm text-foreground-muted">
            Desde 1996 · Cultura, gastronomia e boa conversa
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-foreground-muted">
          <span className="inline-flex items-center gap-2">
            <MapPin size={15} className="text-accent" />
            Rua Antônio de Albuquerque, Savassi — BH
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone size={15} className="text-accent" />
            (31) 3214-8900
          </span>
        </div>
      </div>
    </footer>
  );
}
