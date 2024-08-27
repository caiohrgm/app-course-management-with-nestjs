import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional() // From class-validator package
  fullName: string;

  @IsEmail()
  @IsNotEmpty() // From class-validator package
  email: string;

  @IsString()
  @IsNotEmpty() // From class-validator package
  hashedPassword: string;

  @IsEnum(Role)
  roles: Role[];
}
