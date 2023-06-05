import { Injectable } from '@nestjs/common'

import type { IMailer } from '#types/interfaces/IMailer.js'

@Injectable()
export default class MailerService implements IMailer {
	async send (target: string, message: string) {
		console.log(`Sending email to ${target} with message: "${message}"`)
	}
}