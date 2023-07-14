import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { createUserSchema } from "../schemas/user.schemas";
import { ensureEmailExistsMiddleware } from "../middlewares/ensureEmailExists.middleware";
import {
  createUserController,
  getRecipesByUserController,
  retrieveUserController,
} from "../controllers/user.controllers";
import { ensureTokenvalidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";

export const userRoutes: Router = Router();
userRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  ensureEmailExistsMiddleware,
  createUserController
);
userRoutes.get("/retrieve", ensureTokenvalidMiddleware, retrieveUserController);
userRoutes.get(
  "/recipes",
  ensureTokenvalidMiddleware,
  getRecipesByUserController
);
