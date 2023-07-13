import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().max(45, "Name max length is 45 characters"),
  email: z.string().email("Email wrong format"),
  admin: z.boolean().default(false),
  password: z.string().max(120),
});
export const returnUserSchema = createUserSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });
export type CreateUser = z.infer<typeof createUserSchema>;
export type iUser = z.infer<typeof returnUserSchema>;
