import { Injectable } from '@nestjs/common';

import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
import { Role, User } from "@prisma/client";
import { PrismaService } from "../services/prisma/prisma.service";

@Injectable()
export class DatabaseAdminRepository implements AdminRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async add(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        ...user,
        role: Role.ADMIN,
      },
    });
  }
}
