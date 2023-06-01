import { addUserToGroupUseCases } from "./../../../usecases/admin/addUserToGroup.usecases";
import { createUserGroupUseCases } from "./../../../usecases/admin/createUserGroup.usecases";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UserDto, UserGroupDto } from "./admin.dto";
import { createAdminUseCases } from "../../../usecases/admin/createAdmin.usecases";
export declare class AdminController {
    private readonly createAdminUsecaseProxy;
    private readonly createUserGroupUseCaseProxy;
    private readonly addUserToGroupUseCaseProxy;
    constructor(createAdminUsecaseProxy: UseCaseProxy<createAdminUseCases>, createUserGroupUseCaseProxy: UseCaseProxy<createUserGroupUseCases>, addUserToGroupUseCaseProxy: UseCaseProxy<addUserToGroupUseCases>);
    createAdmin(user: UserDto): Promise<void>;
    createUser(user: UserDto): Promise<void>;
    createUserGroup(group_name: string): Promise<void>;
    addUserToGroup(userGroup: UserGroupDto): Promise<void>;
}
