import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('verification')
  async sendEmailConfirmation(@Body() emailDto: SendEmailDto) {
    return await this.emailService.sendMailNotification(emailDto);
  }
}
