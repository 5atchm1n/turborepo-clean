import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ForbiddenException } from "../../core/usecases/auth/exceptions";

@Injectable()
export class JwtRefreshGuard extends AuthGuard("jwt-refresh-token") {
  handleRequest<T>(err: Error | null, user: T | null, info: Error | null): T {
    if (err ?? !user) {
      throw new ForbiddenException(info?.message ?? "");
    }

    return user;
  }
}
