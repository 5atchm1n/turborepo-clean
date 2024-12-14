import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import {
  AuthUseCaseIdentifiers,
  UserModel,
  ValidateUserForLocalStrategyUseCase,
} from "../../core";
import { GlobalServiceIdentifiers, LoggerService } from "../../infrastructure";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthUseCaseIdentifiers.validateUserForLocalStrategyUseCase)
    private readonly validateUserForLocalStrategyUseCase: ValidateUserForLocalStrategyUseCase,
    @Inject(GlobalServiceIdentifiers.loggerService)
    private readonly logger: LoggerService,
  ) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string): Promise<UserModel> {
    if (!email || !password) {
      this.logger.warn(
        "LocalStrategy",
        "Email or password is missing, BadRequestException",
      );
      throw new UnauthorizedException();
    }
    return await this.validateUserForLocalStrategyUseCase.execute({
      email,
      password,
    });
  }
}
