import { EnvironmentConfigService } from "./../../config/environment-config/environment-config.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  IJwtService,
  IJwtServicePayload,
} from "../../../domain/adapters/jwt.interface";
import { JWTToken } from "src/domain/model/auth";

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly envConfigService: EnvironmentConfigService
  ) {}

  async checkToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }

  async createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }

  async generateJWT(
    payload: IJwtServicePayload,
    expiresInSec?: number
  ): Promise<JWTToken> {
    const secret = this.envConfigService.getJwtSecret();
    const expiresIn =
      expiresInSec?.toString() ||
      this.envConfigService.getJwtExpirationTime() + "s";

    const jwt = await this.createToken(payload, secret, expiresIn);

    return {
      token: jwt,
      expiresIn,
    };
  }
}
