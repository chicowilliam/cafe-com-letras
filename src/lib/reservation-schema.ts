import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(8, "Informe um telefone válido"),
  date: z.string().min(1, "Selecione uma data"),
  time: z.string().min(1, "Selecione um horário"),
  guests: z.string().min(1, "Selecione o número de pessoas"),
  area: z.enum(["interna", "externa"], {
    message: "Selecione a área",
  }),
  notes: z.string().optional(),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

export const RESERVATION_DEFAULTS: ReservationFormValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "19:00",
  guests: "2",
  area: "interna",
  notes: "",
};

export const AREA_LABELS: Record<ReservationFormValues["area"], string> = {
  interna: "Área interna",
  externa: "Área externa",
};
