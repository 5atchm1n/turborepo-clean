import { ProjectModel } from "../../models";
import { CreateProjectData } from "../../../usecases";

export interface IProjectService {
  createProject(project: CreateProjectData): Promise<ProjectModel>;
  getProjectById(id: string): Promise<ProjectModel>;
  getProjects(): Promise<ProjectModel[]>;
}
