import { BcryptService } from "src/infrastructure/services/bcrypt/bcrypt.service";
import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
import { UserM } from "src/domain/model/user";

export class createAdminUseCases {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly bcryptService: BcryptService
  ) {}

  async execute(username: string, email: string): Promise<void> {
    // default password for admin, can be updated by admin user later
    const password = "password";
    const hashedPassword = await this.bcryptService.hash(password);

    const user = new UserM({ username, email, password: hashedPassword });

    this.adminRepository.create(user);

    // send otp link email to user for password update
    // await this.userService.sendOtpEmail(user.email);
  }
}
