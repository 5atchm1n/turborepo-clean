import { Module } from "@nestjs/common";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";
import { BcryptService } from "./BcryptService";

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
