import { Module } from "@nestjs/common";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";
import { FileService } from "./FileService";
import {
  FileRepositoryModule,
  S3FileRepositoryModule,
} from "../../repositories";

@Module({
  imports: [FileRepositoryModule, S3FileRepositoryModule],
  providers: [
    {
      provide: AppServiceIdentifiers.fileService,
      useClass: FileService,
    },
  ],
  exports: [AppServiceIdentifiers.fileService],
})
export class FileServiceModule {}
