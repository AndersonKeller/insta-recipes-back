import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Comments } from "../entities";
import { AppError } from "../errors";

export const ensureCommentExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const commentRepository: Repository<Comments> =
    AppDataSource.getRepository(Comments);
  const findComment: Comments | null = await commentRepository.findOne({
    where: {
      id: parseInt(req.params.id),
      user: {
        id: parseInt(req.user.id),
      },
    },
  });
  if (!findComment) {
    throw new AppError("Comment whit id not found or you not owner", 404);
  }
  return next();
};
