import request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from '../src/app.module.js'

describe('IamModule', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST', () => {
    const validPayload = {
      accountName: 'MyAccount',
      name: 'John Doe',
      phoneNumber: '3111111111',
      email: 'john.doe@gmail.com',
      password: 'johndoe-password',
    }

    it('it should return 201 when the data is correct', () => {
      return request(app.getHttpServer()).post('/iam').send(validPayload).expect(201)
    })

    const nonStringFields = ['accountName', 'name', 'phoneNumber', 'email', 'password']
    it.each(nonStringFields)('should return 400 when %s is not a string', (field) => {
      return request(app.getHttpServer())
        .post('/iam')
        .send({ ...validPayload, [field]: 12345 })
        .expect(400)
    })

    const emptyFields = ['accountName', 'name', 'phoneNumber', 'email', 'password']
    it.each(emptyFields)('should return 400 when %s is empty', (field) => {
      return request(app.getHttpServer())
        .post('/iam')
        .send({ ...validPayload, [field]: '' })
        .expect(400)
    })

    const shortPasswordCases = [['password is too short', '1234567']]
    it.each(shortPasswordCases)('should return 400 when %s', (_, shortPassword) => {
      return request(app.getHttpServer())
        .post('/iam')
        .send({ ...validPayload, password: shortPassword })
        .expect(400)
    })

    const maxLengthCases = [
      ['accountName', 'a'.repeat(121)],
      ['name', 'a'.repeat(121)],
      ['phoneNumber', '1'.repeat(21)],
      ['email', 'a'.repeat(255)],
      ['password', 'a'.repeat(255)],
    ]
    it.each(maxLengthCases)('should return 400 when %s exceeds max length', (field, value) => {
      return request(app.getHttpServer())
        .post('/iam')
        .send({ ...validPayload, [field]: value })
        .expect(400)
    })

    const invalidEmailCases = [
      ['email without @ symbol', 'johndoe.gmail.com'],
      ['email without domain', 'john@'],
      ['email with spaces', 'john doe@gmail.com'],
    ]
    it.each(invalidEmailCases)('should return 400 when %s', (_, invalidEmail) => {
      return request(app.getHttpServer())
        .post('/iam')
        .send({ ...validPayload, email: invalidEmail })
        .expect(400)
    })
  })
})
