import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { SendEmailDto } from './dto/send-email.dto';
import { configConstant } from '../common/constants/config.constant';

@Injectable()
export class EmailService {
  private nodeMailerTransport: Mail;
  constructor(private readonly configService: ConfigService) {
    // Set the mail service provider
    this.nodeMailerTransport = createTransport({
      host: this.configService.get(configConstant.sendMail.host),
      port: this.configService.get(configConstant.sendMail.port),
      auth: {
        user: this.configService.get(configConstant.sendMail.username),
        pass: this.configService.get(configConstant.sendMail.password),
      },
    });
  }

  // Function that conveys mail notification to user
  async sendMailNotification({ email, subject, text }: SendEmailDto) {
    try {
      return this.sendMail({
        from: this.configService.get(configConstant.sendMail.emailAuthor),
        to: email,
        subject,
        text,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Mail transporter
  async sendMail(option: Mail.options) {
    return await this.nodeMailerTransport.sendMail(option);
  }
}
