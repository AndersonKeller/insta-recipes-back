import { z } from "zod";
import { returnUserSchema } from "./user.schemas";
import { returnRecipeSchema } from "./recipes.schemas";

export const createCommentSchema = z.object({
  comment: z.string(),
});

export const returnCommentSchema = createCommentSchema.extend({
  id: z.number(),
  user: returnUserSchema,
  recipe: returnRecipeSchema.omit({ rating: true, user: true }),
});
export const returnAllCommentsSchema = z
  .object({
    id: z.number(),
    comment: z.string(),
    user: returnUserSchema.pick({ name: true, email: true }),
  })
  .array();
export type CreateComment = z.infer<typeof createCommentSchema>;
export type iComment = z.infer<typeof returnCommentSchema>;
export type iComments = z.infer<typeof returnAllCommentsSchema>;
