import { User } from "../entity/user.entity";

export interface AdminRepository {
  createAdmin(user: User): Promise<void>;
  createAdminGroup(): Promise<void>;
  addAdminToGroup(role_id: number, user_ids: number[]): Promise<void>;
  removeAdminFromGroup(role_id: number, user_id: number): Promise<void>;
}
