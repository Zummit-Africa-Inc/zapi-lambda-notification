import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationsGateway } from './notification.gateway';
import { NotificationService } from './notification.service';


@Module({
  providers: [NotificationsGateway, NotificationService],
  controllers: [NotificationController],
})
export class WsNotificationModule {}