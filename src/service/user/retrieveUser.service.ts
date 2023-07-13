import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUser, returnUserSchema } from "../../schemas/user.schemas";

export const retrieveUserService = async (userId: number): Promise<iUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const user: iUser = returnUserSchema.parse(findUser);
  return user;
};
