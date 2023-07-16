import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  createRecipeSchema,
  updateIngredientsToRecipeSchema,
  updateRecipeSchema,
} from "../schemas/recipes.schemas";
import {
  createRecipeController,
  getAllRecipesController,
  removeRecipeController,
  updateIngredientsController,
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
recipesRoutes.patch(
  "/:id/ingredients",
  ensureDataIsValidMiddleware(updateIngredientsToRecipeSchema),
  ensureTokenvalidMiddleware,
  ensureIsOwnerMiddleware,
  updateIngredientsController
);
recipesRoutes.delete(
  "/:id",
  ensureTokenvalidMiddleware,
  ensureIsOwnerMiddleware,
  removeRecipeController
);
