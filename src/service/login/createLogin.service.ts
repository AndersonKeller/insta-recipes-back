import { Repository } from "typeorm";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

import { CreateLogin } from "../../schemas/login.schemas";
import { User } from "../../entities";

export const createLoginService = async (
  loginData: CreateLogin
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });
  if (!User) {
    throw new AppError("Invalid credentials", 401);
  }
  const passwordMatch = await compare(loginData.password, user!.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user?.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user!.id),
    }
  );

  return token;
};
