import { updatePasswordUseCases } from "src/usecases/user/updatePassword.usecases";
import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { RoleGuard } from "src/infrastructure/common/guards/role.guard";
import { Role } from "@prisma/client";
import { Roles } from "src/infrastructure/common/guards/role.decorator";
import { UserDto } from "./user.dto";
import { createUserUseCases } from "src/usecases/user/createUser.usecases";
import { JwtAuthGuard } from "src/infrastructure/common/guards/jwtAuth.guard";

@Controller("user")
@ApiTags("user")
@ApiResponse({ status: 500, description: "Internal server error" })
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_USER_USECASES_PROXY)
    private readonly createUserUsecaseProxy: UseCaseProxy<createUserUseCases>,
    @Inject(UsecasesProxyModule.UPDATE_PASSWORD_USECASES_PROXY)
    private readonly updatePasswordUseCaseProxy: UseCaseProxy<updatePasswordUseCases>
  ) {}

  @Roles(Role.ADMIN)
  @Post("create")
  @ApiResponse({
    status: 201,
    description: "User created successfully.",
  })
  async createAdmin(@Body() user: UserDto) {
    const { username, email, role } = user;
    await this.createUserUsecaseProxy
      .getInstance()
      .execute(username, email, role);
  }

  @UseGuards(JwtAuthGuard)
  @Post("update-password")
  @ApiResponse({
    status: 201,
    description: "Password updated successfully.",
  })
  async updatePassword(
    @Query("token") token: string,
    @Query("password") password: string
  ) {
    await this.updatePasswordUseCaseProxy
      .getInstance()
      .execute(token, password);
  }
}
