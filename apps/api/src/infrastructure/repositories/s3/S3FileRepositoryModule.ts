import { Module } from "@nestjs/common";
import { EnvironmentConfigServiceModule } from "../../global";
import { RepositoryIdentifiers } from "../RepositoryIdentifiers";
import { S3FileRepository } from "./S3FileRepository";

@Module({
  imports: [EnvironmentConfigServiceModule],
  providers: [
    {
      provide: RepositoryIdentifiers.s3FileRepository,
      useClass: S3FileRepository,
    },
  ],
  exports: [RepositoryIdentifiers.s3FileRepository],
})
export class S3FileRepositoryModule {}
