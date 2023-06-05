import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthLoginDto } from "./auth-dto.class";
import { IsAuthPresenter } from "./auth.presenter";

import { LoginGuard } from "../../common/guards/login.guard";

import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { LoginUseCases } from "../../../usecases/auth/login.usecases";

@Controller("auth")
@ApiTags("auth")
@ApiResponse({
  status: 401,
  description: "No authorization token was found",
})
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>
  ) {}

  @Post("login")
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: "login" })
  async login(@Body() auth: AuthLoginDto, @Request() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .signIn(auth.username, auth.password);

    request.res.setHeader("Set-Cookie", accessTokenCookie);
    return "Login successful";
  }

  /*
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
  */
}
