import { Module } from "@nestjs/common";
import { DatabaseAdminRepository } from "./admin.repository";
import { DatabaseUserRepository } from "./user.repository";
import { DatabaseGroupRepository } from "./group.repository";
import { DatabaseUserGroupRepository } from "./user-group.repository";
import { PrismaModule } from "../services/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    DatabaseAdminRepository,
    DatabaseUserRepository,
    DatabaseGroupRepository,
    DatabaseUserGroupRepository,
  ],
  exports: [
    DatabaseAdminRepository,
    DatabaseUserRepository,
    DatabaseGroupRepository,
    DatabaseUserGroupRepository,
  ],
})
export class RepositoriesModule {}
