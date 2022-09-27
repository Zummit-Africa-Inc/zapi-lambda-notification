import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/entities/notification.entity';
import { NotificationService } from 'src/notification/notification.service';
import { WsNotificationController } from './ws-notification.controller';
import { NotificationsGateway } from './ws-notification.gateway';
import { WsNotificationService } from './ws-notification.service';


@Module({
  imports:[TypeOrmModule.forFeature([Notification])],
  providers: [NotificationsGateway, WsNotificationService, NotificationService],
  controllers: [WsNotificationController],
})
export class WsNotificationModule {}