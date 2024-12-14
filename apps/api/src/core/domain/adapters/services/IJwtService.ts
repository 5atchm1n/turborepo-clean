import { TokenPayload } from "../../models";

export interface IJwtService {
  decode(token: string): Promise<never>;
  create(
    payload: TokenPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string>;
}
