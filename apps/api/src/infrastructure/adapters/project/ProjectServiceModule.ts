import { Module } from "@nestjs/common";
import { ProjectRepositoryModule } from "../../repositories";
import { ProjectService } from "./ProjectService";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";
import { ImageServiceModule } from "../image";

@Module({
  imports: [ProjectRepositoryModule, ImageServiceModule],
  providers: [
    {
      provide: AppServiceIdentifiers.projectService,
      useClass: ProjectService,
    },
  ],
  exports: [AppServiceIdentifiers.projectService],
})
export class ProjectServiceModule {}
