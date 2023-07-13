import { Repository } from "typeorm";
import {
  CreateRecipe,
  iRecipe,
  returnRecipeSchema,
} from "../../schemas/recipes.schemas";
import { Recipe, User } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createRecipeService = async (
  recipeData: CreateRecipe,
  userId: number
): Promise<iRecipe> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });
  const newRecipe: any = {
    ...recipeData,
    user: findUser!,
  };
  const recipe: Recipe[] = recipeRepository.create(newRecipe);
  await recipeRepository.save(recipe);
  const returnRecipe: iRecipe = returnRecipeSchema.parse(recipe);
  return returnRecipe;
};
