import { Module } from '@nestjs/common';
import { WsNotificationController } from './notification.controller';
import { NotificationsGateway } from './notification.gateway';
import { WsNotificationService } from './notification.service';


@Module({
  providers: [NotificationsGateway, WsNotificationService],
  controllers: [WsNotificationController],
})
export class WsNotificationModule {}