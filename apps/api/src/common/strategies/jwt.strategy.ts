import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import {
  AuthUseCaseIdentifiers,
  IRequest,
  TokenPayload,
  UserModel,
  ValidateUserForJwtStrategyUseCase,
} from "../../core";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthUseCaseIdentifiers.validateUserForJwtStrategyUseCase)
    private readonly validateUserForJwtStrategyUseCase: ValidateUserForJwtStrategyUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: IRequest) => {
          return request?.cookies?.access;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: TokenPayload): Promise<UserModel> {
    return await this.validateUserForJwtStrategyUseCase.execute({
      userId: payload.sub,
    });
  }
}
