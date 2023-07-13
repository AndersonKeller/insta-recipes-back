import { Response, Request } from "express";

import { createUserService } from "../service/user/createUser.service";
import { iUser } from "../schemas/user.schemas";
export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData = req.body;
  const user: iUser = await createUserService(userData);
  return res.status(201).json(user);
};
