import { Response, Request } from "express";
import {
  UpdateIngredientsToRecipe,
  iRecipe,
  iRecipes,
} from "../schemas/recipes.schemas";
import { createRecipeService } from "../service/recipes/createRecipe.service";
import { getAllRecipesService } from "../service/recipes/getAllRecipes.service";
import { updateRecipeService } from "../service/recipes/updateRecipe.service";
import { removeRecipeService } from "../service/recipes/removeRecipe.service";
import { uodateIngredientsService } from "../service/recipes/updateIngredients.service";
export const createRecipeController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const recipeData = req.body;
  const userId: number = parseInt(req.user.id);
  const recipe: iRecipe = await createRecipeService(recipeData, userId);
  return res.status(201).json(recipe);
};
export const getAllRecipesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const recipes: iRecipes = await getAllRecipesService();
  return res.status(200).json(recipes);
};
export const updateRecipeController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const recipeData = req.body;
  const recipeId: number = parseInt(req.params.id);
  const recipe: iRecipe = await updateRecipeService(recipeData, recipeId);
  return res.status(200).json(recipe);
};
export const removeRecipeController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const recipeId: number = parseInt(req.params.id);
  await removeRecipeService(recipeId);
  return res.status(200).send();
};
export const updateIngredientsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ingredientsData = req.body;
  const recipeId = parseInt(req.params.id);
  const ingredients: UpdateIngredientsToRecipe = await uodateIngredientsService(
    ingredientsData,
    recipeId
  );
  return res.status(200).json(ingredients);
};
