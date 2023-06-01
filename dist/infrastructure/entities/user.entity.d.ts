import { Role } from "../../enums/role.enum";
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: Role;
    createdate: Date;
    updateddate: Date;
    last_login?: Date;
    hash_refresh_token: string;
    constructor(user: Partial<User>);
}
