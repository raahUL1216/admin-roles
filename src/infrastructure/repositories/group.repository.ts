import { Injectable } from "@nestjs/common";

import { GroupRepository } from "src/domain/repositories/groupRepositary.interface";
import { PrismaService } from "../services/prisma/prisma.service";

@Injectable()
export class DatabaseGroupRepository implements GroupRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async add(group_name: string, admin_user_id: number): Promise<number> {
    const cGroup = await this.prismaService.group.create({
      data: {
        name: group_name,
        group_admin_id: admin_user_id,
      },
    });

    return cGroup.id;
  }
}
