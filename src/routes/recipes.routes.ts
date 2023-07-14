import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  createRecipeSchema,
  updateRecipeSchema,
} from "../schemas/recipes.schemas";
import {
  createRecipeController,
  getAllRecipesController,
  removeRecipeController,
  updateRecipeController,
} from "../controllers/recipes.controllers";
import { ensureTokenvalidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsOwnerMiddleware } from "../middlewares/ensureIsOwner.middleware";

export const recipesRoutes: Router = Router();

recipesRoutes.post(
  "",
  ensureTokenvalidMiddleware,
  ensureDataIsValidMiddleware(createRecipeSchema),
  createRecipeController
);
recipesRoutes.get("", getAllRecipesController);
recipesRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateRecipeSchema),
  ensureTokenvalidMiddleware,
  ensureIsOwnerMiddleware,
  updateRecipeController
);
recipesRoutes.delete(
  "/:id",
  ensureTokenvalidMiddleware,
  ensureIsOwnerMiddleware,
  removeRecipeController
);
