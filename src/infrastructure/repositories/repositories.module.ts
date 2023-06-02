import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { DatabaseAdminRepository } from "./admin.repository";
import { User } from "../entities/user.entity";
import { Group } from "../entities/group.entity";
import { DatabaseUserRepository } from "./user.repository";
import { Auth } from "../entities/auth.entity";
import { RolePermission } from "../entities/role-permission.entity";
import { DatabaseGroupRepository } from "./group.repository";
import { DatabaseUserGroupRepository } from "./user-group.repository";
import { UserGroup } from "../entities/user-group.entity";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Auth, User, Group, UserGroup, RolePermission]),
  ],
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
