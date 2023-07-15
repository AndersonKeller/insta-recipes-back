import { z } from "zod";
import { returnUserSchema } from "./user.schemas";
import { DeepPartial } from "typeorm";
import { createRatingSchema, returnRatingSchema } from "./rating.schemas";

const types = ["kg", "ml", "unid"] as const;

const ingredientToRecipe = z
  .object({
    id: z.number().optional(),
    quantity: z.number(),
    quantityType: z.enum(types),
    ingredient: z.object({
      id: z.number().optional(),
      name: z.string(),
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
    rating: z.number().default(0),
  })
  .omit({ ingredients: true });

export const updateRecipeSchema = createRecipeSchema.deepPartial();
export const returnAllRecipesSchema = returnRecipeSchema.array();
export type CreateRecipe = z.infer<typeof createRecipeSchema>;
export type iRecipe = z.infer<typeof returnRecipeSchema>;
export type iRecipes = z.infer<typeof returnAllRecipesSchema>;
export type UpdateRecipe = DeepPartial<CreateRecipe>;

// {
// 	"name": "ovo frito2",
// 	"description": null,
// 	"preparationMode": "bata tudo",
// 	"minutes": 30,
// 	"rendimentPortions": 2,
// 	"recipesIngredients": [
// 		{
// 			"name": "ovo",
// 			"quantity": 1,
// 			"quantityType": "unid"
// 		},
// 		{
// 			"name": "óleo",
// 			"quantity": 1,
// 			"quantityType": "unid"
// 		}
// 	],
// 	"id": 60,
// 	"user": {
// 		"name": "anderson",
// 		"email": "anderson@email.com",
// 		"admin": false,
// 		"id": 1,
// 		"createdAt": "2023-07-13",
// 		"updatedAt": "2023-07-13",
// 		"deletedAt": null
// 	}
// }

// "recipesIngredients": [
//   {
//     "id": 17,
//     "quantity": 1,
//     "quantityType": "unid",
//     "ingredient": {
//       "id": 1,
//       "name": "ovo"
//     }
//   },
// ]
//{
// 			"name": "ovo",
// 			"quantity": 1,
// 			"quantityType": "unid"
// 		},
