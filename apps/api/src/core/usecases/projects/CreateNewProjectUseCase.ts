import { Inject, Injectable } from "@nestjs/common";
import { AppServiceIdentifiers } from "../../../infrastructure";
import {
  IProjectService,
  IUseCase,
  IUserService,
  ProjectModel,
} from "../../domain";
import { CreateProjectData } from "./CreateProjectData";
import { ProjectData } from "./models";

@Injectable()
export class CreateNewProjectUseCase
  implements IUseCase<CreateProjectData, Promise<ProjectData>>
{
  constructor(
    @Inject(AppServiceIdentifiers.projectService)
    private readonly projectService: IProjectService,
    @Inject(AppServiceIdentifiers.userService)
    private readonly userService: IUserService,
  ) {}

  async execute(projectData: CreateProjectData): Promise<ProjectData> {
    const project: ProjectModel =
      await this.projectService.createProject(projectData);

    const user = await this.userService.getUserById(projectData.user_id);
    return {
      project,
      images: project.images,
      user,
    };
  }
}
