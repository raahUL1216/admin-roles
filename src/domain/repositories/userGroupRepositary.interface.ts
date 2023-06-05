export interface UserGroupRepository {
  addUserToGroup(group_id: number, user_id: number): Promise<void>;
}
