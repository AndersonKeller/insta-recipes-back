import { Repository } from "typeorm";
import {
  CreateCategories,
  iCategories,
  returnCategoriesSchema,
} from "../../schemas/categories.schemas";
import { Categories } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createCategoriesService = async (
  categoriesData: CreateCategories
): Promise<iCategories> => {
  const categoriesRepository: Repository<Categories> =
    AppDataSource.getRepository(Categories);

  const categorie = categoriesRepository.create(categoriesData);
  await categoriesRepository.save(categorie);

  const returnCategorie = returnCategoriesSchema.parse(categorie);

  return returnCategorie;
};
