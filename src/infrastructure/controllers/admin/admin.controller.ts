import { addUserToGroupUseCases } from "./../../../usecases/admin/addUserToGroup.usecases";
import { createUserGroupUseCases } from "./../../../usecases/admin/createUserGroup.usecases";
import { Body, Controller, Inject, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { ApiResponseType } from "../../common/swagger/response.decorator";
import { AdminDto, GroupDTO, UserGroupDto } from "./admin.dto";
import { createAdminUseCases } from "../../../usecases/admin/createAdmin.usecases";
import { RoleGuard } from "src/infrastructure/common/guards/role.guard";
import { Role } from "@prisma/client";
import { Roles } from "src/infrastructure/common/guards/role.decorator";
import { UserGroupPresenter } from "./admin.presenter";
import { Public } from "src/infrastructure/common/guards/public.decorator";

@Controller("admin")
@ApiTags("admin")
@ApiExtraModels(UserGroupPresenter)
@ApiResponse({ status: 500, description: "Internal server error" })
export class AdminController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY)
    private readonly createAdminUsecaseProxy: UseCaseProxy<createAdminUseCases>,
    @Inject(UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY)
    private readonly createUserGroupUseCaseProxy: UseCaseProxy<createUserGroupUseCases>,
    @Inject(UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY)
    private readonly addUsersToGroupUseCaseProxy: UseCaseProxy<addUserToGroupUseCases>
  ) {}

  @Public()
  @Roles(Role.SUPER_ADMIN)
  @Post("create")
  @ApiBody({ type: AdminDto })
  @ApiResponse({
    status: 201,
    description: "Admin user created successfully.",
  })
  async createAdmin(@Body() user: AdminDto) {
    const { username, email } = user;
    await this.createAdminUsecaseProxy.getInstance().execute(username, email);
  }

  @Roles(Role.SUPER_ADMIN)
  @Post("create-group")
  @ApiBody({ type: GroupDTO })
  @ApiResponseType(UserGroupPresenter, true)
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  async createUserGroup(@Body() group: GroupDTO) {
    const cGroup = await this.createUserGroupUseCaseProxy
      .getInstance()
      .execute(group.name, group.admin);
    return cGroup;
  }

  @Roles(Role.SUPER_ADMIN)
  @Put("add-to-group")
  @ApiBody({ type: UserGroupDto })
  @ApiResponse({
    status: 201,
    description: "User added to group successfully.",
  })
  async addUsersToGroup(@Body() userGroup: UserGroupDto) {
    const { group_id, user_ids } = userGroup;
    await this.addUsersToGroupUseCaseProxy
      .getInstance()
      .execute(group_id, user_ids);
  }
}
