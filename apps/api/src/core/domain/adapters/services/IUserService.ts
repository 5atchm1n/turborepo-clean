import { IService } from "../../interfaces/IService";
import { NewsletterSubscribeModel, UserModel } from "../../models";
import { UserEntity } from "../../../../infrastructure";

export interface IUserService extends IService<UserModel, UserEntity> {
  subscribeNewsletter(model: NewsletterSubscribeModel): Promise<UserModel>;
  createUser(user: Partial<UserModel>): Promise<UserModel>;
  getUserByEmail(email: string): Promise<UserModel>;
  getUserById(id: string): Promise<UserModel>;
  updateUserById(id: string, user: Partial<UserModel>): Promise<UserModel>;
}
