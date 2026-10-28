import { IsEnum, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator'

export enum Environment {
  production = 'production',
  development = 'development',
  test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNumber()
  PORT: number

  @IsString()
  @IsNotEmpty()
  @Matches(/^postgres(ql)?:\/\/.+/, {
    message: 'DATABASE_URL must be a valid PostgreSQL connection URL',
  })
  DATABASE_URL: string
}
