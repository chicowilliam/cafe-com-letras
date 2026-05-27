import { Armchair, Trees } from "lucide-react";
import { type Control, Controller, type FieldError } from "react-hook-form";
import type { ReservationFormValues } from "@/lib/reservation-schema";

const AREAS = [
  {
    value: "interna" as const,
    label: "Interna",
    icon: Armchair,
  },
  {
    value: "externa" as const,
    label: "Externa",
    icon: Trees,
  },
];

type ReservationAreaFieldProps = {
  control: Control<ReservationFormValues>;
  error?: FieldError;
};

export function ReservationAreaField({ control, error }: ReservationAreaFieldProps) {
  return (
    <fieldset>
      <legend className="mb-1 block text-[10px] uppercase tracking-wider text-foreground-muted">
        Área
      </legend>

      <Controller
        name="area"
        control={control}
        render={({ field }) => (
          <div className="relative grid grid-cols-2 gap-1.5 rounded-lg border border-white/10 bg-black/20 p-1">
            <div
              aria-hidden
              className={`area-slide absolute inset-y-1 left-1 w-[calc(50%-0.375rem)] rounded-md bg-accent/20 ring-1 ring-accent/35${
                field.value === "externa" ? " area-slide--externa" : ""
              }`}
            />

            {AREAS.map(({ value, label, icon: Icon }) => {
              const selected = field.value === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => field.onChange(value)}
                  className={`relative z-10 flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-center transition-colors duration-300 ${
                    selected ? "text-foreground" : "text-foreground-muted hover:text-foreground/80"
                  }`}
                  aria-pressed={selected}
                >
                  <Icon
                    size={14}
                    strokeWidth={1.5}
                    className={`shrink-0 transition-transform duration-300 ${
                      selected ? "area-icon-pop text-accent" : ""
                    }`}
                  />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              );
            })}
          </div>
        )}
      />

      {error && (
        <p className="mt-1 text-[11px] text-red-400" role="alert">
          {error.message}
        </p>
      )}
    </fieldset>
  );
}
