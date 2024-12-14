import { IUseCase, TokenType } from "../../domain";
import { Inject, Injectable } from "@nestjs/common";
import * as cookie from "cookie";
import { AppServiceIdentifiers } from "../../../infrastructure";
import { IAuthService } from "../../domain/adapters/services/IAuthService";

@Injectable()
export class LogoutUseCase implements IUseCase<string, Promise<string[]>> {
  constructor(
    @Inject(AppServiceIdentifiers.authService)
    private readonly authService: IAuthService,
  ) {}

  async execute(id: string): Promise<string[]> {
    await this.clearRefreshToken(id);
    return [
      this.clearCookie(TokenType.ACCESS),
      this.clearCookie(TokenType.REFRESH),
    ];
  }

  private async clearRefreshToken(id: string): Promise<void> {
    return await this.authService.updateUserRefreshToken(id, "");
  }

  private clearCookie(cookieType: TokenType): string {
    return cookie.serialize(cookieType, "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
  }
}
