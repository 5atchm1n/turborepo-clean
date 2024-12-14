import { Module } from "@nestjs/common";
import { InfrastructureModules } from "../../../infrastructure";
import { GetOneUserByIdUseCase } from "./GetOneUserByIdUseCase";
import { UserUseCaseIdentifiers } from "./UserUseCaseIdentifiers";
import { RegisterUseCase } from "../auth";
import { SubscribeNewsletterUsecase } from "./SubscribeNewsletterUsecase";

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
