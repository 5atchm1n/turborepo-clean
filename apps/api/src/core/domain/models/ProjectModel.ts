import { ImageModel } from "./ImageModel";

export class ProjectModel {
  id: string;
  name: string;
  description: string;
  images: ImageModel[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
