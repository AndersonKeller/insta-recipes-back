import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Recipe } from "../../entities";
import {
  iRecipes,
  returnAllRecipesSchema,
} from "../../schemas/recipes.schemas";

export const getRecipesByUserService = async (
  userId: number
): Promise<iRecipes> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const recipes: iRecipes = await recipeRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
    relations: {
      user: true,
    },
  });

  const returnRecipes: iRecipes = returnAllRecipesSchema.parse(recipes);

  return returnRecipes;
};
