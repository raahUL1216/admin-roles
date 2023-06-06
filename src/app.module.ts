import { Module } from "@nestjs/common";
import { ControllersModule } from "./infrastructure/controllers/controllers.module";

import { AppController } from "./app.controller";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./infrastructure/common/guards/jwtAuth.guard";

@Module({
  imports: [ControllersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
