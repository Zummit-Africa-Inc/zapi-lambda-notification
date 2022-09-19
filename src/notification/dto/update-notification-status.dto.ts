import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { NotificationStatus } from "src/common/enums/notification.status.enum";

export class UpdateNotificationStatus {
    @IsString()
    @ApiProperty()
    notification_status: NotificationStatus

}