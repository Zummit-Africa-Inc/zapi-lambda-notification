import { Module } from '@nestjs/common';
import { WsNotificationController } from './ws-notification.controller';
import { NotificationsGateway } from './ws-notification.gateway';
import { WsNotificationService } from './ws-notification.service';


@Module({
  providers: [NotificationsGateway, WsNotificationService],
  controllers: [WsNotificationController],
})
export class WsNotificationModule {}