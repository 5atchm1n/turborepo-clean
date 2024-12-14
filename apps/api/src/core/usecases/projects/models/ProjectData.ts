import { ImageModel, ProjectModel, UserModel } from "../../../domain";

export interface ProjectData {
  project: ProjectModel;
  images: ImageModel[];
  user: UserModel;
}
