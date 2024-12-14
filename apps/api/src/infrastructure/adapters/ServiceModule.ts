import { Module } from "@nestjs/common";
import { BcryptServiceModule } from "./bcrypt";
import { JsonWebTokenServiceModule } from "./jwt";
import { UserServiceModule } from "./user";
import { ProjectServiceModule } from "./project";
import { ImageServiceModule } from "./image";
import { AuthServiceModule } from "./auth";

@Module({
  imports: [
    BcryptServiceModule,
    JsonWebTokenServiceModule,
    UserServiceModule,
    ProjectServiceModule,
    ImageServiceModule,
    AuthServiceModule,
  ],
  exports: [
    BcryptServiceModule,
    JsonWebTokenServiceModule,
    UserServiceModule,
    ProjectServiceModule,
    ImageServiceModule,
    AuthServiceModule,
  ],
})
export class ServiceModule {}
