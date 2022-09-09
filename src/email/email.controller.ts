import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /* this is the rabbitMQ listener for the messages from the identity service*/
  // @EventPattern('verification')
  // async sendEmailConfirmation(@Body() emailDto: SendEmailDto) {
  //   return await this.emailService.sendMailNotification(emailDto);
  // }

    @Post('/send-mail')
  async sendEmailConfirmation(@Body() emailDto: SendEmailDto) {
    return await this.emailService.sendMailNotification(emailDto);
  }

  @EventPattern('notify_test')
  async testNotify(@Body() body: any) {
    console.log(body);
  }
}
