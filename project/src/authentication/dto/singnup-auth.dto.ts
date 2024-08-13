// import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
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
}
