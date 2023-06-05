import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
import { PrismaService } from "src/infrastructure/services/prisma/prisma.service";
import { Role } from "@prisma/client";

export class createAdminUseCases {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(
    username: string,
    password: string,
    email: string
  ): Promise<void> {
    // this.prismaService.user.create({
    //   data: {
    //     username,
    //     password,
    //     email,
    //     role: Role.ADMIN,
    //   },
    // });
  }
}
