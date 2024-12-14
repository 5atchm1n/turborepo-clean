import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { GlobalServiceIdentifiers, LoggerService } from "../../infrastructure";
import {
  AuthUseCaseIdentifiers,
  UserModel,
  ValidateUserForLocalStrategyUseCase,
} from "../../core";

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
