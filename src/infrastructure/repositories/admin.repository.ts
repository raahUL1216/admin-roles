import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
import { User } from "../entities/user.entity";
import { Role } from "../../enums/role.enum";
import { Group } from "../entities/group.entity";

@Injectable()
export class DatabaseAdminRepository implements AdminRepository {
  constructor(
    @InjectRepository(User)
    private readonly adminEntityRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupEntityRepository: Repository<Group>
  ) {}

  async createAdmin(user: User): Promise<void> {
    const adminUser = new User(user);
    adminUser.role = Role.Admin;

    await this.adminEntityRepository.save(adminUser);
  }

  async createUser(user: User): Promise<void> {
    const cUser = new User(user);
    cUser.role = Role.User;

    await this.adminEntityRepository.save(cUser);
  }

  async createUserGroup(group_name: string): Promise<number> {
    const group = new Group(group_name);

    const cGroup = await this.groupEntityRepository.save(group);

    return cGroup.id;
  }

  async addUserToGroup(role_id: number, user_ids: number[]): Promise<void> {
    // const group = new Group();
    // const cGroup = await this.groupEntityRepository.save(group);
  }
}
