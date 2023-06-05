import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import ApplicationModule from '#components/application/application.module.js'

async function main () {
	console.clear()

	const application = await NestFactory.create<NestFastifyApplication>(ApplicationModule, new FastifyAdapter())

	application.enableCors({ origin: true })
	application.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, transformOptions: { enableImplicitConversion: true } }))

	await application.listen(process.env.APPLICATION_PORT!)
}

main()