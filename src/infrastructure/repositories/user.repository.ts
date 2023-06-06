import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/userRepositary.interface";
import { UserM } from "../../domain/model/user";
import { PrismaService } from "../services/prisma/prisma.service";

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByUsername(username: string): Promise<UserM> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    return new UserM(user);
  }

  async getUserByEmail(email: string): Promise<UserM> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return new UserM(user);
  }

  async create(user: UserM): Promise<void> {
    await this.prismaService.user.create({
      data: {
        ...user,
      },
    });
  }

  async updatePassword(username: string, password: string): Promise<void> {
    await this.prismaService.user.update({
      where: { username },
      data: {
        password,
      },
    });
  }

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
