import { Role } from "../../enums/role.enum";

export class UserWithoutPassword {
  id!: number;
  username: string;
  email!: string;
  role!: Role;

  createDate!: Date;
  updatedDate!: Date;
  lastLogin!: Date;
  hashRefreshToken!: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
