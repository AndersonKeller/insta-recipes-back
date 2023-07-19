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
  const recipes: Recipe[] = await recipeRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
    relations: {
      user: true,
      recipesIngredients: {
        ingredient: true,
      },
      categorie: true,
    },
  });
  const res = recipes.map((recipe) => {
    const obj = {
      ...recipe,
      categorie: recipe.categorie.name,
    };
    return obj;
  });
  const returnRecipes: iRecipes = returnAllRecipesSchema.parse(res);

  return returnRecipes;
};
