import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZuAppResponse } from 'src/common/helpers/response';
import { SaveNotificationDto } from './dto/save-notification.dto';
import { UpdateNotificationStatus } from './dto/update-notification-status.dto';
import { NotificationService } from './notification.service';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService

    ){}

    @Get('allNotifications:developerId')
    async searchForUserNotifications(@Param('developerId') developerId: string){
        return await this.notificationService.searchForUserNotifications(developerId)
    }

    @Get('unreadNotifications/:developerId')
    async searchForUnreadNotifications(@Param('developerId') developerId: string){
        return await this.notificationService.searchForUnreadNotifications(developerId)
    }

    @Get('readNotifications/:developerId')
    async searchForReadNotifications(@Param('developerId') developerId: string){
        return await this.notificationService.searchForReadNotifications(developerId)
    }

    @Patch('updateNotificationStatus/:notificationId')
    async updateNotificationStatus(
        @Param('notificationId') notificationId: string,
        @Body() dto : UpdateNotificationStatus){
        await this.notificationService.updateNotificationStatus(notificationId, dto)
        return ZuAppResponse.Ok('Notification status changed to read','200')
    }
}