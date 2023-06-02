import { UserM } from "../model/user";

export interface AdminRepository {
  add(user: UserM): Promise<void>;
}
