import { Injectable } from '@nestjs/common';

import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
import { Role } from "@prisma/client";
import { PrismaService } from "../services/prisma/prisma.service";
import { UserM } from "src/domain/model/user";

@Injectable()
export class DatabaseAdminRepository implements AdminRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: UserM): Promise<void> {
    await this.prismaService.user.create({
      data: {
        ...user,
        role: Role.ADMIN,
      },
    });
  }
}
