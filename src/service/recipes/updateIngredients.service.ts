import { Repository } from "typeorm";
import {
  UpdateIngredientsToRecipe,
  updateIngredientsToRecipeSchema,
} from "../../schemas/recipes.schemas";
import { Ingredient, Recipe, RecipeIngredient } from "../../entities";
import { AppDataSource } from "../../data-source";
import {
  iRecipeIngredient,
  returnRecipeIngredientSchema,
} from "../../schemas/recipesIngredients.schemas";

export const uodateIngredientsService = async (
  ingredientsData: UpdateIngredientsToRecipe,
  recipeId: number
): Promise<UpdateIngredientsToRecipe> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const ingredientRepository: Repository<Ingredient> =
    AppDataSource.getRepository(Ingredient);
  const ingredientRecipeRepository: Repository<RecipeIngredient> =
    AppDataSource.getRepository(RecipeIngredient);

  const findRecipe: Recipe | null = await recipeRepository.findOne({
    where: {
      id: recipeId,
    },
    relations: {
      recipesIngredients: {
        ingredient: true,
      },
    },
  });

  ingredientsData.forEach(async (data) => {
    let findIngredient: RecipeIngredient | null =
      await ingredientRecipeRepository.findOne({
        where: {
          ingredient: {
            name: data.ingredient?.name!,
          },
        },
        relations: {
          ingredient: true,
        },
      });

    if (!findIngredient) {
      const ingredient: Ingredient = ingredientRepository.create({
        name: data.ingredient?.name!,
      });
      const ingredientNew: Ingredient = await ingredientRepository.save(
        ingredient
      );
      const ingredientToRecipeNew: RecipeIngredient =
        ingredientRecipeRepository.create({
          ingredient: ingredientNew,
          recipe: findRecipe!,
          quantity: data.quantity ? data.quantity : 0,
          quantityType: data.quantityType ? data.quantityType : "unid",
        });
      await ingredientRecipeRepository.save(ingredientToRecipeNew);
    } else {
      const ingredientToRecipeNew: RecipeIngredient =
        ingredientRecipeRepository.create({
          id: findIngredient.id,
          ingredient: findIngredient.ingredient,
          recipe: findRecipe!,
          quantity: data.quantity ? data.quantity : findIngredient.quantity,
          quantityType: data.quantityType
            ? data.quantityType
            : findIngredient.quantityType,
        });
      await ingredientRecipeRepository.save(ingredientToRecipeNew);
    }
  });
  const findRecipeIngredients: RecipeIngredient[] | null =
    await ingredientRecipeRepository.find({
      where: {
        recipe: {
          id: findRecipe?.id!,
        },
      },
      relations: {
        ingredient: true,
      },
    });
  const returnRecipeIngredients = updateIngredientsToRecipeSchema.parse(
    findRecipeIngredients
  );
  return returnRecipeIngredients;
};
