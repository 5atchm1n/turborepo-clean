import { UserModel } from "./index";

export interface AuthModel extends UserModel {
  password: string;
  refreshToken: string;
}
