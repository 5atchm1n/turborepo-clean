import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {
  AuthUseCaseIdentifiers,
  GetUserIfRefreshTokenMatchesUseCase,
  IRequest,
  TokenPayload,
  TokenType,
  UserModel,
} from "../../core";
import {
  EnvironmentConfigService,
  GlobalServiceIdentifiers,
} from "../../infrastructure";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh-token",
) {
  constructor(
    @Inject(GlobalServiceIdentifiers.environmentConfigService)
    private readonly configService: EnvironmentConfigService,
    @Inject(AuthUseCaseIdentifiers.getUserIfRefreshTokenMatchesUseCase)
    private readonly getUserIfRefreshTokenMatchesUseCase: GetUserIfRefreshTokenMatchesUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: IRequest) => {
          return request?.cookies?.refresh;
        },
      ]),
      secretOrKey: configService.getTokenSecret(TokenType.REFRESH),
      passReqToCallback: true,
    });
  }

  async validate(request: IRequest, payload: TokenPayload): Promise<UserModel> {
    const refreshToken = request.cookies?.refresh;
    return await this.getUserIfRefreshTokenMatchesUseCase.execute({
      userId: payload.sub,
      refreshToken,
    });
  }
}
