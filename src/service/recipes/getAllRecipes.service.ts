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
  const recipes: iRecipes = await recipeRepository.find({
    relations: {
      user: true,
    },
  });

  const returnRecipes: iRecipes = returnAllRecipesSchema.parse(recipes);

  return returnRecipes;
};
