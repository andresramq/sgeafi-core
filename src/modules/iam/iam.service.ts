import { Injectable } from '@nestjs/common'
import { IamRegisterDto } from './iam.dto.js'
import { HashService } from '../../common/hash/hash.service.js'

@Injectable()
export class IamService {
  constructor(private readonly hash: HashService) {}

  async register(dto: IamRegisterDto): Promise<boolean> {
    await this.hash.hash(dto.password)
    return true
  }
}
