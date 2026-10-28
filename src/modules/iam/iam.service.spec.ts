import { Test, TestingModule } from '@nestjs/testing'
import { IamService } from './iam.service.js'
import { HashService } from '../../common/hash/hash.service.js'
import { createMockHashService } from '../../helpers/service.mock.js'
import { createMockIamRegisterDto } from '../../helpers/data.mock.js'

describe('IamService', () => {
  let service: IamService
  let mockHashService: ReturnType<typeof createMockHashService>

  beforeEach(async () => {
    mockHashService = createMockHashService()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamService,
        {
          provide: HashService,
          useValue: mockHashService,
        },
      ],
    }).compile()

    service = module.get<IamService>(IamService)

    vi.clearAllMocks()
  })

  describe('register', () => {
    it('should return true when registering successfully', async () => {
      const dto = createMockIamRegisterDto()

      const result = await service.register(dto)

      expect(mockHashService.hash).toHaveBeenCalledWith(dto.password)
      expect(result).toBe(true)
    })
  })
})
