import { Module } from '@nestjs/common'

import PrismaService from '#components/prisma/prisma.service.js'

@Module({
	imports: [],
	exports: [PrismaService],
	providers: [PrismaService],
	controllers: []
})
export default class PrismaModule { }