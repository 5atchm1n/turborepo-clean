import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";
import { JsonWebTokenService } from "./JsonWebTokenService";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  providers: [
    {
      provide: AppServiceIdentifiers.jwtService,
      useClass: JsonWebTokenService,
    },
  ],
  exports: [AppServiceIdentifiers.jwtService],
})
export class JsonWebTokenServiceModule {}
