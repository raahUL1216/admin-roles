import { User } from "@prisma/client";

export interface AdminRepository {
  add(user: User): Promise<void>;
}
