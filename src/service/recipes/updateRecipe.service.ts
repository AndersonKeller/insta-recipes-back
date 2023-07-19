import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Ingredient, Recipe, RecipeIngredient } from "../../entities";
import {
  UpdateRecipe,
  iRecipe,
  returnRecipeSchema,
} from "../../schemas/recipes.schemas";
import { CreateRecipeIngredient } from "../../schemas/recipesIngredients.schemas";

export const updateRecipeService = async (
  recipeData: UpdateRecipe,
  recipeId: number
): Promise<iRecipe> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);

  const findRecipe: Recipe | null = await recipeRepository.findOne({
    where: {
      id: recipeId,
    },
    relations: {
      user: true,
      recipesIngredients: {
        ingredient: true,
      },
      categorie: true,
    },
  });
  const newRecipe: any = {
    ...findRecipe!,
    ...recipeData,
  };

  const recipe: any = recipeRepository.create(newRecipe);
  await recipeRepository.save(recipe);
  const res = {
    ...recipe,
    categorie: recipe.categorie.name,
  };
  const returnRecipe: iRecipe = returnRecipeSchema.parse(res);

  return returnRecipe;
};
