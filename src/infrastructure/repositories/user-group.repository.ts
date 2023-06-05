import { Injectable } from "@nestjs/common";

import { UserGroupRepository } from "src/domain/repositories/userGroupRepositary.interface";
import { PrismaService } from "../services/prisma/prisma.service";

@Injectable()
export class DatabaseUserGroupRepository implements UserGroupRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async addUserToGroup(group_id: number, user_id: number): Promise<void> {
    const userGroup = { user_id, group_id };

    await this.prismaService.userGroup.create({
      data: userGroup,
    });
  }
}
