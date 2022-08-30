import { Injectable } from "@nestjs/common";
import { ApiDto } from "./dto/api.dto";
import { SubscriptionDto } from "./dto/subscription.dto";
import { NotificationsGateway } from "./notification.gateway";

@Injectable()
export class NotificationService{
    constructor(
        private readonly NotificationsGateway : NotificationsGateway
    ){}

    async sendNewSubscriptionEvent(dto: SubscriptionDto){
        return this.NotificationsGateway.handleNewSubscription(dto.apiId, dto.profileId, dto.developerId)
    }

    async sendUnsubscriptionEvent(dto : SubscriptionDto){
        return this.NotificationsGateway.handleUnsubscription(dto.apiId, dto.profileId, dto.developerId)
    }

    async sendApiHostedEvent(dto : ApiDto){
        return this.NotificationsGateway.handleNewApiHosting(dto.apiId, dto.developerId)
    }

    async sendApiDownEvent(dto : ApiDto){
        return this.NotificationsGateway.handleApiDown(dto.apiId, dto.developerId)
    }
}