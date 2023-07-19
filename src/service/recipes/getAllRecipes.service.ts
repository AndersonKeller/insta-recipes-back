import { Repository } from "typeorm";
import {
  iRecipes,
  returnAllRecipesSchema,
} from "../../schemas/recipes.schemas";
import { Recipe } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllRecipesService = async (): Promise<iRecipes> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);

  const recipes: Recipe[] = await recipeRepository.find({
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
