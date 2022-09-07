import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDto } from "./dto/api.dto";
import { SubscriptionDto } from "./dto/subscription.dto";
import { NotificationService } from "./notification.service";

@ApiTags('websocket-notification')
@Controller("ws-notify")
export class NotificationController{
    constructor(
        private readonly NotificationService: NotificationService
    ){}

    @Post('/subscription-event')
    async sendNewSubscription(
        @Body() dto: SubscriptionDto
    ){
        return await this.NotificationService.sendNewSubscriptionEvent(dto)
    }

    @Post('/unsubscription-event')
    async sendUnsubscription(
        @Body() dto: SubscriptionDto
    ){
        return await this.NotificationService.sendUnsubscriptionEvent(dto)
    }

    @Post('/api-hosted')
    async sendApiHosted(
        @Body() dto: ApiDto
    ){
        return await this.NotificationService.sendApiHostedEvent(dto)
    }

    @Post('/api-down')
    async sendApiDown(
        @Body() dto: ApiDto
    ){
        return await this.NotificationService.sendApiDownEvent(dto)
    }
}