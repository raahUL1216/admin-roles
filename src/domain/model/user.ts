import { Role } from "@prisma/client";

export class UserWithoutPassword {
  id!: number;
  username: string;
  email!: string;
  role!: Role;

  createDate!: Date;
  updatedDate!: Date;
  lastLogin!: Date;
  hashRefreshToken!: string;

  constructor(user: Partial<UserM>) {
    Object.assign(this, user);
  }
}

export class UserM extends UserWithoutPassword {
  password: string;

  constructor(user: Partial<UserM>) {
    super(user);
  }
}
