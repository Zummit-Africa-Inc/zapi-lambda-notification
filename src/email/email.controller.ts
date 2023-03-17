import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('mail')
  async sendEmailConfirmation(@Body() emailDto: SendEmailDto) {
    return await this.emailService.sendMailNotification(emailDto);
  }

  @EventPattern('notify_test')
  async testNotify(@Body() body: any) {
    await this.emailService.sendMailNotification({
      email: 'cutradition76767676com@cutradition.com',
      subject: 'test from rabbitmq',
      text: 'working now',
    });
    await this.emailService.sendMailNotification({
      email: 'sfjmcpigbhrgrl@midiharmonica.com',
      subject: 'test from rabbitmq',
      text: 'working now',
    });
    console.log('here jnvdknvdfnk');

    console.log(body);
  }
}
