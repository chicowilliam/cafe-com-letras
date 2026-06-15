import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { track } from "@vercel/analytics/react";
import { CalendarDays, X } from "lucide-react";
import { ReservationAreaField } from "@/components/ReservationAreaField";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useReservation } from "@/hooks/useReservation";
import { buildWhatsAppUrl } from "@/lib/contact";
import {
  AREA_LABELS,
  RESERVATION_DEFAULTS,
  reservationSchema,
  type ReservationFormValues,
} from "@/lib/reservation-schema";

const TIME_SLOTS = ["12:00", "13:00", "19:00", "20:00", "21:00"] as const;

function buildReservationMessage(data: ReservationFormValues): string {
  const lines = [
    "Olá! Gostaria de fazer uma reserva no Café com Letras:",
    `• Nome: ${data.name}`,
    `• Data: ${data.date}`,
    `• Horário: ${data.time}`,
    `• Pessoas: ${data.guests}`,
    `• Área: ${AREA_LABELS[data.area]}`,
    `• Telefone: ${data.phone}`,
    `• E-mail: ${data.email}`,
  ];
  if (data.notes?.trim()) lines.push(`• Observações: ${data.notes.trim()}`);
  return lines.join("\n");
}

export function ReservationModal() {
  const titleId = useId();
  const { isOpen, close } = useReservation();
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, isOpen);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: RESERVATION_DEFAULTS,
  });

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
    if (!isOpen) reset(RESERVATION_DEFAULTS);
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: ReservationFormValues) => {
    track("reserva_enviada", { area: data.area, guests: data.guests });
    window.open(
      buildWhatsAppUrl(buildReservationMessage(data)),
      "_blank",
      "noopener,noreferrer",
    );
    close();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        aria-label="Fechar reserva"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(560px,90dvh)] w-full max-w-sm flex-col overflow-hidden rounded-xl border border-hairline bg-surface-elevated shadow-2xl outline-none"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-4 py-3">
          <div>
            <p className="section-eyebrow mb-0.5 flex items-center gap-1.5">
              <CalendarDays size={12} />
              Reservas
            </p>
            <h2 id={titleId} className="font-display text-base text-foreground">
              Agendar experiência
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
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-3"
          noValidate
        >
            <div className="space-y-2.5">
              <ReservationAreaField control={control} error={errors.area} />

              <Field label="Nome" error={errors.name?.message}>
                <input
                  {...register("name")}
                  className={inputClass}
                  placeholder="Seu nome"
                  autoComplete="name"
                />
              </Field>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Field label="E-mail" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    className={inputClass}
                    placeholder="email@..."
                    autoComplete="email"
                  />
                </Field>
                <Field label="Telefone" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    type="tel"
                    className={inputClass}
                    placeholder="(31) 99999..."
                    autoComplete="tel"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Field label="Data" error={errors.date?.message}>
                  <input {...register("date")} type="date" className={inputClass} />
                </Field>
                <Field label="Horário" error={errors.time?.message}>
                  <select {...register("time")} className={inputClass}>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Pessoas" error={errors.guests?.message}>
                  <select {...register("guests")} className={inputClass}>
                    {Array.from({ length: 8 }, (_, index) => index + 1).map((n) => (
                      <option key={n} value={String(n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Observações">
                <input
                  {...register("notes")}
                  className={inputClass}
                  placeholder="Opcional"
                />
              </Field>
            </div>

          <div className="mt-3 shrink-0 space-y-2 border-t border-white/5 pt-3">
            <p className="text-[11px] text-foreground-muted/80">
              Ao confirmar, abrimos o WhatsApp com seus dados para finalizar a reserva.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-accent-solid focus-ring flex w-full items-center justify-center gap-2 rounded-full py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-60"
            >
              <WhatsAppIcon size={15} />
              Enviar pelo WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "focus-ring w-full rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-foreground outline-none transition-colors placeholder:text-foreground-muted/50 focus:border-accent/50";

function Field({
  label,
  children,
  error,
  className = "",
}: {
  label: string;
  children: ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-0.5 block text-[11px] font-medium text-foreground-muted">
        {label}
      </span>
      {children}
      {error && (
        <p className="mt-0.5 text-[11px] text-red-400" role="alert">
          {error}
        </p>
      )}
    </label>
  );
}
