import { Repository } from "typeorm";
import {
  iCategories,
  returnAllCategoriesSchema,
} from "../../schemas/categories.schemas";
import { Categories } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllCategoriesService = async (): Promise<iCategories[]> => {
  const categoriesRepository: Repository<Categories> =
    AppDataSource.getRepository(Categories);
  const categories: Categories[] | [] = await categoriesRepository.find();

  const allCategories = returnAllCategoriesSchema.parse(categories);

  return allCategories;
};
