import { Response, Request } from "express";
import { createLikeService } from "../service/likes/createLike.service";
import { getLikesByUserService } from "../service/likes/getLikesByUser.service";
import { iRecipes } from "../schemas/recipes.schemas";
export const createLikeController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const recipeId: number = parseInt(req.params.id);
  const userId: number = parseInt(req.user.id);
  const liked: string = await createLikeService(recipeId, userId);
  return res.status(201).json({ message: liked });
};
export const getLikesByUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.user.id);
  const recipes: iRecipes = await getLikesByUserService(userId);
  return res.status(200).json(recipes);
};
