import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Post('saveNotificationToDb')
    async saveNotificationToDb(@Body() dto: SaveNotificationDto){
        const savedNotification = await this.notificationService.saveNotificationToDb(dto)
        return ZuAppResponse.Ok(savedNotification, 'Notification saved', '201')
    }

    @Get('searchForUserNotifications:developerId')
    async searchForUserNotifications(@Param('developerId') developerId: string){
        return await this.notificationService.searchForUserNotifications(developerId)
    }

    @Get('searchForUnreadNotifications:developerId')
    async searchForUnreadNotifications(@Param('developerId') developerId: string){
        return await this.notificationService.searchForUnreadNotifications(developerId)
    }

    @Get('searchForReadNotifications:developerId')
    async searchForReadNotifications(@Param('developerId') developerId: string){
        return await this.notificationService.searchForReadNotifications(developerId)
    }

    @Post('updateNotificationStatus:notificationId')
    async updateNotificationStatus(
        @Param('notificationId') notificationId: string,
        @Body() dto : UpdateNotificationStatus){
        const updatedNotifications = await this.notificationService.updateNotificationStatus(notificationId, dto)
        return ZuAppResponse.Ok(updatedNotifications, 'Notification status changed to read','200')
    }
}