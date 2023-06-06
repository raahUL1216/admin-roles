import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { DatabaseUserRepository } from "src/infrastructure/repositories/user.repository";
import { MailModule } from "../mail/mail.module";
import { JwtModule } from "../jwt/jwt.module";
import { BcryptModule } from "../bcrypt/bcrypt.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [MailModule, JwtModule, BcryptModule, PrismaModule],
  providers: [UserService, DatabaseUserRepository],
  exports: [UserService],
})
export class UserModule {}
