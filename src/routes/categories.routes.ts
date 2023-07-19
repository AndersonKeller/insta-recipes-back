import { Router } from "express";
import {
  createCategoriesController,
  getAllCategoriesController,
  getRecipesByCategorieController,
} from "../controllers/categories.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { createCategoriesSchema } from "../schemas/categories.schemas";

export const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureDataIsValidMiddleware(createCategoriesSchema),
  createCategoriesController
);
categoriesRoutes.get("", getAllCategoriesController);
categoriesRoutes.get("/:name", getRecipesByCategorieController);
