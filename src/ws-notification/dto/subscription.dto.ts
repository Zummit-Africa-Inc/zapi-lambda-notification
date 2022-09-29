import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class SubscriptionDto{
    @IsNotEmpty()
    @ApiProperty()
    apiId: string 

    @IsNotEmpty()
    @ApiProperty()
    subscriberId: string

    @IsNotEmpty()
    @ApiProperty()
    profileId: string
}