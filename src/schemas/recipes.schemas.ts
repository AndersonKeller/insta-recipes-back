import { z } from "zod";
import { returnUserSchema } from "./user.schemas";
import { DeepPartial } from "typeorm";

export const createRecipeSchema = z.object({
  name: z.string().max(52, "Name of recipe must be 52 characters"),
  description: z.string().optional().nullable(),
});
export const returnRecipeSchema = createRecipeSchema.extend({
  id: z.number(),
  user: returnUserSchema,
});
export const updateRecipeSchema = createRecipeSchema.deepPartial();
export const returnAllRecipesSchema = returnRecipeSchema.array();
export type CreateRecipe = z.infer<typeof createRecipeSchema>;
export type iRecipe = z.infer<typeof returnRecipeSchema>;
export type iRecipes = z.infer<typeof returnAllRecipesSchema>;
export type UpdateRecipe = DeepPartial<CreateRecipe>;
