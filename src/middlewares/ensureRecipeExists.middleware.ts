import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { Recipe } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const ensureRecipeExistsMiddleware= async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const findRecipe: Recipe | null = await recipeRepository.findOne({
    where: {
      id: parseInt(req.params.id),
    },
    
  });
  if (!findRecipe) {
    throw new AppError("recipe whit id not found", 404);
  }
  return next();
};
