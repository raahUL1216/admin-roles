import { Role } from "../../enums/role.enum";
export declare class UserWithoutPassword {
    id: number;
    username: string;
    email: string;
    role: Role;
    createDate: Date;
    updatedDate: Date;
    lastLogin: Date;
    hashRefreshToken: string;
}
export declare class UserM extends UserWithoutPassword {
    password: string;
}
