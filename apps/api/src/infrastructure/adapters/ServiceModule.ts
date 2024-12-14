import { Module } from "@nestjs/common";
import { AuthServiceModule } from "./auth";
import { BcryptServiceModule } from "./bcrypt";
import { ImageServiceModule } from "./image";
import { JsonWebTokenServiceModule } from "./jwt";
import { ProjectServiceModule } from "./project";
import { UserServiceModule } from "./user";

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
