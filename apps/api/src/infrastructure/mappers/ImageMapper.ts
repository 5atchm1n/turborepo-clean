import { ImageEntity } from "../entities";
import { CreateImageModel, FileModel, ImageModel } from "../../core";

export class ImageMapper {
  private constructor() {}

  static toModel(image: ImageEntity, file: FileModel): ImageModel {
    return {
      id: image.id,
      name: image.name,
      description: image.description,
      file: file,
    };
  }

  static toEntity(
    image: Partial<CreateImageModel>,
    file: FileModel,
  ): Partial<ImageEntity> {
    return {
      name: image.name,
      description: image.description,
      file_id: file.id,
    };
  }
}
