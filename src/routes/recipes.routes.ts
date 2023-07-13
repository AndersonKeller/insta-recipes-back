import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { createRecipeSchema } from "../schemas/recipes.schemas";
import { createRecipeController } from "../controllers/recipes.controllers";
import { ensureTokenvalidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";

export const recipesRoutes: Router = Router();

recipesRoutes.post(
  "",
  ensureTokenvalidMiddleware,
  ensureDataIsValidMiddleware(createRecipeSchema),
  createRecipeController
);
