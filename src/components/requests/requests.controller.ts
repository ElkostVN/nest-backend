import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common'
import { type FastifyReply } from 'fastify'

import CreateRequestDto from '#components/requests/dto/create-request.dto.js'
import RequestsQueryDto from '#components/requests/dto/requests-query.dto.js'
import UpdateRequestDto from '#components/requests/dto/update-request.dto.js'
import RequestsService from '#components/requests/requests.service.js'

@Controller('requests')
export default class RequestsController {
	constructor (
        private readonly _requestsService: RequestsService
	) { }

	@Get()
	async findRequests (
		@Query() query: RequestsQueryDto
	) {
		return this._requestsService.findRequests(query)
	}

	@Put(':requestId')
	async updateRequest (
		@Res() response: FastifyReply,
		@Param('requestId', new ParseIntPipe()) id: number,
		@Body() updateRequestDto: UpdateRequestDto
	) {
		return this._requestsService.updateRequest(id, updateRequestDto)
			.then(() => response.status(HttpStatus.OK).send())
			.catch(() => response.status(HttpStatus.BAD_REQUEST).send())
	}

	@Post()
	async createRequest (
		@Res() response: FastifyReply,
		@Body() createRequestDto: CreateRequestDto
	) {
		return this._requestsService.createRequest(createRequestDto)
			.then(() => response.status(HttpStatus.CREATED).send())
			.catch(() => response.status(HttpStatus.BAD_REQUEST).send())
	}
}