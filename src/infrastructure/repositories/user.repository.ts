import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../../domain/repositories/userRepositary.interface";
import { UserM } from "../../domain/model/user";
import { Role, User } from "@prisma/client";
import { PrismaService } from "../services/prisma/prisma.service";

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByUsername(username: string): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        username,
      },
    });
  }

  //   async add(user: UserM): Promise<void> {
  //     const cUser = new User(user);
  //     cUser.role = Role.USER;

  //     await this.userEntityRepository.insert(cUser);
  //   }

  //   async updateRefreshToken(
  //     username: string,
  //     refreshToken: string
  //   ): Promise<void> {
  //     await this.userEntityRepository.update(
  //       {
  //         username: username,
  //       },
  //       { hash_refresh_token: refreshToken }
  //     );
  //   }
  //   async getUserByUsername(username: string): Promise<UserM> {
  //     const adminUserEntity = await this.userEntityRepository.findOne({
  //       where: {
  //         username: username,
  //       },
  //     });
  //     if (!adminUserEntity) {
  //       return null;
  //     }
  //     return this.toUser(adminUserEntity);
  //   }
  //   async updateLastLogin(username: string): Promise<void> {
  //     await this.userEntityRepository.update(
  //       {
  //         username: username,
  //       },
  //       { last_login: () => "CURRENT_TIMESTAMP" }
  //     );
  //   }

  //   private toUser(adminUserEntity: User): UserM {
  //     const adminUser: UserM = new UserM(adminUserEntity);

  //     adminUser.id = adminUserEntity.id;
  //     adminUser.username = adminUserEntity.username;
  //     adminUser.password = adminUserEntity.password;
  //     adminUser.createDate = adminUserEntity.createdate;
  //     adminUser.updatedDate = adminUserEntity.updateddate;
  //     adminUser.lastLogin = adminUserEntity.last_login;
  //     adminUser.hashRefreshToken = adminUserEntity.hash_refresh_token;

  //     return adminUser;
  //   }

  //   private toUserEntity(adminUser: UserM): User {
  //     const adminUserEntity: User = new User(adminUser);

  //     return adminUserEntity;
  //   }
}
