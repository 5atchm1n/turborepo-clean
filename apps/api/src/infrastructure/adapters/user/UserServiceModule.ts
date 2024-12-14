import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "../../repositories";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";
import { UserService } from "./UserService";

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
