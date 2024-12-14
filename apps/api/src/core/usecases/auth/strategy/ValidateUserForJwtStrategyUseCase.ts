import { IUseCase, IUserService, UserModel } from "../../../domain";
import { AppServiceIdentifiers } from "../../../../infrastructure";
import { Inject, Injectable } from "@nestjs/common";

interface ValidateUserForJwtStrategyCommands {
  userId: string;
}

@Injectable()
export class ValidateUserForJwtStrategyUseCase
  implements IUseCase<ValidateUserForJwtStrategyCommands, Promise<UserModel>>
{
  constructor(
    @Inject(AppServiceIdentifiers.userService)
    private readonly userService: IUserService,
  ) {}

  async execute({
    userId,
  }: ValidateUserForJwtStrategyCommands): Promise<UserModel> {
    return await this.userService.getUserById(userId);
  }
}
