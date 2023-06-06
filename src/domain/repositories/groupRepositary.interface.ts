import { UserGroupM } from "../model/user-group";

export interface GroupRepository {
  add(group_name: string, admin_user_id: number): Promise<UserGroupM>;
}
