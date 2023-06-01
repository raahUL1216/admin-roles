import { AdminRepository } from "../../domain/repositories/adminRepository.interface";

export class createUserGroupUseCases {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(group_name): Promise<void> {
    this.adminRepository.createUserGroup(group_name);
  }
}
