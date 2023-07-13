import { Response, Request } from "express";
import { iRecipe } from "../schemas/recipes.schemas";
import { createRecipeService } from "../service/recipes/createRecipe.service";
export const createRecipeController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const recipeData = req.body;
  const userId: number = parseInt(req.user.id);
  const recipe: iRecipe = await createRecipeService(recipeData, userId);
  return res.status(201).json(recipe);
};
