import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { Recipe } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const ensureIsOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const findRecipe: Recipe | null = await recipeRepository.findOne({
    where: {
      user: {
        id: parseInt(req.user.id),
      },
      id: parseInt(req.params.id),
    },
    relations: {
      user: true,
    },
  });
  if (!findRecipe) {
    throw new AppError("recipe not found or your not owner", 404);
  }
  return next();
};
