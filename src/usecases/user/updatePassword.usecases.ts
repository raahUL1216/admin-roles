import { UserService } from "src/infrastructure/services/user/user.service";

export class updatePasswordUseCases {
  constructor(private readonly userService: UserService) {}

  async execute(token: string, password: string): Promise<void> {
    await this.userService.updatePassword(token, password);
  }
}
