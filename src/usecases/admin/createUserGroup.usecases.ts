import { GroupRepository } from "src/domain/repositories/groupRepositary.interface";

export class createUserGroupUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(group_name: string): Promise<void> {
    this.groupRepository.add(group_name);
  }
}
