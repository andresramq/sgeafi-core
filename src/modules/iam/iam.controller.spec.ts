import { Test, TestingModule } from '@nestjs/testing'
import { IamController } from './iam.controller.js'
import { IamService } from './iam.service.js'
import { IamRegisterDto } from './iam.dto.js'
import { createMockIamRegisterDto } from '../../helpers/data.mock.js'
import { createMockIamService } from '../../helpers/service.mock.js'

describe('IamController', () => {
  let controller: IamController
  let mockIamService: ReturnType<typeof createMockIamService>

  beforeEach(async () => {
    mockIamService = createMockIamService()

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
    it('should call iamService.register', async () => {
      const dto = createMockIamRegisterDto()

      const result = await controller.register(dto as IamRegisterDto)

      expect(mockIamService.register).toHaveBeenCalledWith(dto)
      expect(result).toBe(true)
    })
  })
})
