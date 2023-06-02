import { UserM } from "../model/user";

export interface UserRepository {
  add(user: UserM): Promise<void>;
  getUserByUsername(username: string): Promise<UserM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}
