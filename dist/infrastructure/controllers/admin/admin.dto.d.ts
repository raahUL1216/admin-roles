import { Role } from "../../../enums/role.enum";
export declare class UserDto {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly role: Role;
}
export declare class UserGroupDto {
    readonly group_id: number;
    readonly user_ids: number[];
}
