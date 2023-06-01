import { User } from "../../infrastructure/entities/user.entity";
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
    const adminUser = new User({ username, password, email, role });

    this.adminRepository.createUser(adminUser);
  }
}
