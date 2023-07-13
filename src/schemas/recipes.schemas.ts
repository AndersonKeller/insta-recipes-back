import { z } from "zod";
import { returnUserSchema } from "./user.schemas";

export const createRecipeSchema = z.object({
  name: z.string().max(52, "Name of recipe must be 52 characters"),
  description: z.string().optional().nullable(),
});
export const returnRecipeSchema = createRecipeSchema.extend({
  id: z.number(),
  user: returnUserSchema,
});
export type CreateRecipe = z.infer<typeof createRecipeSchema>;
export type iRecipe = z.infer<typeof returnRecipeSchema>;
