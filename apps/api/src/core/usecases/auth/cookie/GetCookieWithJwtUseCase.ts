import { TokenType, UserModel } from "../../../domain";
import { Injectable } from "@nestjs/common";
import { GetCookieWithJwtBaseUseCase } from "./GetCookieWithJwtBaseUseCase";

interface GetCookieWithJwtCommands {
  user: UserModel;
}

@Injectable()
export class GetCookieWithJwtUseCase extends GetCookieWithJwtBaseUseCase {
  protected readonly cookieName = TokenType.ACCESS;

  async execute(request: GetCookieWithJwtCommands): Promise<string> {
    const { id, email } = request.user;
    this.log(id);
    const token = await this.createJwtToken(id, email);
    return this.createCookie(token);
  }
}
