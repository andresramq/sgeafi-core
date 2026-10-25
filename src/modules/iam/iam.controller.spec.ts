import { Test, TestingModule } from '@nestjs/testing'
import { IamController } from './iam.controller.js'
import { IamService } from './iam.service.js'
import { IamRegisterDto } from './iam.dto.js'

describe('IamController', () => {
  let controller: IamController

  const mockIamService = {
    register: vi.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IamController],
      providers: [
        {
          provide: IamService,
          useValue: mockIamService,
        },
      ],
    }).compile()

    controller = module.get<IamController>(IamController)

    vi.clearAllMocks()
  })

  describe('register', () => {
    it('should call iamService.register', () => {
      const dto = {
        accountName: 'MyAccount',
        name: 'John Doe',
        phoneNumber: '3111111111',
        email: 'john.doe@gmail.com',
        password: 'johndoe-password',
      }

      mockIamService.register.mockReturnValue(true)
      const result = controller.register(dto as IamRegisterDto)

      expect(mockIamService.register).toHaveBeenCalledWith(dto)
      expect(result).toBe(true)
    })
  })
})
