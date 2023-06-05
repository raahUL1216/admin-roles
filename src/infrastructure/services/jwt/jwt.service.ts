import { EnvironmentConfigService } from "./../../config/environment-config/environment-config.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  IJwtService,
  IJwtServicePayload,
} from "../../../domain/adapters/jwt.interface";

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly envConfigService: EnvironmentConfigService
  ) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
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

  async generateJWTToken(payload: IJwtServicePayload): Promise<string> {
    const secret = this.envConfigService.getJwtSecret();
    const expiresIn = this.envConfigService.getJwtExpirationTime() + "s";

    const token = await this.createToken(payload, secret, expiresIn);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.envConfigService.getJwtExpirationTime()}`;
  }
}
