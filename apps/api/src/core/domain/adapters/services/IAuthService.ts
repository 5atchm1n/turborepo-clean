import { AuthEntity } from "../../../../infrastructure";
import { IService } from "../../interfaces/IService";
import { AuthModel } from "../../models";

export interface IAuthService extends IService<AuthModel, AuthEntity> {
  updateUserRefreshToken(id: string, refreshToken: string): Promise<void>;
  getUserByEmail(email: string): Promise<AuthModel>;
  registerNewUser(user: Partial<AuthModel>): Promise<AuthModel>;
  getUserById(userId: string): Promise<AuthModel>;
}
