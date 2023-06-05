import { RequestStatus } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsPositive, Max, MaxLength, ValidateIf } from 'class-validator'

import { StringToIso } from '#decorators/transformations/string-to-iso.decorator.js'
import { IsValidDate } from '#decorators/validations/is-valid-date.decorator.js'

export default class RequestsQueryDto {
	@MaxLength(Math.max(...Object.keys(RequestStatus).map(v => v.length)))
	@IsEnum(RequestStatus)
	@IsOptional()
	public status: RequestStatus

	@MaxLength(50)
	@IsValidDate()
	@Transform(StringToIso)
	@IsOptional()
	public date: string

	@MaxLength(3)
	@IsEnum({ lt: 'lt', gt: 'gt', gte: 'gte', lte: 'lte' })
	@ValidateIf(o => !!o.date)
	@IsOptional()
	public dateOrder: 'lt' | 'gt' | 'gte' | 'lte'

	@Max(100)
	@IsInt()
	@IsPositive()
	@IsOptional()
	public take: number

	@IsInt()
	@IsPositive()
	@IsOptional()
	public skip: number
}