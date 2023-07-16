import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Recipe } from "../../entities";
import {
  iRecipes,
  returnAllRecipesSchema,
} from "../../schemas/recipes.schemas";

export const getLikesByUserService = async (
  userId: number
): Promise<iRecipes> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);

  const likeds = await recipeRepository.find({
    where: {
      likes: {
        user: {
          id: userId,
        },
      },
    },
    relations: {
      user: true,
      recipesIngredients: {
        ingredient: true,
      },
    },
  });
  const allLikeds = returnAllRecipesSchema.parse(likeds);
  return allLikeds;
};
