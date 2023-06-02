export interface GroupRepository {
  add(group_name: string): Promise<number>;
}
