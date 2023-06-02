import { User } from "../../infrastructure/entities/user.entity";

export interface AdminRepository {
  createAdmin(user: User): Promise<void>;
  createUser(user: User): Promise<void>;
  createUserGroup(group_name: string): Promise<number>;
  addUserToGroup(group_id: number, user_id: number): Promise<void>;
}
