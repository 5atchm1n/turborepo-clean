import { CreateImageModel, ProjectModel } from "../../domain";

export class CreateProjectData {
  user_id: string;
  project: Partial<ProjectModel>;
  images: CreateImageModel[];
}
