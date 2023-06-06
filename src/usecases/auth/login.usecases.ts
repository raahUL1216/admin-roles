import { BcryptService } from "src/infrastructure/services/bcrypt/bcrypt.service";
import { ILogger } from "../../domain/logger/logger.interface";
import { UserRepository } from "../../domain/repositories/userRepositary.interface";
import { UnauthorizedException } from "@nestjs/common";
import { JwtTokenService } from "src/infrastructure/services/jwt/jwt.service";
import { JWTToken } from "src/domain/model/auth";

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly bcryptService: BcryptService
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userRepository.getUserByUsername(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const jwt: JWTToken = await this.jwtTokenService.generateJWT({
      sub: user.id,
      username: username,
      role: user.role,
    });

    return `Authentication=${jwt.token}; HttpOnly; Path=/; Max-Age=${jwt.expiresIn}`;
  }

  async getAccessToken(user: any) {
    return this.jwtTokenService.generateJWT({
      sub: user.id,
      username: user.username,
      role: user.role,
    });
  }

  async validateUserForLocalStragtegy(username: string, pass: string) {
    console.log("in validateUserForLocalStragtegy.");
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      return null;
    }

    const match = await this.bcryptService.compare(pass, user.password);
    console.log("password matched. ", match);
    if (user && match) {
      const result = { ...user, pass };
      return result;
    }
    return null;
  }

  async validateUserForJWTStragtegy(username: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      return null;
    }
    return user;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      return null;
    }

    //   const isRefreshTokenMatching = await this.bcryptService.compare(refreshToken, user.hashRefreshToken);
    //   if (isRefreshTokenMatching) {
    //     return user;
    //   }

    return null;
  }
}
