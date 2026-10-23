import { Module } from '@nestjs/common'
import {ConfigModule} from "@nestjs/config"
import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { validate } from './config/validate.js'

@Module({
  imports: [ConfigModule.forRoot({
    validate,
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
