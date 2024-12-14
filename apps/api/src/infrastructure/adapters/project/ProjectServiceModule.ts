import { Module } from "@nestjs/common";
import { ProjectRepositoryModule } from "../../repositories";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";
import { ImageServiceModule } from "../image";
import { ProjectService } from "./ProjectService";

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
