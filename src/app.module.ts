import { Module } from "@nestjs/common";

import { EnvironmentConfigModule } from "./infrastructure/config/environment-config/environment-config.module";
import { ControllersModule } from "./infrastructure/controllers/controllers.module";

import { AppController } from "./app.controller";

@Module({
  imports: [ControllersModule],
  controllers: [AppController],
})
export class AppModule {}
