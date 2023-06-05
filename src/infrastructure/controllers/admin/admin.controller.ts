import { addUserToGroupUseCases } from "./../../../usecases/admin/addUserToGroup.usecases";
import { createUserGroupUseCases } from "./../../../usecases/admin/createUserGroup.usecases";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { ApiResponseType } from "../../common/swagger/response.decorator";
import { UserPresenter } from "./admin.presenter";
import { UserDto, UserGroupDto } from "./admin.dto";
import { createAdminUseCases } from "../../../usecases/admin/createAdmin.usecases";
import { RoleGuard } from "src/infrastructure/common/guards/role.guard";
import { Role } from "@prisma/client";
import { Roles } from "src/infrastructure/common/guards/role.decorator";

@Controller("admin")
@ApiTags("admin")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(UserPresenter)
export class AdminController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY)
    private readonly createAdminUsecaseProxy: UseCaseProxy<createAdminUseCases>,
    @Inject(UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY)
    private readonly createUserGroupUseCaseProxy: UseCaseProxy<createUserGroupUseCases>,
    @Inject(UsecasesProxyModule.CREATE_ADMIN_USECASES_PROXY)
    private readonly addUsersToGroupUseCaseProxy: UseCaseProxy<addUserToGroupUseCases>
  ) {}

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @Post("create")
  @ApiResponseType(UserPresenter, true)
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  async createAdmin(@Body() user: UserDto) {
    const { username, password, email, role } = user;
    await this.createAdminUsecaseProxy
      .getInstance()
      .execute(username, password, email);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @Post("create-group")
  @ApiResponseType(UserPresenter, true)
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  async createUserGroup(
    @Query("group_name") group_name: string,
    @Query("admin") admin: number
  ) {
    const group_id = await this.createUserGroupUseCaseProxy
      .getInstance()
      .execute(group_name, admin);
    return group_id;
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @Put("add-to-group")
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  async addUsersToGroup(@Body() userGroup: UserGroupDto) {
    const { group_id, user_ids } = userGroup;
    await this.addUsersToGroupUseCaseProxy
      .getInstance()
      .execute(group_id, user_ids);
  }

  /*
  @Get("remove-from-group")
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  async removeUserFromGroup(@Query("id", ParseIntPipe) id: number) {
    const todo = await this.getTodoUsecaseProxy.getInstance().execute(id);
    return new AdminPresenter(todo);
  }
  */
}
