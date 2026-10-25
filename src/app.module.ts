import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from './config/validate.js'
import { IamModule } from './modules/iam/iam.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    IamModule,
  ],
})
export class AppModule {}
