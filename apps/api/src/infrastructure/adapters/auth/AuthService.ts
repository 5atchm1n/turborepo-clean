import { Inject, Injectable } from "@nestjs/common";
import { RepositoryIdentifiers } from "../../repositories";
import { AuthModel, IUserRepository } from "../../../core";
import { AuthEntity, UserEntity } from "../../entities";
import { IAuthService } from "../../../core/domain/adapters/services/IAuthService";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(RepositoryIdentifiers.userRepository)
    private readonly userRepository: IUserRepository<UserEntity>,
  ) {}

  async getUserByEmail(email: string): Promise<AuthModel> {
    const user = await this.userRepository.findByEmail(email);
    return this.toModel(user);
  }

  async registerNewUser(user: Partial<AuthModel>): Promise<AuthModel> {
    const newUser = this.toEntity(user);
    const registeredUser = await this.userRepository.insert(newUser);
    return this.toModel(registeredUser);
  }

  async updateUserRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<void> {
    return await this.userRepository.updateRefreshToken(id, refreshToken);
  }

  async getUserById(userId: string): Promise<AuthModel> {
    const user = await this.userRepository.findById(userId);
    return this.toModel(user);
  }

  toEntity(model: Partial<AuthModel>): Partial<AuthEntity> {
    return {
      id: model.id,
      email: model.email,
      first_name: model.firstName,
      last_name: model.lastName,
      password: model.password,
      refresh_token: model.refreshToken,
    };
  }

  toModel(entity: AuthEntity): AuthModel {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.first_name,
      lastName: entity.last_name,
      password: entity.password,
      refreshToken: entity.refresh_token,
    };
  }
}
