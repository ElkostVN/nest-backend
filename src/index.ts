import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import ApplicationModule from '#components/application/application.module.js'

async function main () {
	console.clear()

	const application = await NestFactory.create<NestFastifyApplication>(ApplicationModule, new FastifyAdapter())

	application.enableCors({ origin: true })
	application.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, transformOptions: { enableImplicitConversion: true } }))

	const swaggerOptions = new DocumentBuilder()
		.setTitle('Application')
		.setDescription('Application API description')
		.setVersion('1.0')
		.build()

	SwaggerModule.setup('documentation', application, SwaggerModule.createDocument(application, swaggerOptions))

	await application.listen(process.env.APPLICATION_PORT!)
}

main()