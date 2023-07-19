import { Repository } from "typeorm";
import {
  iRecipes,
  returnAllRecipesSchema,
} from "../../schemas/recipes.schemas";
import { Categories, Recipe } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

export const getRecipesByCategorieService = async (
  categorieName: string
): Promise<iRecipes> => {
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const categorieRepository: Repository<Categories> =
    AppDataSource.getRepository(Categories);

  const findCategorie: Categories | null = await categorieRepository.findOne({
    where: {
      name: categorieName,
    },
  });
  if (!findCategorie) {
    throw new AppError("Categorie whit this name not found", 404);
  }
  const findRecipes: Recipe[] | [] = await recipeRepository.find({
    where: {
      categorie: {
        name: findCategorie.name,
      },
    },
    relations: {
      user: true,
      recipesIngredients: {
        ingredient: true,
      },
      categorie: true,
    },
  });
  const res = findRecipes.map((recipe) => {
    const obj = {
      ...recipe,
      categorie: recipe.categorie.name,
    };
    return obj;
  });
  const allRecipes = returnAllRecipesSchema.parse(res);
  return allRecipes;
};
