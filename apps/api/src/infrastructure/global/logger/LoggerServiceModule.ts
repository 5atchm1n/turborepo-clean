import { Module } from "@nestjs/common";
import { LoggerService } from "./LoggerService";
import { GlobalServiceIdentifiers } from "../GlobalServiceIdentifiers";

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
