import { Module } from "@nestjs/common";
import { AuthController } from "./auth/AuthController";
import { UseCasesModule } from "../../core";
import { ProjectController } from "./project/ProjectController";
import { UserController } from "./user/UserController";
import { ImageController } from "./image/ImageController";

@Module({
  imports: [UseCasesModule],
  controllers: [
    AuthController,
    ProjectController,
    UserController,
    ImageController,
  ],
  exports: [UseCasesModule],
})
export class ControllersModule {}
