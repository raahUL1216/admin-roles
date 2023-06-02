import { AdminRepository } from "../../domain/repositories/adminRepository.interface";

export class addUserToGroupUseCases {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(group_id: number, user_ids: number[]): Promise<void> {
	for (const user_id of user_ids)
    await this.adminRepository.addUserToGroup(group_id, user_id);
  }
}
