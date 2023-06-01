export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: any) {}

  async execute(username: string): Promise<any> {
    const user = await this.adminUserRepo.getUserByUsername(username);
    const { password, ...info } = user;
    return info;
  }
}
