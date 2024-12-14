import { Module } from "@nestjs/common";
import { InfrastructureModules } from "../../../infrastructure";
import { CreateNewProjectUseCase } from "./CreateNewProjectUseCase";
import { GetAllProjectsUseCase } from "./GetAllProjectsUseCase";
import { ProjectUseCaseIdentifiers } from "./ProjectUseCaseIdentifiers";

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
