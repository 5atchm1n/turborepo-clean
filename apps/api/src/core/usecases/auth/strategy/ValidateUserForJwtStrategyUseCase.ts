import { Inject, Injectable } from "@nestjs/common";
import { AppServiceIdentifiers } from "../../../../infrastructure";
import { IUseCase, IUserService, UserModel } from "../../../domain";

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
