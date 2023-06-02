import { UserM } from "src/domain/model/user";
import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
import { Role } from "../../enums/role.enum";

export class createAdminUseCases {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(
    username: string,
    password: string,
    email: string,
    role: Role
  ): Promise<void> {
    const adminUser = new UserM({ username, password, email, role });

    adminUser.role = Role.Admin;

    this.adminRepository.add(adminUser);
  }
}
