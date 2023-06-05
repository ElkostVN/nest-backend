import { IsString, MaxLength } from 'class-validator'

export default class CreateRequestDto {
    @MaxLength(30)
    @IsString()
	public name: string

    @MaxLength(50)
    @IsString()
    public email: string

    @MaxLength(4096)
    @IsString()
    public message: string
}