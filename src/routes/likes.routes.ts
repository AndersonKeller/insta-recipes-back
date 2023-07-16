import { Router } from "express";
import { ensureTokenvalidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureRecipeExistsMiddleware } from "../middlewares/ensureRecipeExists.middleware";
import { createLikeController } from "../controllers/likes.controller";

export const likesRoutes: Router = Router();

likesRoutes.post(
  "/:id",
  ensureTokenvalidMiddleware,
  ensureRecipeExistsMiddleware,
  createLikeController
);
