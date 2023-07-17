import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comments, CommentsRecipes } from "../../entities";
import {
  CreateComment,
  iComment,
  returnCommentSchema,
} from "../../schemas/comments.schemas";

export const updateCommentService = async (
  commentId: number,
  commentData: CreateComment
): Promise<iComment> => {
  const commentsRepository: Repository<Comments> =
    AppDataSource.getRepository(Comments);
  const commentRecipeRepository: Repository<CommentsRecipes> =
    AppDataSource.getRepository(CommentsRecipes);

  const findComment: Comments | null = await commentsRepository.findOne({
    where: {
      id: commentId,
    },
    relations: {
      user: true,
    },
  });
  const updateComment = commentsRepository.create({
    comment: commentData.comment,
    id: findComment?.id!,
    user: findComment?.user!,
  });
  await commentsRepository.save(updateComment);
  const findRecipe: CommentsRecipes | null =
    await commentRecipeRepository.findOne({
      where: {
        comments: {
          id: updateComment.id,
        },
      },
      relations: {
        recipe: {
          recipesIngredients: {
            ingredient: true,
          },
        },
      },
    });
  const toReturn = {
    ...updateComment,
    recipe: findRecipe?.recipe!,
  };
  const comment: iComment = returnCommentSchema.parse(toReturn);
  return comment;
};
