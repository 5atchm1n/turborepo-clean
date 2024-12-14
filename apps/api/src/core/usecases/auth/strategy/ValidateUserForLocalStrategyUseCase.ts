import {
  IHashService,
  IUseCase,
  UserModel,
  IUserService,
} from "../../../domain";
import { AppServiceIdentifiers } from "../../../../infrastructure";
import { Inject, Injectable } from "@nestjs/common";
import { ForbiddenException } from "../exceptions";
import { IAuthService } from "../../../domain/adapters/services/IAuthService";

interface ValidateUserForLocalStrategyCommands {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserForLocalStrategyUseCase
  implements IUseCase<ValidateUserForLocalStrategyCommands, Promise<UserModel>>
{
  constructor(
    @Inject(AppServiceIdentifiers.authService)
    private readonly authService: IAuthService,
    @Inject(AppServiceIdentifiers.userService)
    private readonly userService: IUserService,
    @Inject(AppServiceIdentifiers.hashService)
    private readonly hashService: IHashService,
  ) {}

  async execute({
    email,
    password,
  }: ValidateUserForLocalStrategyCommands): Promise<UserModel> {
    const user = await this.authService.getUserByEmail(email);

    const isPasswordValid = await this.hashService.compare(
      password,
      user.password,
    );

    if (isPasswordValid) {
      await this.updateLoginTime(user.id);
      return user;
    }

    throw new ForbiddenException("Login Forbidden");
  }

  private async updateLoginTime(id: string): Promise<void> {
    await this.userService.updateUserById(id, { lastLogin: new Date() });
  }
}
