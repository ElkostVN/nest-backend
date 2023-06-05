import { Module } from '@nestjs/common'

import MailerModule from '#components/mailer/mailer.module.js'
import PrismaModule from '#components/prisma/prisma.module.js'
import RequestsController from '#components/requests/requests.controller.js'
import RequestsService from '#components/requests/requests.service.js'

@Module({
	imports: [ PrismaModule, MailerModule ],
	providers: [RequestsService],
	controllers: [RequestsController]
})
export default class RequestsModule { }