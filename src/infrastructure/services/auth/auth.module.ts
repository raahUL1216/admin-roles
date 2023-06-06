import { Module } from "@nestjs/common";

import { PassportModule } from "@nestjs/passport";
import { BcryptModule } from "src/infrastructure/services/bcrypt/bcrypt.module";
import { JwtModule } from "src/infrastructure/services/jwt/jwt.module";

@Module({
  imports: [BcryptModule, JwtModule, PassportModule],
  exports: [BcryptModule, JwtModule, PassportModule],
})
export class AuthModule {}
