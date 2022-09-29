import { Injectable } from "@nestjs/common";
import { NotificationService } from "src/notification/notification.service";
import { ApiDto } from "./dto/api.dto";
import { SubscriptionDto } from "./dto/subscription.dto";
import { NotificationsGateway } from "./ws-notification.gateway";

@Injectable()
export class WsNotificationService{
    constructor(
        private readonly NotificationsGateway : NotificationsGateway,
        private readonly notificationService: NotificationService
    ){}

    async sendNewSubscriptionEvent(dto: SubscriptionDto){
        this.notificationService.saveNotificationToDb(
            'New subscription',
            `A new user has subscribed to your api`,
            dto.profileId
        )        
        return this.NotificationsGateway.handleNewSubscription(dto.apiId, dto.profileId, dto.profileId)
    }

    async sendUnsubscriptionEvent(dto : SubscriptionDto){
        this.notificationService.saveNotificationToDb(
            'Unsubscription',
            `A user has unsubscribed from your api`,
            dto.profileId
        ) 
        return this.NotificationsGateway.handleUnsubscription(dto.apiId, dto.profileId, dto.profileId)
    }

    async sendApiHostedEvent(dto : ApiDto){
        this.notificationService.saveNotificationToDb(
            'Api Hosted',
            `Congratulations... Your api has been successfully hosted`,
            dto.profileId
        ) 
        return this.NotificationsGateway.handleNewApiHosting(dto.apiId, dto.profileId)
    }

    async sendApiDownEvent(dto : ApiDto){
        this.notificationService.saveNotificationToDb(
            'Api Down',
            `Your api has been taken down`,
            dto.profileId
        ) 
        return this.NotificationsGateway.handleApiDown(dto.apiId, dto.profileId)
    }
}