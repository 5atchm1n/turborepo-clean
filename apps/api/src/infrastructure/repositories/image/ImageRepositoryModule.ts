import { Module } from "@nestjs/common";
import { PrismaServiceModule } from "../../adapters";
import { RepositoryIdentifiers } from "../RepositoryIdentifiers";
import { ImageRepository } from "./ImageRepository";

@Module({
  imports: [PrismaServiceModule],
  providers: [
    {
      provide: RepositoryIdentifiers.imageRepository,
      useClass: ImageRepository,
    },
  ],
  exports: [RepositoryIdentifiers.imageRepository],
})
export class ImageRepositoryModule {}
