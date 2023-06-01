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
} from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { ApiResponseType } from "../../common/swagger/response.decorator";
import { UserPresenter } from "./admin.presenter";
import { UserDto, UserGroupDto } from "./admin.dto";
import { createAdminUseCases } from "../../../usecases/admin/createAdmin.usecases";

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
    private readonly addUserToGroupUseCaseProxy: UseCaseProxy<addUserToGroupUseCases>
  ) {}

  @Post("create-admin")
  @ApiResponseType(UserPresenter, true)
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  async createAdmin(@Body() user: UserDto) {
    const { username, password, email, role } = user;
    await this.createAdminUsecaseProxy
      .getInstance()
      .execute(username, password, email, role);
  }

  @Post("create-user")
  @ApiResponseType(UserPresenter, true)
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  async createUser(@Body() user: UserDto) {
    const { username, password, email, role } = user;
    await this.createAdminUsecaseProxy
      .getInstance()
      .execute(username, password, email, role);
  }

  @Post("create-group")
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  async createUserGroup(@Query("group_name") group_name: string) {
    const group_id = await this.createUserGroupUseCaseProxy
      .getInstance()
      .execute(group_name);
    return group_id;
  }

  @Put("add-to-group")
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  async addUserToGroup(@Body() userGroup: UserGroupDto) {
    const { group_id, user_ids } = userGroup;
    await this.addUserToGroupUseCaseProxy
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
