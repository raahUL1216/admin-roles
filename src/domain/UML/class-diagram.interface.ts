export interface Permission {
  name: string;
  description: string;

  grantTo(role: Role): void;
  revokeFrom(role: Role): void;
}

export interface Role {
  name: string;
  permissions: Array<Permission>;

  addPermission(permission: Permission): void;
  removePermission(permission: Permission): void;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: Role;
}

export interface SuperAdmin extends User {
  createGroup(name: string): void;
  assignAdminToGroup(groupName: string, admin: User): void;
}

export interface Admin extends User {
  createPowerUser(username: string): void;
  createUser(username: string): void;
}

export interface PowerUser extends User {
  viewAllUserData(): void;
}

export interface SupportDesk extends User {
  viewAllTransactions(): void;
}

export interface UserTransaction {
  id: number;
  text: string;
  author: User;
  createdAt: Date;

  createTransaction(text: string): void;
  deleteTransaction(id: number): void;
  viewTransaction(id: number): void;

  setAuthor(author: User): void;
  setCreatedAt(createdAt: Date): void;
}
