import { Repository } from "typeorm";
import {
  CreateUser,
  iUser,
  returnUserSchema,
} from "../../schemas/user.schemas";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createUserService = async (
  userData: CreateUser
): Promise<iUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);
  await userRepository.save(user);

  const newUser = returnUserSchema.parse(user);
  return newUser;
};
