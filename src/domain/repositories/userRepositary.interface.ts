import { User } from '../entity/user.entity';

export interface UserRepository {
  getUserByUsername(username: string): Promise<User>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}