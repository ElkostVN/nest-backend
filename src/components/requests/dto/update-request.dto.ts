import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export default class UpdateRequestDto {
    @ApiProperty({ required: true, description: 'The response to the user\'s request, which will be sent to him by email', maxLength: 4096, example: 'Approved!' })
    @MaxLength(4096)
    @IsString()
	public comment: string
}