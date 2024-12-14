import { Inject, Injectable } from "@nestjs/common";
import { IProjectService, IUseCase, IUserService } from "../../domain";
import { AppServiceIdentifiers } from "../../../infrastructure";
import { ProjectData } from "./models";

@Injectable()
export class GetAllProjectsUseCase implements IUseCase<void, ProjectData[]> {
  constructor(
    @Inject(AppServiceIdentifiers.projectService)
    private readonly projectService: IProjectService,
    @Inject(AppServiceIdentifiers.userService)
    private readonly userService: IUserService,
  ) {}
  async execute(): Promise<ProjectData[]> {
    const projects = await this.projectService.getProjects();
    const projectDataPromises = projects.map(async (project) => {
      const user = await this.userService.getUserById(project.userId);
      const projectData: ProjectData = {
        project,
        images: project.images,
        user,
      };
      return projectData;
    });
    return Promise.all(projectDataPromises);
  }
}
