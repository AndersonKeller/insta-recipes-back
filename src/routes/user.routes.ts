import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { createUserSchema } from "../schemas/user.schemas";
import { ensureEmailExistsMiddleware } from "../middlewares/ensureEmailExists.middleware";
import { createUserController } from "../controllers/user.controllers";

export const userRoutes: Router = Router();
userRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  ensureEmailExistsMiddleware,
  createUserController
);
