import { Response, Request } from "express";
import { createCommentService } from "../service/comments/createComment.service";
import { iComment, iComments } from "../schemas/comments.schemas";
import { getCommentsByRecipeService } from "../service/comments/getCommentsByRecipe.service";
import { removeCommentService } from "../service/comments/removeComment.service";
export const createCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const recipeId: number = parseInt(req.params.id);
  const commentData = req.body;
  const userId: number = parseInt(req.user.id);
  const comment: iComment = await createCommentService(
    recipeId,
    commentData,
    userId
  );
  return res.status(201).json(comment);
};
export const getCommentsByRecipeController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const recipeId: number = parseInt(req.params.id);
  const comments: iComments = await getCommentsByRecipeService(recipeId);
  return res.status(200).json(comments);
};
export const removeCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const commentId: number = parseInt(req.params.id);
  const userId: number = parseInt(req.user.id);
  await removeCommentService(commentId, userId);
  return res.status(204).send();
};
