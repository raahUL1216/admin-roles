import { UserM } from "../model/user";

export interface UserRepository {
  getUserByUsername(username: string): Promise<UserM>;
  getUserByEmail(email: string): Promise<UserM>;
  create(user: UserM): Promise<void>;
  updatePassword(username: string, password: string): Promise<void>;

  //   updateLastLogin(username: string): Promise<void>;
  //   updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}
