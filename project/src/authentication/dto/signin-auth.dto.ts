// import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignInAuthDto {
  @IsEmail()
  @IsNotEmpty()
  // @ApiProperty()
  email: string;

  @MinLength(8)
  @MaxLength(12)
  @IsNotEmpty()
  // @ApiProperty()
  hash: string;
}
