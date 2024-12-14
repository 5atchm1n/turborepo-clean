import { CreateImageModel, ImageModel } from "../../models";

export interface IImageService {
  createImage(image: CreateImageModel): Promise<ImageModel>;
  createImages(images: CreateImageModel[]): Promise<ImageModel[]>;
  getImageById(id: string): Promise<ImageModel>;
  getImages(): Promise<ImageModel[]>;
  deleteImage(id: string): Promise<ImageModel>;
  getImagesByProjectId(projectId: string): Promise<ImageModel[]>;
}
