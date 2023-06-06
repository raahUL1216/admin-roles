import { BcryptService } from "src/infrastructure/services/bcrypt/bcrypt.service";
import { UserM } from "src/domain/model/user";
import { UserRepository } from "src/domain/repositories/userRepositary.interface";
import { Role } from "@prisma/client";
import { UserService } from "src/infrastructure/services/user/user.service";

export class createUserUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly userService: UserService
  ) {}

  async execute(username: string, email: string, role: Role): Promise<void> {
    // default password for user, can be updated by user later
    const password = "password";
    const hashedPassword = await this.bcryptService.hash(password);

    const user = new UserM({ username, email, password: hashedPassword, role });

    await this.userRepository.create(user);

    // send otp link email to user for password update
    await this.userService.sendOtpEmail(user.email);
  }
}
