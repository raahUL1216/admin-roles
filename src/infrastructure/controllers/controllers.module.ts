import { Module } from "@nestjs/common";
import { AdminController } from "./admin/admin.controller";
import { UserController } from "./user/user.controller";
import { AuthModule } from "../services/auth/auth.module";
import { UsecasesProxyModule } from "../usecases-proxy/usecases-proxy.module";
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [AuthModule, UsecasesProxyModule.register()],
  controllers: [AuthController, AdminController, UserController],
})
export class ControllersModule {}
