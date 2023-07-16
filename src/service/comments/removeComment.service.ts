import { Repository } from "typeorm";
import { Comments, CommentsRecipes } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

export const removeCommentService = async (
  commentId: number,
  userId: number
) => {
  const commentRepository: Repository<Comments> =
    AppDataSource.getRepository(Comments);
  const commentRecipeRepository: Repository<CommentsRecipes> =
    AppDataSource.getRepository(CommentsRecipes);

  const findComment: Comments | null = await commentRepository.findOne({
    where: {
      id: commentId,
      user: {
        id: userId,
      },
    },
  });
  if (!findComment) {
    throw new AppError("Comment whit id not found or you not owner", 404);
  }
  const findCommentRecipe: CommentsRecipes | null =
    await commentRecipeRepository.findOne({
      where: {
        comments: {
          id: findComment.id,
        },
      },
    });
  await commentRecipeRepository.remove(findCommentRecipe!);
  await commentRepository.remove(findComment);
};
