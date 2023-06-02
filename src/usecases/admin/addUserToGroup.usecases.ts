import { UserGroupRepository } from "src/domain/repositories/userGroupRepositary.interface";

export class addUserToGroupUseCases {
  constructor(private readonly userGroupRepository: UserGroupRepository) {}

  async execute(group_id: number, user_ids: number[]): Promise<void> {
    for (const user_id of user_ids) {
      await this.userGroupRepository.addUserToGroup(group_id, user_id);
    }
  }
}
