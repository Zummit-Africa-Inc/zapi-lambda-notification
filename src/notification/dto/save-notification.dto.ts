import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SaveNotificationDto {

    @IsOptional()
    @IsString()
    @ApiProperty()
    notification_title: string

    @IsString()
    @ApiProperty()
    notification_detail: string

    @IsString()
    @ApiProperty()
    developer_id: string
}