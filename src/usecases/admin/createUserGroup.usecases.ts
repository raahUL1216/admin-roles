import { GroupRepository } from "src/domain/repositories/groupRepositary.interface";

export class createUserGroupUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(group_name: string, admin_id: number): Promise<void> {
    this.groupRepository.add(group_name, admin_id);
  }
}
