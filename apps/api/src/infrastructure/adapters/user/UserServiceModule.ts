import { Module } from "@nestjs/common";
import { UserService } from "./UserService";
import { UserRepositoryModule } from "../../repositories";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";

@Module({
  imports: [UserRepositoryModule],
  providers: [
    {
      provide: AppServiceIdentifiers.userService,
      useClass: UserService,
    },
  ],
  exports: [AppServiceIdentifiers.userService],
})
export class UserServiceModule {}
