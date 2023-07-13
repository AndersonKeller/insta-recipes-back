import { Response, Request } from "express";

import { createUserService } from "../service/user/createUser.service";
import { iUser } from "../schemas/user.schemas";
import { retrieveUserService } from "../service/user/retrieveUser.service";
export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData = req.body;
  const user: iUser = await createUserService(userData);
  return res.status(201).json(user);
};
export const retrieveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.user.id);
  const user: iUser = await retrieveUserService(userId);
  return res.status(200).json(user);
};
