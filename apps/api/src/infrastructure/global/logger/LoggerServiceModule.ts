import { Module } from "@nestjs/common";
import { GlobalServiceIdentifiers } from "../GlobalServiceIdentifiers";
import { LoggerService } from "./LoggerService";

@Module({
  providers: [
    {
      provide: GlobalServiceIdentifiers.loggerService,
      useClass: LoggerService,
    },
  ],
  exports: [GlobalServiceIdentifiers.loggerService],
})
export class LoggerServiceModule {}
