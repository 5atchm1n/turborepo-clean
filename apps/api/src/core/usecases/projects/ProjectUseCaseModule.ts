import { Module } from "@nestjs/common";
import { InfrastructureModules } from "../../../infrastructure";
import { ProjectUseCaseIdentifiers } from "./ProjectUseCaseIdentifiers";
import { CreateNewProjectUseCase } from "./CreateNewProjectUseCase";
import { GetAllProjectsUseCase } from "./GetAllProjectsUseCase";

@Module({
  imports: [InfrastructureModules],
  providers: [
    {
      provide: ProjectUseCaseIdentifiers.createProjectUseCase,
      useClass: CreateNewProjectUseCase,
    },
    {
      provide: ProjectUseCaseIdentifiers.getAllProjectsUseCase,
      useClass: GetAllProjectsUseCase,
    },
  ],
  exports: [
    ProjectUseCaseIdentifiers.createProjectUseCase,
    ProjectUseCaseIdentifiers.getAllProjectsUseCase,
  ],
})
export class ProjectUseCaseModule {}
