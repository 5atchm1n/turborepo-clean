import { Module } from "@nestjs/common";
import { PrismaServiceModule } from "../../adapters";
import { RepositoryIdentifiers } from "../RepositoryIdentifiers";
import { UserRepository } from "./UserRepository";

@Module({
  imports: [PrismaServiceModule],
  providers: [
    {
      provide: RepositoryIdentifiers.userRepository,
      useClass: UserRepository,
    },
  ],
  exports: [RepositoryIdentifiers.userRepository],
})
export class UserRepositoryModule {}
