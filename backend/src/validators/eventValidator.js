import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(3).max(100),
  location: z.string().max(100).optional(),
  eventDate: z.string().datetime()
});