import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class ApiDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    apiId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    profileId: string
}