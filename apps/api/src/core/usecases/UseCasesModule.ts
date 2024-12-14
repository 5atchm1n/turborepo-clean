import { Module } from "@nestjs/common";
import { InfrastructureModules } from "../../infrastructure";
import { AuthUseCaseModule } from "./auth";
import { ImageUseCaseModule } from "./image";
import { ProjectUseCaseModule } from "./projects";
import { UserUseCaseModule } from "./user";

@Module({
  imports: [
    InfrastructureModules,
    ProjectUseCaseModule,
    UserUseCaseModule,
    AuthUseCaseModule,
    ImageUseCaseModule,
  ],
  exports: [
    InfrastructureModules,
    ProjectUseCaseModule,
    UserUseCaseModule,
    AuthUseCaseModule,
    ImageUseCaseModule,
  ],
})
export class UseCasesModule {}
