import { AdminRepository } from "./../../domain/repositories/adminRepository.interface";
import { DynamicModule, Module } from "@nestjs/common";
import { IsAuthenticatedUseCases } from "../../usecases/auth/isAuthenticated.usecases";
import { LoginUseCases } from "../../usecases/auth/login.usecases";
import { LogoutUseCases } from "../../usecases/auth/logout.usecases";

import { ExceptionsModule } from "../exceptions/exceptions.module";
import { LoggerModule } from "../logger/logger.module";
import { LoggerService } from "../logger/logger.service";

import { BcryptModule } from "../services/bcrypt/bcrypt.module";
import { BcryptService } from "../services/bcrypt/bcrypt.service";
import { JwtModule } from "../services/jwt/jwt.module";
import { JwtTokenService } from "../services/jwt/jwt.service";
import { RepositoriesModule } from "../repositories/repositories.module";

import { DatabaseUserRepository } from "../repositories/user.repository";

import { EnvironmentConfigModule } from "../config/environment-config/environment-config.module";
import { EnvironmentConfigService } from "../config/environment-config/environment-config.service";
import { createAdminUseCases } from "../../usecases/admin/createAdmin.usecases";
import { DatabaseAdminRepository } from "../repositories/admin.repository";
import { createUserGroupUseCases } from "../../usecases/admin/createUserGroup.usecases";
import { addUserToGroupUseCases } from "../../usecases/admin/addUserToGroup.usecases";

import { UseCaseProxy } from "./usecases-proxy";
import { AdminModule } from "../controllers/admin.module";

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = "LoginUseCasesProxy";
  static IS_AUTHENTICATED_USECASES_PROXY = "IsAuthenticatedUseCasesProxy";
  static LOGOUT_USECASES_PROXY = "LogoutUseCasesProxy";

  static CREATE_ADMIN_USECASES_PROXY = "createAdminUsecasesProxy";
  static CREATE_ADMIN__GROUP_USECASES_PROXY = "createAdminGroupUsecasesProxy";
  static ADD_ADMIN_TO_GROUP_USECASES_PROXY = "addAdminToGroupUsecasesProxy";

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService
              )
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [DatabaseAdminRepository],
          provide: UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY,
          useFactory: (adminRepo: DatabaseAdminRepository) =>
            new UseCaseProxy(new createAdminUseCases(adminRepo)),
        },
        {
          inject: [DatabaseAdminRepository],
          provide: UsecasesProxyModule.CREATE_ADMIN__GROUP_USECASES_PROXY,
          useFactory: (adminRepo: DatabaseAdminRepository) =>
            new UseCaseProxy(new createUserGroupUseCases(adminRepo)),
        },
        {
          inject: [DatabaseAdminRepository],
          provide: UsecasesProxyModule.ADD_ADMIN_TO_GROUP_USECASES_PROXY,
          useFactory: (adminRepo: DatabaseAdminRepository) =>
            new UseCaseProxy(new addUserToGroupUseCases(adminRepo)),
        },
      ],
      exports: [
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY,
        UsecasesProxyModule.CREATE_ADMIN__GROUP_USECASES_PROXY,
        UsecasesProxyModule.ADD_ADMIN_TO_GROUP_USECASES_PROXY,
      ],
    };
  }
}
