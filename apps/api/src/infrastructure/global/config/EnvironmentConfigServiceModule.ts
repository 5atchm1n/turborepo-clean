import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvironmentConfigService } from "./EnvironmentConfigService";
import { validate } from "./EnvironmentConfigValidation";
import { GlobalServiceIdentifiers } from "../GlobalServiceIdentifiers";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./env/local.env",
      ignoreEnvFile: !(
        process.env.NODE_ENV === "local" || process.env.NODE_ENV === "test"
      ),
      isGlobal: true,
      validate,
    }),
  ],
  providers: [
    {
      provide: GlobalServiceIdentifiers.environmentConfigService,
      useClass: EnvironmentConfigService,
    },
  ],
  exports: [GlobalServiceIdentifiers.environmentConfigService],
})
export class EnvironmentConfigServiceModule {}
