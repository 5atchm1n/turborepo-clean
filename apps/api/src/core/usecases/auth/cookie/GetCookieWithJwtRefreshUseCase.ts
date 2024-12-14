import { TokenType, UserModel } from "../../../domain";
import { Injectable } from "@nestjs/common";
import { GetCookieWithJwtBaseUseCase } from "./GetCookieWithJwtBaseUseCase";

interface GetCookieWithJwtRefreshCommands {
  user: UserModel;
}

@Injectable()
export class GetCookieWithJwtRefreshUseCase extends GetCookieWithJwtBaseUseCase {
  protected readonly cookieName = TokenType.REFRESH;

  async execute(request: GetCookieWithJwtRefreshCommands): Promise<string> {
    const { id, email } = request.user;
    this.log(id);
    const token = await this.createJwtToken(id, email);
    await this.setCurrentRefreshToken(id, token);
    return this.createCookie(token);
  }
}
