import { Role } from "@prisma/client";
import { JWTToken } from "../model/auth";

export interface IJwtServicePayload {
  sub: number;
  username: string;
  role: Role;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;

  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string
  ): Promise<string>;

  generateJWT(
    payload: IJwtServicePayload,
    expiresIn: number
  ): Promise<JWTToken>;
}
