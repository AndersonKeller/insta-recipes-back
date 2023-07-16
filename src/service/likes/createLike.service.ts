import { Repository } from "typeorm";
import { Likes, Rating, Recipe, User } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createLikeService = async (
  recipeId: number,
  userId: number
): Promise<string> => {
  const likesRepository: Repository<Likes> = AppDataSource.getRepository(Likes);
  const recipeRepository: Repository<Recipe> =
    AppDataSource.getRepository(Recipe);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const ratingRepository: Repository<Rating> =
    AppDataSource.getRepository(Rating);

  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });
  const findRecipe: Recipe | null = await recipeRepository.findOne({
    where: {
      id: recipeId,
    },
  });
  const findRating: Rating | null = await ratingRepository.findOne({
    where: {
      recipe: {
        id: recipeId,
      },
    },
  });
  const findLiked: Likes | null = await likesRepository.findOne({
    where: {
      recipe: {
        id: findRecipe?.id!,
      },
      user: {
        id: findUser?.id!,
      },
    },
  });
  if (!findLiked) {
    const liked = likesRepository.create({
      recipe: findRecipe!,
      user: findUser!,
    });
    await likesRepository.save(liked);
    const ratingNumber: number = findRating?.rating! + 1;
    const rating: Rating = ratingRepository.create({
      recipe: findRecipe!,
      rating: ratingNumber,
      id: findRating?.id!,
    });
    await ratingRepository.save(rating);
    return "add to liked";
  } else {
    const ratingNumber: number = findRating?.rating! - 1;
    const rating: Rating = ratingRepository.create({
      recipe: findRecipe!,
      rating: ratingNumber,
      id: findRating?.id!,
    });
    await ratingRepository.save(rating);
    await likesRepository.remove(findLiked!);
    return "remove to liked";
  }
};
