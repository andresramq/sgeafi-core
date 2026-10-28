import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from './config/validate.js'
import { IamModule } from './modules/iam/iam.module.js'
import { HashModule } from './common/hash/hash.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    IamModule,
    HashModule,
  ],
})
export class AppModule {}
