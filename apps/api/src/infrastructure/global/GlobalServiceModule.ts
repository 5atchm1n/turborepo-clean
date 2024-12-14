import { Module } from "@nestjs/common";
import { EnvironmentConfigServiceModule } from "./config";
import { LoggerServiceModule } from "./logger";

@Module({
  imports: [EnvironmentConfigServiceModule, LoggerServiceModule],
  exports: [EnvironmentConfigServiceModule, LoggerServiceModule],
})
export class GlobalServiceModule {}
