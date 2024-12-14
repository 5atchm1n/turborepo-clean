import { IHashService, IUseCase, UserModel } from "../../../domain";
import { AppServiceIdentifiers } from "../../../../infrastructure";
import { Inject, Injectable } from "@nestjs/common";
import { ForbiddenException } from "../exceptions";
import { IAuthService } from "../../../domain/adapters/services/IAuthService";

interface GetUserIfRefreshTokenMatchesCommands {
  userId: string;
  refreshToken: string;
}

@Injectable()
export class GetUserIfRefreshTokenMatchesUseCase
  implements IUseCase<GetUserIfRefreshTokenMatchesCommands, Promise<UserModel>>
{
  constructor(
    @Inject(AppServiceIdentifiers.authService)
    private readonly authService: IAuthService,
    @Inject(AppServiceIdentifiers.hashService)
    private readonly hashService: IHashService,
  ) {}

  async execute({
    userId,
    refreshToken,
  }: GetUserIfRefreshTokenMatchesCommands): Promise<UserModel> {
    const user = await this.authService.getUserById(userId);

    const isRefreshTokenMatching = await this.hashService.compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    throw new ForbiddenException("Invalid Token");
  }
}
