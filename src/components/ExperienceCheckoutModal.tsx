import { useEffect, useId, useState } from "react";
import { Check, CreditCard, Heart, Smartphone, Wallet, X } from "lucide-react";
import { useExperienceCheckout } from "@/hooks/useExperienceCheckout";
import {
  DATE_PACKAGES,
  PAYMENT_METHODS,
  getPackageById,
  type PaymentMethodId,
} from "@/lib/date-experience";

export function ExperienceCheckoutModal() {
  const titleId = useId();
  const { isOpen, selectedPackage, close, setSelectedPackage } =
    useExperienceCheckout();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId | null>(null);
  const [confirmed, setConfirmed] = useState(false);

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

  useEffect(() => {
    if (!isOpen) {
      setPaymentMethod(null);
      setConfirmed(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const activePackage = selectedPackage ? getPackageById(selectedPackage) : null;
  const canConfirm = activePackage && paymentMethod;

  const handleConfirm = () => {
    if (!canConfirm) return;
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        aria-label="Fechar checkout"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(560px,90dvh)] w-full max-w-sm flex-col overflow-hidden rounded-xl border border-hairline bg-surface-elevated shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-4 py-3">
          <div>
            <p className="section-eyebrow mb-0.5 flex items-center gap-1.5">
              <Heart size={12} />
              Noite dos Dates
            </p>
            <h2 id={titleId} className="font-display text-base text-foreground">
              Finalizar experiência
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

        {confirmed ? (
          <div className="overflow-y-auto px-4 py-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check size={18} />
            </div>
            <p className="font-display text-base text-foreground">Pedido simulado!</p>
            <p className="mt-1 text-xs text-foreground-muted">
              {activePackage?.title} ·{" "}
              {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
            </p>
            <p className="mt-3 text-[11px] leading-relaxed text-foreground-muted">
              Fluxo demonstrativo — nenhuma cobrança foi realizada.
            </p>
            <button
              type="button"
              onClick={close}
              className="focus-ring mt-5 w-full rounded-full border border-accent/40 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-3">
            <div className="mb-3 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-center text-[11px] font-medium leading-relaxed text-yellow-200/90">
              ⚠️ Ambiente de Demonstração: protótipo fictício. Nenhum pagamento real
              será processado.
            </div>

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

              <SectionLabel>Método de pagamento</SectionLabel>
              <div className="grid grid-cols-3 gap-2">
                <PaymentButton
                  label="PIX"
                  icon={<Smartphone size={16} />}
                  active={paymentMethod === "pix"}
                  onClick={() => setPaymentMethod("pix")}
                />
                <PaymentButton
                  label="Cartão"
                  icon={<CreditCard size={16} />}
                  active={paymentMethod === "credit"}
                  onClick={() => setPaymentMethod("credit")}
                />
                <PaymentButton
                  label="Apple Pay"
                  icon={<Wallet size={16} />}
                  active={paymentMethod === "apple"}
                  onClick={() => setPaymentMethod("apple")}
                />
              </div>

              {activePackage && (
                <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground-muted">Total</span>
                    <span className="font-display text-sm text-accent">
                      {activePackage.price}
                    </span>
                  </div>
                  <p className="mt-0.5 text-right text-[11px] text-foreground-muted">
                    {activePackage.priceNote}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 shrink-0 space-y-2 border-t border-white/5 pt-3">
              <p className="text-[11px] text-foreground-muted/80">
                Demonstrativo — pagamento não processado.
              </p>
              <button
                type="button"
                disabled={!canConfirm}
                onClick={handleConfirm}
                className="focus-ring w-full rounded-full bg-accent py-2 text-xs font-medium text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirmar pagamento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium text-foreground-muted">
      {children}
    </p>
  );
}

function PaymentButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring flex flex-col items-center gap-1 rounded-md border px-1.5 py-2.5 text-center transition-colors ${
        active
          ? "border-accent/50 bg-accent/10 text-accent"
          : "border-white/10 bg-black/20 text-foreground-muted hover:border-white/20 hover:text-foreground"
      }`}
    >
      {icon}
      <span className="text-[11px] font-medium leading-tight">{label}</span>
    </button>
  );
}
