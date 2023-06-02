import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Group } from "../entities/group.entity";
import { GroupRepository } from "src/domain/repositories/groupRepositary.interface";

@Injectable()
export class DatabaseGroupRepository implements GroupRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupEntityRepository: Repository<Group>
  ) {}

  async add(group_name: string): Promise<number> {
    const group = new Group(group_name);

    const cGroup = await this.groupEntityRepository.save(group);

    return cGroup.id;
  }
}
