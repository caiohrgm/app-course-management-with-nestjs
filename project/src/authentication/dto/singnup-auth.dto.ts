import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpAuthDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @MaxLength(12)
  @IsNotEmpty()
  password: string;
  // This option is used to indicate that the property being validated
  // is an array, and each element within that array should be validated
  // against the enum.
  @IsEnum(Role, { each: true })
  @IsOptional()
  roles: Role[];
}
