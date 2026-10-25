import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class IamRegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  accountName!: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsPhoneNumber('CO')
  phoneNumber!: string

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  email!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(120)
  password!: string
}
