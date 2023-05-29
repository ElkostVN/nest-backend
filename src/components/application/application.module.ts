import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import validateEnv from '#utils/validate-env.js'
@Module({
	imports: [ConfigModule.forRoot({
		validate: validateEnv
	})],
	controllers: [],
	providers: []
})
export default class ApplicationModule { }