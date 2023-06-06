import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Email } from "src/domain/model/email";
import { EnvironmentConfigService } from "src/infrastructure/config/environment-config/environment-config.service";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly envConfigService: EnvironmentConfigService
  ) {}

  async sendEmail(emailObj: Email, uri: string) {
    const domain = this.envConfigService.getDomain();
    const url = domain + uri;

    const { context = {} } = emailObj;

    await this.mailerService.sendMail({
      to: emailObj.to,
      subject: emailObj.subject,
      template: "./update-password", // `.hbs` extension is appended automatically
      context: {
        ...context,
        url,
      },
    });
  }
}
