import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { DatabaseAdminRepository } from "./admin.repository";
import { User } from "../entities/user.entity";
import { Group } from "../entities/group.entity";
import { DatabaseUserRepository } from "./user.repository";
import { Auth } from "../entities/auth.entity";
import { RolePermission } from "../entities/role-permission.entity";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Auth, User, Group, RolePermission]),
  ],
  providers: [DatabaseAdminRepository, DatabaseUserRepository],
  exports: [DatabaseAdminRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
