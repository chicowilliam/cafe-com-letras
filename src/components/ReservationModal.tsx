import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { CalendarDays, Check, X } from "lucide-react";
import { useReservation } from "@/hooks/useReservation";

type FormState = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "19:00",
  guests: "2",
  notes: "",
};

const TIME_SLOTS = ["12:00", "13:00", "19:00", "20:00", "21:00"] as const;

function generateConfirmationCode() {
  return `CCL-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function ReservationModal() {
  const titleId = useId();
  const { isOpen, close } = useReservation();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

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
      setForm(INITIAL_FORM);
      setConfirmationCode(null);
      setSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setConfirmationCode(generateConfirmationCode());
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fechar reserva"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-white/5 px-6 py-5">
          <div>
            <p className="mb-1 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
              <CalendarDays size={14} />
              Reservas
            </p>
            <h2 id={titleId} className="font-serif text-xl text-foreground">
              Agendar experiência
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-full p-1.5 text-foreground-muted transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {confirmationCode ? (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check size={22} />
            </div>
            <p className="font-serif text-lg text-foreground">Reserva confirmada!</p>
            <p className="mt-2 text-sm text-foreground-muted">
              Seu código fictício de confirmação:
            </p>
            <p className="mt-3 font-mono text-lg tracking-wider text-accent">
              {confirmationCode}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-foreground-muted">
              Este é um fluxo demonstrativo. Nenhuma reserva real foi registrada.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-8 w-full rounded-full border border-accent/40 py-2.5 text-sm text-accent transition-colors hover:bg-accent/10"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
            <Field label="Nome completo">
              <input
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={inputClass}
                placeholder="Seu nome"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="E-mail">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClass}
                  placeholder="voce@email.com"
                />
              </Field>
              <Field label="Telefone">
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={inputClass}
                  placeholder="(31) 99999-9999"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Data" className="sm:col-span-1">
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Horário">
                <select
                  required
                  value={form.time}
                  onChange={(e) => updateField("time", e.target.value)}
                  className={inputClass}
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Pessoas">
                <select
                  required
                  value={form.guests}
                  onChange={(e) => updateField("guests", e.target.value)}
                  className={inputClass}
                >
                  {Array.from({ length: 8 }, (_, index) => index + 1).map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? "pessoa" : "pessoas"}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Observações (opcional)">
              <textarea
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                rows={2}
                className={`${inputClass} resize-none`}
                placeholder="Aniversário, mesa na varanda..."
              />
            </Field>

            <p className="text-[11px] leading-relaxed text-foreground-muted">
              Sistema demonstrativo — os dados não são enviados a nenhum servidor.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-accent py-2.5 text-sm font-medium text-[#12110f] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Confirmando..." : "Confirmar reserva"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-muted/50 focus:border-accent/50";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[11px] uppercase tracking-wider text-foreground-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
