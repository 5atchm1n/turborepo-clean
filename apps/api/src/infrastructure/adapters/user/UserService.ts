import { Inject, Injectable } from "@nestjs/common";
import {
  IUserRepository,
  IUserService,
  NewsletterSubscribeModel,
  UserModel,
} from "../../../core";
import { UserEntity } from "../../entities";
import { RepositoryIdentifiers } from "../../repositories";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(RepositoryIdentifiers.userRepository)
    private readonly userRepository: IUserRepository<UserEntity>,
  ) {}

  async getUserByEmail(email: string): Promise<UserModel> {
    const user = await this.userRepository.findByEmail(email);
    return this.toModel(user);
  }

  async getUserById(id: string): Promise<UserModel> {
    const user = await this.userRepository.findById(id);
    return this.toModel(user);
  }

  async createUser(user: UserModel): Promise<UserModel> {
    const newUser = this.toEntity(user);
    const createdUser = await this.userRepository.insert(newUser);
    return this.toModel(createdUser);
  }

  async updateUserById(
    id: string,
    user: Partial<UserModel>,
  ): Promise<UserModel> {
    const updatedUser = this.toEntity(user);
    const userEntity = await this.userRepository.updateById(id, updatedUser);
    return this.toModel(userEntity);
  }

  async subscribeNewsletter(
    model: NewsletterSubscribeModel,
  ): Promise<UserModel> {
    const unregisteredUser = this.createUnregisteredUser(
      model.email,
      model.subscribe,
    );
    const newUnregisteredUser =
      await this.userRepository.insert(unregisteredUser);
    return this.toModel(newUnregisteredUser);
  }

  /* ADAPTERS */

  toEntity(user: Partial<UserModel>): Partial<UserEntity> {
    return {
      id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      last_login: user.lastLogin,
    };
  }

  toModel(user: UserEntity): UserModel {
    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      lastLogin: user.last_login,
    };
  }

  /* PRIVATE METHODS */

  private createUnregisteredUser(
    email: string,
    newsletter: boolean,
  ): Partial<UserEntity> {
    return {
      email,
      password: "",
      first_name: "",
      last_name: "",
      newsletter: newsletter,
    };
  }
}
