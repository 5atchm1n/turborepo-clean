import { Module } from "@nestjs/common";
import { UseCasesModule } from "../../core";
import { AuthController } from "./auth/AuthController";
import { ImageController } from "./image/ImageController";
import { ProjectController } from "./project/ProjectController";
import { UserController } from "./user/UserController";

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
