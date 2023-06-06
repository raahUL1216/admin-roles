import { BcryptService } from "./../services/bcrypt/bcrypt.service";
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
import { createUserUseCases } from "src/usecases/user/createUser.usecases";
import { UserService } from "../services/user/user.service";
import { updatePasswordUseCases } from "src/usecases/user/updatePassword.usecases";
import { UserModule } from "../services/user/user.module";

@Module({
  imports: [LoggerModule, AuthModule, UserModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = "LoginUseCasesProxy";
  static IS_AUTHENTICATED_USECASES_PROXY = "IsAuthenticatedUseCasesProxy";
  static LOGOUT_USECASES_PROXY = "LogoutUseCasesProxy";

  static CREATE_ADMIN_USECASES_PROXY = "createAdminUsecasesProxy";
  static CREATE_ADMIN__GROUP_USECASES_PROXY = "createAdminGroupUsecasesProxy";
  static ADD_USER_TO_GROUP_USECASES_PROXY = "addUserToGroupUsecasesProxy";

  static CREATE_USER_USECASES_PROXY = "createUserUsecasesProxy";
  static UPDATE_PASSWORD_USECASES_PROXY = "updatePasswordUsecasesProxy";

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            DatabaseUserRepository,
            JwtTokenService,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
            jwtTokenService: JwtTokenService,
            bcryptService: BcryptService
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                userRepo,
                jwtTokenService,
                bcryptService
              )
            ),
        },
        {
          inject: [DatabaseAdminRepository, BcryptService],
          provide: UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY,
          useFactory: (
            adminRepo: DatabaseAdminRepository,
            bcryptService: BcryptService
          ) =>
            new UseCaseProxy(new createAdminUseCases(adminRepo, bcryptService)),
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
        {
          inject: [DatabaseUserRepository, BcryptService, UserService],
          provide: UsecasesProxyModule.CREATE_USER_USECASES_PROXY,
          useFactory: (
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
            userService: UserService
          ) =>
            new UseCaseProxy(
              new createUserUseCases(userRepo, bcryptService, userService)
            ),
        },
        {
          inject: [UserService],
          provide: UsecasesProxyModule.UPDATE_PASSWORD_USECASES_PROXY,
          useFactory: (userService: UserService) =>
            new UseCaseProxy(new updatePasswordUseCases(userService)),
        },
      ],
      exports: [
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY,
        UsecasesProxyModule.CREATE_ADMIN__GROUP_USECASES_PROXY,
        UsecasesProxyModule.ADD_USER_TO_GROUP_USECASES_PROXY,
        UsecasesProxyModule.CREATE_USER_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_PASSWORD_USECASES_PROXY,
      ],
    };
  }
}
