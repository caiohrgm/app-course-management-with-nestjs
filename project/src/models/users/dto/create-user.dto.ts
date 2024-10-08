import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
