import { Test, TestingModule } from '@nestjs/testing'
import { IamService } from './iam.service.js'

describe('IamService', () => {
  let service: IamService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IamService],
    }).compile()

    service = module.get<IamService>(IamService)
  })

  describe('register', () => {
    it('should return true when registering successfully', () => {
      const dto = {
        accountName: 'MyAccount',
        name: 'John Doe',
        phoneNumber: '3111111111',
        email: 'john.doe@gmail.com',
        password: 'johndoe-password',
      }

      const result = service.register(dto)

      expect(result).toBe(true)
    })
  })
})
