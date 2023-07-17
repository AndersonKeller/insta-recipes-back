import { Repository } from "typeorm";
import { Rating } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getRecipesRatingService = async (
  skip: number
): Promise<Rating[]> => {
  const ratingRepository: Repository<Rating> =
    AppDataSource.getRepository(Rating);

  const recipesByRating: Rating[] = await ratingRepository.find({
    relations: {
      recipe: {
        recipesIngredients: {
          ingredient: true,
        },
      },
    },
    order: {
      rating: "DESC",
    },
    take: 10,
    skip: skip - 1,
  });

  return recipesByRating;
};
