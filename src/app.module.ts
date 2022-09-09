import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { WsNotificationModule } from './ws-notification/ws-notification.module';

@Module({
  imports: [
    // MailerModule.forRoot({
    //   transport:{
    //     host:'',
    //     auth:{
    //       user: '',
    //       pass: ''
    //     }
    //   }
    // }),
    ConfigModule.forRoot({isGlobal: true}),
     EmailModule, WsNotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
