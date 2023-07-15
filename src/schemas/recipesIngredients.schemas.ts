import { z } from "zod";
import { returnIngredientSchema } from "./ingredient.schemas";
import { returnRecipeSchema } from "./recipes.schemas";

export const createRecipeIngredientSchema = z.object({
  quantity: z.number(),
  quantityType: z.string(),
  ingredient: returnIngredientSchema.pick({ id: true }),
  recipe: returnRecipeSchema.pick({ id: true }),
});
export const returnRecipeIngredientSchema = createRecipeIngredientSchema.extend(
  { id: z.number() }
);
export type CreateRecipeIngredient = z.infer<
  typeof createRecipeIngredientSchema
>;
export type iRecipeIngredient = z.infer<typeof returnRecipeIngredientSchema>;
