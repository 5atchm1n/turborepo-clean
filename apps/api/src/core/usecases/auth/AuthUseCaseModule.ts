import { Module } from "@nestjs/common";
import {
  GetCookieWithJwtRefreshUseCase,
  GetCookieWithJwtUseCase,
} from "./cookie";
import {
  GetUserIfRefreshTokenMatchesUseCase,
  ValidateUserForJwtStrategyUseCase,
  ValidateUserForLocalStrategyUseCase,
} from "./strategy";
import { LogoutUseCase } from "./LogoutUseCase";
import { InfrastructureModules } from "../../../infrastructure";
import { AuthUseCaseIdentifiers } from "./AuthUseCaseIdentifiers";

@Module({
  imports: [InfrastructureModules],
  providers: [
    {
      provide: AuthUseCaseIdentifiers.getCookieWithJwtUseCase,
      useClass: GetCookieWithJwtUseCase,
    },
    {
      provide: AuthUseCaseIdentifiers.getCookieWithJwtRefreshUseCase,
      useClass: GetCookieWithJwtRefreshUseCase,
    },
    {
      provide: AuthUseCaseIdentifiers.validateUserForLocalStrategyUseCase,
      useClass: ValidateUserForLocalStrategyUseCase,
    },
    {
      provide: AuthUseCaseIdentifiers.validateUserForJwtStrategyUseCase,
      useClass: ValidateUserForJwtStrategyUseCase,
    },
    {
      provide: AuthUseCaseIdentifiers.getUserIfRefreshTokenMatchesUseCase,
      useClass: GetUserIfRefreshTokenMatchesUseCase,
    },
    {
      provide: AuthUseCaseIdentifiers.logoutUseCase,
      useClass: LogoutUseCase,
    },
  ],
  exports: [
    AuthUseCaseIdentifiers.getCookieWithJwtUseCase,
    AuthUseCaseIdentifiers.getCookieWithJwtRefreshUseCase,
    AuthUseCaseIdentifiers.validateUserForLocalStrategyUseCase,
    AuthUseCaseIdentifiers.validateUserForJwtStrategyUseCase,
    AuthUseCaseIdentifiers.getUserIfRefreshTokenMatchesUseCase,
    AuthUseCaseIdentifiers.logoutUseCase,
  ],
})
export class AuthUseCaseModule {}
