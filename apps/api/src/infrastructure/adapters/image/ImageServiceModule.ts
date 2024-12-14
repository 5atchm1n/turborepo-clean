import { Module } from "@nestjs/common";
import { ImageRepositoryModule } from "../../repositories";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";
import { FileServiceModule } from "../file";
import { ImageService } from "./ImageService";

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
