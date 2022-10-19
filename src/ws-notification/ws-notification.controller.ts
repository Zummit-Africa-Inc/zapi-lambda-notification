import { Body, Controller, Post } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { ApiDto } from "./dto/api.dto";
import { SubscriptionDto } from "./dto/subscription.dto";
import { WsNotificationService } from "./ws-notification.service";

@ApiTags('websocket-notification')
@Controller("ws-notify")
export class WsNotificationController{
    constructor(
        private readonly wsNotificationService: WsNotificationService
    ){}

    @EventPattern('subscription')
    async sendNewSubscription(
        @Body() dto: SubscriptionDto
    ){
        return await this.wsNotificationService.sendNewSubscriptionEvent(dto)
    }

    @EventPattern('unsubscription')
    async sendUnsubscription(
        @Body() dto: SubscriptionDto
    ){
        return await this.wsNotificationService.sendUnsubscriptionEvent(dto)
    }

    @EventPattern('apiHosted')
    async sendApiHosted(
        @Body() dto: ApiDto
    ){
        return await this.wsNotificationService.sendApiHostedEvent(dto)
    }

    @EventPattern('apiDown')
    async sendApiDown(
        @Body() dto: ApiDto
    ){
        return await this.wsNotificationService.sendApiDownEvent(dto)
    }
}