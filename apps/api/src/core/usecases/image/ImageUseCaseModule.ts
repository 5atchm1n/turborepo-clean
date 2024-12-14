import { Module } from "@nestjs/common";
import { InfrastructureModules } from "../../../infrastructure";
import { ImageUseCaseIdentifiers } from "./ImageUseCaseIdentifiers";
import { CreateNewImageUseCase } from "./CreateNewImageUseCase";

@Module({
  imports: [InfrastructureModules],
  providers: [
    {
      provide: ImageUseCaseIdentifiers.createImage,
      useClass: CreateNewImageUseCase,
    },
  ],
  exports: [ImageUseCaseIdentifiers.createImage],
})
export class ImageUseCaseModule {}
