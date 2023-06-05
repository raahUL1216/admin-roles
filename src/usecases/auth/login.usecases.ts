import { ILogger } from "../../domain/logger/logger.interface";
import { UserRepository } from "../../domain/repositories/userRepositary.interface";
import { UnauthorizedException } from "@nestjs/common";
import { JwtTokenService } from "src/infrastructure/services/jwt/jwt.service";

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly jwtTokenService: JwtTokenService
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userRepository.getUserByUsername(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    this.logger.log("signIn execute", `The user ${username} have been logged.`);

    return this.jwtTokenService.generateJWTToken({ username: username });
  }
}
