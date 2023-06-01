import { Repository } from "typeorm";
import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
import { User } from "../entities/user.entity";
import { Group } from "../entities/group.entity";
export declare class DatabaseAdminRepository implements AdminRepository {
    private readonly adminEntityRepository;
    private readonly groupEntityRepository;
    constructor(adminEntityRepository: Repository<User>, groupEntityRepository: Repository<Group>);
    createAdmin(user: User): Promise<void>;
    createUser(user: User): Promise<void>;
    createUserGroup(group_name: string): Promise<number>;
    addUserToGroup(role_id: number, user_ids: number[]): Promise<void>;
}
