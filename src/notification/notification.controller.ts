import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZuAppResponse } from 'src/common/helpers/response';
import { UpdateNotificationStatus } from './dto/update-notification-status.dto';
import { NotificationService } from './notification.service';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService

    ){}

    @Get('allNotifications:profileId')
    async searchForUserNotifications(@Param('profileId') profileId: string){
        return await this.notificationService.searchForUserNotifications(profileId)
    }

    @Get('unreadNotifications/:profileId')
    async searchForUnreadNotifications(@Param('profileId') profileId: string){
        return await this.notificationService.searchForUnreadNotifications(profileId)
    }

    @Get('readNotifications/:profileId')
    async searchForReadNotifications(@Param('profileId') profileId: string){
        return await this.notificationService.searchForReadNotifications(profileId)
    }

    @Patch('updateNotificationStatus/:notificationId')
    async updateNotificationStatus(
        @Param('notificationId') notificationId: string,
        @Body() dto : UpdateNotificationStatus){
        await this.notificationService.updateNotificationStatus(notificationId, dto)
        return ZuAppResponse.Ok('Notification status changed to read','200')
    }
}