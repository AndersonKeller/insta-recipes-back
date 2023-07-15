import { Repository } from "typeorm";
import {
  CreateRecipe,
  iRecipe,
  returnRecipeSchema,
} from "../../schemas/recipes.schemas";
import {
  Ingredient,
  Rating,
  Recipe,
  RecipeIngredient,
  User,
} from "../../entities";
import { AppDataSource } from "../../data-source";

export const createRecipeService = async (
  recipeData: CreateRecipe,
  userId: number
): Promise<iRecipe> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const recipeIngredientRepository: Repository<RecipeIngredient> =
    AppDataSource.getRepository(RecipeIngredient);
  const ingredientRepository: Repository<Ingredient> =
    AppDataSource.getRepository(Ingredient);
  const ratingRepository: Repository<Rating> =
    AppDataSource.getRepository(Rating);

  const namesIngredients: string[] = recipeData.ingredients.map(
    (ingredient) => ingredient.ingredient.name
  );

  namesIngredients.forEach(async (name) => {
    const findIngredient: Ingredient | null =
      await ingredientRepository.findOne({
        where: {
          name: name,
        },
      });
    if (!findIngredient) {
      const ingredient: Ingredient = ingredientRepository.create({
        name: name,
      });
      await ingredientRepository.save(ingredient);
    }
  });

  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });
  const newRecipe: any = {
    ...recipeData,
    user: findUser!,
  };
  const recipe: any = recipeRepository.create(newRecipe);
  const recipeSaved: Recipe = await recipeRepository.save(recipe);

  const rating: Rating = ratingRepository.create({
    rating: 0,
    recipe: recipeSaved,
  });
  const ratingSaved = await ratingRepository.save(rating);

  recipeData.ingredients.forEach(async (ingredient) => {
    const findIngredient: Ingredient | null =
      await ingredientRepository.findOne({
        where: {
          name: ingredient.ingredient.name,
        },
      });
    const newRecipeIngredient: RecipeIngredient =
      recipeIngredientRepository.create({
        ingredient: findIngredient!,
        quantity: ingredient.quantity,
        quantityType: ingredient.quantityType,
        recipe: recipeSaved,
      });
    await recipeIngredientRepository.save(newRecipeIngredient);
  });
  const recipeToReturn: iRecipe = {
    ...recipeSaved,
    recipesIngredients: recipeData.ingredients,
    rating: ratingSaved.rating,
  };
  const returnRecipe: iRecipe = returnRecipeSchema.parse(recipeToReturn);
  return returnRecipe;
};
