import { Module } from "@nestjs/common";
import { BcryptService } from "./BcryptService";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";

@Module({
  providers: [
    {
      provide: AppServiceIdentifiers.hashService,
      useClass: BcryptService,
    },
  ],
  exports: [AppServiceIdentifiers.hashService],
})
export class BcryptServiceModule {}
