import { z } from "zod";

export const createCategoriesSchema = z.object({
  name: z.string().max(52, "Name must be max 52 characters"),
});
export const returnCategoriesSchema = createCategoriesSchema.extend({
  id: z.number(),
});
export type CreateCategories = z.infer<typeof createCategoriesSchema>;
export type iCategories = z.infer<typeof returnCategoriesSchema>;
