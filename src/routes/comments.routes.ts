import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { createCommentSchema } from "../schemas/comments.schemas";
import {
  createCommentController,
  getCommentsByRecipeController,
  removeCommentController,
  updateCommentController,
} from "../controllers/comments.controller";
import { ensureTokenvalidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureRecipeExistsMiddleware } from "../middlewares/ensureRecipeExists.middleware";
import { ensureCommentExistsMiddleware } from "../middlewares/ensureCommentExists.middleware";

export const commentsRoutes: Router = Router();

commentsRoutes.post(
  "/:id",
  ensureDataIsValidMiddleware(createCommentSchema),
  ensureRecipeExistsMiddleware,
  ensureTokenvalidMiddleware,
  createCommentController
);
commentsRoutes.get(
  "/:id",
  ensureRecipeExistsMiddleware,
  getCommentsByRecipeController
);
commentsRoutes.delete(
  "/:id",
  ensureTokenvalidMiddleware,
  ensureCommentExistsMiddleware,
  removeCommentController
);
commentsRoutes.patch(
  "/:id",
  ensureTokenvalidMiddleware,
  ensureCommentExistsMiddleware,
  ensureDataIsValidMiddleware(createCommentSchema),
  updateCommentController
);
