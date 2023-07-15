import { iUser } from "./../../schemas/user.schemas";
import { Repository } from "typeorm";
import {
  iRecipes,
  returnAllRecipesSchema,
} from "../../schemas/recipes.schemas";
import { Recipe } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnUserSchema } from "../../schemas/user.schemas";

export const getAllRecipesService = async (): Promise<any> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const recipes: Recipe[] = await recipeRepository.find({
    relations: {
      user: true,
      recipesIngredients: {
        ingredient: true,
      },
    },
  });

  const returnRecipes: iRecipes = returnAllRecipesSchema.parse(recipes);

  return returnRecipes;
};
