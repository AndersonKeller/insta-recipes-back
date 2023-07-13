import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { User } from "../entities";

export async function ensureEmailExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOneBy({
    email: req.body.email,
  });
  if (req.body.email) {
    if (findUser) {
      throw new AppError("Email already registered", 409);
    }
  }

  return next();
}
