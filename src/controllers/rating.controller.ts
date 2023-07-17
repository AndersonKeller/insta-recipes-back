import { Response, Request } from "express";
import { getRecipesRatingService } from "../service/rating/getRecipesRating.service";
import { Rating } from "../entities";
export const getRecipesRatingController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const skip: any = req.query.page ? req.query.page : 1;

  const recipes: Rating[] = await getRecipesRatingService(parseInt(skip));
  return res.status(200).json(recipes);
};
