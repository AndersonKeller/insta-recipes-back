import { Response, Request } from "express";
import { createLoginService } from "../service/login/createLogin.service";

export const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData = req.body;
  const token: string = await createLoginService(loginData);
  return res.status(201).json({ token: token });
};
