// import { ApiProperty } from '@nestjs/swagger';
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
  // @ApiProperty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  // @ApiProperty()
  email: string;

  @MinLength(8)
  @MaxLength(12)
  @IsNotEmpty()
  // @ApiProperty()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  roles: Role[];
}
