import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional() // From class-validator package
  fullName: string;

  @IsEmail()
  @IsNotEmpty() // From class-validator package
  email: string;
}
