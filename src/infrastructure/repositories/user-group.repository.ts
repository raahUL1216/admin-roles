import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserGroup } from "../entities/user-group.entity";
import { UserGroupRepository } from "src/domain/repositories/userGroupRepositary.interface";

@Injectable()
export class DatabaseUserGroupRepository implements UserGroupRepository {
  constructor(
    @InjectRepository(UserGroup)
    private readonly userGroupEntityRepository: Repository<UserGroup>
  ) {}

  async addUserToGroup(group_id: number, user_id: number): Promise<void> {
    await this.userGroupEntityRepository.insert({
      group_id,
      user_id,
    });
  }
}
