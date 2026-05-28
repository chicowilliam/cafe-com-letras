import { useEffect, useId, useState } from "react";
import { Check, CreditCard, Smartphone, Wallet, X } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <button
        type="button"
        aria-label="Fechar checkout"
        className="absolute inset-0"
        onClick={close}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-2xl"
      >
        <div className="mb-5 rounded-lg border border-yellow-500 bg-yellow-500/20 p-3 text-center text-sm font-medium text-yellow-200">
          ⚠️ Ambiente de Demonstração: Este é um protótipo fictício. Nenhum método de
          pagamento real está ativo ou será processado.
        </div>

        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
              Noite dos Dates
            </p>
            <h2 id={titleId} className="font-serif text-xl text-foreground">
              Finalizar experiência
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-full p-1 text-foreground-muted transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {confirmed ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check size={22} />
            </div>
            <p className="font-serif text-lg text-foreground">Pedido simulado!</p>
            <p className="mt-2 text-sm text-foreground-muted">
              {activePackage?.title} ·{" "}
              {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-foreground-muted">
              Este fluxo é apenas demonstrativo. Nenhuma cobrança foi realizada.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 w-full rounded-full bg-accent py-2.5 text-sm font-medium text-[#12110f] transition-opacity hover:opacity-90"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-wider text-foreground-muted">
                Selecione o pacote
              </p>
              <div className="space-y-2">
                {DATE_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                        isSelected
                          ? "border-accent/60 bg-accent/10"
                          : "border-white/10 bg-black/20 hover:border-white/20"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{pkg.title}</p>
                        <p className="text-xs text-foreground-muted">{pkg.badge}</p>
                      </div>
                      <span className="font-serif text-sm text-accent">{pkg.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-wider text-foreground-muted">
                Método de pagamento
              </p>
              <div className="grid grid-cols-3 gap-2">
                <PaymentButton
                  label="PIX"
                  icon={<Smartphone size={18} />}
                  active={paymentMethod === "pix"}
                  onClick={() => setPaymentMethod("pix")}
                />
                <PaymentButton
                  label="Cartão"
                  icon={<CreditCard size={18} />}
                  active={paymentMethod === "credit"}
                  onClick={() => setPaymentMethod("credit")}
                />
                <PaymentButton
                  label="Apple Pay"
                  icon={<Wallet size={18} />}
                  active={paymentMethod === "apple"}
                  onClick={() => setPaymentMethod("apple")}
                />
              </div>
            </div>

            {activePackage && (
              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">Total</span>
                  <span className="font-serif text-lg text-accent">
                    {activePackage.price}
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={!canConfirm}
              onClick={handleConfirm}
              className="w-full rounded-full bg-accent py-3 text-sm font-medium text-[#12110f] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirmar pagamento
            </button>
          </div>
        )}
      </div>
    </div>
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
      className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors ${
        active
          ? "border-accent/60 bg-accent/10 text-accent"
          : "border-white/10 bg-black/20 text-foreground-muted hover:border-white/20 hover:text-foreground"
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium leading-tight">{label}</span>
    </button>
  );
}
