import { Module } from "@nestjs/common";
import { InfrastructureModules } from "../../../infrastructure";
import { RegisterUseCase } from "../auth";
import { GetOneUserByIdUseCase } from "./GetOneUserByIdUseCase";
import { SubscribeNewsletterUsecase } from "./SubscribeNewsletterUsecase";
import { UserUseCaseIdentifiers } from "./UserUseCaseIdentifiers";

@Module({
  imports: [InfrastructureModules],
  providers: [
    {
      provide: UserUseCaseIdentifiers.getOneUserByIdUseCase,
      useClass: GetOneUserByIdUseCase,
    },
    {
      provide: UserUseCaseIdentifiers.registerUseCase,
      useClass: RegisterUseCase,
    },
    {
      provide: UserUseCaseIdentifiers.subscribeNewsletterUseCase,
      useClass: SubscribeNewsletterUsecase,
    },
  ],
  exports: [
    UserUseCaseIdentifiers.getOneUserByIdUseCase,
    UserUseCaseIdentifiers.registerUseCase,
    UserUseCaseIdentifiers.subscribeNewsletterUseCase,
  ],
})
export class UserUseCaseModule {}
