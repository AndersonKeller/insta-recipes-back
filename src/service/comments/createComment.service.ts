import { Repository } from "typeorm";
import {
  CreateComment,
  iComment,
  returnCommentSchema,
} from "../../schemas/comments.schemas";
import { AppDataSource } from "../../data-source";
import { Comments, CommentsRecipes, Recipe, User } from "../../entities";

export const createCommentService = async (
  recipeId: number,
  commentData: CreateComment,
  userId: number
): Promise<any> => {
  const commentsRepository: Repository<Comments> =
    AppDataSource.getRepository(Comments);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const commentRecipeRepository: Repository<CommentsRecipes> =
    AppDataSource.getRepository(CommentsRecipes);
  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const createComment: Comments = commentsRepository.create({
    ...commentData,
    user: findUser!,
  });
  await commentsRepository.save(createComment);
  const findRecipe: Recipe | null = await recipeRepository.findOne({
    where: {
      id: recipeId,
    },
    relations: {
      recipesIngredients: {
        ingredient: true,
      },
      user: true,
    },
  });

  const commentRecipe: CommentsRecipes = commentRecipeRepository.create({
    comments: createComment,
    recipe: findRecipe!,
  });
  await commentRecipeRepository.save(commentRecipe);

  const toReturn: any = {
    id: commentRecipe.id,
    comment: commentRecipe.comments.comment,
    user: findUser!,
    recipe: commentRecipe.recipe,
  };
  const returnCommentRecipe = returnCommentSchema.parse(toReturn);
  return returnCommentRecipe;
};
