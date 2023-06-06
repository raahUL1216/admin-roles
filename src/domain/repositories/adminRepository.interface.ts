import { UserM } from "../model/user";

export interface AdminRepository {
  create(user: UserM): Promise<void>;
}
