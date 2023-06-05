import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { type FastifyReply } from 'fastify'

import CreateRequestDto from '#components/requests/dto/create-request.dto.js'
import RequestsQueryDto from '#components/requests/dto/requests-query.dto.js'
import UpdateRequestDto from '#components/requests/dto/update-request.dto.js'
import RequestsService from '#components/requests/requests.service.js'

@ApiTags('requests')
@Controller('requests')
export default class RequestsController {
	constructor (
        private readonly _requestsService: RequestsService
	) { }

	@ApiOperation({ summary: 'Get a list of requests' })
	@ApiResponse({ status: 200, description: 'The array with requests for the specified parameters may be empty' })
	@Get()
	async findRequests (
		@Query() query: RequestsQueryDto
	) {
		return this._requestsService.findRequests(query)
	}

	@ApiOperation({ summary: 'Updates the request by the request ID, changes the status to "Resolved" and sends a comment to the user by email' })
	@ApiResponse({ status: 200, description: 'User\'s request was updated successfully, status changed to "Resolved", an email was sent to him' })
	@ApiResponse({ status: 400, description: 'An error occurred while updating' })
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

	@ApiOperation({ summary: 'Create new request with active status' })
	@ApiResponse({ status: 201, description: 'User\'s request was created succefull' })
	@ApiResponse({ status: 400, description: 'An error occurred while creating' })
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