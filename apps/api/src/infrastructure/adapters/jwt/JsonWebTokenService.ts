import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IJwtService, TokenPayload } from "../../../core";

@Injectable()
export class JsonWebTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async decode(token: string): Promise<never> {
    return await this.jwtService.verifyAsync(token);
  }

  async create(
    payload: TokenPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
