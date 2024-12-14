import { CreateProjectData } from "../../../usecases";
import { ProjectModel } from "../../models";

export interface IProjectService {
  createProject(project: CreateProjectData): Promise<ProjectModel>;
  getProjectById(id: string): Promise<ProjectModel>;
  getProjects(): Promise<ProjectModel[]>;
}
