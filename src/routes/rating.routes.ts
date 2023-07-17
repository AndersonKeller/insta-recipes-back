import { Router } from "express";
import { getRecipesRatingController } from "../controllers/rating.controller";

export const ratingRoutes: Router = Router();

ratingRoutes.get("", getRecipesRatingController);
