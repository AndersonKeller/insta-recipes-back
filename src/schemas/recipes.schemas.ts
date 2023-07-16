import { z } from "zod";
import { returnUserSchema } from "./user.schemas";
import { DeepPartial } from "typeorm";

const types = ["kg", "ml", "unid"] as const;

const ingredientToRecipe = z
  .object({
    id: z.number().optional(),
    quantity: z.number().int(),
    quantityType: z.enum(types),
    ingredient: z.object({
      id: z.number().optional(),
      name: z.string(),
    }),
  })
  .array();
export const updateIngredientsToRecipeSchema = z
  .object({
    quantity: z.number().int().optional(),
    quantityType: z.enum(types).optional(),
    ingredient: z.object({
      id: z.number().optional(),
      name: z.string().optional(),
    }),
  })
  .array();

export const createRecipeSchema = z.object({
  name: z.string().max(52, "Name of recipe must be 52 characters"),
  description: z.string().optional().nullable(),
  preparationMode: z.string(),
  minutes: z.number(),
  rendimentPortions: z.number(),
  ingredients: ingredientToRecipe,
});

export const returnRecipeSchema = createRecipeSchema
  .extend({
    id: z.number(),
    user: returnUserSchema,
    recipesIngredients: ingredientToRecipe.optional(),
    rating: z.number().optional(),
  })
  .omit({ ingredients: true });

export const updateRecipeSchema = createRecipeSchema
  .deepPartial()
  .omit({ ingredients: true });
export const returnAllRecipesSchema = returnRecipeSchema.array();
export type CreateRecipe = z.infer<typeof createRecipeSchema>;
export type iRecipe = z.infer<typeof returnRecipeSchema>;
export type iRecipes = z.infer<typeof returnAllRecipesSchema>;
export type UpdateRecipe = DeepPartial<CreateRecipe>;
export type UpdateIngredientsToRecipe = z.infer<
  typeof updateIngredientsToRecipeSchema
>;
