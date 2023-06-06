import { Injectable } from "@nestjs/common";
import { UserM } from "src/domain/model/user";
import { MailService } from "../mail/mail.service";
import { Email } from "src/domain/model/email";
import { JwtTokenService } from "../jwt/jwt.service";
import { JWTToken } from "src/domain/model/auth";
import { BcryptService } from "../bcrypt/bcrypt.service";
import { DatabaseUserRepository } from "src/infrastructure/repositories/user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: DatabaseUserRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly bcryptService: BcryptService,
    private readonly mailService: MailService
  ) {}

  // Function to send the OTP email to the user
  async sendOtpEmail(userEmail: string): Promise<void> {
    const user = await this.userRepo.getUserByEmail(userEmail);

    // Generate the OTP token that expires in 1hr - 3600s
    const expiresIn = 3600;
    const jwt: JWTToken = await this.jwtTokenService.generateJWT(
      { sub: user.id, username: user.username, role: user.role },
      expiresIn
    );

    const uri = `/update-password?token=${jwt.token}`;

    const emailObj: Email = {
      to: user.email,
      subject: "Update Password",
      context: {
        username: user.username,
      },
    };

    await this.mailService.sendEmail(emailObj, uri);
  }

  // Function to update the user's password
  async updatePassword(otpToken: string, newPassword: string): Promise<void> {
    try {
      // Verify the OTP token
      const decodedToken = await this.jwtTokenService.checkToken(otpToken);

      // Here, you can implement the logic to update the user's password
      // For example, you can find the user by their email and update their password in the database
      const hashedPassword = await this.bcryptService.hash(newPassword);
      await this.userRepo.updatePassword(decodedToken.username, hashedPassword);

      //   expire link
    } catch (error) {
      throw new Error(
        "Invalid or expired link. Please contact your administrator."
      );
    }
  }

  private async updateUser(user: UserM): Promise<void> {
    // Replace this with your implementation to update the user in the database
    // For simplicity, we'll use a dummy implementation here
    console.log(`Updating user with ID ${user.id} in the database...`);
  }
}
