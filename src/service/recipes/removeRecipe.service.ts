import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Recipe } from "../../entities";

export const removeRecipeService = async (recipeId: number): Promise<void> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const findRecipe: Recipe | null = await recipeRepository.findOne({
    where: {
      id: recipeId,
    },
  });
  await recipeRepository.remove(findRecipe!);
};
