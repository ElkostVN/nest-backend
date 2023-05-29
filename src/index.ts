import { NestFactory } from '@nestjs/core'

import ApplicationModule from '#components/application/application.module.js'

async function main () {
	const application = await NestFactory.create(ApplicationModule)

	await application.listen(3000)
}

main()