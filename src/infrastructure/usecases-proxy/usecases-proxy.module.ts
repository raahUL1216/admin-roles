import { DynamicModule, Module } from "@nestjs/common";
import { LoginUseCases } from "../../usecases/auth/login.usecases";

import { LoggerModule } from "../logger/logger.module";
import { LoggerService } from "../logger/logger.service";

import { RepositoriesModule } from "../repositories/repositories.module";

import { DatabaseUserRepository } from "../repositories/user.repository";

import { createAdminUseCases } from "../../usecases/admin/createAdmin.usecases";
import { DatabaseAdminRepository } from "../repositories/admin.repository";
import { createUserGroupUseCases } from "../../usecases/admin/createUserGroup.usecases";
import { addUserToGroupUseCases } from "../../usecases/admin/addUserToGroup.usecases";

import { UseCaseProxy } from "./usecases-proxy";
import { DatabaseUserGroupRepository } from "../repositories/user-group.repository";
import { DatabaseGroupRepository } from "../repositories/group.repository";
import { AuthModule } from "../services/auth/auth.module";
import { JwtTokenService } from "../services/jwt/jwt.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [LoggerModule, AuthModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = "LoginUseCasesProxy";
  static IS_AUTHENTICATED_USECASES_PROXY = "IsAuthenticatedUseCasesProxy";
  static LOGOUT_USECASES_PROXY = "LogoutUseCasesProxy";

  static CREATE_ADMIN_USECASES_PROXY = "createAdminUsecasesProxy";
  static CREATE_ADMIN__GROUP_USECASES_PROXY = "createAdminGroupUsecasesProxy";
  static ADD_USER_TO_GROUP_USECASES_PROXY = "addUserToGroupUsecasesProxy";

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, DatabaseUserRepository, JwtTokenService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
            jwtTokenService: JwtTokenService
          ) =>
            new UseCaseProxy(
              new LoginUseCases(logger, userRepo, jwtTokenService)
            ),
        },
        {
          inject: [DatabaseAdminRepository],
          provide: UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY,
          useFactory: (adminRepo: DatabaseAdminRepository) =>
            new UseCaseProxy(new createAdminUseCases(adminRepo)),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.CREATE_ADMIN__GROUP_USECASES_PROXY,
          useFactory: (groupRepo: DatabaseGroupRepository) =>
            new UseCaseProxy(new createUserGroupUseCases(groupRepo)),
        },
        {
          inject: [DatabaseUserGroupRepository],
          provide: UsecasesProxyModule.ADD_USER_TO_GROUP_USECASES_PROXY,
          useFactory: (userGroupRepo: DatabaseUserGroupRepository) =>
            new UseCaseProxy(new addUserToGroupUseCases(userGroupRepo)),
        },
      ],
      exports: [
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY,
        UsecasesProxyModule.CREATE_ADMIN__GROUP_USECASES_PROXY,
        UsecasesProxyModule.ADD_USER_TO_GROUP_USECASES_PROXY,
      ],
    };
  }
}
