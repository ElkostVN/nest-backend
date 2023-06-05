import { Module } from '@nestjs/common'

import MailerService from '#components/mailer/mailer.service.js'

@Module({
	imports: [],
	exports: [MailerService],
	providers: [MailerService],
	controllers: []
})
export default class MailerModule { }