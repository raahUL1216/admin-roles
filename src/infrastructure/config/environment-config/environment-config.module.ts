import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvironmentConfigService } from "./environment-config.service";
import { validate } from "./environment-config.validation";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./src/infrastructure/prisma/.env",
      ignoreEnvFile: process.env.NODE_ENV === "local" ? false : true,
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
