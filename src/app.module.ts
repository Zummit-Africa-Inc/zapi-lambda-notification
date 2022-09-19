import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { WsNotificationModule } from './ws-notification/ws-notification.module';
import { NotificationModule } from './notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { AppDataSource } from 'ormconfig';

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
    TypeOrmModule.forFeature([Notification]),
    TypeOrmModule.forRoot(AppDataSource.options),
     EmailModule, WsNotificationModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
