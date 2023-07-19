import { z } from "zod";
const categories = [
  "bolos",
  "carnes",
  "aves",
  "peixes e frutos do mar",
  "saladas",
  "molhos",
  "sopas",
  "massas",
  "bebidas",
  "sobremesas",
  "lanches",
  "alimentação saudável",
] as const;
export const createCategoriesSchema = z.object({
  name: z.enum(categories),
});
export const returnCategoriesSchema = createCategoriesSchema.extend({
  id: z.number(),
});
export const returnAllCategoriesSchema = returnCategoriesSchema.array();
export type CreateCategories = z.infer<typeof createCategoriesSchema>;
export type iCategories = z.infer<typeof returnCategoriesSchema>;
