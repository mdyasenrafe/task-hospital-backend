import { z } from "zod";

export const hospitalCreateSchema = z.object({
  name: z.string().min(1, { message: "Hospital name is required" }),
  address: z.string().optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .optional(),
  services: z
    .array(z.string().min(1, { message: "Service cannot be empty" }))
    .min(1, { message: "At least one service must be provided" }),
});

export const hospitalUpdateSchema = z.object({
  name: z.string().min(1, { message: "Hospital name is required" }).optional(),
  address: z.string().optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .optional(),
  services: z
    .array(z.string().min(1, { message: "Service cannot be empty" }))
    .optional(),
});

export const HospitalValidations = {
  hospitalCreateSchema,
  hospitalUpdateSchema,
};
