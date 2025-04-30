import { z } from "zod";

const bookingSchema = z.object({
  user: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid user ID format" }),
  hospital: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid hospital ID format" }),
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
