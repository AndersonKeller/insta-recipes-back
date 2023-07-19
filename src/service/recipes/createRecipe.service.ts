import { Repository } from "typeorm";
import {
  CreateRecipe,
  iRecipe,
  returnRecipeSchema,
} from "../../schemas/recipes.schemas";
import {
  Categories,
  Ingredient,
  Rating,
  Recipe,
  RecipeIngredient,
  User,
} from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

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
  const categoriesRepository: Repository<Categories> =
    AppDataSource.getRepository(Categories);

  const namesIngredients: string[] = recipeData.ingredients.map(
    (ingredient) => ingredient.ingredient.name
  );
  const findCategorie: Categories | null = await categoriesRepository.findOne({
    where: {
      name: recipeData.categorie!,
    },
  });
  if (!findCategorie) {
    throw new AppError("Categorie whit a name not found, required", 404);
  }
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
    categorie: findCategorie,
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
  const recipeToReturn: any = {
    ...recipeSaved,
    recipesIngredients: recipeData.ingredients,
    rating: ratingSaved.rating,
    categorie: recipeSaved.categorie.name,
  };
  const returnRecipe: iRecipe = returnRecipeSchema.parse(recipeToReturn);
  return returnRecipe;
};
