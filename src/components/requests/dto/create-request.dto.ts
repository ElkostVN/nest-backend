import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export default class CreateRequestDto {
    @ApiProperty({ required: true, description: 'User first name', maxLength: 30, example: 'Konstantin' })
    @MaxLength(30)
    @IsString()
	public name: string

    @ApiProperty({ required: true, description: 'User email', maxLength: 50, example: 'test@mail.com' })
    @MaxLength(50)
    @IsString()
    public email: string

    @ApiProperty({ required: true, description: 'User message', maxLength: 4096, example: 'Its my message' })
    @MaxLength(4096)
    @IsString()
    public message: string
}