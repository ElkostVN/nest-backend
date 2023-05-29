import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import ApplicationModule from '#components/application/application.module.js'

async function main () {
	console.clear()

	const application = await NestFactory.create<NestFastifyApplication>(ApplicationModule, new FastifyAdapter())

	await application.listen(process.env.APPLICATION_PORT!)
}

main()