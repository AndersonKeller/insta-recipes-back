import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Recipe, RecipeIngredient } from "../../entities";

export const removeRecipeService = async (recipeId: number): Promise<void> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const recipeIngredientsRepository: Repository<RecipeIngredient> =
    AppDataSource.getRepository(RecipeIngredient);

  const findRecipe: Recipe | null = await recipeRepository.findOne({
    where: {
      id: recipeId,
    },
    relations: {
      recipesIngredients: true,
    },
  });
  const findRecipeIngredient: RecipeIngredient | null =
    await recipeIngredientsRepository.findOne({
      relations: {
        recipe: true,
      },
      where: {
        recipe: { id: recipeId },
      },
    });
  console.log(findRecipeIngredient);
  await recipeIngredientsRepository.remove(findRecipeIngredient!);
  await recipeRepository.remove(findRecipe!);
};
