import { Module } from "@nestjs/common";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";
import { ImageService } from "./ImageService";
import { ImageRepositoryModule } from "../../repositories";
import { FileServiceModule } from "../file";

@Module({
  imports: [ImageRepositoryModule, FileServiceModule],
  providers: [
    {
      provide: AppServiceIdentifiers.imageService,
      useClass: ImageService,
    },
  ],
  exports: [AppServiceIdentifiers.imageService],
})
export class ImageServiceModule {}
