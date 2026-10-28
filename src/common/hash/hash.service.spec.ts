import { Test, TestingModule } from '@nestjs/testing'
import { HashService } from './hash.service.js'
import * as bcrypt from 'bcrypt'

vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashed-password-mock'),
}))

describe('HashService', () => {
  let service: HashService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile()

    service = module.get<HashService>(HashService)

    vi.clearAllMocks()
  })

  describe('hash', () => {
    it('should hash a value using bcrypt with 10 salt rounds', async () => {
      const plainText = 'my-secret-password'

      const result = await service.hash(plainText)

      expect(bcrypt.hash).toHaveBeenCalledWith(plainText, 10)

      expect(result).toBe('hashed-password-mock')
    })
  })
})
