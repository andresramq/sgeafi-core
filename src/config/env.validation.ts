import { IsEnum, IsNumber } from 'class-validator'

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
}
