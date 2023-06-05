import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import RequestsModule from '#components/requests/requests.module.js'
import validateEnv from '#utils/validate-env.js'
@Module({
	imports: [
		ConfigModule.forRoot({
			validate: validateEnv
		}),
		RequestsModule
	],
	controllers: [],
	providers: []
})
export default class ApplicationModule { }