import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveNotificationDto } from './dto/save-notification.dto';
import { Notification } from 'src/entities/notification.entity';
import { ZuAppResponse } from 'src/common/helpers/response';
import { UpdateNotificationStatus } from './dto/update-notification-status.dto';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepo : Repository<Notification>
    ){}
	
	//save nuser notification to database
    //dto: SaveNotificationDto
    async saveNotificationToDb(title: string, detail: string, profileId: string){
        try {
            //create notification object
            const notification = await this.notificationRepo.create({
                notification_title: title,
                notification_detail: detail,
                developer_id: profileId
            })
            
            const savedNotification = await this.notificationRepo.save(notification)
            return savedNotification
        } catch (error) {
            throw new BadRequestException(
                ZuAppResponse.BadRequest(
                    "Notification not saved",
                    error.message,
                    "500"
                )
            )
        }
    }

    // saerch for all notifications belonging to a user
    async searchForUserNotifications(profileId : string){
        try {
            //check if user exists
            const userNotifications = await this.notificationRepo.find({where : { developer_id: profileId}})
            if(!userNotifications){
                ZuAppResponse.Ok(
                    "No notifications found",
                    "204"
                )
            }
            return userNotifications
        } catch (error) {
            throw new BadRequestException(
                ZuAppResponse.BadRequest(
                    "Internal server error",
                    error.message,
                    "500"
                )
            )
        }
    }

    // search for all unread notifications belonging to a user
    async searchForUnreadNotifications(profileId: string){
        const userNotifications = await this.searchForUserNotifications(profileId)
        
        // create array to store unread notifications
        const unreadNotifications = []

        // find all unread notifications and save to list
        userNotifications.forEach((notification)=>{
            if(notification.notification_status==='unread'){
                unreadNotifications.push(notification)
            }
        })

        return unreadNotifications
    }

    // search for all read notifications belonging to a user
    async searchForReadNotifications(profileId: string){
        const userNotifications = await this.searchForUserNotifications(profileId)
        
        // create array to store read notifications
        const readNotifications = []

        // find all read notifications and save to list
        userNotifications.forEach((notification)=>{
            if(notification.notification_status==='read'){
                readNotifications.push(notification)
            }
        })

        return readNotifications
    }

    // update notification status in db
    async updateNotificationStatus(notificationId: string, dto: UpdateNotificationStatus){
        try {
            const notificationExists = await this.notificationRepo.findOne({where:{id : notificationId}})
            if(!notificationExists){
                throw new BadRequestException(
                    ZuAppResponse.BadRequest(
                        "Notification not found",
                        "404"
                    )
                )
            }

            const updatedStatus = await this.notificationRepo.update(notificationId, dto)
            if(!updatedStatus){
                throw new BadRequestException(
                    ZuAppResponse.BadRequest(
                        "Notification status not updated",
                        "500"
                    )
                )
            }
            return updatedStatus
            
        } catch (error) {
            throw new BadRequestException(
                ZuAppResponse.BadRequest(
                    "Internal server error",
                    error.message,
                    "500"
                )
            )
        }
        
    }
}
