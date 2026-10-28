export const createMockIamService = () => ({
  register: vi.fn().mockResolvedValue(true),
})

export const createMockHashService = () => ({
  hash: vi.fn().mockResolvedValue('default-hashed-password'),
})
