import { Module } from "@nestjs/common";
import { PrismaServiceModule } from "../../adapters";
import { RepositoryIdentifiers } from "../RepositoryIdentifiers";
import { ProjectRepository } from "./ProjectRepository";

@Module({
  imports: [PrismaServiceModule],
  providers: [
    {
      provide: RepositoryIdentifiers.projectRepository,
      useClass: ProjectRepository,
    },
  ],
  exports: [RepositoryIdentifiers.projectRepository],
})
export class ProjectRepositoryModule {}
