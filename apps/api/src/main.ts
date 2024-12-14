import { Server } from "node:net";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupNestApplication, setupSwagger } from "./common/config";

async function bootstrap(): Promise<void> {
  const env = process.env.NODE_ENV;
  const app: INestApplication<Server> = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  setupNestApplication(app);

  setupSwagger(env, app);

  await app.listen(3001);
}

void bootstrap();
