import { IsString, MaxLength } from 'class-validator'

export default class UpdateRequestDto {
    @MaxLength(4096)
    @IsString()
	public comment: string
}