import { Injectable } from "@nestjs/common";

import { GroupRepository } from "src/domain/repositories/groupRepositary.interface";
import { PrismaService } from "../services/prisma/prisma.service";
import { Group } from "@prisma/client";
import { UserGroupM } from "src/domain/model/user-group";

@Injectable()
export class DatabaseGroupRepository implements GroupRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async add(group_name: string, admin_user_id: number): Promise<UserGroupM> {
    const cGroup = await this.prismaService.group.create({
      data: {
        name: group_name,
        group_admin_id: admin_user_id,
      },
    });

    return {
      group_name: cGroup.name,
      admin: cGroup.group_admin_id,
    };
  }
}
