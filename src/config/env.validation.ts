import {IsEnum, IsNumber} from "class-validator";

export enum Environment {
  production = 'production',
  development = 'development',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;
}
