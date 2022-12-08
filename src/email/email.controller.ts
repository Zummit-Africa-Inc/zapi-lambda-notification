import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { EventPattern } from '@nestjs/microservices';
import { ZuAppResponse } from 'src/common/helpers/response';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /* this is the rabbitMQ listener for the messages from the identity service*/
  @EventPattern('mail')
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

  @Post('/send')
  async sendMail(@Body() body: SendEmailDto){
   const mailResonse = await this.emailService.sendMailNotification(body)
    return ZuAppResponse.Ok(mailResonse, "Mail Sent", 200)
  }

}
