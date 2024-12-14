import {
  CreateImageModel,
  IImageService,
  ImageModel,
  IUseCase,
} from "../../domain";
import { Inject } from "@nestjs/common";
import { AppServiceIdentifiers } from "../../../infrastructure";

export interface ImagePayload {
  name: string;
  description: string;
  file: Express.Multer.File;
  metadata?: string;
}

export class CreateNewImageUseCase
  implements IUseCase<ImagePayload, ImageModel>
{
  constructor(
    @Inject(AppServiceIdentifiers.imageService)
    private readonly imageService: IImageService,
  ) {}

  execute(payload: ImagePayload): Promise<ImageModel> {
    return this.imageService.createImage(this.toImageModel(payload));
  }

  toImageModel(image: ImagePayload): CreateImageModel {
    return {
      name: image.name,
      description: image.description,
      file: image.file,
    };
  }
}
