import { z } from "zod";

export const createIngredientSchema = z.object({
  name: z.string().max(52),
});
export const returnIngredientSchema = createIngredientSchema.extend({
  id: z.number(),
});
export type CreateIngredient = z.infer<typeof createIngredientSchema>;
export type iIngredient = z.infer<typeof returnIngredientSchema>;
