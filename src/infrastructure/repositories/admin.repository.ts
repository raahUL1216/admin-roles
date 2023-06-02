import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
import { User } from "../entities/user.entity";
import { Role } from "../../enums/role.enum";
import { UserM } from "src/domain/model/user";

@Injectable()
export class DatabaseAdminRepository implements AdminRepository {
  constructor(
    @InjectRepository(User)
    private readonly adminEntityRepository: Repository<User>
  ) {}

  async add(user: UserM): Promise<void> {
    const adminUser = new User(user);
    adminUser.role = Role.Admin;

    await this.adminEntityRepository.insert(adminUser);
  }
}
