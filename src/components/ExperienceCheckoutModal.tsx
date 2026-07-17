import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics/react";
import { Heart, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import { buildWhatsAppUrl } from "@/lib/contact";
import { DATE_PACKAGES, getPackageById } from "@/lib/date-experience";
import "@/styles/noite-dos-dates-theme.css";

export function ExperienceCheckoutModal() {
  const titleId = useId();
  const { isOpen, selectedPackage, checkoutTheme, close, setSelectedPackage } =
    useExperienceCheckout();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [prevOpen, setPrevOpen] = useState(isOpen);

  useFocusTrap(dialogRef, isOpen);

  // Limpa os campos ao fechar (ajuste de estado em render, não em efeito).
  if (prevOpen !== isOpen) {
    setPrevOpen(isOpen);
    if (!isOpen) {
      setName("");
      setEmail("");
      setPhone("");
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const activePackage = selectedPackage ? getPackageById(selectedPackage) : null;
  const canSubmit = Boolean(activePackage && name.trim() && phone.trim());

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || !activePackage) return;

    track("noite_dates_solicitada", { pacote: activePackage.id });

    const message = [
      "Olá! Tenho interesse na experiência Noite dos Dates do Café com Letras:",
      `• Pacote: ${activePackage.title} (${activePackage.price})`,
      `• Nome: ${name.trim()}`,
      `• Telefone: ${phone.trim()}`,
      email.trim() ? `• E-mail: ${email.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      data-page-theme={checkoutTheme === "dates" ? "noite-dos-dates" : undefined}
    >
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/70"
        onClick={close}
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(560px,90dvh)] w-full max-w-sm flex-col overflow-hidden rounded-xl border border-hairline bg-surface-elevated shadow-contact-strong outline-none"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-4 py-3">
          <div>
            <p className="section-eyebrow mb-0.5 flex items-center gap-1.5">
              <Heart size={12} />
              Noite dos Dates
            </p>
            <h2 id={titleId} className="font-display text-base text-foreground">
              Solicitar experiência
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="focus-ring rounded-full p-1 text-foreground-muted transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-3"
          noValidate
        >
          <div className="space-y-2.5">
            <SectionLabel>Pacote</SectionLabel>
            <div className="space-y-2">
              {DATE_PACKAGES.map((pkg) => {
                const isSelected = selectedPackage === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackage(pkg.id)}
                    aria-pressed={isSelected}
                    className={`focus-ring flex w-full items-center gap-2.5 rounded-md border p-2 text-left transition-colors ${
                      isSelected
                        ? "border-accent/50 bg-accent/10"
                        : "border-white/10 bg-black/20 hover:border-white/20"
                    }`}
                  >
                    <img
                      src={pkg.image}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-foreground">
                        {pkg.title}
                      </p>
                      <p className="text-[11px] text-foreground-muted">{pkg.badge}</p>
                    </div>
                    <span className="shrink-0 font-display text-xs text-accent">
                      {pkg.price}
                    </span>
                  </button>
                );
              })}
            </div>

            <SectionLabel>Seus dados</SectionLabel>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
              placeholder="Nome"
              autoComplete="name"
              required
            />
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              type="tel"
              className={inputClass}
              placeholder="Telefone / WhatsApp"
              autoComplete="tel"
              required
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className={inputClass}
              placeholder="E-mail (opcional)"
              autoComplete="email"
            />
          </div>

          <div className="mt-3 shrink-0 space-y-2 border-t border-white/5 pt-3">
            <p className="text-[11px] text-foreground-muted/80">
              Ao solicitar, abrimos o WhatsApp com seus dados para combinar os detalhes.
            </p>
            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-accent-solid focus-ring flex w-full items-center justify-center gap-2 rounded-full py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              <WhatsAppIcon size={15} />
              Solicitar pelo WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium text-foreground-muted">{children}</p>
  );
}

const inputClass =
  "focus-ring w-full rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-foreground outline-none transition-colors placeholder:text-foreground-muted/50 focus:border-accent/50";
