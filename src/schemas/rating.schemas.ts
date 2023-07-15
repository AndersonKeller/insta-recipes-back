import { z } from "zod";
import { returnRecipeSchema } from "./recipes.schemas";

export const createRatingSchema = z.object({
  rating: z.number().default(0),
  recipe: returnRecipeSchema.pick({ id: true }),
});
export const returnRatingSchema = createRatingSchema.extend({
  id: z.number(),
});
export type CreateRating = z.infer<typeof createRatingSchema>;
export type iRating = z.infer<typeof returnRatingSchema>;
