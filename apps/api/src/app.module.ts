import { Module } from "@nestjs/common";
import { ControllersModule } from "./api";
import { JwtRefreshTokenStrategy, JwtStrategy, LocalStrategy } from "./common";

@Module({
  imports: [ControllersModule],
  providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
