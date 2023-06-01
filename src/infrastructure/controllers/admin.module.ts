import { Module } from "@nestjs/common";
import { UsecasesProxyModule } from "../usecases-proxy/usecases-proxy.module";
import { AuthController } from "./auth/auth.controller";
import { AdminController } from "./admin/admin.controller";

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, AdminController],
})
export class AdminModule {}
