import { Repository } from "typeorm";
import {
  iComments,
  returnAllCommentsSchema,
} from "../../schemas/comments.schemas";
import { CommentsRecipes } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getCommentsByRecipeService = async (
  recipeId: number
): Promise<iComments> => {
  const commentsRecipeRepository: Repository<CommentsRecipes> =
    AppDataSource.getRepository(CommentsRecipes);

  const comments = await commentsRecipeRepository.find({
    where: {
      recipe: {
        id: recipeId,
      },
    },
    relations: {
      comments: { user: true },
    },
  });
  const allComments = comments.map((comment) => {
    const commentReturn = {
      id: comment.id,
      comment: comment.comments.comment,
      user: {
        name: comment.comments.user.name,
        email: comment.comments.user.email,
      },
    };
    return commentReturn;
  });
  const res = returnAllCommentsSchema.parse(allComments);
  return res;
};
