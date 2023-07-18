import { Response, Request } from "express";
import { createCategoriesService } from "../service/categories/createCategories.servcie";
import { iCategories } from "../schemas/categories.schemas";
export const createCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoriesData = req.body;
  const categories: iCategories = await createCategoriesService(categoriesData);
  return res.status(201).json(categories);
};
