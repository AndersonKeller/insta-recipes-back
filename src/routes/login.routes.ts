import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { createLoginSchema } from "../schemas/login.schemas";
import { createLoginController } from "../controllers/login.controllers";
export const loginRoutes: Router = Router();
loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(createLoginSchema),
  createLoginController
);
