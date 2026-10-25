import { Injectable } from '@nestjs/common'
import { IamRegisterDto } from './iam.dto.js'

@Injectable()
export class IamService {
  register(dto: IamRegisterDto) {
    void dto
    return true
  }
}
