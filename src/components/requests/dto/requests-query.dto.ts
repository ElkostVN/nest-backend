import { ApiProperty } from '@nestjs/swagger'
import { RequestStatus } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsPositive, Max, MaxLength, ValidateIf } from 'class-validator'

import { StringToIso } from '#decorators/transformations/string-to-iso.decorator.js'
import { IsValidDate } from '#decorators/validations/is-valid-date.decorator.js'

export default class RequestsQueryDto {
	@ApiProperty({ description: 'Request status', required: false, enum: RequestStatus, default: 'undefined' })
	@MaxLength(Math.max(...Object.keys(RequestStatus).map(v => v.length)))
	@IsEnum(RequestStatus)
	@IsOptional()
	public status: RequestStatus

	@ApiProperty({ description: 'Date (YYYY:MM:DD or YYYY:MM:DDTHH:MM:SS) or timestamp in js format', required: false, default: undefined, example: '2023-06-05T05:00:00' })
	@MaxLength(50)
	@IsValidDate()
	@Transform(StringToIso)
	@IsOptional()
	public date: string

	@ApiProperty({ description: 'Date order for smooth search', required: false, default: undefined, enum: { lt: 'lt', gt: 'gt', gte: 'gte', lte: 'lte' } })
	@MaxLength(3)
	@IsEnum({ lt: 'lt', gt: 'gt', gte: 'gte', lte: 'lte' })
	@ValidateIf(o => !!o.date)
	@IsOptional()
	public dateOrder: 'lt' | 'gt' | 'gte' | 'lte'

	@ApiProperty({ description: 'Number of displayed requests', default: 10, required: false, maximum: 100 })
	@Max(100)
	@IsInt()
	@IsPositive()
	@IsOptional()
	public take: number

	@ApiProperty({ description: 'Number of skiped requests', default: 0, required: false })
	@IsInt()
	@IsPositive()
	@IsOptional()
	public skip: number
}