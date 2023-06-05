import { Injectable } from '@nestjs/common'
import type { Request } from '@prisma/client'

import MailerService from '#components/mailer/mailer.service.js'
import PrismaService from '#components/prisma/prisma.service.js'
import CreateRequestDto from '#components/requests/dto/create-request.dto.js'
import RequestsQueryDto from '#components/requests/dto/requests-query.dto.js'
import UpdateRequestDto from '#components/requests/dto/update-request.dto.js'

@Injectable()
export default class RequestsService {
	constructor (
		private readonly _prismaService: PrismaService,
		private readonly _mailerService: MailerService
	) { }

	async findRequests (query: RequestsQueryDto) {
		const { status, date, dateOrder, take, skip } = query

		return this._prismaService.request.findMany({
			where: {
				status,
				createdAt: dateOrder && date
					? { [dateOrder]: date }
					: date
			},
			orderBy: { id: 'asc' },
			take: take ?? 10,
			skip: skip ?? 0
		})
	}

	async updateRequest (id: number, updateRequestDto: UpdateRequestDto) {
		return this._prismaService.request.update({ where: { id }, data: { ...updateRequestDto, status: 'Resolved' } })
			.then(async (request: Request) => {
				await this._mailerService.send(request.email, request.comment!)

				return request
			})
	}

	async createRequest (createRequestDto: CreateRequestDto) {
		return this._prismaService.request.create({ data: { ...createRequestDto, status: 'Active' } })
	}
}