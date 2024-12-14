import { Request, Response } from "express";
import { UserModel } from "../../models";
import { TokenType } from "../services";

export interface IRequest extends Request {
  user: UserModel;
  res: Response;
  cookies: Record<TokenType, string>;
}
