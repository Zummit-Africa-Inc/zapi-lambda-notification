import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SaveNotificationDto } from './dto/save-notification.dto';
import { NotificationService } from './notification.service';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService

    ){}

    @Post('saveNotificationToDb')
    async saveNotificationToDb(@Body() dto: SaveNotificationDto){
        return await this.notificationService.saveNotificationToDb(dto)
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

}

