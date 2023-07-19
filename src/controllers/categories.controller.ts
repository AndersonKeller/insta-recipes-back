import { Response, Request } from "express";
import { createCategoriesService } from "../service/categories/createCategories.servcie";
import { iCategories } from "../schemas/categories.schemas";
import { getAllCategoriesService } from "../service/categories/getAllCategories.service";
import { iRecipes } from "../schemas/recipes.schemas";
import { getRecipesByCategorieService } from "../service/categories/getRecipesByCategorie.service";
export const createCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoriesData = req.body;
  const categories: iCategories = await createCategoriesService(categoriesData);
  return res.status(201).json(categories);
};
export const getAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories: iCategories[] = await getAllCategoriesService();
  return res.status(200).json(categories);
};
export const getRecipesByCategorieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categorieName: string = req.params.name;
  const recipes: iRecipes = await getRecipesByCategorieService(categorieName);
  return res.status(200).json(recipes);
};
