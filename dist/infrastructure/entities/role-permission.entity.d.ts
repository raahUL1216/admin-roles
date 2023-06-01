import { Permission } from "../../enums/permission.enum";
import { Role } from "../../enums/role.enum";
import { FunctionName } from "../../enums/functionName.enum";
export declare class RolePermission {
    id: number;
    role: Role;
    permission: Permission;
    function: FunctionName;
}
