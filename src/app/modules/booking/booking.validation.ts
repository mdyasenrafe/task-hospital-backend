import { z } from "zod";

const bookingSchema = z.object({
  hospital: z.string().min(1, { message: "hospital is required" }),
  service: z.string().min(1, { message: "Service is required" }),
  appointmentDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Appointment date must be in the future",
  }),
  status: z
    .enum(["pending", "confirmed", "cancelled"])
    .optional()
    .default("pending"),
});

export const BookingValidations = {
  bookingSchema,
};
