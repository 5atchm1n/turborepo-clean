import { Module } from "@nestjs/common";
import { InfrastructureModules } from "../../../infrastructure";
import { CreateNewImageUseCase } from "./CreateNewImageUseCase";
import { ImageUseCaseIdentifiers } from "./ImageUseCaseIdentifiers";

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
