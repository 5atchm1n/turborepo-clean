import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "../../repositories";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";
import { AuthService } from "./AuthService";

@Module({
  imports: [UserRepositoryModule],
  providers: [
    {
      provide: AppServiceIdentifiers.authService,
      useClass: AuthService,
    },
  ],
  exports: [AppServiceIdentifiers.authService],
})
export class AuthServiceModule {}
