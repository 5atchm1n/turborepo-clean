import { Module } from "@nestjs/common";
import { PrismaServiceModule } from "../../adapters";
import { RepositoryIdentifiers } from "../RepositoryIdentifiers";
import { FileRepository } from "./FileRepository";

@Module({
  imports: [PrismaServiceModule],
  providers: [
    {
      provide: RepositoryIdentifiers.fileRepository,
      useClass: FileRepository,
    },
  ],
  exports: [RepositoryIdentifiers.fileRepository],
})
export class FileRepositoryModule {}
