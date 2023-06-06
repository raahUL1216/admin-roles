import { Module } from "@nestjs/common";
import { AdminController } from "./admin/admin.controller";
import { UserController } from "./user/user.controller";
import { AuthModule } from "../services/auth/auth.module";
import { UsecasesProxyModule } from "../usecases-proxy/usecases-proxy.module";
import { AuthController } from "./auth/auth.controller";
import { JwtStrategy } from "../common/strategies/jwt.strategy";
import { LocalStrategy } from "../common/strategies/local.strategy";
import { JwtRefreshTokenStrategy } from "../common/strategies/jwtRefresh.strategy";
import { LoggerModule } from "../logger/logger.module";
import { ExceptionsModule } from "../exceptions/exceptions.module";

@Module({
  imports: [
    AuthModule,
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
  ],
  providers: [JwtStrategy, LocalStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController, AdminController, UserController],
})
export class ControllersModule {}
