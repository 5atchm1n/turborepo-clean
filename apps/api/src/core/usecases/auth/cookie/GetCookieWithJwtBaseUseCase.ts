import { Inject, Injectable } from "@nestjs/common";
import {
  IConfigService,
  IHashService,
  IJwtService,
  ILoggerService,
  IUseCase,
  TokenPayload,
  TokenType,
  UserModel,
} from "../../../domain";
import {
  AppServiceIdentifiers,
  GlobalServiceIdentifiers,
} from "../../../../infrastructure";
import * as cookie from "cookie";
import { IAuthService } from "../../../domain/adapters/services/IAuthService";

interface GetCookieCommands {
  user: UserModel;
}

@Injectable()
export abstract class GetCookieWithJwtBaseUseCase
  implements IUseCase<GetCookieCommands, string>
{
  constructor(
    @Inject(GlobalServiceIdentifiers.loggerService)
    private readonly logger: ILoggerService,
    @Inject(AppServiceIdentifiers.jwtService)
    private readonly jwtTokenService: IJwtService,
    @Inject(GlobalServiceIdentifiers.environmentConfigService)
    private readonly jwtConfig: IConfigService,
    @Inject(AppServiceIdentifiers.authService)
    private readonly authService: IAuthService,
    @Inject(AppServiceIdentifiers.hashService)
    private readonly hashService: IHashService,
  ) {}

  protected abstract readonly cookieName: TokenType;

  abstract execute(request: GetCookieCommands): Promise<string>;

  protected async setCurrentRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<void> {
    const currentHashedRefreshToken = await this.hashService.hash(refreshToken);
    await this.authService.updateUserRefreshToken(
      id,
      currentHashedRefreshToken,
    );
  }

  protected log(id: string): void {
    this.logger.log(
      `${this.constructor.name} execute`,
      `${this.cookieName} cookie created for ${id}.`,
    );
  }

  protected async createJwtToken(id: string, email: string): Promise<string> {
    const payload: TokenPayload = { sub: id, user: { id, email } };
    const secret = this.jwtConfig.getTokenSecret(this.cookieName);
    const expiresIn = `${this.jwtConfig.getTokenExpirationTime(this.cookieName)}s`;

    return await this.jwtTokenService.create(payload, secret, expiresIn);
  }

  protected createCookie(token: string): string {
    const maxAge = this.jwtConfig.getTokenExpirationTime(this.cookieName);

    return cookie.serialize(this.cookieName, token, {
      httpOnly: true,
      path: "/",
      maxAge: Number(maxAge), // seconds
    });
  }
}
