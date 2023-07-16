import { Response, Request } from "express";
import { createLikeService } from "../service/likes/createLike.service";
export const createLikeController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const recipeId: number = parseInt(req.params.id);
  const userId: number = parseInt(req.user.id);
  const liked: string = await createLikeService(recipeId, userId);
  return res.status(201).json({ message: liked });
};
