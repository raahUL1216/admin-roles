export interface IJwtServicePayload {
  username: string;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;

  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string
  ): Promise<string>;

  generateJWTToken(payload: IJwtServicePayload): Promise<string>;
}
