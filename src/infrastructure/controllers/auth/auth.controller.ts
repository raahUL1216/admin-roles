import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthLoginDto } from "./auth-dto.class";
import { IsAuthPresenter } from "./auth.presenter";

import { LoginGuard } from "../../common/guards/login.guard";

import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { LoginUseCases } from "../../../usecases/auth/login.usecases";
import { Public } from "src/infrastructure/common/guards/public.decorator";
import { JWTToken } from "src/domain/model/auth";

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

  @Public()
  @UseGuards(LoginGuard)
  @Post("login")
  @ApiBody({ type: AuthLoginDto })
  async login(@Request() req, @Response() res) {
    const { token }: JWTToken = await this.loginUsecaseProxy
      .getInstance()
      .getAccessToken(req.user);

    res.set("Authorization", "Bearer " + token);
    res.send({
      success: true,
      token,
    });
  }
}
