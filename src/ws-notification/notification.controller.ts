import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDto } from "./dto/api.dto";
import { SubscriptionDto } from "./dto/subscription.dto";
import { WsNotificationService } from "./notification.service";

@ApiTags('websocket-notification')
@Controller("ws-notify")
export class WsNotificationController{
    constructor(
        private readonly wsNotificationService: WsNotificationService
    ){}

    @Post('/subscription-event')
    async sendNewSubscription(
        @Body() dto: SubscriptionDto
    ){
        return await this.wsNotificationService.sendNewSubscriptionEvent(dto)
    }

    @Post('/unsubscription-event')
    async sendUnsubscription(
        @Body() dto: SubscriptionDto
    ){
        return await this.wsNotificationService.sendUnsubscriptionEvent(dto)
    }

    @Post('/api-hosted')
    async sendApiHosted(
        @Body() dto: ApiDto
    ){
        return await this.wsNotificationService.sendApiHostedEvent(dto)
    }

    @Post('/api-down')
    async sendApiDown(
        @Body() dto: ApiDto
    ){
        return await this.wsNotificationService.sendApiDownEvent(dto)
    }
}