import { z } from "zod";
export const createLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type CreateLogin = z.infer<typeof createLoginSchema>;
