import { Server } from "node:net";
import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { ResponseFormat } from "../../index";
import { swaggerConfig } from "./swaggerConfig";

export function setupSwagger(
  env: string | undefined,
  app: INestApplication<Server>,
): void {
  if (env !== "production") {
    const config = swaggerConfig();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup("api", app, document);
  }
}
