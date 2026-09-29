import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().trim().min(1, "Event name is required."),
  date: z.string().min(1, "Date is required."),
  doors: z.string().min(1, "Doors time is required."),
  venue: z.string().trim().min(1, "Venue is required."),
  description: z
    .string()
    .trim()
    .max(2000, "Keep the description under 2000 characters.")
    .optional(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
