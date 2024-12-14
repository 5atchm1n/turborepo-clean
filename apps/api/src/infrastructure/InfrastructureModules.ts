import { Module } from "@nestjs/common";

import { ServiceModule } from "./adapters";
import { GlobalServiceModule } from "./global";

@Module({
  imports: [GlobalServiceModule, ServiceModule],
  exports: [GlobalServiceModule, ServiceModule],
})
export class InfrastructureModules {}
