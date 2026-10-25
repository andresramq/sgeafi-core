import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { IamRegisterDto } from './iam.dto.js'
import { IamService } from './iam.service.js'

@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post()
  @HttpCode(201)
  register(@Body() body: IamRegisterDto) {
    return this.iamService.register(body)
  }
}
